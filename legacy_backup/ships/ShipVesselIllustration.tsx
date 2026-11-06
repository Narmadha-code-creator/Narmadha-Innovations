import React from 'react';

interface ShipProps {
  type: 'cargo_ship' | 'research_vessel' | 'offshore_vessel';
  className?: string;
  animatePulses?: boolean;
}

export const ShipVesselIllustration: React.FC<ShipProps> = ({ type, className = 'w-full h-48', animatePulses = true }) => {
  if (type === 'cargo_ship') {
    return (
      <div className={`relative overflow-hidden flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 600 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
          <defs>
            <linearGradient id="cargoHull" x1="0" y1="0" x2="600" y2="240" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0B253D" />
              <stop offset="0.6" stopColor="#103D5C" />
              <stop offset="1" stopColor="#071B2E" />
            </linearGradient>
            <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#21C7D9" stopOpacity="0.4" />
              <stop offset="1" stopColor="#071B2E" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Ocean Waves */}
          <path d="M0 200 C 150 190, 300 210, 450 195 C 520 188, 570 202, 600 200 L 600 240 L 0 240 Z" fill="url(#waterGrad)" />
          <path d="M0 208 C 100 202, 220 214, 340 206 C 460 198, 540 212, 600 208" stroke="#21C7D9" strokeWidth="1.5" strokeOpacity="0.6" strokeDasharray="6 4" />

          {/* Vessel Main Hull */}
          <path d="M50 150 L 120 150 L 480 150 Q 560 150, 580 130 L 590 145 C 570 185, 520 195, 470 195 L 80 195 C 60 195, 45 180, 50 150 Z" fill="url(#cargoHull)" stroke="#21C7D9" strokeWidth="1.5" />
          
          {/* Bulbous Bow underwater indicator */}
          <ellipse cx="582" cy="188" rx="8" ry="5" fill="#18547D" stroke="#21C7D9" strokeWidth="1" strokeDasharray="2 2" />

          {/* Waterline Draft Markings */}
          <line x1="70" y1="180" x2="550" y2="180" stroke="#F05252" strokeWidth="2" strokeOpacity="0.8" />
          <line x1="565" y1="165" x2="575" y2="165" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.6" />
          <line x1="568" y1="172" x2="575" y2="172" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.6" />
          <line x1="570" y1="179" x2="575" y2="179" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.6" />

          {/* Cargo Container Bays */}
          <g fill="#18547D" stroke="#21C7D9" strokeWidth="1" opacity="0.9">
            {/* Bay 1 */}
            <rect x="220" y="115" width="60" height="35" rx="1" fill="#14486E" />
            <rect x="225" y="80" width="50" height="35" rx="1" fill="#1E6596" />
            {/* Bay 2 */}
            <rect x="290" y="115" width="60" height="35" rx="1" fill="#103D5C" />
            <rect x="295" y="80" width="50" height="35" rx="1" fill="#18547D" />
            <rect x="300" y="45" width="40" height="35" rx="1" fill="#2171A3" />
            {/* Bay 3 */}
            <rect x="360" y="115" width="60" height="35" rx="1" fill="#1E6596" />
            <rect x="365" y="80" width="50" height="35" rx="1" fill="#14486E" />
            {/* Bay 4 (Forward) */}
            <rect x="430" y="125" width="55" height="25" rx="1" fill="#103D5C" />
          </g>

          {/* Superstructure / Aft Accommodation Bridge */}
          <rect x="90" y="80" width="85" height="70" fill="#0B253D" stroke="#21C7D9" strokeWidth="1.5" />
          <rect x="100" y="55" width="65" height="25" fill="#103D5C" stroke="#21C7D9" strokeWidth="1" />
          
          {/* Bridge Windows */}
          <g fill="#21C7D9" opacity="0.85">
            <rect x="105" y="62" width="8" height="6" rx="1" />
            <rect x="117" y="62" width="8" height="6" rx="1" />
            <rect x="129" y="62" width="8" height="6" rx="1" />
            <rect x="141" y="62" width="8" height="6" rx="1" />
            <rect x="153" y="62" width="8" height="6" rx="1" />
          </g>

          {/* Funnel & Exhaust */}
          <polygon points="115,55 125,30 138,30 142,55" fill="#071B2E" stroke="#31C48D" strokeWidth="1.5" />
          <line x1="120" y1="38" x2="135" y2="38" stroke="#31C48D" strokeWidth="2" />

          {/* Radar Mast and Scanner */}
          <line x1="132" y1="30" x2="132" y2="10" stroke="#52DBEB" strokeWidth="2" />
          <line x1="124" y1="12" x2="140" y2="12" stroke="#52DBEB" strokeWidth="2.5" />
          <circle cx="132" cy="12" r="2.5" fill="#F4B942" />

          {/* Animated Sensor Nodes */}
          {animatePulses && (
            <g>
              {/* Engine Room telemetry pulse */}
              <circle cx="130" cy="170" r="5" fill="#31C48D" className="animate-ping opacity-75" />
              <circle cx="130" cy="170" r="3" fill="#31C48D" />
              {/* Shaft Bearing pulse */}
              <circle cx="85" cy="180" r="4" fill="#21C7D9" />
              {/* Cooling Pump pulse */}
              <circle cx="165" cy="175" r="4" fill="#F4B942" />
            </g>
          )}

          {/* Rudder & Propeller silhouette */}
          <path d="M52 185 L 42 195 L 48 202 L 56 190 Z" fill="#21C7D9" opacity="0.5" />
          <circle cx="48" cy="192" r="3" fill="#52DBEB" />
        </svg>
      </div>
    );
  }

  if (type === 'research_vessel') {
    return (
      <div className={`relative overflow-hidden flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 600 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
          <defs>
            <linearGradient id="researchHull" x1="0" y1="0" x2="600" y2="240" gradientUnits="userSpaceOnUse">
              <stop stopColor="#103D5C" />
              <stop offset="0.5" stopColor="#18547D" />
              <stop offset="1" stopColor="#0B253D" />
            </linearGradient>
          </defs>

          {/* Ocean Waves */}
          <path d="M0 200 C 130 195, 270 208, 420 198 C 510 190, 560 204, 600 200 L 600 240 L 0 240 Z" fill="#071B2E" fillOpacity="0.7" />
          <path d="M0 205 C 150 198, 300 212, 450 200 C 530 194, 570 206, 600 205" stroke="#31C48D" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="4 4" />

          {/* Icebreaker/Research Hull */}
          <path d="M70 145 L 150 145 L 450 145 Q 530 145, 560 120 L 570 135 C 550 185, 480 195, 420 195 L 90 195 C 75 195, 65 175, 70 145 Z" fill="url(#researchHull)" stroke="#31C48D" strokeWidth="1.5" />
          
          {/* Sonar Gondola & Drop Keel Indicator */}
          <rect x="340" y="196" width="30" height="8" rx="3" fill="#21C7D9" stroke="#31C48D" strokeWidth="1" />
          <line x1="355" y1="204" x2="355" y2="225" stroke="#21C7D9" strokeWidth="1.5" strokeDasharray="2 2" />
          <circle cx="355" cy="225" r="4" fill="#21C7D9" className="animate-ping" />

          {/* Aft Scientific A-Frame Stern Crane */}
          <polygon points="85,145 95,145 108,95 98,95" fill="#0B253D" stroke="#21C7D9" strokeWidth="1.5" />
          <polygon points="100,145 110,145 120,105 110,105" fill="#103D5C" stroke="#21C7D9" strokeWidth="1" />
          <line x1="103" y1="95" x2="103" y2="125" stroke="#F4B942" strokeWidth="1.5" />
          <rect x="100" y="125" width="6" height="5" rx="1" fill="#F4B942" />

          {/* Midship Oceanographic Labs */}
          <rect x="160" y="115" width="130" height="30" fill="#071B2E" stroke="#31C48D" strokeWidth="1.2" />
          <rect x="170" y="90" width="110" height="25" fill="#103D5C" stroke="#31C48D" strokeWidth="1" />

          {/* Forward Superstructure & Elevated Navigation Bridge */}
          <polygon points="300,145 300,75 420,75 440,145" fill="#0B253D" stroke="#21C7D9" strokeWidth="1.5" />
          <rect x="330" y="50" width="80" height="25" fill="#14486E" stroke="#21C7D9" strokeWidth="1.2" />

          {/* Bridge Windows */}
          <g fill="#21C7D9">
            <rect x="340" y="56" width="10" height="8" rx="1" />
            <rect x="355" y="56" width="10" height="8" rx="1" />
            <rect x="370" y="56" width="10" height="8" rx="1" />
            <rect x="385" y="56" width="10" height="8" rx="1" />
            <rect x="400" y="56" width="10" height="8" rx="1" />
          </g>

          {/* Satellite Radomes */}
          <circle cx="360" cy="38" r="9" fill="#F4F8FC" stroke="#21C7D9" strokeWidth="1.5" />
          <circle cx="388" cy="36" r="7" fill="#F4F8FC" stroke="#21C7D9" strokeWidth="1.5" />

          {/* Dynamic Positioning Azipod thruster indicators */}
          <circle cx="130" cy="195" r="5" fill="#31C48D" stroke="#071B2E" strokeWidth="1" />
          <circle cx="440" cy="195" r="5" fill="#31C48D" stroke="#071B2E" strokeWidth="1" />

          {/* Sensor Signals */}
          {animatePulses && (
            <g>
              <circle cx="230" cy="165" r="5" fill="#31C48D" className="animate-pulse" />
              <circle cx="340" cy="165" r="5" fill="#A855F7" className="animate-ping" />
            </g>
          )}
        </svg>
      </div>
    );
  }

  // Offshore Support Vessel (AHTS)
  return (
    <div className={`relative overflow-hidden flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 600 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
        <defs>
          <linearGradient id="offshoreHull" x1="0" y1="0" x2="600" y2="240" gradientUnits="userSpaceOnUse">
            <stop stopColor="#071B2E" />
            <stop offset="0.7" stopColor="#103D5C" />
            <stop offset="1" stopColor="#18547D" />
          </linearGradient>
        </defs>

        {/* Ocean Waves */}
        <path d="M0 195 C 140 185, 290 205, 440 192 C 520 186, 570 200, 600 196 L 600 240 L 0 240 Z" fill="#0B253D" fillOpacity="0.8" />
        <path d="M0 204 C 120 198, 250 210, 380 202 C 490 196, 560 208, 600 204" stroke="#F4B942" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="5 3" />

        {/* Low Freeboard Working Deck Aft */}
        <path d="M60 160 L 260 160 L 260 140 L 460 140 Q 530 140, 560 115 L 570 130 C 555 180, 500 192, 440 192 L 80 192 C 65 192, 55 180, 60 160 Z" fill="url(#offshoreHull)" stroke="#21C7D9" strokeWidth="1.5" />
        
        {/* Stern Roller for Anchor Handling */}
        <ellipse cx="68" cy="164" rx="7" ry="12" fill="#18547D" stroke="#F4B942" strokeWidth="1.5" />

        {/* Cargo Rails / Crash Barriers on Cargo Deck */}
        <line x1="80" y1="150" x2="250" y2="150" stroke="#F4B942" strokeWidth="2" strokeDasharray="8 4" />
        <line x1="80" y1="155" x2="250" y2="155" stroke="#F4B942" strokeWidth="1" />

        {/* Anchor Handling Towing Winch House */}
        <rect x="250" y="125" width="45" height="35" rx="1" fill="#071B2E" stroke="#21C7D9" strokeWidth="1.5" />
        <circle cx="272" cy="142" r="8" fill="#103D5C" stroke="#F4B942" strokeWidth="1.5" />

        {/* Forward Superstructure Tower (High Forecastle) */}
        <polygon points="300,140 320,65 470,65 490,140" fill="#0B253D" stroke="#21C7D9" strokeWidth="1.5" />
        <rect x="350" y="40" width="95" height="25" fill="#14486E" stroke="#21C7D9" strokeWidth="1.5" />

        {/* Panoramic 360 Bridge Windows */}
        <g fill="#21C7D9">
          <rect x="358" y="46" width="10" height="9" rx="1" />
          <rect x="372" y="46" width="10" height="9" rx="1" />
          <rect x="386" y="46" width="10" height="9" rx="1" />
          <rect x="400" y="46" width="10" height="9" rx="1" />
          <rect x="414" y="46" width="10" height="9" rx="1" />
          <rect x="428" y="46" width="10" height="9" rx="1" />
        </g>

        {/* Exhaust stacks on twin quarters */}
        <polygon points="335,65 342,30 350,30 354,65" fill="#071B2E" stroke="#F05252" strokeWidth="1.5" />

        {/* Warning Indicator on Shaft Bearing */}
        {animatePulses && (
          <g>
            <circle cx="140" cy="178" r="6" fill="#F05252" className="animate-ping opacity-80" />
            <circle cx="140" cy="178" r="4" fill="#F05252" />
          </g>
        )}
      </svg>
    </div>
  );
};
