import express from 'express';
import { userController, commonController, groupsController, authController } from '@controllers';
import { logger, loggerMiddelware } from '@helpers/loggers';
import { uncaughtExceptionHandler, unhandledRejectionHandler } from '@helpers/errors';
import { authorizeMiddelware } from '@helpers/auth';
import cors from 'cors';

const port = process.env.PORT || 4000;

const app = express();

process.on('uncaughtException', uncaughtExceptionHandler);
process.on('unhandledRejection', unhandledRejectionHandler);

app.listen(port);

app.use(express.json());

app.use(
    cors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204
    })
);

app.use(loggerMiddelware, authController, authorizeMiddelware, userController, groupsController, commonController);

logger.info(`The server is running on port ${port}`);
