import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePartNameDto {

    @IsOptional()
    @IsNumber()
    group_id: number;

    @IsString()
    @IsNotEmpty()
    name_tm: string;

    @IsString()
    @IsNotEmpty()
    name_en: string;

    @IsString()
    @IsNotEmpty()
    name_ru: string;
}
