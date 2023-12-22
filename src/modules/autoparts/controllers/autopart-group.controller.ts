import { Controller, Get } from "@nestjs/common";
import { AutopartGroupService } from "../services/autopart-group.service";

@Controller('group')
export class AutopartGroupController {
    constructor(
        private readonly service: AutopartGroupService
    ) {}

    @Get('')
    getAllAutoPartGroups() {
        return this.service.findAll()
    }
}