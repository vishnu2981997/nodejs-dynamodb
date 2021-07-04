const winston = require('winston');
const config = require('../config/config');
const fs = require('fs');

const enumerateErrorFormat = winston.format((info) => {
    if (info instanceof Error) {
        Object.assign(info, {message: info.stack});
    }
    return info;
});

const logger = (request) => {
    const {uuid, body, hostname, url, method, userAgent, ipAddress, username, service} = request;
    let dir = `${process.cwd()}//logs//${service}`;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    return winston.createLogger({
        defaultMeta: {
            uuid,
            service,
            username,
            body,
            hostname,
            url,
            method,
            userAgent,
            ipAddress,
        },
        format: winston.format.combine(
            enumerateErrorFormat(),
            config.env === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
            winston.format.splat(),
            winston.format.printf(({level, message}) => `${level}: ${message}`)
        ),
        transports: [
            new winston.transports.File({
                filename: `${dir}//${service}-${new Date(Date.now()).toLocaleDateString().replace(/\//g, '-')}.log`,
                handleExceptions: true,
            }),
        ],
    });
}

module.exports = logger;