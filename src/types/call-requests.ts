
import type { LucideIcon } from 'lucide-react';
import { Droplet, PersonStanding, Bed, Activity, HelpCircle } from 'lucide-react'; // Using more relevant icons

export type CallRequestType = 'Water' | 'Restroom' | 'Reposition' | 'Pain' | 'General';

export interface CallRequestOption {
  label: string;
  type: CallRequestType;
  icon: LucideIcon;
}

export const callRequestOptions: CallRequestOption[] = [
  { label: 'Water', type: 'Water', icon: Droplet },
  { label: 'Restroom', type: 'Restroom', icon: PersonStanding },
  { label: 'Reposition', type: 'Reposition', icon: Bed },
  { label: 'Pain', type: 'Pain', icon: Activity }, // Activity can represent discomfort/pain
  { label: 'General Help', type: 'General', icon: HelpCircle },
];
