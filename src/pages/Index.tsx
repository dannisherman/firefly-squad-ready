
import { useState } from "react";
import { Dashboard } from "@/components/Dashboard";
import { ScheduleManager } from "@/components/ScheduleManager";
import { EmployeeManager } from "@/components/EmployeeManager";
import { ReportingModule } from "@/components/ReportingModule";
import { MonitoringTools } from "@/components/MonitoringTools";
import { PatientAlertSystem } from "@/components/PatientAlertSystem";
import { BillingManagement } from "@/components/BillingManagement";
import { HospitalCommHub } from "@/components/HospitalCommHub";
import { DataIntegrationHub } from "@/components/DataIntegrationHub";
import { AutomatedWorkflows } from "@/components/AutomatedWorkflows";
import { Navigation } from "@/components/Navigation";
import { MobileNav } from "@/components/MobileNav";
import { AlertSystem } from "@/components/AlertSystem";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "schedule":
        return <ScheduleManager />;
      case "employees":
        return <EmployeeManager />;
      case "reporting":
        return <ReportingModule />;
      case "monitoring":
        return <MonitoringTools />;
      case "patients":
        return <PatientAlertSystem />;
      case "billing":
        return <BillingManagement />;
      case "hospital":
        return <HospitalCommHub />;
      case "integration":
        return <DataIntegrationHub />;
      case "workflows":
        return <AutomatedWorkflows />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <AlertSystem />
      
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <MobileNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      
      {/* Main Content */}
      <main className="md:ml-64 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {renderActiveComponent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
