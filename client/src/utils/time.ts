/**
 * Time utilities for the Foundation game.
 */

/**
 * Returns the current timestamp in milliseconds.
 */
export function now(): number {
  return Date.now();
}

/**
 * Returns the number of seconds that have elapsed since the given timestamp.
 */
export function secondsSince(timestamp: number): number {
  return Math.max(0, Math.floor((Date.now() - timestamp) / 1000));
}

/**
 * Formats a countdown in seconds to "MM:SS" or "HH:MM:SS" format for ship timers.
 * Example: 330 -> "05:30", 3661 -> "1:01:01"
 */
export function formatCountdown(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return '00:00';
  }

  seconds = Math.ceil(seconds);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const mm = String(minutes).padStart(2, '0');
  const ss = String(secs).padStart(2, '0');

  if (hours > 0) {
    return `${hours}:${mm}:${ss}`;
  }

  return `${mm}:${ss}`;
}
