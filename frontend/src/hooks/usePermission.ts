import { useMemo } from 'react';
import useAuthStore from '../store/auth.store';
import { 
  hasPermission, 
  hasAnyPermission, 
  hasAllPermissions,
  getUserPermissions,
  type Permission,
} from '../utilities/permissions';

export const usePermissions = () => {
  const roles = useAuthStore((state: any) => state.roles);

  const permissions = useMemo(() => ({
    // Check if user has a specific permission
    can: (permission: Permission): boolean => {
      return hasPermission(roles, permission);
    },

    // Check if user has any of the specified permissions
    canAny: (permissions: Permission[]): boolean => {
      return hasAnyPermission(roles, permissions);
    },

    // Check if user has all of the specified permissions
    canAll: (permissions: Permission[]): boolean => {
      return hasAllPermissions(roles, permissions);
    },

    // Get all user permissions
    all: (): Permission[] => {
      return getUserPermissions(roles);
    },

  }), [roles]);

  return permissions;
};

export default usePermissions;