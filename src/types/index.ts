export interface ResumeAnalysis {
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  keywordAnalysis: {
    missing: string[];
    present: string[];
    relevanceScore: number;
  };
  sections: {
    name: string;
    score: number;
    feedback: string;
  }[];
  summary: string;
}

export interface AnalysisState {
  isAnalyzing: boolean;
  analysis: ResumeAnalysis | null;
  error: string | null;
}
