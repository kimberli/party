import { ChangeEvent, FormEvent, useState } from 'react';

import { useApp } from '../context/AppContext';
import Button from './Button';
import TextInput from './TextInput';

interface NameValidationProps {
  onValidName: (name: string) => void;
}

export default function NameValidation({ onValidName }: NameValidationProps): JSX.Element {
  const { error, setError, loadGuestInfo } = useApp();
  const [firstName, setFirstName] = useState('');
  const [lastInitial, setLastInitial] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!firstName.trim()) {
      setError('please enter your first name');
      return;
    }

    if (!lastInitial.trim()) {
      setError('please enter your last initial');
      return;
    }

    try {
      setIsChecking(true);
      const cleanedFirstName = firstName.toLowerCase().trim();
      const cleanedLastInitial = lastInitial.toLowerCase().trim();
      const fullName = `${cleanedFirstName} ${cleanedLastInitial}`;
      await loadGuestInfo(fullName)
        .then((isValid) => {
          if (isValid) {
            onValidName(fullName);
          }
        })
        .catch((err) => {
          console.error(err);
          setError('error loading guest data');
        })
        .finally(() => {
          setIsChecking(false);
        });
    } catch (error) {
      setError('an error occurred. please try again.');
    }
  };

  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
    setError('');
  };

  const handleLastInitialChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLastInitial(e.target.value);
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 max-w-md w-full rounded">
        <h2 className="text-xl font-semibold mb-4">welcome!</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="mb-2">what's your name?</p>
            <div>
              <TextInput
                id="firstName"
                name="firstName"
                type="text"
                required
                value={firstName}
                onChange={handleFirstNameChange}
                placeholder="first name"
                maxLength={20}
                disabled={isChecking}
              />
            </div>
            <div>
              <TextInput
                id="lastInitial"
                name="lastInitial"
                type="text"
                required
                value={lastInitial}
                onChange={handleLastInitialChange}
                placeholder="last initial"
                maxLength={1}
                disabled={isChecking}
              />
            </div>
          </div>
          {error && <p className="text-orange-600 text-sm">{error}</p>}
          <Button type="submit" loading={isChecking}>
            enter
          </Button>
        </form>
      </div>
    </div>
  );
}
