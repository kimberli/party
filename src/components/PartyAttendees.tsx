import Tooltip from './Tooltip';

const ICON_COLORS = [
  'bg-blue-200',
  'bg-green-200',
  'bg-pink-200',
  'bg-yellow-200',
  'bg-red-200',
  'bg-purple-200',
];

function Avatar({
  userId,
  label,
  isRsvped,
}: {
  userId: number;
  label: string;
  isRsvped: boolean;
}): JSX.Element {
  const content = (
    <img
      className={`w-8 h-8 rounded-full border border-stone-500 ${!isRsvped ? 'blur-sm' : ''}`}
      src={`https://i.pravatar.cc/100?u=${userId}`}
      alt={label}
    />
  );

  return isRsvped ? <Tooltip text={label}>{content}</Tooltip> : content;
}

function UnknownAvatar({
  initial,
  label,
  isRsvped,
}: {
  initial: string;
  label: string;
  isRsvped: boolean;
}): JSX.Element {
  const hash = Array.from(initial).reduce((acc, cur) => acc + cur.charCodeAt(0), 0);
  const color = ICON_COLORS[hash % ICON_COLORS.length];

  const content = (
    <div
      className={`w-8 h-8 rounded-full border border-stone-500 ${color} flex items-center justify-center text-sm ${!isRsvped ? 'blur-sm' : ''}`}
    >
      {initial}
    </div>
  );

  return isRsvped ? <Tooltip text={label}>{content}</Tooltip> : content;
}

export default function PartyAttendees({ isRsvped = false }: { isRsvped?: boolean }): JSX.Element {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-row flex-wrap justify-around items-start w-full">
        <div className="min-w-[300px]">
          <div className="flex flex-col sm:flex-row items-center gap sm:gap-2">
            <p className="text-sm">going:</p>
            <div className="flex -space-x-2">
              <Avatar userId={1} label="your favorite person" isRsvped={isRsvped} />
              <Avatar userId={56} label="your most attractive friend" isRsvped={isRsvped} />
              <Avatar userId={6} label="your bff" isRsvped={isRsvped} />
              <Avatar
                userId={76}
                label="your coworker who always offers you snacks"
                isRsvped={isRsvped}
              />
              <Avatar
                userId={61}
                label="your friend you haven't seen in ages"
                isRsvped={isRsvped}
              />
              <Avatar
                userId={62}
                label="your friend who never takes a bad photo"
                isRsvped={isRsvped}
              />
              <Avatar
                userId={38}
                label="someone whose opener isn't 'so what do you do for work'"
                isRsvped={isRsvped}
              />
              <UnknownAvatar
                initial="N"
                label="someone who gives you good tips for your next tokyo trip"
                isRsvped={isRsvped}
              />
              <UnknownAvatar initial="F" label="a new biking friend" isRsvped={isRsvped} />
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-around min-w-[200px] sm:gap-6">
          <div>
            <div className="flex flex-col sm:flex-row items-center gap sm:gap-2">
              <p className="text-sm">maybe:</p>
              <div className="flex -space-x-2">
                <Avatar
                  userId={70}
                  label="someone you'd like to set your friend up with"
                  isRsvped={isRsvped}
                />
                <UnknownAvatar initial="S" label="your gym crush" isRsvped={isRsvped} />
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col sm:flex-row items-center gap sm:gap-2">
              <p className="text-sm">not going:</p>
              <div className="flex -space-x-2">
                <Avatar userId={75} label="that annoying guy from work" isRsvped={isRsvped} />
                <UnknownAvatar initial="L" label="your ex" isRsvped={isRsvped} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
