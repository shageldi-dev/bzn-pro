import { PartialType } from '@nestjs/mapped-types';
import { CreateAutopartDto } from './create-autopart.dto';

export class UpdateAutopartDto extends PartialType(CreateAutopartDto) {}
