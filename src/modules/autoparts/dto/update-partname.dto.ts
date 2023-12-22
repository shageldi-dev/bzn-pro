import { PartialType } from "@nestjs/mapped-types";
import { CreatePartNameDto } from "./create-partname.dto";

export class UpdatePartNameDto extends PartialType(CreatePartNameDto) {}