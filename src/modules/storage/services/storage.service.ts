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
        return this.storageRepo.find()
    }

    async getById(id: number) {
        const storage = await this.storageRepo.findOneBy({id})
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