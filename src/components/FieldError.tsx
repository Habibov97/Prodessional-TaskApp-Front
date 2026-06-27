type FieldErrorProps = {
  errors?: string[];
};

export function FieldError({ errors }: FieldErrorProps) {
  if (!errors?.length) return null;
  return <p className="text-red-500 text-xs mt-1">{errors[0]}</p>;
}
