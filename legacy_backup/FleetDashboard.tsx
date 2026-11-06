import React, { useState } from 'react';
import { FleetSummary, EquipmentUnit, Vessel } from '../types';
import { ShipVesselIllustration } from './ships/ShipVesselIllustration';
import { ShipBlueprintSchematic } from './ships/ShipBlueprintSchematic';
import {
  Ship,
  Activity,
  CheckCircle,
  AlertTriangle,
  Radio,
  Clock,
  ChevronRight,
  ShieldAlert,
  Sliders,
  Database
} from 'lucide-react';

interface Props {
  fleetData: FleetSummary;
  equipmentList: EquipmentUnit[];
  onSelectEquipment: (eq: EquipmentUnit) => void;
  onNavigateAnalytics: () => void;
}

export const FleetDashboard: React.FC<Props> = ({
  fleetData,
  equipmentList,
  onSelectEquipment,
  onNavigateAnalytics
}) => {
  const [selectedVesselId, setSelectedVesselId] = useState<string>('V-01');

  const selectedVessel = fleetData.vessels.find((v) => v.vessel_id === selectedVesselId) || fleetData.vessels[0];
  const vesselEquipment = equipmentList.filter((e) => e.vessel_id === selectedVesselId);

  return (
    <section id="fleet" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-ocean-800">
        <div>
          <div className="flex items-center gap-2 text-ocean-500 font-mono text-xs uppercase tracking-widest mb-1">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>Multi-Vessel Tactical Operations</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ocean-50 tracking-tight">
            Maritime Fleet Intelligence Center
          </h2>
          <p className="text-sm text-ocean-300 mt-1 max-w-2xl">
            Real-time fleet condition overview across 3 illustrative demonstration vessels. Monitored parameters are calculated dynamically from active telemetry buffers.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="px-3 py-1.5 rounded-lg bg-ocean-900 border border-ocean-700 text-xs font-mono text-ocean-300 flex items-center gap-2">
            <Database className="w-3.5 h-3.5 text-ocean-500" />
            <span>Mode: <strong className="text-ocean-100">{fleetData.data_source_mode}</strong></span>
          </div>
        </div>
      </div>

      {/* Fleet Overview Summary Metric Cards (Calculated dynamically) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
        <div className="bg-ocean-900/90 border border-ocean-700/70 rounded-xl p-3.5 shadow-marine-card">
          <div className="text-[11px] font-mono text-ocean-400">Total Demonstration Vessels</div>
          <div className="text-2xl font-bold font-mono text-ocean-50 mt-1">{fleetData.total_vessels}</div>
          <div className="text-[10px] text-ocean-400 mt-0.5">Fictional Demo Fleet</div>
        </div>

        <div className="bg-ocean-900/90 border border-ocean-700/70 rounded-xl p-3.5 shadow-marine-card">
          <div className="text-[11px] font-mono text-ocean-400">Monitored Equipment Units</div>
          <div className="text-2xl font-bold font-mono text-ocean-500 mt-1">{fleetData.monitored_equipment_units}</div>
          <div className="text-[10px] text-ocean-400 mt-0.5">6 Units per Vessel</div>
        </div>

        <div className="bg-ocean-900/90 border border-marine-green/30 rounded-xl p-3.5 shadow-marine-card">
          <div className="text-[11px] font-mono text-marine-green">Healthy Equipment</div>
          <div className="text-2xl font-bold font-mono text-marine-green mt-1">{fleetData.healthy_equipment}</div>
          <div className="text-[10px] text-ocean-400 mt-0.5">
            {((fleetData.healthy_equipment / fleetData.monitored_equipment_units) * 100).toFixed(1)}% of total
          </div>
        </div>

        <div className="bg-ocean-900/90 border border-marine-amber/30 rounded-xl p-3.5 shadow-marine-card">
          <div className="text-[11px] font-mono text-marine-amber">Under Observation (Watch)</div>
          <div className="text-2xl font-bold font-mono text-marine-amber mt-1">{fleetData.equipment_under_observation}</div>
          <div className="text-[10px] text-ocean-400 mt-0.5">Mild Drift / Review</div>
        </div>

        <div className="bg-ocean-900/90 border border-marine-red/30 rounded-xl p-3.5 shadow-marine-card">
          <div className="text-[11px] font-mono text-marine-red">Active Demo Alerts</div>
          <div className="text-2xl font-bold font-mono text-marine-red mt-1">{fleetData.active_alerts}</div>
          <div className="text-[10px] text-ocean-400 mt-0.5">1 Warning &bull; 1 Watch &bull; 1 Fault</div>
        </div>

        <div className="bg-ocean-900/90 border border-marine-purple/30 rounded-xl p-3.5 shadow-marine-card">
          <div className="text-[11px] font-mono text-marine-purple">Data Quality Issues</div>
          <div className="text-2xl font-bold font-mono text-marine-purple mt-1">{fleetData.data_quality_issues}</div>
          <div className="text-[10px] text-ocean-400 mt-0.5">Flatline Piezo Flagged</div>
        </div>
      </div>

      {/* 3 Graphical Vessel Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {fleetData.vessels.map((v) => {
          const isSelected = v.vessel_id === selectedVesselId;
          const statusBg =
            v.equipment_requiring_attention > 0 && v.vessel_id === 'V-03'
              ? 'border-marine-red/50 bg-ocean-900/90'
              : v.equipment_requiring_attention > 0
              ? 'border-marine-amber/50 bg-ocean-900/90'
              : 'border-ocean-700 bg-ocean-900/70';

          return (
            <div
              key={v.vessel_id}
              onClick={() => setSelectedVesselId(v.vessel_id)}
              className={`rounded-2xl border ${statusBg} p-5 cursor-pointer transition-all duration-300 relative group overflow-hidden ${
                isSelected ? 'ring-2 ring-ocean-500 shadow-glow-cyan' : 'hover:border-ocean-500/50'
              }`}
            >
              {/* Graphical Ship Illustration */}
              <div className="mb-4 bg-ocean-950/70 rounded-xl border border-ocean-800/80 p-2 overflow-hidden">
                <ShipVesselIllustration type={v.image_key} className="w-full h-36" />
              </div>

              {/* Vessel Identification */}
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-[10px] font-mono text-ocean-400 uppercase tracking-widest">
                    ID: {v.vessel_id} &bull; {v.type}
                  </span>
                  <h3 className="text-xl font-bold text-ocean-50 group-hover:text-ocean-300 transition-colors">
                    {v.name}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold font-mono text-ocean-50">
                    {v.health_score.toFixed(1)}%
                  </div>
                  <div className="text-[10px] text-ocean-400">Health Index</div>
                </div>
              </div>

              {/* Status and Attention Details */}
              <div className="space-y-2 my-4 text-xs">
                <div className="flex justify-between text-ocean-200">
                  <span className="text-ocean-400">Operating Status:</span>
                  <span className="font-semibold text-ocean-100">{v.status}</span>
                </div>
                <div className="flex justify-between text-ocean-200">
                  <span className="text-ocean-400">Monitored Equipment:</span>
                  <span className="font-mono text-ocean-100">{v.monitored_equipment_count} units</span>
                </div>
                <div className="flex justify-between text-ocean-200">
                  <span className="text-ocean-400">Requiring Attention:</span>
                  <span
                    className={`font-semibold ${
                      v.equipment_requiring_attention > 0 ? 'text-marine-amber' : 'text-marine-green'
                    }`}
                  >
                    {v.equipment_requiring_attention > 0
                      ? `${v.equipment_requiring_attention} Unit Alerted`
                      : '0 (All Nominal)'}
                  </span>
                </div>
                <div className="flex justify-between text-ocean-200">
                  <span className="text-ocean-400">Connectivity:</span>
                  <span className="font-mono text-[11px] text-ocean-300">{v.connectivity_status}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedVesselId(v.vessel_id);
                }}
                className={`w-full py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  isSelected
                    ? 'bg-ocean-500 text-ocean-950 shadow-glow-cyan'
                    : 'bg-ocean-800 hover:bg-ocean-700 text-ocean-100'
                }`}
              >
                <span>{isSelected ? 'Viewing Vessel Schematic' : 'View Vessel Schematic'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Interactive Vessel Machinery Schematic for Selected Ship */}
      <div className="mb-14">
        <ShipBlueprintSchematic
          vesselName={selectedVessel.name}
          equipmentList={vesselEquipment}
          onSelectEquipment={onSelectEquipment}
        />
      </div>
    </section>
  );
};
