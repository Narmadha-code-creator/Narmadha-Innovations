"""
Database management for Maritime Guard AI using SQLite.
Stores alerts, maintenance notes, equipment state, and offline synchronization logs.
"""
import sqlite3
import os
import json
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), "maritime_guard.db")

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    cursor = conn.cursor()
    
    # Table: Alerts
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS alerts (
        id TEXT PRIMARY KEY,
        vessel_id TEXT NOT NULL,
        vessel_name TEXT NOT NULL,
        equipment_id TEXT NOT NULL,
        equipment_name TEXT NOT NULL,
        severity TEXT NOT NULL,
        signal_name TEXT NOT NULL,
        time_or_cycle TEXT NOT NULL,
        supporting_evidence TEXT NOT NULL,
        data_quality_status TEXT NOT NULL,
        explanation TEXT NOT NULL,
        recommended_inspection TEXT NOT NULL,
        is_acknowledged INTEGER DEFAULT 0,
        maintenance_notes TEXT DEFAULT '',
        is_simulated INTEGER DEFAULT 1,
        created_at TEXT NOT NULL
    )
    """)

    # Table: Sync Events
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS sync_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp TEXT NOT NULL,
        network_state TEXT NOT NULL,
        records_synced INTEGER NOT NULL,
        status TEXT NOT NULL,
        details TEXT
    )
    """)

    # Insert default seed alerts if table is empty
    cursor.execute("SELECT COUNT(*) FROM alerts")
    if cursor.fetchone()[0] == 0:
        seed_alerts = [
            (
                "ALT-2026-0891",
                "V-03",
                "Marine Explorer",
                "V-03-EQ-SB-01",
                "Intermediate Shaft Bearing",
                "Warning",
                "vibration_rms_mm_s",
                "Snapshot 48",
                "RMS vibration reached 3.82 mm/s (threshold: 2.80 mm/s); Crest factor elevated at 3.95",
                "Valid (High Signal SNR)",
                "High-frequency harmonic excitation detected consistent with outer-race bearing surface spalling.",
                "Conduct manual vibration probe audit at bearing housing; check lubrication viscosity and thermal gradient.",
                0,
                "",
                1,
                datetime.utcnow().isoformat()
            ),
            (
                "ALT-2026-0892",
                "V-01",
                "Ocean Sentinel",
                "V-01-EQ-CP-01",
                "Sea Water Cooling Pump",
                "Watch",
                "temperature_deg_c",
                "Timestamp 44",
                "Discharge temperature drifted to 54.2°C (+6.2°C above baseline 48.0°C); EWMA trend breach detected.",
                "Valid",
                "Moderate thermal drift with steady impeller flow; potential heat-exchanger biofouling or strainer restriction.",
                "Inspect sea-chest suction strainer for marine growth; verify differential pressure across sea water cooler.",
                0,
                "",
                1,
                datetime.utcnow().isoformat()
            ),
            (
                "ALT-2026-0893",
                "V-02",
                "Blue Horizon",
                "V-02-EQ-AM-01",
                "Auxiliary Compressor Machinery",
                "Sensor Fault",
                "vibration_rms_mm_s",
                "Timestamp 38",
                "Sensor reported 0.000 mm/s across 12 consecutive sample cycles (flatline zero).",
                "Sensor Fault (Flatline)",
                "IEPE piezoelectric accelerometer channel disconnected or excitation supply circuit tripped.",
                "Inspect BNC cabling and transducer terminal junction J-04 in auxiliary engine casing.",
                0,
                "",
                1,
                datetime.utcnow().isoformat()
            ),
            (
                "ALT-2026-0894",
                "V-01",
                "Ocean Sentinel",
                "V-01-EQ-ME-01",
                "Main Engine",
                "Watch",
                "P30_HPC_Exit_Press_psia",
                "Cycle 142",
                "Compressor pressure residual deviation -3.8 psi from expected operating curve.",
                "Valid",
                "Multi-channel trend shows minor scavenge air pressure decay under constant 78% engine load.",
                "Inspect turbocharger air intake filter and verify scavenging manifold drain valves.",
                1,
                "Filter scheduled for routine clean at next bunker stop in Rotterdam.",
                0,
                datetime.utcnow().isoformat()
            )
        ]
        cursor.executemany("""
        INSERT INTO alerts (id, vessel_id, vessel_name, equipment_id, equipment_name, severity, signal_name, 
                            time_or_cycle, supporting_evidence, data_quality_status, explanation, 
                            recommended_inspection, is_acknowledged, maintenance_notes, is_simulated, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, seed_alerts)

    conn.commit()
    conn.close()

if __name__ == "__main__":
    init_db()
    print("Database initialized at", DB_PATH)
