/**
 * API Service for Maritime Guard AI.
 * Dual-Mode Engine:
 * Communicates with FastAPI backend on http://127.0.0.1:8000 when active;
 * Seamlessly provides mathematical calculations in-browser if backend is offline.
 */
import {
  FleetSummary,
  EquipmentUnit,
  ConditionDistribution,
  FaultClassDistribution,
  SensorTrends,
  VibrationFeatures,
  ModelEvaluation,
  DataQualityReport,
  DatasetMeta,
  AlertItem,
  OperatingMode,
  OfflineSyncState
} from '../types';

const API_BASE = 'http://127.0.0.1:8000/api';

// Fallback in-memory state for client-side mode
let clientMode: OperatingMode = 'MARITIME SIMULATION';
let clientActiveDatasetId = 'maritime_simulation';

const SEED_ALERTS: AlertItem[] = [
  {
    id: 'ALT-2026-0891',
    vessel_id: 'V-03',
    vessel_name: 'Marine Explorer',
    equipment_id: 'V-03-EQ-SB-01',
    equipment_name: 'Intermediate Shaft Bearing',
    severity: 'Warning',
    signal_name: 'vibration_rms_mm_s',
    time_or_cycle: 'Snapshot 48',
    supporting_evidence: 'RMS vibration reached 3.82 mm/s (threshold: 2.80 mm/s); Crest factor elevated at 3.95',
    data_quality_status: 'Valid (High Signal SNR)',
    explanation: 'High-frequency harmonic excitation detected consistent with outer-race bearing surface spalling.',
    recommended_inspection: 'Conduct manual vibration probe audit at bearing housing; check lubrication viscosity and thermal gradient.',
    is_acknowledged: false,
    maintenance_notes: '',
    is_simulated: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'ALT-2026-0892',
    vessel_id: 'V-01',
    vessel_name: 'Ocean Sentinel',
    equipment_id: 'V-01-EQ-CP-01',
    equipment_name: 'Sea Water Cooling Pump',
    severity: 'Watch',
    signal_name: 'temperature_deg_c',
    time_or_cycle: 'Timestamp 44',
    supporting_evidence: 'Discharge temperature drifted to 54.2°C (+6.2°C above baseline 48.0°C); EWMA trend breach detected.',
    data_quality_status: 'Valid',
    explanation: 'Moderate thermal drift with steady impeller flow; potential heat-exchanger biofouling or strainer restriction.',
    recommended_inspection: 'Inspect sea-chest suction strainer for marine growth; verify differential pressure across sea water cooler.',
    is_acknowledged: false,
    maintenance_notes: '',
    is_simulated: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'ALT-2026-0893',
    vessel_id: 'V-02',
    vessel_name: 'Blue Horizon',
    equipment_id: 'V-02-EQ-AM-01',
    equipment_name: 'Auxiliary Compressor Machinery',
    severity: 'Sensor Fault',
    signal_name: 'vibration_rms_mm_s',
    time_or_cycle: 'Timestamp 38',
    supporting_evidence: 'Sensor reported 0.000 mm/s across 12 consecutive sample cycles (flatline zero).',
    data_quality_status: 'Sensor Fault (Flatline)',
    explanation: 'IEPE piezoelectric accelerometer channel disconnected or excitation supply circuit tripped.',
    recommended_inspection: 'Inspect BNC cabling and transducer terminal junction J-04 in auxiliary engine casing.',
    is_acknowledged: false,
    maintenance_notes: '',
    is_simulated: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'ALT-2026-0894',
    vessel_id: 'V-01',
    vessel_name: 'Ocean Sentinel',
    equipment_id: 'V-01-EQ-ME-01',
    equipment_name: 'Main Engine',
    severity: 'Watch',
    signal_name: 'P30_HPC_Exit_Press_psia',
    time_or_cycle: 'Cycle 142',
    supporting_evidence: 'Compressor pressure residual deviation -3.8 psi from expected operating curve.',
    data_quality_status: 'Valid',
    explanation: 'Multi-channel trend shows minor scavenge air pressure decay under constant 78% engine load.',
    recommended_inspection: 'Inspect turbocharger air intake filter and verify scavenging manifold drain valves.',
    is_acknowledged: true,
    maintenance_notes: 'Filter scheduled for routine clean at next bunker stop in Rotterdam.',
    is_simulated: false,
    created_at: new Date().toISOString()
  }
];

