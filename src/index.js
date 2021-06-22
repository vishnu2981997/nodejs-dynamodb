const dynamoose = require("dynamoose");
const app = require('./app');
const config = require('./config/config');

let server;

try {
    const ddb = new dynamoose.aws.sdk.DynamoDB({
        accessKeyId: config.AWS.accessKey,
        secretAccessKey: config.AWS.secretAccessKey,
        region: config.AWS.region,
    });

    dynamoose.aws.ddb.set(ddb);

    console.log('Connected to DynamoDB');
    server = app.listen(config.port, () => {
        console.log(`Listening to port ${config.port}`);
    });
} catch (err) {
    console.log(err);
}

// const exitHandler = () => {
//     if (server) {
//         server.close(() => {
//             logger.info('Server closed');
//             process.exit(1);
//         });
//     } else {
//         process.exit(1);
//     }
// };
//
// const unexpectedErrorHandler = (error) => {
//     logger.error(error);
//     exitHandler();
// };
//
// process.on('uncaughtException', unexpectedErrorHandler);
// process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    console.log('SIGTERM received');
    if (server) {
        server.close();
    }
});