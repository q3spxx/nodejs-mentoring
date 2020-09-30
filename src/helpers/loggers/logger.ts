import { createLogger, format, transports } from 'winston';
import path from 'path';
const { combine, timestamp, json, cli } = format;

const errorPath = path.join(__dirname, '..', '..', 'log', 'error.log');
const infoPath = path.join(__dirname, '..', '..', 'log', 'info.log');

export const logger = createLogger({
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        json()
    ),
    transports: [
        new transports.File({ filename: errorPath, level: 'error' }),
        new transports.File({ filename: infoPath, level: 'info' })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new transports.Console({
            format: cli()
        })
    );
}
