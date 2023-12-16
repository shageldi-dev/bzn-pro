import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Storage } from "../entitities/storage.entity";
import { Repository } from "typeorm";
import { CreateStorageDto } from "../dtos/create-storage.dto";
import { UpdateStorageDto } from "../dtos/update-storage.dto";

@Injectable()
export class StorageService {
    constructor(
        @InjectRepository(Storage) private readonly storageRepo: Repository<Storage>
    ) {}

    getAll() {
        return this.storageRepo.find({relations: ['creator', 'updater']})
    }

    async getById(id: number) {
        const storage = await this.storageRepo.createQueryBuilder("storage")
        
        .leftJoinAndSelect("storage.updater", "updater")
        .leftJoinAndSelect("storage.creator", "creator")
        .select([
            "storage.id",
            "storage.name_tm",
            "storage.name_en",
            "storage.name_ru",
            "storage.website",
            "storage.phone",
            "storage.abbr",
            "storage.description_tm",
            "storage.description_en",
            "storage.description_ru",
            "bar_code_prefix",
	        "is_hidden",
	        "is_issue_point",
	        "is_income_point",
            "updater.name",
            "updater.email",
            "creator.name",
            "creator.email"
            
        ])
        .where("storage.id = :id", {id})
        .getOne()
        if (!storage) throw new NotFoundException('storage not found')
        return storage
    }

    async create(storageBody: CreateStorageDto) {
        const storage = await this.storageRepo.create(storageBody)

        return this.storageRepo.save(storage)
    }

    async update(id: number, body: UpdateStorageDto) {
        const storage = await this.storageRepo.findOneBy({id})
        if (!storage) {
            throw new NotFoundException('storage not found')
        }
        const updatedStorage = {...storage, ...body}

        return this.storageRepo.save(updatedStorage)
    }

    async delete(id: number) {
        const storage = await this.storageRepo.findOneBy({id})
        if (!storage) {
            throw new NotFoundException('storage not found')
        }

        return this.storageRepo.remove(storage)
    }
}