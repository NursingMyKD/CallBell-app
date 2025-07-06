
import type { LucideIcon } from 'lucide-react';
import { Droplet, PersonStanding, Bed, HeartCrack, HelpCircle } from 'lucide-react'; // Changed Activity to HeartCrack

export type CallRequestType = 'Water' | 'Restroom' | 'Reposition' | 'Pain' | 'General';

// This interface defines the fundamental structure (type and icon) of a call request option.
// The displayed label will be sourced from translations.ts based on the selectedLanguage and option.type.
export interface CallRequestOption {
  type: CallRequestType;
  icon: LucideIcon;
}

// This array defines the available call request types and their associated icons.
// The order here determines the order in the UI.
export const callRequestOptionsStructure: CallRequestOption[] = [
  { type: 'Water', icon: Droplet },
  { type: 'Restroom', icon: PersonStanding },
  { type: 'Reposition', icon: Bed },
  { type: 'Pain', icon: HeartCrack }, // Changed icon
  { type: 'General', icon: HelpCircle },
];
