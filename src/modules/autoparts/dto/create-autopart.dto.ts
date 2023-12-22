import { IsEnum, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { IsUsed } from "../enums/isused.enum";
import { FrontBack, Side } from "../enums/side.enum";
import { Status } from "../enums/status.enum";
import { Exclude, Transform, Type } from "class-transformer";

export class CreateAutopartDto {
    
    @Transform(params => params.value === '' ? null : +params.value)
    @IsInt()
    @IsOptional()
    brand_id: number;

    @Transform(params => params.value === '' ? null: +params.value)
    @IsInt()
    @IsOptional()
    model_id: number;

    @Transform(params => params.value === '' ? null: +params.value)
    @IsInt()
    @IsOptional()
    generation_id: number;

    @Transform(params => params.value === '' ? null : +params.value)
    @IsInt()
    @IsOptional()
    manufacturer_id: number;

    @Transform(params => params.value === '' ? null : +params.value)
    @IsInt()
    @IsOptional()
    category_id: number;

    @Transform(params => params.value === '' ? null : params.value)
    @IsOptional()
    @IsInt()
    price_id: number;

    @IsNotEmpty()
    name: string;

    @Transform(params => params.value === '' ? null: params.value)
    @IsOptional()
    color: string;

    @Transform(params => params.value === '' ? null: params.value)
    @IsOptional()
    comment: string;

    @Transform(params => params.value === '' ? null: params.value)
    @IsOptional()
    @IsString()
    cross_number: string;

    @Transform(params => params.value === '' ? null: params.value)
    @IsEnum(FrontBack)
    front_back: FrontBack;

    @Transform(params => params.value === '' || 'false' ? false: true)
    is_archive: boolean;

    @IsEnum(IsUsed)
    is_used: IsUsed; 

    @Transform(params => params.value === '' ? null: params.value)
    @IsEnum(Side)
    left_right: Side;
    
    @Transform(params => params.value === '' ? null: params.value)
    @IsOptional()
    marking: string;

    @IsOptional()
    @IsString()
    manufacturer_no: string;

    @Transform(params => params.value === '' ? null: params.value)
    @IsOptional()
    note: string;

    @Transform(params => params.value === '' || 'false' ? false : true)
    not_for_export: boolean; 

    @Transform(params => params.value === '' ? null: +params.value)
    @IsInt()
    @IsOptional()
    number_of_part: number;

    @Transform(params => params.value === '' ? null: params.value)
    old_bar_code: string;

    @Transform(params => params.value === '' ? null: params.value)
    old_data: string;

    

    @Transform(params => params.value === '' ? null: params.value)
    site_link: string;

    @IsOptional()
    @IsEnum(Status)
    status: Status;

    @Transform(params => params.value === '' ? null: +params.value)
    @IsInt()
    @IsOptional()
    year: number;

}
