import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AutopartGroup } from "../entities/autopart_group.entity";
import { Repository } from "typeorm";

@Injectable()
export class AutopartGroupService {
    constructor(
        @InjectRepository(AutopartGroup) private readonly AutopartGroupRepo: Repository<AutopartGroup>
    ) {}

    findAll() {
        return this.AutopartGroupRepo.find()
    }
    
}