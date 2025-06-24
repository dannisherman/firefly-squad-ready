
import { Shield, Calendar, Users, Bell, Settings, BarChart3, Menu, X, FileText, Activity, Heart, DollarSign, Hospital, Database, Zap, Droplets, History, PenTool } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useUserRole } from "@/hooks/useUserRole";
import { UserProfile } from "./UserProfile";

interface MobileNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onSignOutClick?: () => void;
}

export const MobileNav = ({ activeTab, onTabChange, onProfileClick, onSettingsClick, onSignOutClick }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { hasAccess } = useUserRole();

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "schedule", label: "Scheduling", icon: Calendar },
    { id: "employees", label: "Personnel", icon: Users },
    { id: "reporting", label: "Analytics", icon: FileText },
    { id: "monitoring", label: "Live Monitor", icon: Activity },
    { id: "patients", label: "Patient Alerts", icon: Heart },
    { id: "patient-history", label: "Patient History", icon: History },
    { id: "hydrants", label: "Hydrant Management", icon: Droplets },
    { id: "documentation", label: "Documentation AI", icon: PenTool },
    { id: "billing", label: "Billing", icon: DollarSign },
    { id: "hospital", label: "Hospital Hub", icon: Hospital },
    { id: "integration", label: "Data Integration", icon: Database },
    { id: "workflows", label: "Workflows", icon: Zap },
    { id: "alerts", label: "Alerts", icon: Bell },
    { id: "settings", label: "Settings", icon: Settings },
  ].filter(item => hasAccess(item.id));

  const handleTabChange = (tab: string) => {
    onTabChange(tab);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="bg-slate-800/95 backdrop-blur-sm border-b border-slate-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-6 w-6 text-red-500" />
            <h1 className="text-lg font-bold text-white">FireOps</h1>
          </div>
          <div className="flex items-center space-x-2">
            <UserProfile
              onProfileClick={onProfileClick}
              onSettingsClick={onSettingsClick}
              onSignOutClick={onSignOutClick}
            />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setIsOpen(false)} />
      )}

      {/* Mobile Menu */}
      <nav
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-slate-800 transform transition-transform duration-300 z-50 overflow-y-auto",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <Shield className="h-8 w-8 text-red-500" />
            <div>
              <h1 className="text-xl font-bold text-white">FireOps</h1>
              <p className="text-xs text-slate-400">Command Center</p>
            </div>
          </div>
          
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleTabChange(item.id)}
                    className={cn(
                      "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200",
                      activeTab === item.id
                        ? "bg-red-600 text-white shadow-lg"
                        : "text-slate-300 hover:bg-slate-700 hover:text-white"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
};
