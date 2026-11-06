export type OperatingCondition = 'Healthy' | 'Watch' | 'Warning' | 'Sensor Fault' | 'Insufficient Data';

export type OperatingMode = 'RESEARCH DATA' | 'MARITIME SIMULATION';

export interface Vessel {
  vessel_id: string;
  name: string;
  type: string;
  status: string;
  health_score: number;
  monitored_equipment_count: number;
  equipment_requiring_attention: number;
  last_update: string;
  connectivity_status: string;
  image_key: 'cargo_ship' | 'research_vessel' | 'offshore_vessel';
}

export interface EquipmentUnit {
  equipment_id: string;
  vessel_id: string;
  vessel_name: string;
  equipment_name: string;
  equipment_type: string;
  health_index: number;
  vibration_rms: number;
  peak_vibration: number;
  crest_factor: number;
  temperature_deg_c: number;
  operating_load_pct: number;
  operating_condition: OperatingCondition;
  data_quality_status: string;
  anomaly_status: string;
  last_update: string;
  hotspot_x: number;
  hotspot_y: number;
}

export interface FleetSummary {
  total_vessels: number;
  monitored_equipment_units: number;
  healthy_equipment: number;
  equipment_under_observation: number;
  equipment_warning: number;
  sensor_fault_equipment: number;
  insufficient_data_equipment: number;
  active_alerts: number;
  data_quality_issues: number;
  data_source_mode: OperatingMode;
  vessels: Vessel[];
}

export interface ConditionDistributionItem {
  name: OperatingCondition;
  count: number;
  percentage: number;
  color: string;
}

export interface ConditionDistribution {
  title: string;
  dataset_name: string;
  data_source_type: string;
  formula_used: string;
  total_assessed: number;
  unassessed_count: number;
  distribution: ConditionDistributionItem[];
}

export interface FaultClassItem {
  class_name: string;
  class_label: number;
  count: number;
  percentage: number;
  description: string;
}

export interface FaultClassDistribution {
  dataset_name: string;
  source_citation: string;
  total_samples: number;
  sampling_type: string;
  classes: FaultClassItem[];
}

export interface SensorTrendPoint {
  cycle_or_time: number;
  observed_value: number;
  expected_value?: number;
  residual?: number;
  ewma?: number;
  upper_threshold?: number;
  lower_threshold?: number;
  anomaly?: boolean;
}

export interface SensorTrends {
  equipment_id: string;
  signal_name: string;
  unit: string;
  dataset_name: string;
  data_source_mode: string;
  data_points: SensorTrendPoint[];
}

export interface VibrationFeatures {
  equipment_id: string;
  sample_size: number;
  rms: number;
  peak_amplitude: number;
  crest_factor: number;
  standard_deviation: number;
  formula_rms: string;
  formula_peak: string;
  formula_crest: string;
  signal_unit: string;
  interpretation_note: string;
}

export interface ModelEvaluation {
  model_type: string;
  evaluated_dataset: string;
  sample_split: string;
  status: string;
  accuracy?: number;
  precision?: number;
  recall?: number;
  f1_score?: number;
  false_alarm_rate_pct?: number;
  rul_mae_cycles?: number;
  rul_rmse_cycles?: number;
  confusion_matrix?: number[][];
  class_labels?: string[];
  disclaimer: string;
}

export interface DataQualityItem {
  category: string;
  count: number;
  percentage: number;
  color: string;
}

export interface DataQualityReport {
  total_observations: number;
  categories: DataQualityItem[];
  denominator_explanation: string;
}

export interface DatasetMeta {
  id: string;
  name: string;
  source: string;
  citation: string;
  url: string;
  file_size_kb: number;
  row_count: number;
  column_count: number;
  is_active: boolean;
  description: string;
}

export interface AlertItem {
  id: string;
  vessel_id: string;
  vessel_name: string;
  equipment_id: string;
  equipment_name: string;
  severity: 'Warning' | 'Watch' | 'Sensor Fault';
  signal_name: string;
  time_or_cycle: string;
  supporting_evidence: string;
  data_quality_status: string;
  explanation: string;
  recommended_inspection: string;
  is_acknowledged: boolean;
  maintenance_notes: string;
  is_simulated: boolean;
  created_at: string;
}

export interface OfflineSyncState {
  is_online: boolean;
  pending_records: number;
  last_successful_sync: string;
  sync_status: string;
}
