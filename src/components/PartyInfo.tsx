import { useApp } from '../context/AppContext';
import PartyAttendees from './PartyAttendees';

export default function PartyInfo(): JSX.Element {
  const { name, isValidated, isRsvped, location } = useApp();
  if (!isValidated) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-2 my-4 items-center">
      <p>
        hey {name.split(' ')[0]}, you're invited to a little get-together for my birthday this year.
      </p>
      {isRsvped() && (
        <p className="text-xs">
          we'll have the patio reserved for a few hours and an open bar, so bring a warm jacket and
          an appetite.
        </p>
      )}
      <div className="flex flex-col gap text-left min-w-54">
        <p>
          <span className="font-semibold">date</span>: sat 1/25/2025
        </p>
        <p>
          <span className="font-semibold">time</span>: 1 to 4 pm
        </p>
        <p>
          <span className="font-semibold">location</span>:{' '}
          {isRsvped() && location ? (
            <a target="_blank" href={location.url}>
              {location.name}
            </a>
          ) : (
            <em>rsvp first</em>
          )}
        </p>
      </div>
      <div>
        <PartyAttendees isRsvped={isRsvped()} />
      </div>
    </div>
  );
}
