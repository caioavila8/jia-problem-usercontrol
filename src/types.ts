export interface Skill {
  id: string;
  name: string;
  description: string;
  iconId: string;
  themeId: string;
  isInstalled: boolean;
  isActive: boolean;
  category?: string;
  usedCount?: number;
  specialization?: string;
  depthLevel?: string;
  techniqueLevel?: string;
  objetividade?: string;
  formalidade?: string;
  skillFunction?: string;
  instructions?: string;
  initialPhrases?: string[];
  files?: { name: string; size: string; purpose?: string }[];
  selectedTribunais?: string[];
  selectedAreas?: string[];
}

export interface Gem {
  id: string;
  name: string;
  description: string;
  instructions: string;
  initialPhrases: string[];
  iconId: string;
  themeId: string;
  coverImage?: string;
  objetividade?: string;
  formalidade?: string;
  skillFunction?: string;
  files?: { name: string; size: string; purpose?: string }[];
  selectedTribunais?: string[];
  selectedAreas?: string[];
}
