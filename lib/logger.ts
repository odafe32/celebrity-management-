import pino from "pino";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const isDev = process.env.NODE_ENV !== "production";
const LOG_DIR = join(process.cwd(), "logs");
const LOG_FILE = join(LOG_DIR, "ashencrest.log");

// Ensure logs directory exists
try {
  mkdirSync(LOG_DIR, { recursive: true });
} catch {
  // Directory may already exist or filesystem is read-only — ignore
}

// Pino logger with dual output:
//  - Console: pretty/colorized (dev) or JSON (prod)
//  - File: structured JSON lines at logs/ashencrest.log (always)
export const logger = pino({
  level: process.env.LOG_LEVEL || (isDev ? "debug" : "info"),
  transport: {
    targets: [
      // Console output
      {
        target: isDev ? "pino-pretty" : "pino/file",
        level: process.env.LOG_LEVEL || (isDev ? "debug" : "info"),
        options: isDev
          ? {
              colorize: true,
              translateTime: "SYS:HH:MM:ss.l",
              ignore: "pid,hostname",
            }
          : { destination: 1 }, // stdout
      },
      // File output — always JSON lines for easy parsing
      {
        target: "pino/file",
        level: "debug",
        options: {
          destination: LOG_FILE,
          mkdir: true,
        },
      },
    ],
  },
});

// Convenience child loggers for different backend modules
export const dbLogger = logger.child({ module: "database" });
export const actionsLogger = logger.child({ module: "server-actions" });
export const authLogger = logger.child({ module: "auth" });
export const apiLogger = logger.child({ module: "api" });
