interface GeographyDescription {
  leadText: string;
  tailText: string;
}

export const useGeographyDescription = (
  description: string,
): GeographyDescription => {
  const [firstSentence = "", ...remainingSentences] = description.split(". ");
  const hasRemainingText = remainingSentences.length > 0;

  const leadText = hasRemainingText
    ? firstSentence.endsWith(".")
      ? firstSentence
      : `${firstSentence}.`
    : description;

  return {
    leadText,
    tailText: hasRemainingText ? remainingSentences.join(". ") : "",
  };
};
