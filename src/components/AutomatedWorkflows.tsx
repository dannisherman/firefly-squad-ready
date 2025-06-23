
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, Play, Pause, Settings, Clock, CheckCircle, AlertTriangle, BarChart3, FileText, Users } from "lucide-react";

export const AutomatedWorkflows = () => {
  const [workflows] = useState([
    {
      id: "WF-001",
      name: "Emergency Response Automation",
      description: "Auto-assign units based on location and availability",
      status: "Active",
      triggers: 45,
      completions: 43,
      lastRun: "2 min ago"
    },
    {
      id: "WF-002",
      name: "Patient Data Collection",
      description: "Capture and validate patient information automatically",
      status: "Active", 
      triggers: 28,
      completions: 28,
      lastRun: "5 min ago"
    },
    {
      id: "WF-003",
      name: "Billing Submission",
      description: "Process and submit insurance claims automatically",
      status: "Paused",
      triggers: 12,
      completions: 10,
      lastRun: "1 hour ago"
    },
    {
      id: "WF-004",
      name: "Schedule Optimization",
      description: "Auto-adjust schedules based on call volume predictions",
      status: "Active",
      triggers: 8,
      completions: 8,
      lastRun: "15 min ago"
    }
  ]);

  const [scheduledRules] = useState([
    { id: "SR-001", name: "Daily Report Generation", schedule: "Daily at 6:00 AM", nextRun: "Tomorrow 6:00 AM", status: "Active" },
    { id: "SR-002", name: "Weekly Performance Review", schedule: "Weekly on Monday", nextRun: "Monday 8:00 AM", status: "Active" },
    { id: "SR-003", name: "Monthly Billing Cycle", schedule: "1st of each month", nextRun: "Feb 1st 9:00 AM", status: "Active" },
    { id: "SR-004", name: "Quarterly Compliance Check", schedule: "Quarterly", nextRun: "Apr 1st 10:00 AM", status: "Scheduled" },
  ]);

  const [backgroundJobs] = useState([
    { id: "BJ-001", name: "Data Backup", progress: 100, status: "Completed", duration: "45 min" },
    { id: "BJ-002", name: "Report Generation", progress: 75, status: "Running", duration: "12 min" },
    { id: "BJ-003", name: "System Maintenance", progress: 0, status: "Queued", duration: "-" },
    { id: "BJ-004", name: "Database Optimization", progress: 100, status: "Completed", duration: "2 hours" },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": case "Running": case "Completed": return "bg-green-100 text-green-800";
      case "Paused": case "Queued": return "bg-yellow-100 text-yellow-800";
      case "Error": case "Failed": return "bg-red-100 text-red-800";
      case "Scheduled": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active": case "Running": return <Play className="h-4 w-4 text-green-600" />;
      case "Paused": case "Queued": return <Pause className="h-4 w-4 text-yellow-600" />;
      case "Completed": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "Error": case "Failed": return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Automated Workflows</h1>
        <p className="text-slate-300">Intelligent automation and workflow management system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <Zap className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">12</p>
            <p className="text-slate-600 text-sm">Active Workflows</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">97.8%</p>
            <p className="text-slate-600 text-sm">Success Rate</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">847</p>
            <p className="text-slate-600 text-sm">Hours Saved</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <BarChart3 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">1,247</p>
            <p className="text-slate-600 text-sm">Tasks Automated</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="workflows" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="workflows">Active Workflows</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Rules</TabsTrigger>
          <TabsTrigger value="background">Background Jobs</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="workflows" className="space-y-4">
          <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                <span>Workflow Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workflows.map((workflow) => (
                  <div key={workflow.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(workflow.status)}
                        <div>
                          <h4 className="font-medium text-slate-900">{workflow.name}</h4>
                          <p className="text-sm text-slate-600">{workflow.description}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(workflow.status)}>
                        {workflow.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-slate-600">Triggers: </span>
                        <span className="font-medium">{workflow.triggers}</span>
                      </div>
                      <div>
                        <span className="text-slate-600">Completions: </span>
                        <span className="font-medium">{workflow.completions}</span>
                      </div>
                      <div>
                        <span className="text-slate-600">Last Run: </span>
                        <span className="font-medium">{workflow.lastRun}</span>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2 mt-3">
                      <Button size="sm" variant="outline">
                        <Settings className="h-3 w-3 mr-1" />
                        Configure
                      </Button>
                      <Button size="sm" variant="outline">
                        View Logs
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <span>Scheduled Automation Rules</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledRules.map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-slate-900">{rule.name}</h4>
                      <p className="text-sm text-slate-600">{rule.schedule}</p>
                      <p className="text-xs text-slate-500">Next run: {rule.nextRun}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusColor(rule.status)}>
                        {rule.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="background" className="space-y-4">
          <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-purple-600" />
                <span>Background Job Monitor</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {backgroundJobs.map((job) => (
                  <div key={job.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(job.status)}
                        <div>
                          <h4 className="font-medium text-slate-900">{job.name}</h4>
                          <p className="text-sm text-slate-600">Duration: {job.duration}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(job.status)}>
                        {job.status}
                      </Badge>
                    </div>
                    {job.status === "Running" && (
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${job.progress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Total Workflows</span>
                  <span className="font-bold">15</span>
                </div>
                <div className="flex justify-between">
                  <span>Success Rate</span>
                  <span className="font-bold">97.8%</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Execution Time</span>
                  <span className="font-bold">2.3 min</span>
                </div>
                <div className="flex justify-between">
                  <span>Time Saved</span>
                  <span className="font-bold">847 hours</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle>Top Automations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Emergency Response</span>
                  <span className="font-bold">43 runs</span>
                </div>
                <div className="flex justify-between">
                  <span>Patient Data Collection</span>
                  <span className="font-bold">28 runs</span>
                </div>
                <div className="flex justify-between">
                  <span>Billing Submission</span>
                  <span className="font-bold">10 runs</span>
                </div>
                <div className="flex justify-between">
                  <span>Schedule Optimization</span>
                  <span className="font-bold">8 runs</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
