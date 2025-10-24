export default function Animation(): JSX.Element {
  return (
    <div className="relative pt-32 h-80 w-full overflow-hidden">
      <img
        src="/w3.svg"
        alt="wave layer 3"
        className="absolute bottom-[-24px] left-0 right-0 float-animation-delayed-2 transition-transform duration-300 w-full h-auto object-contain"
      />
      <img
        src="/w2.svg"
        alt="wave layer 2"
        className="absolute bottom-[-20px] left-0 right-0 float-animation-delayed transition-transform duration-300 w-full h-auto object-contain"
      />
      <img
        src="/w1.svg"
        alt="wave layer 1"
        className="absolute bottom-[-16px] left-0 right-0 float-animation transition-transform duration-300 w-full h-auto object-contain"
      />
    </div>
  );
}
