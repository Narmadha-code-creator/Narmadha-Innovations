import React, { useState } from 'react';
import { EquipmentUnit } from '../../types';
import { Activity, AlertTriangle, CheckCircle, Info, Zap, Thermometer, ShieldAlert, Wrench, X } from 'lucide-react';

interface Props {
  vesselName: string;
  equipmentList: EquipmentUnit[];
  onSelectEquipment: (eq: EquipmentUnit) => void;
  selectedEquipmentId?: string;
}

export const ShipBlueprintSchematic: React.FC<Props> = ({
  vesselName,
  equipmentList,
  onSelectEquipment,
  selectedEquipmentId
}) => {
  const [activeInspector, setActiveInspector] = useState<EquipmentUnit | null>(
    equipmentList.find((e) => e.equipment_id === selectedEquipmentId) || equipmentList[0] || null
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Healthy':
        return '#31C48D';
      case 'Watch':
        return '#F4B942';
      case 'Warning':
        return '#F05252';
      case 'Sensor Fault':
        return '#A855F7';
      default:
        return '#64748B';
    }
  };

  const handleMarkerClick = (eq: EquipmentUnit) => {
    setActiveInspector(eq);
    onSelectEquipment(eq);
  };

  return (
    <div className="bg-ocean-900 border border-ocean-700/60 rounded-xl p-5 shadow-marine-card relative overflow-hidden">
      {/* Schematic Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-ocean-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-ocean-500 animate-ping" />
            <h3 className="text-lg font-bold text-ocean-50 uppercase tracking-wider font-mono">
              Vessel Machinery Layout Schematic: {vesselName}
            </h3>
          </div>
          <p className="text-xs text-ocean-300 mt-0.5">
            Interactive shipboard sensor nodes. Click any machinery hotspot to inspect live telemetry and diagnostics.
          </p>
        </div>
        <div className="px-3 py-1 rounded bg-ocean-800/80 border border-ocean-600/40 text-xs font-mono text-ocean-300">
          Illustrative arrangement — Concept Model
        </div>
      </div>

      {/* 2D Cutaway Blueprint SVG Canvas */}
      <div className="relative my-6 bg-ocean-950/80 rounded-lg p-3 border border-ocean-800/80 radar-grid overflow-x-auto">
        <svg viewBox="0 0 900 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full min-w-[700px] h-auto">
          {/* Grid lines */}
          <line x1="50" y1="260" x2="850" y2="260" stroke="#103D5C" strokeWidth="1" strokeDasharray="5 5" />
          <line x1="50" y1="180" x2="850" y2="180" stroke="#103D5C" strokeWidth="1" strokeDasharray="5 5" />
          <line x1="50" y1="100" x2="850" y2="100" stroke="#103D5C" strokeWidth="1" strokeDasharray="5 5" />

          {/* Ship profile cutaway hull */}
          <path
            d="M 60 210 L 140 210 L 680 210 Q 800 210, 840 160 L 850 180 C 820 250, 750 270, 660 270 L 100 270 C 75 270, 60 250, 60 210 Z"
            fill="#071B2E"
            stroke="#21C7D9"
            strokeWidth="2"
            strokeOpacity="0.8"
          />

          {/* Engine Room Sub-Decks and Bulkheads */}
          <rect x="180" y="160" width="460" height="100" fill="#0B253D" fillOpacity="0.6" stroke="#18547D" strokeWidth="1.5" />
          {/* Watertight Bulkheads */}
          <line x1="280" y1="160" x2="280" y2="260" stroke="#21C7D9" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="420" y1="160" x2="420" y2="260" stroke="#21C7D9" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="540" y1="160" x2="540" y2="260" stroke="#21C7D9" strokeWidth="1" strokeDasharray="3 3" />

          {/* Propeller & Shaft Line */}
          <line x1="50" y1="245" x2="350" y2="245" stroke="#52DBEB" strokeWidth="3" />
          {/* Propeller silhouette */}
          <path d="M 50 225 L 60 245 L 50 265 L 42 245 Z" fill="#21C7D9" />

          {/* Machinery Compartment Labels */}
          <text x="200" y="178" fill="#8AE7F2" fontSize="10" fontFamily="monospace" opacity="0.7">COMPARTMENT A: AUXILIARY</text>
          <text x="310" y="178" fill="#8AE7F2" fontSize="10" fontFamily="monospace" opacity="0.7">COMPARTMENT B: POWER GEN</text>
          <text x="440" y="178" fill="#8AE7F2" fontSize="10" fontFamily="monospace" opacity="0.7">COMPARTMENT C: MAIN ENGINE</text>
          <text x="560" y="178" fill="#8AE7F2" fontSize="10" fontFamily="monospace" opacity="0.7">COMPARTMENT D: SHAFT TUNNEL</text>

          {/* Superstructure Bridge */}
          <polygon points="120,210 130,90 240,90 270,210" fill="#071B2E" stroke="#18547D" strokeWidth="1.5" />
          <rect x="150" y="70" width="75" height="25" fill="#103D5C" stroke="#21C7D9" strokeWidth="1" />
          <line x1="188" y1="70" x2="188" y2="40" stroke="#21C7D9" strokeWidth="1.5" />
          <circle cx="188" cy="40" r="3" fill="#F4B942" />

          {/* Machinery Icons & Hotspot Circles */}
          {equipmentList.map((eq) => {
            const isSelected = activeInspector?.equipment_id === eq.equipment_id;
            const statusColor = getStatusColor(eq.operating_condition);

            // Coordinate scale for 900x320 SVG canvas
            const cx = 50 + (eq.hotspot_x * 7.5);
            const cy = 40 + (eq.hotspot_y * 2.5);

            return (
              <g
                key={eq.equipment_id}
                className="cursor-pointer transition-all duration-200"
                onClick={() => handleMarkerClick(eq)}
              >
                {/* Sonar Ping Ring when selected or warning */}
                {(isSelected || eq.operating_condition === 'Warning') && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? 26 : 20}
                    stroke={statusColor}
                    strokeWidth="1.5"
                    fill="none"
                    className="animate-ping opacity-60"
                  />
                )}

                {/* Outer Glow Halo */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isSelected ? 20 : 16}
                  fill={statusColor}
                  fillOpacity={isSelected ? 0.35 : 0.15}
                  stroke={statusColor}
                  strokeWidth={isSelected ? 2.5 : 1.5}
                />

                {/* Machinery Node Core */}
                <circle cx={cx} cy={cy} r={isSelected ? 8 : 6} fill={statusColor} />

                {/* Callout Indicator Line */}
                <line
                  x1={cx}
                  y1={cy - 16}
                  x2={cx}
                  y2={cy - 35}
                  stroke={statusColor}
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                />

                {/* Label Box */}
                <rect
                  x={cx - 55}
                  y={cy - 55}
                  width="110"
                  height="18"
                  rx="3"
                  fill="#030C16"
                  stroke={statusColor}
                  strokeWidth="1"
                />
                <text
                  x={cx}
                  y={cy - 42}
                  textAnchor="middle"
                  fill="#F4F8FC"
                  fontSize="8.5"
                  fontWeight="600"
                  fontFamily="sans-serif"
                >
                  {eq.equipment_name.split(' ')[0]} {eq.equipment_name.split(' ')[1] || ''}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Machinery Diagnostic Inspector Modal / Card */}
      {activeInspector && (
        <div className="bg-ocean-950 border border-ocean-600/50 rounded-xl p-5 mt-4 transition-all animate-fadeIn">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-3 border-b border-ocean-800">
            <div>
              <div className="flex items-center gap-3">
                <span
                  className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider text-ocean-950 font-mono"
                  style={{ backgroundColor: getStatusColor(activeInspector.operating_condition) }}
                >
                  {activeInspector.operating_condition}
                </span>
                <h4 className="text-lg font-bold text-ocean-50">
                  {activeInspector.equipment_name}
                </h4>
                <span className="text-xs font-mono text-ocean-400">
                  ID: {activeInspector.equipment_id}
                </span>
              </div>
              <p className="text-xs text-ocean-300 mt-1">
                Category: <span className="text-ocean-100 font-semibold">{activeInspector.equipment_type}</span> &bull; Vessel: <span className="text-ocean-100 font-semibold">{activeInspector.vessel_name}</span> &bull; Data Quality: <span className="text-ocean-400 font-mono">{activeInspector.data_quality_status}</span>
              </p>
            </div>
            
            <button
              onClick={() => onSelectEquipment(activeInspector)}
              className="px-4 py-2 rounded-lg bg-ocean-500 hover:bg-ocean-400 text-ocean-950 text-xs font-bold flex items-center gap-1.5 transition-all shadow-glow-cyan"
            >
              <Activity className="w-3.5 h-3.5" />
              View Deep Analytics & Trends
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
            <div className="bg-ocean-900/80 p-3 rounded-lg border border-ocean-800">
              <div className="text-[11px] text-ocean-300 flex items-center gap-1 font-mono">
                <Activity className="w-3.5 h-3.5 text-ocean-500" />
                Vibration RMS
              </div>
              <div className="text-lg font-bold font-mono text-ocean-50 mt-1">
                {activeInspector.vibration_rms.toFixed(2)}{' '}
                <span className="text-xs font-normal text-ocean-400">mm/s</span>
              </div>
              <div className="text-[10px] text-ocean-400 mt-0.5">
                Crest Factor: {activeInspector.crest_factor.toFixed(2)}
              </div>
            </div>

            <div className="bg-ocean-900/80 p-3 rounded-lg border border-ocean-800">
              <div className="text-[11px] text-ocean-300 flex items-center gap-1 font-mono">
                <Thermometer className="w-3.5 h-3.5 text-marine-amber" />
                Temperature
              </div>
              <div className="text-lg font-bold font-mono text-ocean-50 mt-1">
                {activeInspector.temperature_deg_c.toFixed(1)}{' '}
                <span className="text-xs font-normal text-ocean-400">°C</span>
              </div>
              <div className="text-[10px] text-ocean-400 mt-0.5">
                Load: {activeInspector.operating_load_pct}%
              </div>
            </div>

            <div className="bg-ocean-900/80 p-3 rounded-lg border border-ocean-800">
              <div className="text-[11px] text-ocean-300 flex items-center gap-1 font-mono">
                <ShieldAlert className="w-3.5 h-3.5 text-ocean-400" />
                Health Index
              </div>
              <div className="text-lg font-bold font-mono text-ocean-50 mt-1">
                {activeInspector.health_index.toFixed(1)} / 100
              </div>
              <div className="text-[10px] text-ocean-400 mt-0.5">
                State: {activeInspector.operating_condition}
              </div>
            </div>

            <div className="bg-ocean-900/80 p-3 rounded-lg border border-ocean-800">
              <div className="text-[11px] text-ocean-300 flex items-center gap-1 font-mono">
                <Zap className="w-3.5 h-3.5 text-marine-purple" />
                Anomaly Flag
              </div>
              <div className="text-xs font-semibold text-ocean-50 mt-2 truncate">
                {activeInspector.anomaly_status}
              </div>
              <div className="text-[10px] text-ocean-400 mt-0.5 font-mono">
                {activeInspector.data_quality_status}
              </div>
            </div>
          </div>

          {/* Advisory Inspection Recommendations */}
          <div className="bg-ocean-900/50 p-3.5 rounded-lg border border-ocean-800 flex items-start gap-3">
            <Wrench className="w-4 h-4 text-ocean-500 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-ocean-200">Recommended Engineering Inspection: </span>
              <span className="text-ocean-300">
                {activeInspector.operating_condition === 'Warning'
                  ? 'Immediate physical examination recommended: Check bearing lubrication viscosity, verify harmonic vibration spectrum via handheld probe, and measure thermal gradient across housing.'
                  : activeInspector.operating_condition === 'Watch'
                  ? 'Monitor thermal and vibration trends closely over next 24 hours. Check strainer differential pressure and verify lube oil flow rate.'
                  : activeInspector.operating_condition === 'Sensor Fault'
                  ? 'Diagnostic flag triggered: Inspect accelerometer transducer wiring, terminal strip connections, and IEPE amplifier supply.'
                  : 'Machinery operates within verified nominal parameters. Continue standard scheduled maintenance routines.'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
