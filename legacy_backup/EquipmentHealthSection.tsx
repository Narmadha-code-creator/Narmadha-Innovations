import React, { useState } from 'react';
import { EquipmentUnit, OperatingCondition } from '../types';
import {
  Activity,
  Thermometer,
  Zap,
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  HelpCircle,
  Wrench,
  Search,
  Filter,
  BarChart2,
  CheckCircle2
} from 'lucide-react';

interface Props {
  equipmentList: EquipmentUnit[];
  onSelectEquipment: (eq: EquipmentUnit) => void;
}

export const EquipmentHealthSection: React.FC<Props> = ({ equipmentList, onSelectEquipment }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCondition, setSelectedCondition] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getStatusBadge = (condition: OperatingCondition) => {
    switch (condition) {
      case 'Healthy':
        return {
          bg: 'bg-marine-green/15 text-marine-green border-marine-green/30',
          icon: CheckCircle2,
          desc: 'No abnormal condition detected by demonstration logic.'
        };
      case 'Watch':
        return {
          bg: 'bg-marine-amber/15 text-marine-amber border-marine-amber/30',
          icon: AlertTriangle,
          desc: 'Thermal/residual drift requires engineering review.'
        };
      case 'Warning':
        return {
          bg: 'bg-marine-red/15 text-marine-red border-marine-red/40',
          icon: AlertOctagon,
          desc: 'Significant harmonic acceleration deviation observed.'
        };
      case 'Sensor Fault':
        return {
          bg: 'bg-marine-purple/15 text-marine-purple border-marine-purple/30',
          icon: Wrench,
          desc: 'Transducer failed data-quality check (signal flatline).'
        };
      case 'Insufficient Data':
        return {
          bg: 'bg-marine-slate/15 text-marine-slate border-marine-slate/30',
          icon: HelpCircle,
          desc: 'Telemetry sample size below statistical assessment threshold.'
        };
    }
  };

  const filteredEquipment = equipmentList.filter((eq) => {
    const matchesCategory = selectedCategory === 'All' || eq.vessel_name.includes(selectedCategory);
    const matchesCondition = selectedCondition === 'All' || eq.operating_condition === selectedCondition;
    const matchesSearch =
      eq.equipment_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eq.equipment_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eq.vessel_name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesCondition && matchesSearch;
  });

  return (
    <section id="equipment" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-ocean-800">
        <div>
          <div className="flex items-center gap-2 text-ocean-500 font-mono text-xs uppercase tracking-widest mb-1">
            <Activity className="w-4 h-4" />
            <span>Marine Machinery Health Monitoring</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ocean-50 tracking-tight">
            Critical Equipment Diagnostic Telemetry
          </h2>
          <p className="text-sm text-ocean-300 mt-1 max-w-2xl">
            Live health scores, vibration velocity (RMS), crest factors, thermal loads, and data-quality states for 6 primary maritime machinery types.
          </p>
        </div>

        {/* Status Definitions Legend */}
        <div className="flex flex-wrap gap-2 text-[10px] font-mono">
          <span className="px-2 py-0.5 rounded bg-marine-green/20 text-marine-green border border-marine-green/30">
            HEALTHY
          </span>
          <span className="px-2 py-0.5 rounded bg-marine-amber/20 text-marine-amber border border-marine-amber/30">
            WATCH
          </span>
          <span className="px-2 py-0.5 rounded bg-marine-red/20 text-marine-red border border-marine-red/30">
            WARNING
          </span>
          <span className="px-2 py-0.5 rounded bg-marine-purple/20 text-marine-purple border border-marine-purple/30">
            SENSOR FAULT
          </span>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-ocean-900/60 p-3 rounded-xl border border-ocean-800 mb-8">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-ocean-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search equipment ID, name, or vessel..."
            className="w-full bg-ocean-950 border border-ocean-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-ocean-50 placeholder-ocean-500 focus:outline-none focus:border-ocean-500 font-mono"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {/* Vessel Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-ocean-950 border border-ocean-700 rounded-lg px-2.5 py-1.5 text-xs text-ocean-100 font-mono focus:outline-none focus:border-ocean-500"
          >
            <option value="All">All Vessels (18 Units)</option>
            <option value="Ocean Sentinel">Ocean Sentinel (Cargo)</option>
            <option value="Blue Horizon">Blue Horizon (Research)</option>
            <option value="Marine Explorer">Marine Explorer (Offshore)</option>
          </select>

          {/* Condition Filter */}
          <select
            value={selectedCondition}
            onChange={(e) => setSelectedCondition(e.target.value)}
            className="bg-ocean-950 border border-ocean-700 rounded-lg px-2.5 py-1.5 text-xs text-ocean-100 font-mono focus:outline-none focus:border-ocean-500"
          >
            <option value="All">All Conditions</option>
            <option value="Healthy">Healthy Only</option>
            <option value="Watch">Watch Only</option>
            <option value="Warning">Warning Only</option>
            <option value="Sensor Fault">Sensor Fault Only</option>
          </select>
        </div>
      </div>

      {/* Equipment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredEquipment.map((eq) => {
          const badge = getStatusBadge(eq.operating_condition);
          const StatusIcon = badge.icon;

          return (
            <div
              key={eq.equipment_id}
              className="bg-ocean-900/80 border border-ocean-700/70 hover:border-ocean-500/50 rounded-2xl p-5 shadow-marine-card transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Top Identification Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="text-[10px] font-mono text-ocean-400">
                      {eq.vessel_name} &bull; {eq.equipment_type}
                    </div>
                    <h3 className="text-base font-bold text-ocean-50 group-hover:text-ocean-300 transition-colors">
                      {eq.equipment_name}
                    </h3>
                    <div className="text-[11px] font-mono text-ocean-500 mt-0.5">
                      {eq.equipment_id}
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-mono border ${badge.bg}`}
                  >
                    <StatusIcon className="w-3 h-3" />
                    {eq.operating_condition}
                  </span>
                </div>

                {/* Health Score Meter Bar */}
                <div className="my-3">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-ocean-300 font-mono text-[11px]">Health Index</span>
                    <span className="font-bold font-mono text-ocean-50">
                      {eq.health_index.toFixed(1)} / 100
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-ocean-950 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        eq.health_index >= 85
                          ? 'bg-marine-green'
                          : eq.health_index >= 70
                          ? 'bg-marine-amber'
                          : 'bg-marine-red'
                      }`}
                      style={{ width: `${Math.min(100, Math.max(5, eq.health_index))}%` }}
                    />
                  </div>
                </div>

                {/* Telemetry Measurements Matrix */}
                <div className="grid grid-cols-2 gap-2 my-4 text-xs">
                  <div className="bg-ocean-950/70 p-2.5 rounded-lg border border-ocean-800">
                    <div className="text-[10px] font-mono text-ocean-400 flex items-center gap-1">
                      <Activity className="w-3 h-3 text-ocean-500" />
                      Vibration Velocity
                    </div>
                    <div className="text-sm font-bold font-mono text-ocean-100 mt-0.5">
                      {eq.vibration_rms.toFixed(2)}{' '}
                      <span className="text-[10px] text-ocean-400 font-normal">mm/s</span>
                    </div>
                    <div className="text-[9px] text-ocean-500 font-mono">
                      Crest Factor: {eq.crest_factor.toFixed(2)}
                    </div>
                  </div>

                  <div className="bg-ocean-950/70 p-2.5 rounded-lg border border-ocean-800">
                    <div className="text-[10px] font-mono text-ocean-400 flex items-center gap-1">
                      <Thermometer className="w-3 h-3 text-marine-amber" />
                      Temperature
                    </div>
                    <div className="text-sm font-bold font-mono text-ocean-100 mt-0.5">
                      {eq.temperature_deg_c.toFixed(1)}{' '}
                      <span className="text-[10px] text-ocean-400 font-normal">°C</span>
                    </div>
                    <div className="text-[9px] text-ocean-500 font-mono">
                      Load: {eq.operating_load_pct}%
                    </div>
                  </div>
                </div>

                {/* Anomaly & Data Quality Status */}
                <div className="space-y-1.5 text-[11px] font-mono bg-ocean-950/40 p-2.5 rounded-lg border border-ocean-800/80 mb-4">
                  <div className="flex justify-between">
                    <span className="text-ocean-400">Anomaly State:</span>
                    <span
                      className={
                        eq.anomaly_status.includes('Anomaly') || eq.anomaly_status.includes('Flag')
                          ? 'text-marine-amber font-semibold'
                          : 'text-marine-green'
                      }
                    >
                      {eq.anomaly_status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ocean-400">Data Quality:</span>
                    <span
                      className={
                        eq.data_quality_status.includes('Fault') ? 'text-marine-purple font-bold' : 'text-ocean-200'
                      }
                    >
                      {eq.data_quality_status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ocean-400">Telemetry Sync:</span>
                    <span className="text-ocean-400">{eq.last_update}</span>
                  </div>
                </div>
              </div>

              {/* View Analytics Button */}
              <button
                onClick={() => onSelectEquipment(eq)}
                className="w-full py-2.5 rounded-lg bg-ocean-800 hover:bg-ocean-700 text-ocean-100 text-xs font-bold flex items-center justify-center gap-1.5 transition-all border border-ocean-600/40 group-hover:border-ocean-500"
              >
                <BarChart2 className="w-3.5 h-3.5 text-ocean-500" />
                <span>View Real-Data Analytics</span>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
