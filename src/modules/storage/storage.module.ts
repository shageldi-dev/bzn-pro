import { Module } from "@nestjs/common";
import { StorageController } from "./controllers/storage.controller";
import { StorageService } from "./services/storage.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Storage } from "./entitities/storage.entity";
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Section } from "./entitities/section.entity";
import { SectionService } from "./services/section.service";
import { SectionController } from "./controllers/section.controller";

@Module({
    controllers: [StorageController, SectionController],
    providers: [StorageService, SectionService],
    imports: [
        TypeOrmModule.forFeature([Storage, Section]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
              global: true,
              secret: configService.get('JWT_SECRET'),
              signOptions: { expiresIn: configService.get('JWT_EXPIRE') },
            }),
            inject: [ConfigService],
          }),
    ],
    
})
export class StorageModule {

}