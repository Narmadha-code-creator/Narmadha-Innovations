"""
Pydantic Models for Maritime Guard AI REST API.
"""
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class SystemStatusResponse(BaseModel):
    system_name: str
    version: str
    status: str
    data_mode: str  # "RESEARCH DATA" or "MARITIME SIMULATION"
    active_dataset: str
    offline_status: str
    total_vessels: int
    total_equipment: int
    pending_alerts: int
    timestamp: str

class VesselSummary(BaseModel):
    vessel_id: str
    name: str
    type: str
    status: str
    health_score: float
    monitored_equipment_count: int
    equipment_requiring_attention: int
    last_update: str
    connectivity_status: str
    image_key: str

class FleetOverviewResponse(BaseModel):
    total_vessels: int
    monitored_equipment_units: int
    healthy_equipment: int
    equipment_under_observation: int  # Watch
    equipment_warning: int            # Warning
    sensor_fault_equipment: int       # Sensor Fault
    insufficient_data_equipment: int  # Insufficient Data
    active_alerts: int
    data_quality_issues: int
    data_source_mode: str
    vessels: List[VesselSummary]

class EquipmentCard(BaseModel):
    equipment_id: str
    vessel_id: str
    vessel_name: str
    equipment_name: str
    equipment_type: str
    health_index: float
    vibration_rms: float
    peak_vibration: float
    crest_factor: float
    temperature_deg_c: float
    operating_load_pct: float
    operating_condition: str  # "Healthy", "Watch", "Warning", "Sensor Fault", "Insufficient Data"
    data_quality_status: str
    anomaly_status: str
    last_update: str
    hotspot_x: float
    hotspot_y: float

class ConditionDistributionItem(BaseModel):
    name: str
    count: int
    percentage: float
    color: str

class ConditionDistributionResponse(BaseModel):
    title: str
    dataset_name: str
    data_source_type: str  # "Public Research Dataset" or "Maritime Simulation"
    formula_used: str
    total_assessed: int
    unassessed_count: int
    distribution: List[ConditionDistributionItem]

class FaultClassItem(BaseModel):
    class_name: str
    class_label: int
    count: int
    percentage: float
    description: str

class FaultClassDistributionResponse(BaseModel):
    dataset_name: str
    source_citation: str
    total_samples: int
    sampling_type: str
    classes: List[FaultClassItem]

class SensorTrendPoint(BaseModel):
    cycle_or_time: float
    observed_value: float
    expected_value: Optional[float] = None
    residual: Optional[float] = None
    ewma: Optional[float] = None
    upper_threshold: Optional[float] = None
    lower_threshold: Optional[float] = None
    anomaly: Optional[bool] = False

class SensorTrendsResponse(BaseModel):
    equipment_id: str
    signal_name: str
    unit: str
    dataset_name: str
    data_source_mode: str
    data_points: List[SensorTrendPoint]

class VibrationFeaturesResponse(BaseModel):
    equipment_id: str
    sample_size: int
    rms: float
    peak_amplitude: float
    crest_factor: float
    standard_deviation: float
    formula_rms: str
    formula_peak: str
    formula_crest: str
    signal_unit: str
    interpretation_note: str

class ModelEvaluationMetrics(BaseModel):
    model_type: str
    evaluated_dataset: str
    sample_split: str
    status: str
    accuracy: Optional[float] = None
    precision: Optional[float] = None
    recall: Optional[float] = None
    f1_score: Optional[float] = None
    false_alarm_rate_pct: Optional[float] = None
    rul_mae_cycles: Optional[float] = None
    rul_rmse_cycles: Optional[float] = None
    confusion_matrix: Optional[List[List[int]]] = None
    class_labels: Optional[List[str]] = None
    disclaimer: str

class DataQualityItem(BaseModel):
    category: str
    count: int
    percentage: float
    color: str

class DataQualityResponse(BaseModel):
    total_observations: int
    categories: List[DataQualityItem]
    denominator_explanation: str

class DatasetMetadata(BaseModel):
    id: str
    name: str
    source: str
    citation: str
    file_size_kb: float
    row_count: int
    column_count: int
    columns: List[str]
    missing_values: int
    is_active: bool
    summary_stats: Dict[str, Any]

class AlertItem(BaseModel):
    id: str
    vessel_id: str
    vessel_name: str
    equipment_id: str
    equipment_name: str
    severity: str
    signal_name: str
    time_or_cycle: str
    supporting_evidence: str
    data_quality_status: str
    explanation: str
    recommended_inspection: str
    is_acknowledged: bool
    maintenance_notes: str
    is_simulated: bool
    created_at: str

class AcknowledgeRequest(BaseModel):
    is_acknowledged: bool

class MaintenanceNoteRequest(BaseModel):
    note: str

class SyncStatusResponse(BaseModel):
    is_online: bool
    pending_records: int
    last_successful_sync: str
    local_storage_records: int
    sync_status: str
