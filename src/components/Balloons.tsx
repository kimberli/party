export default function Balloons(): JSX.Element {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex h-48">
        <img
          src="/2.png"
          alt="balloons"
          className="w-auto h-auto float-animation transition-transform duration-300"
        />
        <img
          src="/9.png"
          alt="balloons"
          className="w-auto h-auto float-animation-delayed transition-transform duration-300"
        />
      </div>
    </div>
  );
}
