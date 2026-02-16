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
  | 'travel:create'
  | 'travel:approve'
  | 'travel:reject'
  | 'expense:create'
  | 'expense:approve'
  | 'expense:reject'
  
const rolePermissions: Record<Role, Permission[]> = {
  HR: [
    'job:view', 'job:edit', 'job:create','job:delete','job:refer','job:share', 'travel:create'
  ],
  MANAGER :[
    'job:view', 'job:edit', 'job:create','job:delete','job:refer','job:share'
  ],
  EMPLOYEE : [
    'job:view', 'job:share' , 'job:refer', 'expense:create'
  ]
};

export const hasPermission = (
  userRole: string | null,
  permission: Permission
): boolean => {
  if (!userRole) return false;

  const permissions = rolePermissions[userRole as Role] || []
  return permissions.includes(permission)
};

export const hasAnyPermission = (
  userRoles: string | null,
  permissions: Permission[]
): boolean => {
  return permissions.some(permission => hasPermission(userRoles, permission));
};

export const hasAllPermissions = (
  userRole: string | null,
  permissions: Permission[]
): boolean => {
  return permissions.every(permission => hasPermission(userRole, permission));
};

export const getUserPermissions = (userRole: string | null): Permission[] => {
  if (!userRole ) return [];
  
  return rolePermissions[userRole as Role] || []
};

export const hasRole = (userRole: string | null, role: Role): boolean => {
  if (!userRole) return false;
  return userRole===role;
};
