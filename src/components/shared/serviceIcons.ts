import {
  Ambulance, BedSingle, Baby, Bone, Droplet, FlaskConical, Heart, HeartPulse,
  Pill, ScanLine, Scissors, Siren, Smile, Stethoscope,
} from "lucide-react";

// Íconos de Service.icon (lib/data/services.ts). Importación explícita a propósito:
// `import * as LucideIcons` en un componente cliente mete toda la librería al bundle.
const SERVICE_ICONS: Record<string, React.ElementType> = {
  Ambulance, BedSingle, Baby, Bone, Droplet, FlaskConical, Heart, HeartPulse,
  Pill, ScanLine, Scissors, Siren, Smile, Stethoscope,
};

export function serviceIcon(name: string): React.ElementType {
  return SERVICE_ICONS[name] ?? Stethoscope;
}
