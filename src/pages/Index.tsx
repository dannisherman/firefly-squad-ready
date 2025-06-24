
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { MobileNav } from "@/components/MobileNav";
import { Dashboard } from "@/components/Dashboard";
import { EmployeeCenter } from "@/components/EmployeeCenter";
import { ShiftLogging } from "@/components/ShiftLogging";
import { ScheduleManager } from "@/components/ScheduleManager";
import { EmployeeManager } from "@/components/EmployeeManager";
import { AssetsInventory } from "@/components/AssetsInventory";
import { ReportingModule } from "@/components/ReportingModule";
import { MonitoringTools } from "@/components/MonitoringTools";
import { PatientAlertSystem } from "@/components/PatientAlertSystem";
import { PatientHistory } from "@/components/PatientHistory";
import { HydrantManagement } from "@/components/HydrantManagement";
import { DocumentationGenerator } from "@/components/DocumentationGenerator";
import { ITMReportHub } from "@/components/ITMReportHub";
import { BillingManagement } from "@/components/BillingManagement";
import { HospitalCommHub } from "@/components/HospitalCommHub";
import { DataIntegrationHub } from "@/components/DataIntegrationHub";
import { AutomatedWorkflows } from "@/components/AutomatedWorkflows";
import { AlertSystem } from "@/components/AlertSystem";
import { Settings } from "@/components/Settings";
import { TopBar } from "@/components/TopBar";
import { useUserRole } from "@/hooks/useUserRole";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { userRole } = useUserRole();

  const currentUser = {
    id: "EMP-001",
    name: "John Smith",
    badge: "FF-101",
    role: userRole,
    station: "Engine 1",
    shift: "A"
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "employee-center":
        return <EmployeeCenter />;
      case "shift-logging":
        return <ShiftLogging currentUser={currentUser} />;
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
      case "itm-reports":
        return <ITMReportHub />;
      case "billing":
        return <BillingManagement />;
      case "hospital":
        return <HospitalCommHub />;
      case "integration":
        return <DataIntegrationHub />;
      case "workflows":
        return <AutomatedWorkflows />;
      case "alerts":
        return <AlertSystem />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900">
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <MobileNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        <TopBar />
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
