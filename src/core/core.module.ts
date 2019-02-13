import { Inject, Module } from '@nestjs/common';
import { ChainModule } from './chain/chain.module';
import { HlfClient } from './chain/hlfclient';
import { HlfCaClient } from './chain/hlfcaclient';
import { HlfErrors } from './chain/logging.enum';
import { Appconfig } from '../common/config/appconfig';
import { Log } from '../common/utils/logging/log.service';
import { EnvConfig } from '../common/config/env';
import { Json } from '../common/utils/json';

@Module({
    imports: [
        ChainModule,
    ]
})
export class CoreModule {

    /**
     * Creates an instance of ApplicationModule.
     * @param {HlfClient} hlfClient
     * @param caClient
     * @param {QueueListenerService} queueListenerService
     * @param webSocketService
     * @memberof ApplicationModule
     */
    constructor(private hlfClient: HlfClient,
                private caClient: HlfCaClient) {

        // init hlf client and hlf ca client
        // assign admin user
        this.hlfClient.init()
            .then(result => {
                return Promise.resolve();
            })
            .then(() => {
                return this.caClient.init(Appconfig.hlf.admin);
            })
            .catch(err => {
                Log.awssqs.error(HlfErrors.ERROR_STARTING_HLF, err.message);
            });
    }

}
