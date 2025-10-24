import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { useApp } from '../context/AppContext';
import Button from './Button';
import TextArea from './TextArea';
import TextInput from './TextInput';

const RESPONSE_OPTIONS = [
  "yes, and i've already booked my flight",
  "maybe, i'd like to celebrate but in a less committal way",
  "no, i can't make it but i hope you have a great time",
] as const;

type ResponseOption = (typeof RESPONSE_OPTIONS)[number] | 'other' | null;

export default function RsvpForm(): JSX.Element | null {
  const { name, isValidated, error, lastResponse, loadGuestInfo, submitRsvp, isRsvped } = useApp();
  const [response, setResponse] = useState<ResponseOption>(null);
  const [otherResponse, setOtherResponse] = useState<string>('');
  const [comments, setComments] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [plusOne, setPlusOne] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (lastResponse) {
      const savedResponse = lastResponse.response;
      if (RESPONSE_OPTIONS.includes(savedResponse as (typeof RESPONSE_OPTIONS)[number])) {
        setResponse(savedResponse as (typeof RESPONSE_OPTIONS)[number]);
      } else {
        setResponse('other');
        setOtherResponse(savedResponse);
      }
      setComments(lastResponse.comments || '');
      setPlusOne(lastResponse.plusOne || false);
    }
  }, [lastResponse]);

  if (!isValidated) {
    return <div className="text-gray-500 mt-4">{error}</div>;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    const submittedResponse = response === 'other' ? otherResponse : response;

    try {
      await submitRsvp({
        name,
        response: submittedResponse || '',
        comments,
        plusOne,
      });
      await loadGuestInfo(name);
      setStatus('thanks for your rsvp! 🖤');
    } catch (err) {
      console.error(err);
      setStatus((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-2">
      <div className="bg-white rounded p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2 text-xs">
            {RESPONSE_OPTIONS.map((option) => (
              <div key={option} className="flex text-left items-center">
                <input
                  type="radio"
                  id={option}
                  name="response"
                  value={option}
                  checked={response === option}
                  onChange={(e) => setResponse(e.target.value as (typeof RESPONSE_OPTIONS)[number])}
                  className="mr-2"
                  required
                />
                <label htmlFor={option} className="text-gray-700">
                  {option}
                </label>
              </div>
            ))}
            <div className="flex text-left items-center">
              <input
                type="radio"
                id="other"
                name="response"
                value="other"
                checked={response === 'other'}
                onChange={(e) => setResponse(e.target.value as 'other')}
                className="mr-2"
              />
              <label htmlFor="other" className="text-gray-700 mr-2">
                another excuse:
              </label>
              <TextInput
                maxLength={100}
                value={otherResponse}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setOtherResponse(e.target.value)}
                disabled={response !== 'other'}
                required={response === 'other'}
              />
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="plusOne"
                checked={plusOne}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPlusOne(e.target.checked)}
              />
              <label htmlFor="plusOne" className="text-gray-700">
                bringing a +1?
              </label>
            </div>
          </div>

          <div className="text-xs">
            <TextArea
              maxLength={500}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="anything else you'd like to add?"
              rows={2}
            />
          </div>

          <div className="flex justify-center">
            <Button loading={isSubmitting}>{lastResponse ? 'update' : 'submit'}</Button>
          </div>

          {status ? (
            <div className={`text-xs ${status}`}>{status}</div>
          ) : error ? (
            <div className={`text-xs ${error}`}>{error}</div>
          ) : isRsvped() ? (
            <p className="text-xs">thanks, got your response!</p>
          ) : null}
        </form>
      </div>
    </div>
  );
}
