import { EnvConfig } from './common/config/env';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config as awsConfig } from 'aws-sdk';
import * as bodyParser from 'body-parser';
import { Log } from './common/utils/logging/log.service';
import { ValidationPipe } from '@nestjs/common';

/**
 * Set AWS Credentials
 */

async function bootstrap() {

    const app = await NestFactory.create(ApplicationModule,);

    app.use(bodyParser.json());

    app.useGlobalPipes(new ValidationPipe());

    /**
     * Headers setup
     */
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        next();
    });

    /**
     * Swagger implementation
     */
    const options = new DocumentBuilder()
        .setTitle('Chainservice API')
        .setDescription('The Chainservice API')
        .setVersion('1.0')
        .setExternalDoc('Github repo', 'https://github.com/wearetheledger/hyperledger-typescript-boilerplate')
        .build();

    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('/api', app, document, {
        swaggerOptions: {
            oauth2RedirectUrl: `${EnvConfig.DOMAIN_URL}/api/oauth2-redirect.html`,
            oauth: {
                clientId: '',
                appName: 'Chainservice API',
                scopeSeparator: ' ',
                additionalQueryStringParams: {audience: ''}
            }
        }
    });

    /**
     * Start Chainservice API
     */
    await app.listen(+EnvConfig.PORT, () => {
        Log.config.info(`Started Chain-service on PORT ${EnvConfig.PORT}`);
    });

}

bootstrap();
