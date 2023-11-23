import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { RequiredPermissions } from 'src/decorator/permission.decorator';
import PermissionEntity from 'src/modules/roles/entity/permission.entity';
import { RoleAction, RoleSubject } from 'src/modules/roles/roles.constant';
import { User } from 'src/modules/user/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(PermissionEntity)
    private readonly permissionRepository: Repository<PermissionEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get(RequiredPermissions, context.getHandler());
    if (!roles) {
      return true;
    }
    const actions = roles.map((it) => it.action);
    const subjects = roles.map((it) => it.subject);
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(user);
    const dbUser = await this.userRepository.findOne({
      where: { id: user.sub },
    });
    const permissions = await this.permissionRepository.findBy({
      roleId: dbUser.roleId,
    });

    if (permissions.length <= 0) {
      throw new ForbiddenException(
        `You don't have access ${actions.join(',')} to ${subjects.join(',')}`,
      );
    }
    if (
      permissions.filter(
        (it) =>
          it.action === RoleAction.MANAGE && it.subject === RoleSubject.ALL,
      ).length > 0
    ) {
      return true;
    }

    return permissions.every(
      (it) => actions.includes(it.action) && subjects.includes(it.subject),
    );
  }
}