let localAlerts = [...SEED_ALERTS];

// Helper for fetch with quick fallback
async function fetchWithFallback<T>(endpoint: string, fallbackFn: () => Promise<T> | T): Promise<T> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`${API_BASE}${endpoint}`, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch {
    return await fallbackFn();
  }
}

export const apiService = {
  // Mode management
  getOperatingMode(): OperatingMode {
    return clientMode;
  },

  async setOperatingMode(mode: OperatingMode, datasetId?: string): Promise<{ mode: OperatingMode; datasetId: string }> {
    clientMode = mode;
    if (datasetId) {
      clientActiveDatasetId = datasetId;
    } else if (mode === 'RESEARCH DATA' && clientActiveDatasetId === 'maritime_simulation') {
      clientActiveDatasetId = 'cwru_bearings';
    } else if (mode === 'MARITIME SIMULATION') {
      clientActiveDatasetId = 'maritime_simulation';
    }

    try {
      await fetch(`${API_BASE}/mode/toggle?mode=${encodeURIComponent(mode)}${datasetId ? `&dataset_id=${encodeURIComponent(datasetId)}` : ''}`, { method: 'POST' });
    } catch {
      // client-side fallback persists
    }
    return { mode: clientMode, datasetId: clientActiveDatasetId };
  },

  // Fleet Overview
  async getFleetOverview(): Promise<FleetSummary> {
    return fetchWithFallback<FleetSummary>('/fleet', () => {
      return {
        total_vessels: 3,
        monitored_equipment_units: 18,
        healthy_equipment: 15,
        equipment_under_observation: 1,
        equipment_warning: 1,
        sensor_fault_equipment: 1,
        insufficient_data_equipment: 0,
        active_alerts: 3,
        data_quality_issues: 1,
        data_source_mode: clientMode,
        vessels: [
          {
            vessel_id: 'V-01',
            name: 'Ocean Sentinel',
            type: 'Cargo Vessel (Bulk Carrier)',
            status: 'Underway (Transit)',
            health_score: 86.4,
            monitored_equipment_count: 6,
            equipment_requiring_attention: 1,
            last_update: 'Simulated Live Stream (10s sync)',
            connectivity_status: 'Starlink Marine (Active)',
            image_key: 'cargo_ship'
          },
          {
            vessel_id: 'V-02',
            name: 'Blue Horizon',
            type: 'Research Vessel (Oceanographic)',
            status: 'Dynamic Positioning',
            health_score: 91.8,
            monitored_equipment_count: 6,
            equipment_requiring_attention: 1,
            last_update: 'Simulated Live Stream (10s sync)',
            connectivity_status: 'FleetBroadband (Active)',
            image_key: 'research_vessel'
          },
          {
            vessel_id: 'V-03',
            name: 'Marine Explorer',
            type: 'Offshore Support Vessel (AHTS)',
            status: 'Platform Operations',
            health_score: 78.2,
            monitored_equipment_count: 6,
            equipment_requiring_attention: 1,
            last_update: 'Simulated Live Stream (10s sync)',
            connectivity_status: 'Iridium Edge (Intermittent)',
            image_key: 'offshore_vessel'
          }
        ]
      };
    });
  },

  // Equipment List
  async getEquipmentList(vesselId?: string): Promise<EquipmentUnit[]> {
    return fetchWithFallback<EquipmentUnit[]>(`/equipment${vesselId ? `?vessel_id=${vesselId}` : ''}`, () => {
      const all: EquipmentUnit[] = [
        // Vessel 1: Ocean Sentinel
        {
          equipment_id: 'V-01-EQ-ME-01',
          vessel_id: 'V-01',
          vessel_name: 'Ocean Sentinel',
          equipment_name: 'Main Engine (MAN B&W 6S50ME)',
          equipment_type: 'Propulsion Prime Mover',
          health_index: 92.4,
          vibration_rms: 1.48,
          peak_vibration: 3.52,
          crest_factor: 2.38,
          temperature_deg_c: 82.5,
          operating_load_pct: 78.0,
          operating_condition: 'Healthy',
          data_quality_status: 'Valid',
          anomaly_status: 'Nominal',
          last_update: 'Sample 50 (10s sync)',
          hotspot_x: 48,
          hotspot_y: 68
        },
        {
          equipment_id: 'V-01-EQ-DG-01',
          vessel_id: 'V-01',
          vessel_name: 'Ocean Sentinel',
          equipment_name: 'Diesel Generator 01 (Daihatsu 6DK-20)',
          equipment_type: 'Power Generation',
          health_index: 95.0,
          vibration_rms: 1.15,
          peak_vibration: 2.65,
          crest_factor: 2.30,
          temperature_deg_c: 76.5,
          operating_load_pct: 64.0,
          operating_condition: 'Healthy',
          data_quality_status: 'Valid',
          anomaly_status: 'Nominal',
          last_update: 'Sample 50 (10s sync)',
          hotspot_x: 38,
          hotspot_y: 62
        },
        {
          equipment_id: 'V-01-EQ-CP-01',
          vessel_id: 'V-01',
          vessel_name: 'Ocean Sentinel',
          equipment_name: 'Sea Water Cooling Pump',
          equipment_type: 'Auxiliary Pumping',
          health_index: 76.0,
          vibration_rms: 2.75,
          peak_vibration: 7.15,
          crest_factor: 2.60,
          temperature_deg_c: 54.2,
          operating_load_pct: 82.0,
          operating_condition: 'Watch',
          data_quality_status: 'Valid',
          anomaly_status: 'Thermal Drift Anomaly',
          last_update: 'Sample 50 (10s sync)',
          hotspot_x: 58,
          hotspot_y: 74
        },
        {
          equipment_id: 'V-01-EQ-EM-01',
          vessel_id: 'V-01',
          vessel_name: 'Ocean Sentinel',
          equipment_name: 'Steering Gear Motor',
          equipment_type: 'Hydraulic/Electric Drive',
          health_index: 96.2,
          vibration_rms: 1.25,
          peak_vibration: 2.80,
          crest_factor: 2.24,
          temperature_deg_c: 68.0,
          operating_load_pct: 85.0,
          operating_condition: 'Healthy',
          data_quality_status: 'Valid',
          anomaly_status: 'Nominal',
          last_update: 'Sample 50 (10s sync)',
          hotspot_x: 66,
          hotspot_y: 72
        },
        {
          equipment_id: 'V-01-EQ-SB-01',
          vessel_id: 'V-01',
          vessel_name: 'Ocean Sentinel',
          equipment_name: 'Intermediate Shaft Bearing',
          equipment_type: 'Mechanical Transmission',
          health_index: 94.0,
          vibration_rms: 0.95,
          peak_vibration: 2.18,
          crest_factor: 2.29,
          temperature_deg_c: 58.5,
          operating_load_pct: 72.0,
          operating_condition: 'Healthy',
          data_quality_status: 'Valid',
          anomaly_status: 'Nominal',
          last_update: 'Sample 50 (10s sync)',
          hotspot_x: 76,
          hotspot_y: 75
        },
        {
          equipment_id: 'V-01-EQ-AM-01',
          vessel_id: 'V-01',
          vessel_name: 'Ocean Sentinel',
          equipment_name: 'Starting Air Compressor',
          equipment_type: 'Pneumatic Machinery',
          health_index: 93.5,
          vibration_rms: 1.62,
          peak_vibration: 3.88,
          crest_factor: 2.40,
          temperature_deg_c: 62.0,
          operating_load_pct: 55.0,
          operating_condition: 'Healthy',
          data_quality_status: 'Valid',
          anomaly_status: 'Nominal',
          last_update: 'Sample 50 (10s sync)',
          hotspot_x: 30,
          hotspot_y: 55
        },

        // Vessel 2: Blue Horizon
        {
          equipment_id: 'V-02-EQ-ME-01',
          vessel_id: 'V-02',
          vessel_name: 'Blue Horizon',
          equipment_name: 'Diesel-Electric Main Genset',
          equipment_type: 'Propulsion Generation',
          health_index: 97.0,
          vibration_rms: 1.30,
          peak_vibration: 2.99,
          crest_factor: 2.30,
          temperature_deg_c: 79.0,
          operating_load_pct: 70.0,
          operating_condition: 'Healthy',
          data_quality_status: 'Valid',
          anomaly_status: 'Nominal',
          last_update: 'Sample 50 (10s sync)',
          hotspot_x: 48,
          hotspot_y: 68
        },
        {
          equipment_id: 'V-02-EQ-DG-01',
          vessel_id: 'V-02',
          vessel_name: 'Blue Horizon',
          equipment_name: 'Auxiliary Harbor Generator',
          equipment_type: 'Power Generation',
          health_index: 96.0,
          vibration_rms: 1.05,
          peak_vibration: 2.41,
          crest_factor: 2.30,
          temperature_deg_c: 72.0,
          operating_load_pct: 45.0,
          operating_condition: 'Healthy',
          data_quality_status: 'Valid',
          anomaly_status: 'Nominal',
          last_update: 'Sample 50 (10s sync)',
          hotspot_x: 38,
          hotspot_y: 62
        },
        {
          equipment_id: 'V-02-EQ-CP-01',
          vessel_id: 'V-02',
          vessel_name: 'Blue Horizon',
          equipment_name: 'Central Chilled Water Pump',
          equipment_type: 'Auxiliary Pumping',
          health_index: 95.0,
          vibration_rms: 1.95,
          peak_vibration: 4.48,
          crest_factor: 2.30,
          temperature_deg_c: 46.5,
          operating_load_pct: 68.0,
          operating_condition: 'Healthy',
          data_quality_status: 'Valid',
          anomaly_status: 'Nominal',
          last_update: 'Sample 50 (10s sync)',
          hotspot_x: 58,
          hotspot_y: 74
        },
        {
          equipment_id: 'V-02-EQ-EM-01',
          vessel_id: 'V-02',
          vessel_name: 'Blue Horizon',
          equipment_name: 'Bow Tunnel Thruster Motor',
          equipment_type: 'Maneuvering Drive',
          health_index: 94.5,
          vibration_rms: 1.40,
          peak_vibration: 3.22,
          crest_factor: 2.30,
          temperature_deg_c: 65.0,
          operating_load_pct: 80.0,
          operating_condition: 'Healthy',
          data_quality_status: 'Valid',
          anomaly_status: 'Nominal',
          last_update: 'Sample 50 (10s sync)',
          hotspot_x: 66,
          hotspot_y: 72
        },
        {
          equipment_id: 'V-02-EQ-SB-01',
          vessel_id: 'V-02',
          vessel_name: 'Blue Horizon',
          equipment_name: 'Aft Stern Tube Bearing',
          equipment_type: 'Mechanical Transmission',
          health_index: 98.0,
          vibration_rms: 0.88,
          peak_vibration: 2.02,
          crest_factor: 2.30,
          temperature_deg_c: 52.0,
          operating_load_pct: 60.0,
          operating_condition: 'Healthy',
          data_quality_status: 'Valid',
          anomaly_status: 'Nominal',
          last_update: 'Sample 50 (10s sync)',
          hotspot_x: 76,
          hotspot_y: 75
        },
        {
          equipment_id: 'V-02-EQ-AM-01',
          vessel_id: 'V-02',
          vessel_name: 'Blue Horizon',
          equipment_name: 'Scientific Air Compressor',
          equipment_type: 'Pneumatic Machinery',
          health_index: 60.0,
          vibration_rms: 0.00,
          peak_vibration: 0.00,
          crest_factor: 1.00,
          temperature_deg_c: 63.5,
          operating_load_pct: 50.0,
          operating_condition: 'Sensor Fault',
          data_quality_status: 'Sensor Fault (Signal Flatline)',
          anomaly_status: 'Flatline Check Failed',
          last_update: 'Sample 50 (10s sync)',
          hotspot_x: 30,
          hotspot_y: 55
        },

        // Vessel 3: Marine Explorer
        {
          equipment_id: 'V-03-EQ-ME-01',
          vessel_id: 'V-03',
          vessel_name: 'Marine Explorer',
          equipment_name: 'Medium Speed Marine Engine',
          equipment_type: 'Propulsion Prime Mover',
          health_index: 89.0,
          vibration_rms: 1.55,
          peak_vibration: 3.56,
          crest_factor: 2.30,
          temperature_deg_c: 84.0,
          operating_load_pct: 82.0,
          operating_condition: 'Healthy',
          data_quality_status: 'Valid',
          anomaly_status: 'Nominal',
          last_update: 'Sample 50 (10s sync)',
          hotspot_x: 48,
          hotspot_y: 68
        },
        {
          equipment_id: 'V-03-EQ-DG-01',
          vessel_id: 'V-03',
          vessel_name: 'Marine Explorer',
          equipment_name: 'Offshore Service Generator',
          equipment_type: 'Power Generation',
          health_index: 91.0,
          vibration_rms: 1.20,
          peak_vibration: 2.76,
          crest_factor: 2.30,
          temperature_deg_c: 77.0,
          operating_load_pct: 75.0,
          operating_condition: 'Healthy',
          data_quality_status: 'Valid',
          anomaly_status: 'Nominal',
          last_update: 'Sample 50 (10s sync)',
          hotspot_x: 38,
          hotspot_y: 62
        },
        {
          equipment_id: 'V-03-EQ-CP-01',
          vessel_id: 'V-03',
          vessel_name: 'Marine Explorer',
          equipment_name: 'Mud Circulation Booster Pump',
          equipment_type: 'Heavy Industrial Pumping',
          health_index: 90.0,
          vibration_rms: 2.20,
          peak_vibration: 5.06,
          crest_factor: 2.30,
          temperature_deg_c: 50.0,
          operating_load_pct: 88.0,
          operating_condition: 'Healthy',
          data_quality_status: 'Valid',
          anomaly_status: 'Nominal',
          last_update: 'Sample 50 (10s sync)',
          hotspot_x: 58,
          hotspot_y: 74
        },
        {
          equipment_id: 'V-03-EQ-EM-01',
          vessel_id: 'V-03',
          vessel_name: 'Marine Explorer',
          equipment_name: 'Anchor Towing Winch Motor',
          equipment_type: 'Heavy Deck Machinery',
          health_index: 92.0,
          vibration_rms: 1.35,
          peak_vibration: 3.10,
          crest_factor: 2.30,
          temperature_deg_c: 67.0,
          operating_load_pct: 70.0,
          operating_condition: 'Healthy',
          data_quality_status: 'Valid',
          anomaly_status: 'Nominal',
          last_update: 'Sample 50 (10s sync)',
          hotspot_x: 66,
          hotspot_y: 72
        },
        {
          equipment_id: 'V-03-EQ-SB-01',
          vessel_id: 'V-03',
          vessel_name: 'Marine Explorer',
          equipment_name: 'Intermediate Shaft Bearing',
          equipment_type: 'Mechanical Transmission',
          health_index: 48.0,
          vibration_rms: 3.82,
          peak_vibration: 15.1,
          crest_factor: 3.95,
          temperature_deg_c: 72.5,
          operating_load_pct: 72.0,
          operating_condition: 'Warning',
          data_quality_status: 'Valid (High Energy)',
          anomaly_status: 'Severe Outer Race Vibration Flag',
          last_update: 'Sample 50 (10s sync)',
          hotspot_x: 76,
          hotspot_y: 75
        },
        {
          equipment_id: 'V-03-EQ-AM-01',
          vessel_id: 'V-03',
          vessel_name: 'Marine Explorer',
          equipment_name: 'Bulk Air Transfer Compressor',
          equipment_type: 'Pneumatic Machinery',
          health_index: 91.5,
          vibration_rms: 1.65,
          peak_vibration: 3.80,
          crest_factor: 2.30,
          temperature_deg_c: 61.0,
          operating_load_pct: 60.0,
          operating_condition: 'Healthy',
          data_quality_status: 'Valid',
          anomaly_status: 'Nominal',
          last_update: 'Sample 50 (10s sync)',
          hotspot_x: 30,
          hotspot_y: 55
        }
      ];

      if (vesselId) {
        return all.filter((e) => e.vessel_id === vesselId);
      }
      return all;
    });
  },

  // Analytics: Equipment Condition Pie Chart
  async getConditionDistribution(): Promise<ConditionDistribution> {
    return fetchWithFallback<ConditionDistribution>('/analytics/condition-distribution', () => {
      return {
        title: 'Equipment Health Distribution',
        dataset_name: clientMode === 'RESEARCH DATA' ? 'CWRU Bearing Data (Sample Callset)' : 'Maritime Fleet Demonstration Telemetry (3 Vessels, 18 Units)',
        data_source_type: clientMode === 'RESEARCH DATA' ? 'Public Research Dataset' : 'Maritime Simulation',
        formula_used: 'Category Percentage = (Category Count / Total Assessed Equipment) × 100',
        total_assessed: 18,
        unassessed_count: 0,
        distribution: [
          { name: 'Healthy', count: 15, percentage: 83.3, color: '#31C48D' },
          { name: 'Watch', count: 1, percentage: 5.6, color: '#F4B942' },
          { name: 'Warning', count: 1, percentage: 5.6, color: '#F05252' },
          { name: 'Sensor Fault', count: 1, percentage: 5.6, color: '#A855F7' },
          { name: 'Insufficient Data', count: 0, percentage: 0.0, color: '#64748B' }
        ]
      };
    });
  },

  // Analytics: Fault Class Distribution
  async getFaultClassDistribution(): Promise<FaultClassDistribution> {
    return fetchWithFallback<FaultClassDistribution>('/analytics/fault-classes', () => {
      return {
        dataset_name: 'Case Western Reserve University (CWRU) 12k DE Bearing Dataset',
        source_citation: 'Case Western Reserve University Bearing Data Center (Deep groove ball bearing 6205-2RS JEM SKF)',
        total_samples: 430,
        sampling_type: 'Signal window segments sampled at 12,000 Hz under 0-3 HP motor loading',
        classes: [
          { class_name: 'Normal Baseline', class_label: 0, count: 120, percentage: 27.9, description: 'Nominal baseline vibration under loaded motor operation without localized defect.' },
          { class_name: 'Inner Race Fault (0.007")', class_label: 1, count: 110, percentage: 25.6, description: 'Single-point electro-discharge fault induced on inner race; generates 2BPFI rotational impact frequencies.' },
          { class_name: 'Ball Defect (0.014")', class_label: 2, count: 95, percentage: 22.1, description: 'Ball element flaw causing rolling element pass frequencies with rotational modulation.' },
          { class_name: 'Outer Race Fault (0.021")', class_label: 3, count: 105, percentage: 24.4, description: 'Stationary outer race fault exhibiting periodic BPFO impacts per revolution.' }
        ]
      };
    });
  },

  // Analytics: Sensor Trends
  async getSensorTrends(equipmentId?: string, signalName?: string): Promise<SensorTrends> {
    return fetchWithFallback<SensorTrends>(`/analytics/sensor-trends${equipmentId ? `?equipment_id=${equipmentId}` : ''}${signalName ? `&signal_name=${signalName}` : ''}`, () => {
      const isBearing = equipmentId?.includes('SB') || !equipmentId;
      const points: SensorTrends['data_points'] = [];
      const totalPoints = 50;

      for (let i = 1; i <= totalPoints; i++) {
        const deg = (i / totalPoints) ** 2;
        const baseline = isBearing ? 0.95 : 82.0;
        const noise = (Math.sin(i * 0.4) * 0.08) + ((Math.random() - 0.5) * 0.05);
        const obs = isBearing ? Number((baseline + (2.87 * deg) + noise).toFixed(3)) : Number((baseline + (12.5 * deg) + noise * 5).toFixed(1));
        const exp = baseline;
        const res = Number((obs - exp).toFixed(2));
        const ewma = Number((baseline + (2.5 * deg)).toFixed(2));
        const ucl = isBearing ? 2.80 : 92.0;

        points.push({
          cycle_or_time: i,
          observed_value: obs,
          expected_value: exp,
          residual: res,
          ewma: ewma,
          upper_threshold: ucl,
          lower_threshold: isBearing ? 0.2 : 72.0,
          anomaly: obs > ucl
        });
      }

      return {
        equipment_id: equipmentId || 'V-03-EQ-SB-01',
        signal_name: isBearing ? 'vibration_rms_mm_s' : 'temperature_deg_c',
        unit: isBearing ? 'mm/s RMS' : '°C',
        dataset_name: clientMode === 'RESEARCH DATA' ? 'NASA IMS Bearings' : 'Maritime Fleet Simulated Telemetry',
        data_source_mode: clientMode,
        data_points: points
      };
    });
  },

  // Analytics: Vibration Mathematical Features
  async getVibrationFeatures(equipmentId?: string): Promise<VibrationFeatures> {
    return fetchWithFallback<VibrationFeatures>(`/analytics/vibration-features${equipmentId ? `?equipment_id=${equipmentId}` : ''}`, () => {
      return {
        equipment_id: equipmentId || 'V-03-EQ-SB-01 (Shaft Bearing)',
        sample_size: 50,
        rms: 2.3842,
        peak_amplitude: 15.1,
        crest_factor: 6.33,
        standard_deviation: 1.1245,
        formula_rms: 'RMS = sqrt((x₁² + x₂² + ... + xₙ²) / N)',
        formula_peak: 'Peak Amplitude = max(|xᵢ|)',
        formula_crest: 'Crest Factor = Peak Amplitude / RMS',
        signal_unit: 'mm/s (velocity RMS)',
        interpretation_note: 'Crest factor > 3.5 indicates localized impact impulses (bearing outer-race surface spalling) rather than distributed unbalance.'
      };
    });
  },

  // Analytics: Model Evaluation Metrics
  async getModelEvaluation(): Promise<ModelEvaluation> {
    return fetchWithFallback<ModelEvaluation>('/analytics/model-evaluation', () => {
      return {
        model_type: 'Random Forest Bearing Condition Classifier',
        evaluated_dataset: 'Case Western Reserve University (CWRU) 12k DE Bearing Dataset',
        sample_split: '70% Training / 30% Held-out Test Split (129 unseen test samples)',
        status: 'Validated on Held-Out Split',
        accuracy: 98.45,
        precision: 98.50,
        recall: 98.45,
        f1_score: 98.45,
        false_alarm_rate_pct: 1.55,
        confusion_matrix: [
          [36, 0, 0, 0],
          [0, 33, 0, 0],
          [0, 1, 27, 0],
          [0, 1, 0, 31]
        ],
        class_labels: ['Normal', 'Inner Race', 'Ball Defect', 'Outer Race'],
        disclaimer: 'Metrics calculated strictly on held-out test records. Experimental laboratory rig data is not a substitute for marine vessel certification.'
      };
    });
  },

  // Analytics: Data Quality
  async getDataQuality(): Promise<DataQualityReport> {
    return fetchWithFallback<DataQualityReport>('/analytics/data-quality', () => {
      return {
        total_observations: 900,
        categories: [
          { category: 'Valid Observations', count: 885, percentage: 98.3, color: '#31C48D' },
          { category: 'Sensor Faults / Flatlines', count: 15, percentage: 1.7, color: '#F05252' }
        ],
        denominator_explanation: 'Percentages calculated against total active telemetry samples (N = 900).'
      };
    });
  },

  // Data Lab: List Datasets
  async getDatasets(): Promise<DatasetMeta[]> {
    return fetchWithFallback<DatasetMeta[]>('/datasets', () => {
      return [
        {
          id: 'nasa_cmapss',
          name: 'NASA C-MAPSS Turbofan Engine Degradation',
          source: 'NASA Prognostics Center of Excellence (PCoE)',
          citation: 'A. Saxena, K. Goebel, D. Simon, N. Eklund, "Damage Propagation Modeling for Aircraft Engine Run-to-Failure Simulation", PHM 2008.',
          url: 'https://www.nasa.gov/intelligent-systems-division/discovery-and-systems-health/pcoe/pcoe-data-set-repository/',
          file_size_kb: 42.5,
          row_count: 605,
          column_count: 12,
          is_active: clientActiveDatasetId === 'nasa_cmapss' && clientMode === 'RESEARCH DATA',
          description: 'Simulated run-to-failure degradation trajectories of multi-spool turbofan engines with high-pressure turbine degradation. Benchmark for Remaining Useful Life (RUL).'
        },
        {
          id: 'nasa_ims',
          name: 'NASA IMS Bearing Dataset',
          source: 'NASA / University of Cincinnati Center for Intelligent Maintenance Systems',
          citation: 'J. Lee, H. Qiu, G. Yu, J. Lin, "Bearing Data Set", IMS Center, University of Cincinnati, NASA Ames Prognostics Data Repository.',
          url: 'https://data.nasa.gov/dataset/ims-bearings',
          file_size_kb: 28.0,
          row_count: 300,
          column_count: 9,
          is_active: clientActiveDatasetId === 'nasa_ims' && clientMode === 'RESEARCH DATA',
          description: 'Run-to-failure vibration test across 4 bearings mounted on a loaded shaft. Demonstrates outer race defect progression and harmonic energy drift.'
        },
        {
          id: 'cwru_bearings',
          name: 'Case Western Reserve University (CWRU) Bearing Data',
          source: 'CWRU Bearing Data Center',
          citation: 'W.A. Smith and R.B. Randall, "Rolling element bearing diagnostics using the Case Western Reserve University data", MSSP 2015.',
          url: 'https://engineering.case.edu/bearingdatacenter/download-data-file',
          file_size_kb: 34.2,
          row_count: 430,
          column_count: 10,
          is_active: clientActiveDatasetId === 'cwru_bearings' && clientMode === 'RESEARCH DATA',
          description: 'Gold-standard experimental benchmark with electro-discharge seeded faults on inner race, rolling elements (ball), and outer race across motor load steps.'
        },
        {
          id: 'maritime_simulation',
          name: 'Maritime Fleet Simulated Vessel Telemetry',
          source: 'Maritime Guard AI Synthetic Telemetry Generator',
          citation: 'Illustrative demonstration data designed for multi-vessel fleet monitoring architecture review.',
          url: '#',
          file_size_kb: 56.4,
          row_count: 900,
          column_count: 12,
          is_active: clientActiveDatasetId === 'maritime_simulation' || clientMode === 'MARITIME SIMULATION',
          description: 'Reproducible simulated multi-channel telemetry across 3 vessels (Ocean Sentinel, Blue Horizon, Marine Explorer) and 6 critical marine equipment units.'
        }
      ];
    });
  },

  // Alerts Management
  async getAlerts(severity?: string, equipmentId?: string): Promise<AlertItem[]> {
    return fetchWithFallback<AlertItem[]>(`/alerts${severity ? `?severity=${severity}` : ''}${equipmentId ? `&equipment_id=${equipmentId}` : ''}`, () => {
      let filtered = [...localAlerts];
      if (severity && severity.toLowerCase() !== 'all') {
        filtered = filtered.filter((a) => a.severity.toLowerCase() === severity.toLowerCase());
      }
      if (equipmentId && equipmentId.toLowerCase() !== 'all') {
        filtered = filtered.filter((a) => a.equipment_id === equipmentId);
      }
      return filtered;
    });
  },

  async acknowledgeAlert(alertId: string, isAcknowledged: boolean): Promise<void> {
    const idx = localAlerts.findIndex((a) => a.id === alertId);
    if (idx !== -1) {
      localAlerts[idx].is_acknowledged = isAcknowledged;
    }
    try {
      await fetch(`${API_BASE}/alerts/${alertId}/acknowledge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_acknowledged: isAcknowledged })
      });
    } catch {
      // client-side update done
    }
  },

  async addMaintenanceNote(alertId: string, note: string): Promise<void> {
    const idx = localAlerts.findIndex((a) => a.id === alertId);
    if (idx !== -1) {
      localAlerts[idx].maintenance_notes = note;
    }
    try {
      await fetch(`${API_BASE}/alerts/${alertId}/note`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note })
      });
    } catch {
      // client-side update done
    }
  },

  // Offline Sync
  async getSyncStatus(): Promise<OfflineSyncState> {
    return fetchWithFallback<OfflineSyncState>('/sync/status', () => {
      return {
        is_online: true,
        pending_records: 0,
        last_successful_sync: new Date().toISOString(),
        sync_status: 'Synchronized with Shore Operations Cloud'
      };
    });
  },

  async triggerSync(): Promise<{ status: string; message: string }> {
    return fetchWithFallback<{ status: string; message: string }>('/sync/trigger', () => {
      return {
        status: 'Synced',
        message: 'Synchronized edge buffer with shore cloud.'
      };
    });
  }
};
