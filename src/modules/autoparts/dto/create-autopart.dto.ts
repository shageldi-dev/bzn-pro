import { IsEnum, IsInt, IsNotEmpty, IsOptional } from "class-validator";
import { IsUsed } from "../enums/isused.enum";
import { FrontBack, Side } from "../enums/side.enum";
import { Status } from "../enums/status.enum";
import { Exclude, Transform, Type } from "class-transformer";

export class CreateAutopartDto {
    
    @Transform(params => params.value === '' ? null : +params.value)
    @IsInt()
    brand_id: number;

    @Transform(params => params.value === '' ? null: +params.value)
    @IsInt()
    model_id: number;

    @Transform(params => params.value === '' ? null: +params.value)
    @IsInt()
    generation_id: number;

    @Transform(params => params.value === '' ? null : +params.value)
    @IsInt()
    manufacturer_id: number;

    @IsNotEmpty()
    name: string;

    @Transform(params => params.value === '' ? null: params.value)
    @IsEnum(FrontBack)
    front_back: FrontBack;

    @Transform(params => params.value === '' ? null: params.value)
    @IsEnum(Side)
    left_right: Side;

    @Transform(params => params.value === '' ? null: +params.value)
    @IsInt()
    @IsOptional()
    number_of_part: number;

    @Transform(params => params.value === '' ? null: +params.value)
    @IsInt()
    @IsOptional()
    year: number;

    @Transform(params => params.value === '' ? null: params.value)
    @IsOptional()
    color: string;

    @Transform(params => params.value === '' ? null: params.value)
    @IsOptional()
    comment: string;

    @Transform(params => params.value === '' ? null: +params.value)
    @IsOptional()
    @IsInt()
    cross_number: number;

    @Transform(params => params.value === '' ? null: params.value)
    @IsOptional()
    note: string;
    
    @Transform(params => params.value === '' ? null: params.value)
    @IsOptional()
    marking: string;

    @Transform(params => params.value === '' || 'false' ? false: true)
    is_archive: boolean;

    @Transform(params => params.value === '' || 'false' ? false : true)
    not_for_export: boolean; 

    @Transform(params => params.value === '' ? null: params.value)
    site_link: string;

    @Transform(params => params.value === '' ? null: params.value)
    video: string;

    @Transform(params => params.value === '' ? null: params.value)
    old_bar_code: string;

    @Transform(params => params.value === '' ? null: params.value)
    old_data: string;
    
    
    @IsEnum(IsUsed)
    is_used: IsUsed; 

    @IsEnum(Status)
    status: Status;
}
