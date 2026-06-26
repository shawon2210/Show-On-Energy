type LogLevel = 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: unknown;
  timestamp: string;
}

const MAX_LOGS = 100;
const logHistory: LogEntry[] = [];

function log(level: LogLevel, message: string, data?: unknown) {
  const entry: LogEntry = {
    level,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
  logHistory.push(entry);
  if (logHistory.length > MAX_LOGS) logHistory.shift();

  if (import.meta.env.DEV) {
    const fn = level === 'error' ? console.error : level === 'warn' ? console.warn : console.log;
    fn(`[${level.toUpperCase()}] ${message}`, data ?? '');
  }
}

export const logger = {
  info: (msg: string, data?: unknown) => log('info', msg, data),
  warn: (msg: string, data?: unknown) => log('warn', msg, data),
  error: (msg: string, data?: unknown) => log('error', msg, data),
  getHistory: () => [...logHistory],
};

export function getEnv(key: string, fallback?: string): string {
  const val = import.meta.env[key] as string | undefined;
  if (!val) {
    if (fallback !== undefined) return fallback;
    logger.warn(`Environment variable ${key} is not set`);
    return '';
  }
  return val;
}
