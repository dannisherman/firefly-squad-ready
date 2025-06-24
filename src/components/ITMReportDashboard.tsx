
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Users, 
  Bell,
  Filter,
  Download,
  Search
} from "lucide-react";

interface DashboardStats {
  totalReports: number;
  pendingReports: number;
  approvedReports: number;
  deficientSystems: number;
  overdueInspections: number;
  activeProviders: number;
}

interface ReportSummary {
  id: string;
  reportId: string;
  propertyName: string;
  systemType: string;
  submissionDate: string;
  status: string;
  priority: string;
  dueDate: string;
}

export const ITMReportDashboard = () => {
  const [stats] = useState<DashboardStats>({
    totalReports: 1247,
    pendingReports: 23,
    approvedReports: 1189,
    deficientSystems: 35,
    overdueInspections: 12,
    activeProviders: 47
  });

  const [reports] = useState<ReportSummary[]>([
    {
      id: "1",
      reportId: "ITM-2024-001",
      propertyName: "Downtown Office Complex",
      systemType: "Fire Alarm System",
      submissionDate: "2024-01-15",
      status: "Under Review",
      priority: "Medium",
      dueDate: "2024-01-20"
    },
    {
      id: "2",
      reportId: "ITM-2024-002",
      propertyName: "Metro Shopping Center",
      systemType: "Sprinkler System",
      submissionDate: "2024-01-10",
      status: "Needs Correction",
      priority: "High",
      dueDate: "2024-01-18"
    },
    {
      id: "3",
      reportId: "ITM-2024-003",
      propertyName: "Industrial Warehouse",
      systemType: "Fire Pump",
      submissionDate: "2024-01-08",
      status: "Approved",
      priority: "Low",
      dueDate: "2024-01-15"
    }
  ]);

  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReports = reports.filter(report => {
    const matchesSearch = searchQuery === "" || 
      report.propertyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reportId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === "all" || report.status.toLowerCase().replace(" ", "-") === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-500";
      case "Under Review":
        return "bg-blue-500";
      case "Needs Correction":
        return "bg-yellow-500";
      case "Rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-500";
      case "Medium":
        return "bg-yellow-500";
      case "Low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-sm text-slate-400">Total Reports</p>
                <p className="text-2xl font-bold text-white">{stats.totalReports}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-400" />
              <div>
                <p className="text-sm text-slate-400">Pending</p>
                <p className="text-2xl font-bold text-white">{stats.pendingReports}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-sm text-slate-400">Approved</p>
                <p className="text-2xl font-bold text-white">{stats.approvedReports}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <div>
                <p className="text-sm text-slate-400">Deficient</p>
                <p className="text-2xl font-bold text-white">{stats.deficientSystems}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-orange-400" />
              <div>
                <p className="text-sm text-slate-400">Overdue</p>
                <p className="text-2xl font-bold text-white">{stats.overdueInspections}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-400" />
              <div>
                <p className="text-sm text-slate-400">Providers</p>
                <p className="text-2xl font-bold text-white">{stats.activeProviders}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">ITM Report Management</CardTitle>
              <CardDescription>
                Real-time visibility and streamlined oversight of all report submissions
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:text-white">
                <Bell className="h-4 w-4 mr-2" />
                Alerts
              </Button>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="reports" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-slate-700">
              <TabsTrigger value="reports" className="text-white">
                All Reports
              </TabsTrigger>
              <TabsTrigger value="system-status" className="text-white">
                System Status
              </TabsTrigger>
              <TabsTrigger value="deficiencies" className="text-white">
                Deficiencies
              </TabsTrigger>
              <TabsTrigger value="insights" className="text-white">
                Insights
              </TabsTrigger>
            </TabsList>

            <TabsContent value="reports" className="space-y-4">
              {/* Search and Filter Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-slate-700 border-slate-600 text-white w-64"
                      placeholder="Search reports..."
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-48 bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="all" className="text-white hover:bg-slate-600">All Status</SelectItem>
                      <SelectItem value="under-review" className="text-white hover:bg-slate-600">Under Review</SelectItem>
                      <SelectItem value="needs-correction" className="text-white hover:bg-slate-600">Needs Correction</SelectItem>
                      <SelectItem value="approved" className="text-white hover:bg-slate-600">Approved</SelectItem>
                      <SelectItem value="rejected" className="text-white hover:bg-slate-600">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:text-white">
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filters
                </Button>
              </div>

              {/* Reports Table */}
              <div className="border border-slate-600 rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-600">
                      <TableHead className="text-slate-300">Report ID</TableHead>
                      <TableHead className="text-slate-300">Property Name</TableHead>
                      <TableHead className="text-slate-300">System Type</TableHead>
                      <TableHead className="text-slate-300">Submission Date</TableHead>
                      <TableHead className="text-slate-300">Status</TableHead>
                      <TableHead className="text-slate-300">Priority</TableHead>
                      <TableHead className="text-slate-300">Due Date</TableHead>
                      <TableHead className="text-slate-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.map((report) => (
                      <TableRow key={report.id} className="border-slate-600">
                        <TableCell className="text-white font-medium">
                          {report.reportId}
                        </TableCell>
                        <TableCell className="text-white">
                          {report.propertyName}
                        </TableCell>
                        <TableCell className="text-white">
                          {report.systemType}
                        </TableCell>
                        <TableCell className="text-white">
                          {report.submissionDate}
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(report.status)} text-white`}>
                            {report.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getPriorityColor(report.priority)} text-white`}>
                            {report.priority}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-white">
                          {report.dueDate}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:text-white">
                              View
                            </Button>
                            <Button size="sm" className="bg-red-600 hover:bg-red-700">
                              Review
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="system-status" className="space-y-4">
              <div className="text-center py-12">
                <TrendingUp className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">System Status Overview</h3>
                <p className="text-slate-400">Track system statuses from initial assessments to current conditions</p>
              </div>
            </TabsContent>

            <TabsContent value="deficiencies" className="space-y-4">
              <div className="text-center py-12">
                <AlertTriangle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Deficiency Management</h3>
                <p className="text-slate-400">Track and manage system deficiencies and remediation requests</p>
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-4">
              <div className="text-center py-12">
                <TrendingUp className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-sem"bk8j font-semibold text-white mb-2">Advanced Insights</h3>
                <p className="text-slate-400">Access building details and identify overdue system inspections</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
