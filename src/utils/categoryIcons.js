import {
  Building2,
  GraduationCap,
  Landmark,
  Stethoscope,
  HandCoins,
  TreePine,
  ShieldCheck,
  Atom,
  Users2,
  Hammer,
  Bus,
  Lightbulb,
} from "lucide-react";

// Map categories to icons
export const categoryIcons = {
  "Education": GraduationCap,
  "Healthcare": Stethoscope,
  "Economy": HandCoins,
  "Infrastructure": Building2,
  "Environment": TreePine,
  "Governance": ShieldCheck,
  "Science & Tech": Atom,
  "Social Welfare": Users2,
  "Law & Order": Landmark,
  "Transport": Bus,
  "Energy": Lightbulb,
  "Employment": Hammer,
};

// fallback icon
export const defaultIcon = Landmark;
