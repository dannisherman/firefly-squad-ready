
import { Shield, Calendar, Users, Bell, Settings, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "schedule", label: "Scheduling", icon: Calendar },
    { id: "employees", label: "Personnel", icon: Users },
    { id: "alerts", label: "Alerts", icon: Bell },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-slate-800/95 backdrop-blur-sm border-r border-slate-700 z-40">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <Shield className="h-8 w-8 text-red-500" />
          <div>
            <h1 className="text-xl font-bold text-white">FireOps</h1>
            <p className="text-xs text-slate-400">Scheduling System</p>
          </div>
        </div>
        
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
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
  );
};
