import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';

import Balloons from './components/Balloons';
import NameValidation from './components/NameValidation';
import PartyInfo from './components/PartyInfo';
import RsvpForm from './components/RsvpForm';
import { AppProvider } from './context/AppContext';
import { useApp } from './context/AppContext';

function AppContent(): JSX.Element {
  const { isValidated, isLoading } = useApp();
  const [showNameValidation, setShowNameValidation] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setShowNameValidation(!isValidated);
    }
  }, [isLoading, isValidated]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 rounded-full animate-fast-spin bg-[conic-gradient(from_0deg,transparent_0_30deg,#EC18BE_60deg_140deg,#60a5fa_140deg_220deg,#fbbf24_220deg_300deg,transparent_330deg)] p-[4px]">
          <div className="rounded-full h-full w-full bg-white"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-4 px-4 sm:px-6 lg:px-8 text-gray-900 font-sans select-none">
      <div className="h-[calc(100vh-2rem)] max-w-2xl mx-auto text-center bg-amber-100 rounded py-6 px-4 overflow-y-auto">
        <Balloons />
        <h1 className="text-xl mb-2 inline-block relative after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2 after:h-[8px] after:bg-[url('data:image/svg+xml;charset=utf8,%3Csvg%20viewBox%3D%220%200%2020%206%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M0%203c1.6-2%203.4-2%205%200s3.4%202%205%200s3.4-2%205%200s3.4%202%205%200%22%20fill%3D%22none%22%20stroke%3D%22%23718096%22%20stroke-width%3D%220.9%22%2F%3E%3C%2Fsvg%3E')] after:bg-repeat-x after:bg-[length:20px_6px] after:animate-[squiggle_0.7s_linear_infinite]">
          it's kim's golden birthday
        </h1>
        <PartyInfo />
        {showNameValidation ? (
          <NameValidation onValidName={() => setShowNameValidation(false)} />
        ) : (
          <RsvpForm />
        )}
      </div>
    </div>
  );
}

function AppContentWithEmoji() {
  const { emoji } = useParams();
  return (
    <AppProvider emoji={emoji}>
      <AppContent />
    </AppProvider>
  );
}

function App(): JSX.Element {
  return (
    <Router basename="">
      <Routes>
        <Route
          path="/"
          element={
            <AppProvider emoji="">
              <AppContent />
            </AppProvider>
          }
        />
        <Route path="/:emoji" element={<AppContentWithEmoji />} />
      </Routes>
    </Router>
  );
}

export default App;
