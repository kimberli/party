import { ReactNode, useState } from 'react';

export default function Tooltip({
  children,
  text,
}: {
  children: ReactNode;
  text: string;
}): JSX.Element {
  const [show, setShow] = useState(false);

  return (
    <span
      className="relative inline-block hover:cursor-default touch:cursor-pointer"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div className="tooltip absolute z-10 text-white rounded px-2 py-1 text-xxs w-max max-w-[125px] text-center bg-[rgba(0,0,0,0.6)] left-1/2 -translate-x-1/2 top-full translate-y-2 before:content-[''] before:absolute before:left-1/2 before:top-[-6px] before:-translate-x-1/2 before:border-[3px] before:border-transparent before:border-b-[rgba(0,0,0,0.6)]">
          {text}
        </div>
      )}
    </span>
  );
}
