
import React, { useState, useEffect } from 'react';
import { COURSE_DATA } from './constants';
import { Module, Unit, Lesson, ExplanationLayer, CourseState } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LessonContentArea from './components/LessonContentArea';
import AIChatPanel from './components/AIChatPanel';

const App: React.FC = () => {
  const [state, setState] = useState<CourseState>({
    currentModuleId: COURSE_DATA[0].id,
    currentUnitId: COURSE_DATA[0].units[0].id,
    currentLessonId: COURSE_DATA[0].units[0].lessons[0].id,
    currentLayer: 'leigo',
    completedLessons: [],
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile default closed
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  // Auto-detect desktop to open sidebar
  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setIsSidebarOpen(true);
    }
  }, []);

  // Auto-save progress
  useEffect(() => {
    const saved = localStorage.getItem('nexus_progress');
    if (saved) {
      setState(prev => ({ ...prev, ...JSON.parse(saved) }));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('nexus_progress', JSON.stringify(state));
  }, [state]);

  const currentModule = COURSE_DATA.find(m => m.id === state.currentModuleId)!;
  const currentUnit = currentModule.units.find(u => u.id === state.currentUnitId)!;
  const currentLesson = currentUnit.lessons.find(l => l.id === state.currentLessonId)!;

  const navigateToLesson = (mId: string, uId: string, lId: string) => {
    setState(prev => ({
      ...prev,
      currentModuleId: mId,
      currentUnitId: uId,
      currentLessonId: lId,
    }));
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const toggleLayer = (layer: ExplanationLayer) => {
    setState(prev => ({ ...prev, currentLayer: layer }));
  };

  const markCompleted = () => {
    if (!state.completedLessons.includes(state.currentLessonId)) {
      setState(prev => ({
        ...prev,
        completedLessons: [...prev.completedLessons, prev.currentLessonId]
      }));
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-black text-white">
      {/* Sidebar Navigation */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        modules={COURSE_DATA}
        activeState={state}
        onNavigate={navigateToLesson}
      />

      {/* Backdrop for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[45] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[#09090b]">
        <Header 
          lessonTitle={currentLesson.title}
          unitTitle={currentUnit.title}
          onToggleChat={() => setIsAIChatOpen(!isAIChatOpen)}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          progress={Math.round((state.completedLessons.length / 50) * 100)}
        />

        <div className="flex-1 overflow-y-auto pb-20 custom-scrollbar">
          <LessonContentArea 
            lesson={currentLesson}
            activeLayer={state.currentLayer}
            onLayerChange={toggleLayer}
            onComplete={markCompleted}
            isCompleted={state.completedLessons.includes(state.currentLessonId)}
          />
        </div>
      </main>

      {/* AI Assistant Panel */}
      <AIChatPanel 
        isOpen={isAIChatOpen} 
        onClose={() => setIsAIChatOpen(false)}
        context={currentLesson}
      />
    </div>
  );
};

export default App;
