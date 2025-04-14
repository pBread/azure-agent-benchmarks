import "dotenv-flow/config";
import fs from "fs";
import path, { dirname } from "path";
import { performance } from "perf_hooks";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const logDir = path.resolve(__dirname, "../logs");

if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

export function createLogger(name: string) {
  const start = performance.now();

  let lastLog = start;
  let lastSnap = start;

  const logFilePath = path.resolve(logDir, `${name}.log`);
  console.log("logFilePath", logFilePath);

  if (fs.existsSync(logFilePath)) fs.unlinkSync(logFilePath); // remove existing log file
  fs.writeFileSync(logFilePath, ""); // create a new empty log file

  function formatTime(delta: number) {
    const seconds = Math.floor(delta / 1000);
    const milliseconds = Math.floor(delta % 1000);
    return `${seconds}s ${milliseconds}ms`;
  }

  function writeToFile(line: string) {
    fs.appendFileSync(logFilePath, line + "\n");
  }

  const log = (message: string, ...optionalParams: any[]) => {
    const now = performance.now();
    const totalElapsed = now - start;
    const delta = now - lastLog;
    lastLog = now;

    const label = `[${formatTime(totalElapsed)} | Δ ${formatTime(delta)}]`;
    const invertedLabel = `\x1b[7m${label}\x1b[0m`; // ANSI reverse/invert

    const fullMsg = `${label} ${message} \n`;
    const prettyMsg = `${invertedLabel} ${message}`;

    console.debug(prettyMsg, ...optionalParams);
    writeToFile(
      fullMsg + (optionalParams.length ? ` ${optionalParams.join(" ")}` : ""),
    );
  };

  const snapshots: string[] = [];
  const snapshot = (title: string) => {
    const now = performance.now();
    const totalElapsed = now - start;
    const delta = now - lastSnap;
    lastSnap = now;

    const label = `[${formatTime(totalElapsed)} | Δ ${formatTime(
      delta,
    )}]: ${title}`;

    const message = `\x1b[32m${label}\x1b[0m`;

    snapshots.push(message);
    console.log(message);
    writeToFile(message);

    return { key: `${name}-${title}`, totalElapsed, delta } as SnapshotRecord;
  };

  const printSnapshots = () => snapshots.forEach((msg) => console.log(msg));

  const getTimes = () => {
    const now = performance.now();

    const totalElapsed = now - start;
    const delta = now - lastSnap;
    return { totalElapsed, delta };
  };

  return { log, snapshot, printSnapshots, getTimes };
}

export interface LoggerTimes {
  totalElapsed: number;
  delta: number;
}

export interface SnapshotRecord extends LoggerTimes {
  key: string;
}
