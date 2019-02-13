import {Inject, Injectable} from '@nestjs/common';
import {HlfClient} from './hlfclient';
import {ChainMethod} from '../../chainmethods.enum';
import {InvokeResult} from '../../common/utils/invokeresult.model';
import {EnvConfig} from '../../common/config/env';
import {Log} from '../../common/utils/logging/log.service';

@Injectable()
export class RequestHelper {
    // TODO: refactor invokes according to https://docs.nestjs.com/recipes/cqrs

    /**
     * Creates an instance of RequestHelper.
     * @param {HlfClient} hlfClient
     * @param {PusherService} eventService
     * @param {QueuePusherService} queuePusherService
     * @memberof RequestHelper
     */
    constructor(private hlfClient: HlfClient) {
    }

    /**
     * Pass transaction request to aws queue
     *
     * @param {ChainMethod} chainMethod
     * @param {Object} params
     * @param {string} userId
     * @param invokeAlways - Workaround for message deduplication SQS
     * @param transientMap
     * @returns {Promise<InvokeResult>}
     * @memberof RequestHelper
     */
    public invokeRequest(chainMethod: ChainMethod, params: Object, userId: string, invokeAlways = false, transientMap ?: Object): Promise<InvokeResult | any> {
        const args = [JSON.stringify(params)];

        return this.hlfClient
            .invoke(chainMethod, args, transientMap)
            .then((response) => {
                Log.hlf.debug('Invoke successfully executed: ', response);
                return {txHash: response};
            })
            .catch((error) => {
                Log.hlf.error(`${chainMethod}`, error);
                throw error;
            });
    }

    /**
     * Query hlf chain and return response
     *
     * @param {ChainMethod} chainMethod
     * @param {Object} params
     * @param transientMap
     * @returns {Promise<any>}
     * @memberof RequestHelper
     */
    public queryRequest(chainMethod: ChainMethod, params: Object = {}, transientMap ?: Object): Promise<any> {
        const args = [JSON.stringify(params)];

        return this.hlfClient
            .query(chainMethod, args, transientMap)
            .then((response) => {
                Log.hlf.debug('Query successfully executed!');
                return response;
            })
            .catch((error) => {
                Log.hlf.error(`${chainMethod}`, error);
                throw error;
            });
    }
}
