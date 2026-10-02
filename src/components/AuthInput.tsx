'use client';
import { useState } from 'react';
import type { IconType } from 'react-icons';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { Field } from './ui/field';
import { Input } from './ui/input';

type Props = React.ComponentProps<typeof Input> & {
  icon: IconType;
  error?: string;
};

export default function AuthInput({ icon: Icon, error, type, id, ...props }: Props) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === 'password';
  const errorId = error ? `${id}-error` : undefined;

  return (
    <Field>
      <div className="relative">
        <Input
          id={id}
          type={isPassword && visible ? 'text' : type}
          aria-invalid={!!error}
          aria-describedby={errorId}
          className="h-12 rounded-lg border-stone-500 bg-transparent pr-11 pl-11"
          {...props}
        />
        <Icon className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-[#333]" />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Hide password' : 'Show password'}
            className="absolute top-1/2 right-3 flex size-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md text-[#333] hover:bg-stone-200"
          >
            {visible ? <FaRegEye className="size-5" /> : <FaRegEyeSlash className="size-5" />}
          </button>
        )}
      </div>
      {error && (
        <p id={errorId} className="text-xs text-red-500">
          {error}
        </p>
      )}
    </Field>
  );
}
