import { PartialType } from '@nestjs/mapped-types';
import { CreateCarOptionDto } from './create-car-option.dto';

export class UpdateCarOptionDto extends PartialType(CreateCarOptionDto) {}
