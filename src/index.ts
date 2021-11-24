import express, { Response } from 'express';
// import { userController, commonController, groupsController, authController } from '@controllers';
// import { logger, loggerMiddelware } from '@helpers/loggers';
// import { uncaughtExceptionHandler, unhandledRejectionHandler } from '@helpers/errors';
// import { authorizeMiddelware } from '@helpers/auth';
import cors from 'cors';

const port = process.env.PORT || 4000;

const app = express();

// process.on('uncaughtException', uncaughtExceptionHandler);
// process.on('unhandledRejection', unhandledRejectionHandler);

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

const ssoController = express.Router();

ssoController.route('/sso/login').get((req, res: Response): void => {
    res.setHeader('location', 'http://localhost:4000/sso/auth-result');
    res.setHeader('set-cookie', 'access-token=trololo; SameSite=None; Secure');
    res.status(302).send();
});

const ssoAuthController = express.Router();

ssoAuthController.route('/sso/auth').get((req, res: Response): void => {
    res.status(200).send(`
    <html>

    <body>
        <script>
            window.location = 'http://localhost:4000/sso/login'
        </script>
    </body>
    
    </html>
    `);
});

const ssoAuthResultController = express.Router();

ssoAuthResultController.route('/sso/auth-result').get((req, res: Response): void => {
    res.status(200).send(`
    <html>

    <body>
        <script>
            console.log('iframe', document.cookie);

            setInterval(() => {
                parent.postMessage({
                    auth: true,
                    token: document.cookie.replace('access-token=', '')
                }, 'https://dev-epam.epm-dce.projects.epam.com')

            }, 2000)
        </script>
    </body>
    
    </html>
    `);
});

// app.use(loggerMiddelware, authController, authorizeMiddelware, userController, groupsController, commonController);
app.use(ssoAuthController, ssoAuthResultController, ssoController);

console.log(`The server is running on port ${port}`);
