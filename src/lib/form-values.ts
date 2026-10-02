/**
 * Text fields of a submitted form. React resets a form after its action runs,
 * so failed submissions hand these back as default values to keep the input.
 */
export function textValues(formData: FormData): Record<string, string> {
  const values: Record<string, string> = {};
  formData.forEach((value, key) => {
    if (typeof value === 'string' && !key.startsWith('$ACTION')) values[key] = value;
  });
  return values;
}
