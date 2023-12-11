import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { StorageService } from "../services/storage.service";
import { CreateStorageDto } from "../dtos/create-storage.dto";
import { AuthGuard } from "src/guard/auth.guard";
import { UpdateStorageDto } from "../dtos/update-storage.dto";

@Controller('/storages')
export class StorageController {
    constructor(
        private readonly storageService: StorageService
    ) {}

    @Get("/")
    getAllStorages() {
        return this.storageService.getAll()
    }

    @Get("/:id")
    getStorageByID(@Param('id') id: string) {
        console.log(id)
        return this.storageService.getById(+id)
    }

    @UseGuards(AuthGuard)
    @Post("/")
    createStorage(@Body() body: CreateStorageDto, @Request() req: any) {
        body['created_by']= req.user.sub
        return this.storageService.create(body)
    }

    @UseGuards(AuthGuard)
    @Put("/:id")
    updateStorage(@Param('id') id: number, @Body() body: UpdateStorageDto, @Request() req: any) {
        body['updated_by'] = req.user.sub
        return this.storageService.update(id, body)
    }

    @UseGuards(AuthGuard)
    @Delete("/:id")
    deleteStorage(@Param('id') id: number) {
        return this.storageService.delete(+id)
    }
}   