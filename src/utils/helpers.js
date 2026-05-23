/**
 * Extracts and normalizes hashtags from a description string.
 *
 * @param {string} [description] - The input text containing hashtags.
 * @returns {string[]} An array of tags without the '#' prefix.
 */
export const extractTags = (description) => {
  if (!description) return [];
  const normalized = description.normalize("NFKC");
  const tags = normalized.match(/#\w+/g);
  return tags
    ? [
        ...new Set(
          tags.map((tag) => {
            const clean = tag.replace("#", "");
            return clean.charAt(0).toUpperCase() + clean.slice(1);
          }),
        ),
      ].slice(0, 5)
    : [];
};

/**
 * Formats a date string into a human-readable "time ago" string relative to the current time.
 *
 * @param {string} [dateString] - The date string to format (e.g., "2026-05-23 14:30:00").
 * @returns {string} A human-readable relative time string (e.g., "just now", "45s ago", "2h ago", "5d ago").
 */
export const formatTimeAgo = (dateString) => {
  if (!dateString) return "recently";

  const now = new Date();
  const normalized =
    dateString.includes("Z") || dateString.includes("+")
      ? dateString
      : `${dateString.replace(" ", "T")}Z`;

  const then = new Date(normalized);
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (seconds < 5) return "just now";
  if (seconds < 60) return `${seconds}s ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  return `${Math.floor(hours / 24)}d ago`;
};
