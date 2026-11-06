"""
Maritime Guard AI - FastAPI Backend Application
Intelligent Maritime Equipment Monitoring, Predictive Maintenance and Analytics Platform
"""
import os
import io
import json
import sqlite3
from datetime import datetime
from typing import Optional, List, Dict, Any

from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

from database import init_db, get_connection
from data_engine import engine
from models import (
    SystemStatusResponse,
    FleetOverviewResponse,
    EquipmentCard,
    ConditionDistributionResponse,
    FaultClassDistributionResponse,
    SensorTrendsResponse,
    VibrationFeaturesResponse,
    ModelEvaluationMetrics,
    DataQualityResponse,
    AlertItem,
    AcknowledgeRequest,
    MaintenanceNoteRequest,
    SyncStatusResponse
)

# Initialize database
init_db()

app = FastAPI(
    title="Maritime Guard AI API",
    description="Intelligent Maritime Equipment Monitoring, Predictive Maintenance and Analytics Platform API",
    version="1.0.0"
)

# Enable CORS for local dev frontends (Vite default :5173, etc.)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =============================================================================
# SYSTEM STATUS & MODE SWITCHING
# =============================================================================
@app.get("/api/status", response_model=SystemStatusResponse)
def get_system_status():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM alerts WHERE is_acknowledged = 0")
    pending_alerts = cursor.fetchone()[0]
    conn.close()

    return {
        "system_name": "MARITIME GUARD AI",
        "version": "1.0.0-PROTOTYPE",
        "status": "Operational",
        "data_mode": engine.mode,
        "active_dataset": engine.active_dataset_id,
        "offline_status": "Online (Satellite Uplink Active)",
        "total_vessels": 3,
        "total_equipment": 18,
        "pending_alerts": pending_alerts,
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }

@app.post("/api/mode/toggle")
def toggle_mode(mode: str = Query(..., pattern="^(RESEARCH DATA|MARITIME SIMULATION)$"), dataset_id: Optional[str] = None):
    engine.set_mode(mode, dataset_id)
    return {
        "message": f"Operating mode switched to {mode}",
        "current_mode": engine.mode,
        "active_dataset": engine.active_dataset_id
    }

# =============================================================================
# FLEET INTELLIGENCE & EQUIPMENT
# =============================================================================
@app.get("/api/fleet", response_model=FleetOverviewResponse)
def get_fleet_overview():
    return engine.get_fleet_summary()

@app.get("/api/equipment", response_model=List[EquipmentCard])
def get_equipment_list(vessel_id: Optional[str] = None):
    return engine.get_equipment_list(vessel_id)

@app.get("/api/equipment/{equipment_id}", response_model=EquipmentCard)
def get_single_equipment(equipment_id: str):
    items = engine.get_equipment_list()
    for item in items:
        if item["equipment_id"] == equipment_id:
            return item
    raise HTTPException(status_code=404, detail="Equipment unit not found")

# =============================================================================
# ANALYTICS DASHBOARD ENDPOINTS
# =============================================================================
@app.get("/api/analytics/condition-distribution", response_model=ConditionDistributionResponse)
def get_condition_distribution():
    return engine.get_condition_distribution()

@app.get("/api/analytics/fault-classes", response_model=FaultClassDistributionResponse)
def get_fault_classes():
    return engine.get_fault_class_distribution()

@app.get("/api/analytics/sensor-trends", response_model=SensorTrendsResponse)
def get_sensor_trends(equipment_id: Optional[str] = None, signal_name: Optional[str] = None):
    return engine.get_sensor_trends(equipment_id, signal_name)

@app.get("/api/analytics/vibration-features", response_model=VibrationFeaturesResponse)
def get_vibration_features(equipment_id: Optional[str] = None):
    return engine.calculate_vibration_features(equipment_id)

@app.get("/api/analytics/model-evaluation", response_model=ModelEvaluationMetrics)
def get_model_evaluation():
    return engine.get_model_evaluation()

@app.get("/api/analytics/isolation-forest")
def get_isolation_forest_results():
    return engine.run_isolation_forest()

@app.get("/api/analytics/data-quality", response_model=DataQualityResponse)
def get_data_quality():
    return engine.get_data_quality_report()

@app.get("/api/analytics/equipment-comparison")
def get_equipment_comparison():
    cards = engine.get_equipment_list()
    # Return structured comparison of Vibration RMS across equipment
    data = []
    for c in cards:
        data.append({
            "equipment_id": c["equipment_id"],
            "equipment_name": c["equipment_name"],
            "vessel_name": c["vessel_name"],
            "vibration_rms": c["vibration_rms"],
            "temperature_deg_c": c["temperature_deg_c"],
            "health_index": c["health_index"],
            "condition": c["operating_condition"]
        })
    return {
        "title": "Equipment Vibration & Health Comparison",
        "metric": "Vibration Velocity RMS (mm/s)",
        "source": engine.mode,
        "items": data
    }

