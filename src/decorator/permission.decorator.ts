import { Reflector } from '@nestjs/core';

interface RequiredPermission {
  action: string;
  subject: string;
}

export const RequiredPermissions =
  Reflector.createDecorator<RequiredPermission[]>();
