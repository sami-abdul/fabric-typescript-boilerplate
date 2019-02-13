import { Module, NestModule } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware';
import { EnvConfig } from '../common/config/env';
import { ChainModule } from '../core/chain/chain.module';

@Module({
    controllers: [
        CarController,
    ],
    providers: [
        CarService,
    ],
    imports: [
        ChainModule,
    ]
})
export class CarModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
}
