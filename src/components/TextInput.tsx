import { InputHTMLAttributes } from 'react';

type TextInputProps = InputHTMLAttributes<HTMLInputElement>;

export default function TextInput(props: TextInputProps): JSX.Element {
  return (
    <input
      type="text"
      {...props}
      className="px-2 py-2 border border-gray-300 rounded-md focus:outline focus:outline-blue-400"
    />
  );
}
