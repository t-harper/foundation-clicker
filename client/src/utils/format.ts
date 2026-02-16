/**
 * Number and text formatting utilities for the Foundation game.
 */

const SHORT_SUFFIXES = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc'];

/**
 * Formats a number according to the specified format.
 *
 * - 'short': Compact form with suffix (1.5K, 2.3M, 1.1B, 4.5T, etc.)
 * - 'full': Locale-formatted with commas (1,234,567)
 * - 'scientific': Scientific notation (1.23e6)
 */
export function formatNumber(n: number, format: 'short' | 'full' | 'scientific'): string {
  if (!Number.isFinite(n)) {
    return String(n);
  }

  switch (format) {
    case 'short':
      return formatShort(n);
    case 'full':
      return formatFull(n);
    case 'scientific':
      return formatScientific(n);
  }
}

function formatShort(n: number): string {
  const isNegative = n < 0;
  let abs = Math.abs(n);

  if (abs < 1000) {
    // Show up to 1 decimal for small numbers, strip trailing zero
    const result = abs % 1 === 0 ? abs.toString() : abs.toFixed(1);
    return isNegative ? `-${result}` : result;
  }

  let tier = 0;
  while (abs >= 1000 && tier < SHORT_SUFFIXES.length - 1) {
    abs /= 1000;
    tier++;
  }

  // Show 1 decimal place, but strip trailing ".0"
  let formatted: string;
  if (abs >= 100) {
    formatted = Math.floor(abs).toString();
  } else if (abs >= 10) {
    formatted = abs.toFixed(1);
    if (formatted.endsWith('0')) {
      formatted = formatted.slice(0, -2); // remove ".0"
    }
  } else {
    formatted = abs.toFixed(2);
    // Strip trailing zeros after decimal
    formatted = formatted.replace(/\.?0+$/, '');
  }

  const suffix = SHORT_SUFFIXES[tier];
  return `${isNegative ? '-' : ''}${formatted}${suffix}`;
}

function formatFull(n: number): string {
  if (Number.isInteger(n)) {
    return n.toLocaleString('en-US');
  }
  return n.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

function formatScientific(n: number): string {
  if (n === 0) return '0';
  const abs = Math.abs(n);
  if (abs < 1000) {
    return n % 1 === 0 ? n.toString() : n.toFixed(2);
  }
  const exp = Math.floor(Math.log10(abs));
  const mantissa = n / Math.pow(10, exp);
  return `${mantissa.toFixed(2)}e${exp}`;
}

/**
 * Formats a duration in seconds to a human-readable string.
 * Example: 9015 -> "2h 30m 15s"
 */
export function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return '0s';
  }

  seconds = Math.floor(seconds);

  if (seconds === 0) return '0s';

  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);

  return parts.join(' ');
}

/**
 * Formats a timestamp as a relative time string.
 * Example: (5 minutes ago timestamp) -> "5 minutes ago"
 */
export function formatTimeAgo(timestamp: number): string {
  const now = Date.now();
  const diffMs = now - timestamp;

  if (diffMs < 0) return 'just now';

  const diffSeconds = Math.floor(diffMs / 1000);

  if (diffSeconds < 5) return 'just now';
  if (diffSeconds < 60) return `${diffSeconds} seconds ago`;

  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes === 1) return '1 minute ago';
  if (diffMinutes < 60) return `${diffMinutes} minutes ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours === 1) return '1 hour ago';
  if (diffHours < 24) return `${diffHours} hours ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 30) return `${diffDays} days ago`;

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths === 1) return '1 month ago';
  if (diffMonths < 12) return `${diffMonths} months ago`;

  const diffYears = Math.floor(diffDays / 365);
  if (diffYears === 1) return '1 year ago';
  return `${diffYears} years ago`;
}

/**
 * Shorthand wrapper that formats a resource value using the 'short' format.
 */
export function formatResource(value: number): string {
  return formatNumber(value, 'short');
}
