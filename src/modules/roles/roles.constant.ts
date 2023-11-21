export enum RoleAction {
  READ = 'read',
  MANAGE = 'manage',
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}

export enum RoleSubject {
  USER = 'User',
  AUTOPART = 'AutoPart',
  SELL = 'Sell',
  ALL = 'all',
}

export const RoleActions = [
  RoleAction.READ,
  RoleAction.MANAGE,
  RoleAction.CREATE,
  RoleAction.UPDATE,
  RoleAction.DELETE,
];
export const RoleSubjects = [
  RoleSubject.USER,
  RoleSubject.AUTOPART,
  RoleSubject.SELL,
  RoleSubject.ALL,
];
