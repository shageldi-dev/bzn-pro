import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateStorageDto {

    @IsNotEmpty()
    @IsString()
    name_tm: string;

    @IsNotEmpty()
    @IsString()
    name_en: string;

    @IsNotEmpty()
    @IsString()
    name_ru: string;

    @IsString()
    website: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    abbr: string;

    @IsNotEmpty()
    @IsString()    
    description_tm: string;
    
    @IsNotEmpty()
    @IsString() 
    description_en: string;

    @IsNotEmpty()
    @IsString() 
    description_ru: string;
 
    @IsBoolean()
    is_hidden: boolean;

    @IsBoolean()
    is_issue_point: boolean;

    @IsBoolean()
    is_income_point: boolean;
}