import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { NotificationModule } from './modules/notification/notification.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './modules/roles/roles.module';
import { AutopartsModule } from './modules/autoparts/autoparts.module';
import { CategoriesModule } from './modules/categories/categories.module';
import AuthModule from './auth/auth.module';

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
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
