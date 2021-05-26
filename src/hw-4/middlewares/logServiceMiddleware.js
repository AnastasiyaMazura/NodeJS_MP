import winston from 'winston';

const logConfiguration = {
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({
            filename: './logs/hw-5.log',
            level: 'info'
        }),
        new winston.transports.File({
            filename: './logs/errors.log',
            level: 'error'
        })
    ]
};

const logger = winston.createLogger(logConfiguration);

export const logServiceError = (err, req, res, next) => {
    const { method, path, body } = req;
    if (err) {
        logger.error(`message: ${err.message}, method: ${method}, path: ${path}, body: ${body}`);
        res.status(500).send({ error: 'Server error' });
    }
    next();
};

export const serviceLogger = (req, res, next) => {
    const { method, path, body } = req;
    logger.info(`Service method ${method} has been invoked with arguments: - body: ${JSON.stringify(Object.keys(body).map(key => ({ [key]: body[key] })))}- path: ${path}`);
    next();
};

export const logError = (err) => {
    logger.error(err);
}