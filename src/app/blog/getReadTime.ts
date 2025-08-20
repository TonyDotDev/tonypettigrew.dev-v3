const AVERAGE_WORDS_PER_MINUTE = 250;

export const getReadTime = (
  text: string,
  wordsPerMinute: number = AVERAGE_WORDS_PER_MINUTE,
) => {
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = words / wordsPerMinute;

  if (minutes < 0.5) {
    return 0.5;
  }

  if (minutes > 0.5 && minutes < 1) {
    return 1;
  }

  return Math.ceil(minutes);
};
