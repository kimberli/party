import { TextareaHTMLAttributes } from 'react';

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextArea(props: TextAreaProps): JSX.Element {
  return (
    <textarea
      className="w-full px-2 py-2 border border-gray-300 rounded-md resize-none focus:outline focus:outline-blue-400"
      {...props}
    />
  );
}
