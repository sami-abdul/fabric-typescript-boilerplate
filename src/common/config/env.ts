import 'dotenv/config';

export interface ProcessEnv {
    [key: string]: string | undefined;
}

/**
 * node EnvConfig variables,
 * copy .env.example file, rename to .env
 *
 * @export
 * @class EnvConfig
 */
export class EnvConfig {

    // NODE
    public static NODE_ENV = process.env['NODE_ENV'] || 'LOCAL';
    public static PORT = process.env['PORT'] || 3000;
    public static DOMAIN_URL = process.env['DOMAIN_URL'] || '';

    // FABRIC
    public static PEER_HOST = process.env['PEER_HOST'] || 'localhost';
    public static ORDERER_HOST = process.env['ORDERER_HOST'] || 'localhost';
    public static CA_HOST = process.env['CA_HOST'] || 'localhost';

    // Logger
    public static LOGGER_SQS_DEBUG = process.env['LOGGER_SQS_DEBUG'] || false;
    public static SKIP_MIDDLEWARE = process.env['SKIP_MIDDLEWARE'] || false;

}
