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
        "dashboard", "employee-center", "schedule", "employees", "assets", "reporting", "monitoring",
        "patients", "patient-history", "hydrants", "documentation", "itm-reports",
        "billing", "hospital", "integration", "workflows", "alerts", "settings",
        "time-off", "payroll-reporting" // Added itm-reports permission
      ]
    };
    
    setUserRole(mockUserData);
  }, []);

  const hasAccess = (moduleId: string) => {
    return userRole.permissions.includes(moduleId);
  };

  const getRoleBasedModules = () => {
    const roleModules = {
      responder: ["dashboard", "employee-center", "monitoring", "patients", "patient-history", "alerts", "time-off"],
      admin: ["dashboard", "employee-center", "schedule", "employees", "assets", "reporting", "billing", "settings", "integration", "workflows", "time-off", "payroll-reporting", "itm-reports"],
      medic: ["dashboard", "employee-center", "patients", "hospital", "documentation", "patient-history", "monitoring", "time-off"]
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
