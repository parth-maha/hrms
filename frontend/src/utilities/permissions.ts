// Role-based permission utilities

export type Role = 
  | 'HR'
  | 'MANAGER'  
  | 'EMPLOYEE'  

export type Permission =
  | 'job:create'
  | 'job:edit'
  | 'job:delete'
  | 'job:view'
  | 'job:share'
  | 'job:refer'
  
const rolePermissions: Record<Role, Permission[]> = {
  HR: [
    'job:view', 'job:edit', 'job:create','job:delete','job:refer','job:share'
  ],
  MANAGER :[
    'job:view', 'job:edit', 'job:create','job:delete','job:refer','job:share'
  ],
  EMPLOYEE : [
    'job:view', 'job:share' , 'job:refer'
  ]
};

export const hasPermission = (
  userRoles: Role[],
  permission: Permission
): boolean => {
  if (!userRoles || userRoles.length === 0) return false;
  
  return userRoles.some(role => {
    const permissions = rolePermissions[role as Role] || [];
    return permissions.includes(permission);
  });
};

export const hasAnyPermission = (
  userRoles: Role[],
  permissions: Permission[]
): boolean => {
  return permissions.some(permission => hasPermission(userRoles, permission));
};

export const hasAllPermissions = (
  userRoles: Role[],
  permissions: Permission[]
): boolean => {
  return permissions.every(permission => hasPermission(userRoles, permission));
};

export const getUserPermissions = (userRoles: Role[]): Permission[] => {
  if (!userRoles || userRoles.length === 0) return [];
  
  const allPermissions = new Set<Permission>();
  userRoles.forEach(role => {
    const permissions = rolePermissions[role as Role] || [];
    permissions.forEach(p => allPermissions.add(p));
  });
  
  return Array.from(allPermissions);
};

export const hasRole = (userRoles: Role[], role: Role): boolean => {
  if (!userRoles || userRoles.length === 0) return false;
  return userRoles.includes(role);
};

export const hasAnyRole = (userRoles: Role[], roles: Role[]): boolean => {
  if (!userRoles || userRoles.length === 0) return false;
  return roles.some(role => userRoles.includes(role));
};