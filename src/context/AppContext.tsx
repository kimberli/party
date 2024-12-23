import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import {
  getGuestData,
  type LastResponse,
  type Location,
  postRsvp,
  type RsvpRequest,
} from '../lib/actions';

interface AppContextType {
  emoji: string;
  name: string;
  setName: (name: string) => void;
  isValidated: boolean;
  setIsValidated: (validated: boolean) => void;
  error: string;
  setError: (error: string) => void;
  lastResponse: LastResponse | null;
  setLastResponse: (response: LastResponse | null) => void;
  location: Location | null;
  setLocation: (location: Location | null) => void;
  isRsvped: () => boolean;
  isLoading: boolean;
  loadGuestInfo: (guestName: string) => Promise<void | boolean>;
  submitRsvp: (rsvpData: RsvpRequest) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
  emoji?: string;
}

export function AppProvider({ children, emoji }: AppProviderProps) {
  const savedName = localStorage.getItem('guestName');
  const [name, setName] = useState(savedName || '');
  const [isValidated, setIsValidated] = useState(!!savedName);
  const [error, setError] = useState('');
  const [lastResponse, setLastResponse] = useState<LastResponse | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (emoji) {
      localStorage.setItem('emoji', emoji);
    }
  }, [emoji]);

  const loadedEmoji = emoji || localStorage.getItem('emoji') || undefined;

  const loadGuestInfo = async (guestName: string): Promise<void | boolean> => {
    return await getGuestData(guestName, loadedEmoji)
      .then((data) => {
        if (data.status === 'error') {
          setError(data.message || 'something went wrong');
          setIsValidated(false);
          setLastResponse(null);
          setLocation(null);
          return;
        }
        if (data.found) {
          localStorage.setItem('guestName', guestName);
          setName(guestName);
          setIsValidated(true);
          setLastResponse(data.lastResponse);
          setLocation(data.location);
          setError('');
          return true;
        } else {
          setName('');
          setIsValidated(false);
          setLastResponse(null);
          setLocation(null);
          setError("sorry, couldn't find you on the list. who do you know here again?");
          localStorage.removeItem('guestName');
          return false;
        }
      })
      .catch((err) => {
        console.error(err);
        setError('error loading guest data');
        setIsValidated(false);
        setLastResponse(null);
        setLocation(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const submitRsvp = async (rsvpData: Omit<RsvpRequest, 'emoji'>): Promise<void> => {
    return await postRsvp({ ...rsvpData, emoji: loadedEmoji });
  };

  useEffect(() => {
    const loadGuestData = async () => {
      const savedName = localStorage.getItem('guestName');
      if (!savedName) {
        setIsLoading(false);
        return;
      }

      await loadGuestInfo(savedName).catch((err) => {
        console.error(err);
      });
    };

    setIsLoading(true);
    loadGuestData();
  }, []);

  const isRsvped = (): boolean => {
    return isValidated && !!lastResponse && lastResponse.response !== '';
  };

  return (
    <AppContext.Provider
      value={{
        emoji: loadedEmoji || '',
        name,
        setName,
        isValidated,
        setIsValidated,
        error,
        setError,
        lastResponse,
        setLastResponse,
        isRsvped,
        isLoading,
        location,
        setLocation,
        loadGuestInfo,
        submitRsvp,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextType {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
