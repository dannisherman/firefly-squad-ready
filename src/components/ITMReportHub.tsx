
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ITMReportSubmission } from "./ITMReportSubmission";
import { SystemsManager } from "./SystemsManager";
import { AHJDirectory } from "./AHJDirectory";
import { ServiceProviderCollaboration } from "./ServiceProviderCollaboration";
import { ITMReportDashboard } from "./ITMReportDashboard";
import { FileText, Building, MapPin, Users, BarChart3 } from "lucide-react";

export const ITMReportHub = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">ITM Report Hub</h1>
          <p className="text-slate-400">Manage inspection, testing, and maintenance reports</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-slate-800">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="submit-report" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Submit Report
          </TabsTrigger>
          <TabsTrigger value="manage-systems" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Systems
          </TabsTrigger>
          <TabsTrigger value="ahj-directory" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            AHJ Directory
          </TabsTrigger>
          <TabsTrigger value="collaboration" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Collaboration
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <ITMReportDashboard />
        </TabsContent>

        <TabsContent value="submit-report">
          <ITMReportSubmission />
        </TabsContent>

        <TabsContent value="manage-systems">
          <SystemsManager />
        </TabsContent>

        <TabsContent value="ahj-directory">
          <AHJDirectory />
        </TabsContent>

        <TabsContent value="collaboration">
          <ServiceProviderCollaboration />
        </TabsContent>
      </Tabs>
    </div>
  );
};
