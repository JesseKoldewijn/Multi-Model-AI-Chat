import { sanitizeZeroOmits } from "./0-omits";

export const sanitizePromptResponse = (prompt: string) => {
  let result = prompt;

  const hasZeroOmits = prompt.includes('0:"');
  if (hasZeroOmits) {
    result = sanitizeZeroOmits(result);
  }

  return result;
};
