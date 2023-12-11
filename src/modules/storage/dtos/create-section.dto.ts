import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { SectionType } from "../enums/section.enum";

export class CreateSectionDto {

    @IsNumber()
    @IsOptional()
    parent_id?: number;
 
    @IsNumber()
    @IsOptional()
    autoart_group_id?: number;

    @IsNumber()
    @IsNotEmpty()
    storage_id: number;

    @IsNotEmpty()
    @IsString()
    name_tm: string;

    @IsNotEmpty()
    @IsString()
    name_en: string;

    @IsNotEmpty()
    @IsString()
    name_ru: string;

    @IsNumber()
    section_number: number;

    @IsEnum(SectionType)
    @IsNotEmpty()
    section_type: SectionType;

    @IsNumber()
    space_count: number;
}