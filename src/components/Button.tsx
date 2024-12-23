import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  loading?: boolean;
  type?: 'submit' | 'button' | 'reset';
}

const LoadingSpinner = () => (
  <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
);

export default function Button({ children, loading, type = 'submit' }: ButtonProps): JSX.Element {
  return (
    <button
      type={type}
      className="bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded flex items-center justify-center gap-2"
      disabled={loading}
    >
      <div className="relative inline-flex items-center">
        <span className={loading ? 'invisible' : 'visible'}>{children}</span>
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <LoadingSpinner />
          </span>
        )}
      </div>
    </button>
  );
}