# =============================================================================
# DATA LAB: DATASET SELECTION & CSV UPLOAD
# =============================================================================
@app.get("/api/datasets")
def list_datasets():
    return engine.list_datasets()

@app.post("/api/datasets/load")
def load_dataset(dataset_id: str):
    datasets = [d["id"] for d in engine.list_datasets()]
    if dataset_id not in datasets:
        raise HTTPException(status_code=400, detail="Invalid dataset identifier")
    mode = "MARITIME SIMULATION" if dataset_id == "maritime_simulation" else "RESEARCH DATA"
    engine.set_mode(mode, dataset_id)
    return {"message": f"Active dataset loaded: {dataset_id}", "mode": engine.mode}

@app.post("/api/datasets/upload")
async def upload_custom_dataset(file: UploadFile = File(...)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV formatted files are supported for ingestion.")
    
    try:
        contents = await file.read()
        df = pd.read_csv(io.StringIO(contents.decode("utf-8")))
        if df.empty or len(df.columns) < 2:
            raise HTTPException(status_code=400, detail="Uploaded CSV file contains insufficient columns or rows.")
        
        engine.load_custom_csv(df)
        
        summary = {
            "filename": file.filename,
            "row_count": len(df),
            "column_count": len(df.columns),
            "columns": list(df.columns),
            "missing_values": int(df.isnull().sum().sum()),
            "message": "Custom dataset uploaded and active in Research Data Mode."
        }
        return summary
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error parsing CSV dataset: {str(e)}")

# =============================================================================
# ALERT MANAGEMENT (SQLITE PERSISTENCE)
# =============================================================================
@app.get("/api/alerts", response_model=List[AlertItem])
def get_alerts(severity: Optional[str] = None, equipment_id: Optional[str] = None):
    conn = get_connection()
    cursor = conn.cursor()
    
    query = "SELECT * FROM alerts WHERE 1=1"
    params = []
    if severity and severity.lower() != "all":
        query += " AND LOWER(severity) = LOWER(?)"
        params.append(severity)
    if equipment_id and equipment_id.lower() != "all":
        query += " AND equipment_id = ?"
        params.append(equipment_id)
        
    query += " ORDER BY created_at DESC"
    cursor.execute(query, params)
    rows = cursor.fetchall()
    conn.close()

    alerts = []
    for r in rows:
        alerts.append({
            "id": r["id"],
            "vessel_id": r["vessel_id"],
            "vessel_name": r["vessel_name"],
            "equipment_id": r["equipment_id"],
            "equipment_name": r["equipment_name"],
            "severity": r["severity"],
            "signal_name": r["signal_name"],
            "time_or_cycle": r["time_or_cycle"],
            "supporting_evidence": r["supporting_evidence"],
            "data_quality_status": r["data_quality_status"],
            "explanation": r["explanation"],
            "recommended_inspection": r["recommended_inspection"],
            "is_acknowledged": bool(r["is_acknowledged"]),
            "maintenance_notes": r["maintenance_notes"] or "",
            "is_simulated": bool(r["is_simulated"]),
            "created_at": r["created_at"]
        })
    return alerts

@app.post("/api/alerts/{alert_id}/acknowledge")
def acknowledge_alert(alert_id: str, payload: AcknowledgeRequest):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE alerts SET is_acknowledged = ? WHERE id = ?", (1 if payload.is_acknowledged else 0, alert_id))
    conn.commit()
    conn.close()
    return {"message": f"Alert {alert_id} acknowledgement updated", "acknowledged": payload.is_acknowledged}

@app.post("/api/alerts/{alert_id}/note")
def add_maintenance_note(alert_id: str, payload: MaintenanceNoteRequest):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE alerts SET maintenance_notes = ? WHERE id = ?", (payload.note, alert_id))
    conn.commit()
    conn.close()
    return {"message": f"Maintenance note saved for alert {alert_id}", "note": payload.note}

# =============================================================================
# OFFLINE-FIRST SYNCHRONIZATION SIMULATION
# =============================================================================
@app.get("/api/sync/status", response_model=SyncStatusResponse)
def get_sync_status():
    return {
        "is_online": True,
        "pending_records": 0,
        "last_successful_sync": "2026-10-29T17:45:00Z",
        "local_storage_records": 18,
        "sync_status": "Synchronized with Shore Operations Cloud"
    }

@app.post("/api/sync/trigger")
def trigger_sync():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
    INSERT INTO sync_events (timestamp, network_state, records_synced, status, details)
    VALUES (?, ?, ?, ?, ?)
    """, (datetime.utcnow().isoformat(), "Online", 18, "Success", "Synchronized edge telemetry buffer with shore database."))
    conn.commit()
    conn.close()
    return {"message": "Sync batch completed successfully", "records_transferred": 18, "status": "Synced"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
