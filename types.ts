
export type ExplanationLayer = 'leigo' | 'visual' | 'tecnico' | 'tutorial';

export interface CodeSnippetData {
  language: string;
  fileName: string;
  code: string;
  description?: string;
}

export interface LessonContent {
  leigo: string;
  leigoSnippet?: CodeSnippetData;
  visual: {
    metaphor: string;
    widgetType: 'bezier' | 'tree' | 'docker' | 'git' | 'logic' | 'sql' | 'rag' | 'flow' | 'camera' | 'color' | 'sorting' | 'neuron' | 'chaining' | 'training' | 'timeline';
    widgetTitle: string;
  };
  visualSnippet?: CodeSnippetData;
  tecnico: {
    definition: string;
    architecture: string[];
    terms: string[];
    dictionary: Record<string, string>;
  };
  tecnicoSnippet?: CodeSnippetData;
  tutorial: {
    steps: string[];
    commonErrors: string[];
    validation: string;
  };
  tutorialSnippets?: CodeSnippetData[];
}

export interface Lesson {
  id: string;
  title: string;
  content: LessonContent;
  videoUrl?: string;
  audioUrl?: string;
}

export interface Unit {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Module {
  id: string;
  title: string;
  units: Unit[];
}

export interface CourseState {
  currentModuleId: string;
  currentUnitId: string;
  currentLessonId: string;
  currentLayer: ExplanationLayer;
  completedLessons: string[];
}
