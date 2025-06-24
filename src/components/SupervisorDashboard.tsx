
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, CheckCircle, XCircle, Edit, BarChart3, Download, AlertTriangle, Clock } from "lucide-react";

interface SupervisorDashboardProps {
  currentUser: {
    id: string;
    name: string;
    badge: string;
    role: string;
    station: string;
    shift: string;
  };
}

export const SupervisorDashboard = ({ currentUser }: SupervisorDashboardProps) => {
  const [pendingApprovals] = useState([
    {
      id: "PA-001",
      type: "Timesheet",
      employee: "Mike Johnson",
      badge: "FF-102",
      period: "June 17-30, 2024",
      totalHours: 168,
      overtimeHours: 24,
      submitted: "2024-06-24",
      flagged: false
    },
    {
      id: "PA-002",
      type: "Leave Request",
      employee: "Sarah Wilson",
      badge: "FF-103", 
      details: "Vacation: July 1-5, 2024 (120 hours)",
      submitted: "2024-06-23",
      flagged: false
    },
    {
      id: "PA-003",
      type: "Shift Swap",
      employee: "Tom Davis",
      badge: "FF-104",
      details: "Swap July 10 with Mike Johnson",
      submitted: "2024-06-22",
      flagged: false
    }
  ]);

  const [timesheetReports] = useState([
    {
      employee: "Mike Johnson",
      badge: "FF-102",
      regularHours: 144,
      overtimeHours: 24,
      totalHours: 168,
      exceptions: 1,
      status: "Pending"
    },
    {
      employee: "Sarah Wilson", 
      badge: "FF-103",
      regularHours: 120,
      overtimeHours: 16,
      totalHours: 136,
      exceptions: 0,
      status: "Approved"
    },
    {
      employee: "Tom Davis",
      badge: "FF-104",
      regularHours: 168,
      overtimeHours: 32,
      totalHours: 200,
      exceptions: 2,
      status: "Flagged"
    }
  ]);

  const [editingTimesheet, setEditingTimesheet] = useState<string | null>(null);

  const handleApproval = (id: string, action: string) => {
    console.log(`${action} approval ${id} by ${currentUser.name}`);
  };

  const handleExport = (format: string) => {
    console.log(`Exporting data in ${format} format`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Flagged": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">{pendingApprovals.length}</p>
            <p className="text-slate-600 text-sm">Pending Approvals</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">856</p>
            <p className="text-slate-600 text-sm">Total OT Hours</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">3</p>
            <p className="text-slate-600 text-sm">Exceptions</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <BarChart3 className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">12</p>
            <p className="text-slate-600 text-sm">Active Staff</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="approvals" className="space-y-4">
        <TabsList className="bg-white/10 backdrop-blur-sm">
          <TabsTrigger value="approvals" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
            Pending Approvals
          </TabsTrigger>
          <TabsTrigger value="manual-edit" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
            Manual Edit Tool
          </TabsTrigger>
          <TabsTrigger value="reports" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
            Reports & Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="approvals">
          <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Pending Approvals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingApprovals.map((approval) => (
                  <div key={approval.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-slate-900">{approval.employee}</h4>
                          <Badge variant="outline">Badge #{approval.badge}</Badge>
                          <Badge className="bg-blue-100 text-blue-800">{approval.type}</Badge>
                        </div>
                        {approval.type === "Timesheet" && (
                          <p className="text-sm text-slate-600">
                            Period: {approval.period} | Total: {approval.totalHours}h | OT: {approval.overtimeHours}h
                          </p>
                        )}
                        {approval.type !== "Timesheet" && (
                          <p className="text-sm text-slate-600">{approval.details}</p>
                        )}
                        <p className="text-xs text-slate-500">Submitted: {approval.submitted}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleApproval(approval.id, "Approve")}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleApproval(approval.id, "Deny")}
                        >
                          <XCircle className="h-3 w-3 mr-1" />
                          Deny
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manual-edit">
          <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Edit className="h-5 w-5 mr-2" />
                Manual Edit Tool
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">
                      Employee
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select employee" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emp-001">Mike Johnson - FF-102</SelectItem>
                        <SelectItem value="emp-002">Sarah Wilson - FF-103</SelectItem>
                        <SelectItem value="emp-003">Tom Davis - FF-104</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">
                      Date Range
                    </label>
                    <Input type="date" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">
                      Action
                    </label>
                    <Button>Search Entries</Button>
                  </div>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Regular Hours</TableHead>
                    <TableHead>Overtime Hours</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {timesheetReports.slice(0, 3).map((report, index) => (
                    <TableRow key={index}>
                      <TableCell>{report.employee}</TableCell>
                      <TableCell>2024-06-24</TableCell>
                      <TableCell>
                        {editingTimesheet === `${index}-regular` ? (
                          <Input type="number" defaultValue={24} className="w-20" />
                        ) : (
                          "24"
                        )}
                      </TableCell>
                      <TableCell>
                        {editingTimesheet === `${index}-overtime` ? (
                          <Input type="number" defaultValue={8} className="w-20" />
                        ) : (
                          "8"
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingTimesheet(editingTimesheet ? null : `${index}-regular`)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
                <h4 className="font-medium text-yellow-800 mb-2">Audit Log Entry</h4>
                <Textarea
                  placeholder="Reason for manual edit (required for audit trail)..."
                  rows={2}
                />
                <Button className="mt-2" size="sm">
                  Save Changes & Log
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Reports & Analytics
                </CardTitle>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleExport("CSV")}
                    variant="outline"
                    size="sm"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    CSV
                  </Button>
                  <Button
                    onClick={() => handleExport("JSON")}
                    variant="outline"
                    size="sm"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    JSON
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Badge</TableHead>
                    <TableHead>Regular Hours</TableHead>
                    <TableHead>Overtime Hours</TableHead>
                    <TableHead>Total Hours</TableHead>
                    <TableHead>Exceptions</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {timesheetReports.map((report, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{report.employee}</TableCell>
                      <TableCell>{report.badge}</TableCell>
                      <TableCell>{report.regularHours}</TableCell>
                      <TableCell className="text-orange-600">{report.overtimeHours}</TableCell>
                      <TableCell className="font-bold">{report.totalHours}</TableCell>
                      <TableCell>
                        {report.exceptions > 0 ? (
                          <Badge className="bg-red-100 text-red-800">
                            {report.exceptions}
                          </Badge>
                        ) : (
                          <Badge className="bg-green-100 text-green-800">
                            0
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
