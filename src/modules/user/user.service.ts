import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import PermissionEntity from '../roles/entity/permission.entity';
import { subject } from '@casl/ability';

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(PermissionEntity) private readonly permissionRepository: Repository<PermissionEntity>
  ) {}


  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const oldUser = await this.userRepository.find({where: {username: createUserDto.username}})
    
    if (oldUser.length > 0) {
      throw new BadRequestException('username is already taken')
    }

    try {
      const user: User = new User();
      user.name = createUserDto.name;
      user.age = createUserDto.age;
      user.email = createUserDto.email;
      user.username = createUserDto.username;
      user.password = await User.hashPassword(createUserDto.password);
      user.gender = createUserDto.gender;
      user.roleId = createUserDto.roleId;
      const newUser = await this.userRepository.save(user);
      delete newUser.password;

      return newUser;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  
  findAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  
  viewUser(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  findOne(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username: username });
  }

  async findWithRelations(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id
      },
      relations: ['role']
    })

    const permissions = await this.permissionRepository.findBy({roleId: user.roleId});
    
    const permissionsResponse = permissions.map(p => {return {
      action: p.action,
      subject: p.subject
    }})
    
    return {permissions: permissionsResponse, role: user.role.name};
  }

  
  updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = new User();
    user.name = updateUserDto.name;
    user.age = updateUserDto.age;
    user.email = updateUserDto.email;
    user.username = updateUserDto.username;
    user.password = updateUserDto.password;
    user.roleId = updateUserDto.roleId;
    user.id = id;
    return this.userRepository.save(user);
  }

  
  removeUser(id: number): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }
}
