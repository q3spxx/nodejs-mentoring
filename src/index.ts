import express from 'express';
import { userController, commonController, groupsController } from '@controllers';
import { logger, loggerMiddelware } from '@helpers/loggers';
import { uncaughtExceptionHandler, unhandledRejectionHandler } from '@helpers/errors';

const port = process.env.PORT || 4000;

const app = express();

process.on('uncaughtException', uncaughtExceptionHandler);
process.on('unhandledRejection', unhandledRejectionHandler);

app.listen(port);

app.use(express.json());

app.use(loggerMiddelware, userController, groupsController, commonController);

logger.info(`The server is running on port ${port}`);
