export const sanitizeZeroOmits = (response: string) => {
  // Regular expression to match text inside double quotes
  const regex = /"([^"]*)"/g;

  const result: string[] = [];
  let match;

  // Use the regex to find all matches
  while ((match = regex.exec(response)) !== null) {
    const matchingString = `${match[1]}`;
    const hasOrIsCharsOnlyBackslashAndN =
      matchingString.match(/\\n/g) !== null &&
      matchingString.match(/\\n/g)!.length > 0;

    if (hasOrIsCharsOnlyBackslashAndN) {
      continue;
    }

    result.push(
      matchingString
        .replace(/\n+/g, "") // Replace multiple newlines with a single space
        .replace(/\s{2,}/g, "") // Replace multiple spaces with a single space
        .trim(),
    ); // match[1] contains the quoted string
  }

  // Join all quoted strings, replace newlines and excessive whitespace
  return result
    .join(" ") // Join all quoted strings with a space
    .replaceAll(" ?", "?")
    .replaceAll(" !", "!")
    .replaceAll(" .", ".")
    .replaceAll(" ,", ",")
    .replaceAll(" :", ":")
    .replaceAll("( ", "(")
    .replaceAll(" )", ")")
    .replace("? ", "")
    .trim(); // Remove leading/trailing spaces
};
