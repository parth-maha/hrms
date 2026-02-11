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
  const role = useAuthStore((state: any) => state.roles);

  const permissions = useMemo(() => ({
    // Check if user has a specific permission
    can: (permission: Permission): boolean => {
      return hasPermission(role, permission);
    },

    // Check if user has any of the specified permissions
    canAny: (permissions: Permission[]): boolean => {
      return hasAnyPermission(role, permissions);
    },

    // Check if user has all of the specified permissions
    canAll: (permissions: Permission[]): boolean => {
      return hasAllPermissions(role, permissions);
    },

    // Get all user permissions
    all: (): Permission[] => {
      return getUserPermissions(role);
    },

  }), [role]);

  return permissions;
};

export default usePermissions;