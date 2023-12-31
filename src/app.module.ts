import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { NotificationModule } from './modules/notification/notification.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './modules/roles/roles.module';
import { AutopartsModule } from './modules/autoparts/autoparts.module';
import { CategoriesModule } from './modules/categories/categories.module';
import AuthModule from './auth/auth.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { APP_FILTER } from '@nestjs/core';
import { CarOptionsModule } from './modules/car-options/car-options.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { StorageModule } from './modules/storage/storage.module';
import { PriceModule } from './modules/price/price.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule to use ConfigService
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        synchronize: configService.get('DB_SYNCHRONIZE', true),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        logging: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    NotificationModule,
    RolesModule,
    AutopartsModule,
    CategoriesModule,
    CarOptionsModule,
    StorageModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads')
    }),
    PriceModule
  ],
  controllers: [],
  providers: [
  ],
  exports: [],
})
export class AppModule {}
