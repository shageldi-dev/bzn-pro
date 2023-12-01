import { IsUsed } from "../enums/isused.enum";
import { FrontBack, Side } from "../enums/side.enum";
import { Status } from "../enums/status.enum";

export class CreateAutopartDto {
    autopart_id: number;
    brand_id: number;
    model_id: number;
    generation_id: number;
    genversion_id: number;
    body_id: number;
    engine_id: number;
    manufacturer_id: number;
    name: string;
    front_back: FrontBack;
    left_right: Side;
    number_of_part: number;
    year: number;
    color: string;
    comment: string;
    cross_number: number;
    note: string; 
    marking: string;
    is_archive: boolean;
    not_for_export: boolean; 
    site_link: string;
    // partname_id: number;  
    video: string;
    old_bar_code: string;
    old_data: string; 
    is_used: IsUsed; 
    status: Status;
}
