
import { useState, useEffect } from "react";

export type UserRole = "responder" | "admin" | "medic";

interface UserRoleData {
  role: UserRole;
  permissions: string[];
}

// This would typically come from Supabase Auth or your authentication system
export const useUserRole = () => {
  const [userRole, setUserRole] = useState<UserRoleData>({
    role: "admin", // Default for demo - would come from auth
    permissions: []
  });

  useEffect(() => {
    // In a real app, this would fetch from Supabase or your auth provider
    const mockUserData = {
      role: "admin" as UserRole,
      permissions: [
        "dashboard", "schedule", "employees", "reporting", "monitoring",
        "patients", "patient-history", "hydrants", "documentation",
        "billing", "hospital", "integration", "workflows", "alerts", "settings"
      ]
    };
    
    setUserRole(mockUserData);
  }, []);

  const hasAccess = (moduleId: string) => {
    return userRole.permissions.includes(moduleId);
  };

  const getRoleBasedModules = () => {
    const roleModules = {
      responder: ["dashboard", "monitoring", "patients", "patient-history", "alerts"],
      admin: ["dashboard", "schedule", "employees", "reporting", "billing", "settings", "integration", "workflows"],
      medic: ["dashboard", "patients", "hospital", "documentation", "patient-history", "monitoring"]
    };
    
    return roleModules[userRole.role] || [];
  };

  return {
    userRole: userRole.role,
    permissions: userRole.permissions,
    hasAccess,
    getRoleBasedModules
  };
};
