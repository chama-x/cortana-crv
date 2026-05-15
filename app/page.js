'use client';

import { useEffect, useState } from 'react';
import { useSessionMachine } from '../hooks/useSessionMachine';
import TransitionWrapper from '../components/TransitionWrapper';
import Dashboard from '../components/Dashboard';
import Ritual from '../components/Ritual';
import Blind from '../components/Blind';
import Judging from '../components/Judging';
import Feedback from '../components/Feedback';

export default function Home() {
  const [state, dispatch, actions] = useSessionMachine();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent hydration mismatch

  const handleStart = () => {
    actions.startSession();
  };

  const handleRitualComplete = () => {
    dispatch({ type: 'RITUAL_COMPLETE' });
  };

  const handleBlindComplete = () => {
    dispatch({ type: 'BLIND_COMPLETE' });
  };

  const handleSelectImage = (index) => {
    dispatch({ type: 'SELECT_IMAGE', payload: index });
  };

  const handleReturnHome = () => {
    dispatch({ type: 'RETURN_HOME' });
  };

  return (
    <main className="app-shell">
      <TransitionWrapper phase={state.phase} current="DASHBOARD">
        <Dashboard onStart={handleStart} />
      </TransitionWrapper>

      <TransitionWrapper phase={state.phase} current="RITUAL">
        <Ritual 
          onComplete={handleRitualComplete} 
          fetchImages={() => actions.fetchImages(state.categories)}
          imagesReady={state.imagesReady}
          error={state.error}
        />
      </TransitionWrapper>

      <TransitionWrapper phase={state.phase} current="BLIND">
        <Blind 
          refCode={state.targetRefCode} 
          onProceed={handleBlindComplete} 
        />
      </TransitionWrapper>

      <TransitionWrapper phase={state.phase} current="JUDGING">
        <Judging 
          images={state.images} 
          onSelect={handleSelectImage} 
        />
      </TransitionWrapper>

      <TransitionWrapper phase={state.phase} current="FEEDBACK">
        <Feedback 
          images={state.images}
          targetIndex={state.targetIndex}
          selectedIndex={state.selectedIndex}
          hit={state.hit}
          onReturn={handleReturnHome}
        />
      </TransitionWrapper>
    </main>
  );
}
