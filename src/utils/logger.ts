import winston from 'winston';
import dotenv from 'dotenv';

import SMTPTransport from './winstonSMTPTransport';

dotenv.config();

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.File({
      filename: './log/warn.log',
      level: 'warn',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.metadata(),
        winston.format.json(),
      ),
    }),
    new winston.transports.File({
      filename: './log/error.log',
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.metadata(),
        winston.format.json(),
      ),
    }),
    new winston.transports.File({
      filename: './log/fatal.log',
      level: 'fatal',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.metadata(),
        winston.format.json(),
      ),
    }),
    new winston.transports.File({ filename: './log/combined.log' }),
  ],
});

logger.add(new SMTPTransport({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.metadata(),
    winston.format.json(),
  ),
}));

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    level: 'debug',
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.printf((info): string => `${info.timestamp} [${info.level}]: ${info.message}`),
    ),
  }));
}

export default logger;
