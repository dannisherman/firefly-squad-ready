import { useState } from "react";
import { Dashboard } from "@/components/Dashboard";
import { ScheduleManager } from "@/components/ScheduleManager";
import { EmployeeManager } from "@/components/EmployeeManager";
import { AssetsInventory } from "@/components/AssetsInventory";
import { ReportingModule } from "@/components/ReportingModule";
import { MonitoringTools } from "@/components/MonitoringTools";
import { PatientAlertSystem } from "@/components/PatientAlertSystem";
import { PatientHistory } from "@/components/PatientHistory";
import { HydrantManagement } from "@/components/HydrantManagement";
import { DocumentationGenerator } from "@/components/DocumentationGenerator";
import { BillingManagement } from "@/components/BillingManagement";
import { HospitalCommHub } from "@/components/HospitalCommHub";
import { DataIntegrationHub } from "@/components/DataIntegrationHub";
import { AutomatedWorkflows } from "@/components/AutomatedWorkflows";
import { Settings } from "@/components/Settings";
import { Navigation } from "@/components/Navigation";
import { MobileNav } from "@/components/MobileNav";
import { TopBar } from "@/components/TopBar";
import { AlertSystem } from "@/components/AlertSystem";
import { EmployeeCenter } from "@/components/EmployeeCenter";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    // TODO: Implement search functionality
  };

  const handleProfileClick = () => {
    setActiveTab("settings");
  };

  const handleSettingsClick = () => {
    setActiveTab("settings");
  };

  const handleSignOutClick = () => {
    console.log("Signing out...");
    // TODO: Implement sign out functionality
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "employee-center":
        return <EmployeeCenter />;
      case "schedule":
        return <ScheduleManager />;
      case "employees":
        return <EmployeeManager />;
      case "assets":
        return <AssetsInventory />;
      case "reporting":
        return <ReportingModule />;
      case "monitoring":
        return <MonitoringTools />;
      case "patients":
        return <PatientAlertSystem />;
      case "patient-history":
        return <PatientHistory />;
      case "hydrants":
        return <HydrantManagement />;
      case "documentation":
        return <DocumentationGenerator />;
      case "billing":
        return <BillingManagement />;
      case "hospital":
        return <HospitalCommHub />;
      case "integration":
        return <DataIntegrationHub />;
      case "workflows":
        return <AutomatedWorkflows />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <AlertSystem />
      
      {/* Desktop Layout */}
      <div className="hidden md:block">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="ml-64">
          <TopBar
            onSearch={handleSearch}
            onProfileClick={handleProfileClick}
            onSettingsClick={handleSettingsClick}
            onSignOutClick={handleSignOutClick}
          />
          <main className="p-6">
            <div className="max-w-7xl mx-auto">
              {renderActiveComponent()}
            </div>
          </main>
        </div>
      </div>
      
      {/* Mobile Layout */}
      <div className="md:hidden">
        <MobileNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onProfileClick={handleProfileClick}
          onSettingsClick={handleSettingsClick}
          onSignOutClick={handleSignOutClick}
        />
        <main className="p-4">
          <div className="max-w-7xl mx-auto">
            {renderActiveComponent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
