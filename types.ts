
export type ExplanationLayer = 'leigo' | 'visual' | 'tecnico' | 'tutorial';

export interface LessonContent {
  leigo: string;
  visual: {
    metaphor: string;
    widgetType: 'bezier' | 'tree' | 'docker' | 'git' | 'logic' | 'sql' | 'rag' | 'flow' | 'camera' | 'color' | 'sorting' | 'neuron' | 'chaining' | 'training' | 'timeline';
    widgetTitle: string;
  };
  tecnico: {
    definition: string;
    architecture: string[];
    terms: string[];
    dictionary: Record<string, string>; // Mapeia termo técnico -> tradução leiga
  };
  tutorial: {
    steps: string[];
    commonErrors: string[];
    validation: string;
  };
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
