
/**
 * Formats minutes into hours and minutes with one decimal place
 * @param minutes Total minutes to format
 * @returns Formatted string in the format "Xh Y.Zm"
 */
export const formatMinutes = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  // Round to 1 decimal place
  const roundedMins = Math.round(mins * 10) / 10;
  return `${hours}h ${roundedMins}m`;
};
