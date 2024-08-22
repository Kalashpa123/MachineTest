import { Injectable, Logger as NestLogger, LogLevel } from '@nestjs/common';
import { createWriteStream, WriteStream } from 'fs';
import { join } from 'path';

@Injectable()
export class LoggerService extends NestLogger {
  private readonly logFile: WriteStream;

  constructor() {
    super();
    const logFilePath = join(__dirname, '../../logs/application.log');
    this.logFile = createWriteStream(logFilePath, { flags: 'a' });
  }

  log(message: string, context?: string): void {
    super.log(message, context);
    this.logFile.write(`LOG: ${message} ${context ? `[${context}]` : ''}\n`);
  }

  error(message: string, trace?: string, context?: string): void {
    super.error(message, trace, context);
    this.logFile.write(`ERROR: ${message} ${context ? `[${context}]` : ''}\n`);
  }

  warn(message: string, context?: string): void {
    super.warn(message, context);
    this.logFile.write(`WARN: ${message} ${context ? `[${context}]` : ''}\n`);
  }

  debug(message: string, context?: string): void {
    super.debug(message, context);
    this.logFile.write(`DEBUG: ${message} ${context ? `[${context}]` : ''}\n`);
  }

  verbose(message: string, context?: string): void {
    super.verbose(message, context);
    this.logFile.write(`VERBOSE: ${message} ${context ? `[${context}]` : ''}\n`);
  }
}
