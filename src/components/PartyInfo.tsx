import { useApp } from '../context/AppContext';
import Tooltip from './Tooltip';

const LINK = 'https://www.google.com/travel/flights/s/11XGT2KWBFWAGSrv5';

export default function PartyInfo(): JSX.Element {
  const { name, isValidated } = useApp();
  if (!isValidated) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-2 my-4 max-w-xl mx-auto items-center text-sm">
      <p>hey {name.split(' ')[0]}. here's my proposal.</p>
      <p>i wanna do one last fun thing before my twenties are over. let's go see whales!</p>
      <p>
        i've booked{' '}
        <a href="https://www.airbnb.com/rooms/20172086" target="_blank">
          this villa
        </a>{' '}
        in baja california and reserved{' '}
        <a href="https://www.deserticabajasur.com/" target="_blank">
          these guides
        </a>{' '}
        that will take us on a marine safari. we can do other fun stuff too. if you're up for it,
        join me on{' '}
        <a href={LINK} target="_blank">
          this flight
        </a>{' '}
        and i'll take care of the rest.
      </p>
      <p className="text-xs">
        i know it's a big ask to fly and spend a weekend, but i hope we'll have a better time as a
        smaller group. if you can't make it, no hard feelings! i might do something else local too
      </p>
      <div className="animate-swim">
        <img src="/whale.svg" alt="whale" className="w-24 h-16 drop-shadow-lg" />
      </div>
      <div className="flex flex-col gap n-w-54">
        <p>
          <span className="font-semibold">dates</span>: sat 1/17/26 to tues 1/20/26
        </p>
        <p>
          <span className="font-semibold">flight</span>:{' '}
          <Tooltip text="you might get it cheaper on cheapoair. try the fusion fare for $279 pp">
            <a href={LINK} target="_blank" className="font-semibold">
              book this
            </a>
          </Tooltip>{' '}
          or something similar
        </p>
        <p>
          <span className="font-semibold">rsvp deadline</span>: dec 16, 2025 (2 spots remaining)
        </p>
      </div>
    </div>
  );
}
