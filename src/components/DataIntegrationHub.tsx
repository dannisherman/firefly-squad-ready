
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, CheckCircle, AlertTriangle, RefreshCw, FileText, Link, Settings, BarChart3 } from "lucide-react";

export const DataIntegrationHub = () => {
  const [dataSources] = useState([
    { id: "CAD", name: "Computer Aided Dispatch", status: "Connected", lastSync: "2 min ago", records: 1247 },
    { id: "ePCR", name: "Electronic Patient Care Record", status: "Connected", lastSync: "1 min ago", records: 892 },
    { id: "BILLING", name: "Billing System", status: "Connected", lastSync: "3 min ago", records: 2156 },
    { id: "HR", name: "Human Resources", status: "Syncing", lastSync: "5 min ago", records: 345 },
  ]);

  const [validationResults] = useState([
    { field: "Patient Demographics", issues: 2, status: "Warning", description: "Missing insurance info" },
    { field: "Incident Times", issues: 0, status: "Valid", description: "All timestamps accurate" },
    { field: "Unit Assignments", issues: 1, status: "Error", description: "Duplicate unit assignment" },
    { field: "Billing Codes", issues: 0, status: "Valid", description: "All codes validated" },
  ]);

  const [workflows] = useState([
    { id: "WF-001", name: "Incident to Billing", status: "Active", processed: 145, errors: 2 },
    { id: "WF-002", name: "Patient Data Sync", status: "Active", processed: 89, errors: 0 },
    { id: "WF-003", name: "NEMSIS Validation", status: "Paused", processed: 67, errors: 5 },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Connected": case "Active": case "Valid": return "bg-green-100 text-green-800";
      case "Syncing": case "Warning": return "bg-yellow-100 text-yellow-800";
      case "Error": case "Offline": case "Paused": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Connected": case "Active": case "Valid": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "Syncing": case "Warning": return <RefreshCw className="h-4 w-4 text-yellow-600" />;
      case "Error": case "Offline": case "Paused": return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Database className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Data Integration Hub</h1>
        <p className="text-slate-300">Unified platform for CAD, ePCR, and billing data management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <Database className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">4</p>
            <p className="text-slate-600 text-sm">Data Sources</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">99.2%</p>
            <p className="text-slate-600 text-sm">Data Accuracy</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <RefreshCw className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">4,640</p>
            <p className="text-slate-600 text-sm">Records Synced</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <BarChart3 className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">7</p>
            <p className="text-slate-600 text-sm">Active Workflows</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sources" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sources">Data Sources</TabsTrigger>
          <TabsTrigger value="validation">Data Validation</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="nemsis">NEMSIS</TabsTrigger>
        </TabsList>

        <TabsContent value="sources" className="space-y-4">
          <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Link className="h-5 w-5" />
                <span>Connected Systems</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dataSources.map((source) => (
                  <div key={source.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(source.status)}
                      <div>
                        <p className="font-medium text-slate-900">{source.name}</p>
                        <p className="text-sm text-slate-600">Last sync: {source.lastSync}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{source.records.toLocaleString()} records</p>
                      <Badge className={getStatusColor(source.status)}>
                        {source.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="validation" className="space-y-4">
          <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>Data Quality Validation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {validationResults.map((result, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(result.status)}
                      <div>
                        <p className="font-medium text-slate-900">{result.field}</p>
                        <p className="text-sm text-slate-600">{result.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{result.issues} issues</p>
                      <Badge className={getStatusColor(result.status)}>
                        {result.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflows" className="space-y-4">
          <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Automated Workflows</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workflows.map((workflow) => (
                  <div key={workflow.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(workflow.status)}
                      <div>
                        <p className="font-medium text-slate-900">{workflow.name}</p>
                        <p className="text-sm text-slate-600">
                          Processed: {workflow.processed} | Errors: {workflow.errors}
                        </p>
                      </div>
                    </div>
                    <div className="text-right space-x-2">
                      <Badge className={getStatusColor(workflow.status)}>
                        {workflow.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        Configure
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nemsis" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle>NEMSIS Compliance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Data Elements</span>
                  <Badge className="bg-green-100 text-green-800">98.5% Complete</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Required Fields</span>
                  <Badge className="bg-green-100 text-green-800">Valid</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Format Validation</span>
                  <Badge className="bg-yellow-100 text-yellow-800">2 Warnings</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>State Submission</span>
                  <Badge className="bg-green-100 text-green-800">Ready</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle>Export & Reporting</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate State Report
                </Button>
                <Button className="w-full" variant="outline">
                  <Database className="h-4 w-4 mr-2" />
                  Export NEMSIS Data
                </Button>
                <Button className="w-full" variant="outline">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Validate All Records
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
