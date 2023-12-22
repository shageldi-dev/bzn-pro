import { IsNotEmpty, IsNumber } from "class-validator";

export class CreatePriceDto {
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    sale_price: number;

    @IsNotEmpty()
    @IsNumber()
    autopart_id: number;
}
