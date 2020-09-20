import express from 'express';
import { userController, commonController, groupsController } from '@controllers';

const port = process.env.PORT || 4000;

const app = express();

app.listen(port);

app.use(express.json());

app.use(userController, groupsController, commonController);

console.log(`The server is running on port ${port}`);
