import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  DollarSign, Clock, Calendar, FileText, Download, AlertTriangle, 
  TrendingUp, Users, Calculator, BarChart3, PieChart, Settings 
} from "lucide-react";

interface PayrollData {
  employeeId: string;
  name: string;
  regularHours: number;
  overtimeHours: number;
  holidayHours: number;
  sickHours: number;
  vacationHours: number;
  totalPay: number;
  period: string;
}

interface FLSASettings {
  cycleLength: number; // 1, 2, 3, or 4 weeks
  overtimeThreshold: number;
  autoCalculate: boolean;
  includeHolidays: boolean;
}

interface ReportFilter {
  shift?: string;
  station?: string;
  incidentType?: string;
  dateRange?: string;
  flsaCycle?: string;
}

export const PayrollReporting = () => {
  const [flsaSettings, setFlsaSettings] = useState<FLSASettings>({
    cycleLength: 2, // 2-week cycle default
    overtimeThreshold: 80, // 80 hours for 2-week cycle
    autoCalculate: true,
    includeHolidays: true
  });

  const [reportFilters, setReportFilters] = useState<ReportFilter>({});
  const [selectedPeriod, setSelectedPeriod] = useState("current");

  const [payrollData] = useState<PayrollData[]>([
    {
      employeeId: "EMP-001",
      name: "John Smith",
      regularHours: 80,
      overtimeHours: 12,
      holidayHours: 8,
      sickHours: 0,
      vacationHours: 8,
      totalPay: 4250.00,
      period: "2024-06-01 to 2024-06-14"
    }
  ]);

  const calculateOvertime = (regularHours: number, cycleLength: number): number => {
    const threshold = cycleLength === 1 ? 40 : cycleLength === 2 ? 80 : cycleLength === 3 ? 120 : 160;
    return Math.max(0, regularHours - threshold);
  };

  const exportToCSV = (data: PayrollData[]) => {
    const headers = ["Employee ID", "Name", "Regular Hours", "Overtime Hours", "Holiday Hours", "Sick Hours", "Vacation Hours", "Total Pay", "Period"];
    const csvContent = [
      headers.join(","),
      ...data.map(row => [
        row.employeeId,
        row.name,
        row.regularHours,
        row.overtimeHours,
        row.holidayHours,
        row.sickHours,
        row.vacationHours,
        row.totalPay,
        `"${row.period}"`
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `payroll-report-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Payroll & FLSA Reporting</h2>
          <p className="text-slate-300">Automated overtime calculations and payroll exports</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => exportToCSV(payrollData)}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">$127,450</p>
            <p className="text-slate-600 text-sm">Total Payroll</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">342</p>
            <p className="text-slate-600 text-sm">Overtime Hours</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">45</p>
            <p className="text-slate-600 text-sm">Active Employees</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">3</p>
            <p className="text-slate-600 text-sm">FLSA Violations</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="flsa" className="space-y-4">
        <TabsList className="bg-white/10 backdrop-blur-sm">
          <TabsTrigger value="flsa" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
            FLSA Management
          </TabsTrigger>
          <TabsTrigger value="reports" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
            Payroll Reports
          </TabsTrigger>
          <TabsTrigger value="exports" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
            Export Tools
          </TabsTrigger>
          <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="flsa">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>FLSA Cycle Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">Cycle Length</label>
                  <Select value={flsaSettings.cycleLength.toString()} onValueChange={(value) => 
                    setFlsaSettings({...flsaSettings, cycleLength: parseInt(value)})
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Week (40 hour threshold)</SelectItem>
                      <SelectItem value="2">2 Weeks (80 hour threshold)</SelectItem>
                      <SelectItem value="3">3 Weeks (120 hour threshold)</SelectItem>
                      <SelectItem value="4">4 Weeks (160 hour threshold)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">Overtime Threshold</label>
                  <Input 
                    type="number" 
                    value={flsaSettings.overtimeThreshold}
                    onChange={(e) => setFlsaSettings({...flsaSettings, overtimeThreshold: parseInt(e.target.value)})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      checked={flsaSettings.autoCalculate}
                      onChange={(e) => setFlsaSettings({...flsaSettings, autoCalculate: e.target.checked})}
                    />
                    <span className="text-sm">Auto-calculate overtime</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      checked={flsaSettings.includeHolidays}
                      onChange={(e) => setFlsaSettings({...flsaSettings, includeHolidays: e.target.checked})}
                    />
                    <span className="text-sm">Include holidays in calculations</span>
                  </label>
                </div>

                <Button className="w-full">
                  Save FLSA Settings
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="h-5 w-5" />
                  <span>Overtime Calculator</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">Regular Hours</label>
                  <Input type="number" placeholder="Enter hours" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">FLSA Cycle</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cycle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current">Current Cycle</SelectItem>
                      <SelectItem value="previous">Previous Cycle</SelectItem>
                      <SelectItem value="custom">Custom Period</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Calculate Overtime</Button>
                
                <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span>Regular Pay:</span>
                    <span className="font-medium">$2,400.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Overtime Pay:</span>
                    <span className="font-medium">$540.00</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold border-t pt-2 mt-2">
                    <span>Total Pay:</span>
                    <span>$2,940.00</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Payroll Reports</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payrollData.map((employee) => (
                  <div key={employee.employeeId} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{employee.name}</h4>
                        <p className="text-sm text-slate-600">ID: {employee.employeeId}</p>
                        <p className="text-xs text-slate-500">{employee.period}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-green-600">${employee.totalPay.toFixed(2)}</p>
                        <Badge className="bg-blue-100 text-blue-800">
                          {employee.overtimeHours}h OT
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
                      <div>
                        <span className="text-slate-600">Regular:</span>
                        <p className="font-medium">{employee.regularHours}h</p>
                      </div>
                      <div>
                        <span className="text-slate-600">Overtime:</span>
                        <p className="font-medium">{employee.overtimeHours}h</p>
                      </div>
                      <div>
                        <span className="text-slate-600">Holiday:</span>
                        <p className="font-medium">{employee.holidayHours}h</p>
                      </div>
                      <div>
                        <span className="text-slate-600">Sick:</span>
                        <p className="font-medium">{employee.sickHours}h</p>
                      </div>
                      <div>
                        <span className="text-slate-600">Vacation:</span>
                        <p className="font-medium">{employee.vacationHours}h</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exports">
          <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Download className="h-5 w-5" />
                <span>Export Tools</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" onClick={() => exportToCSV(payrollData)}>
                  <FileText className="h-4 w-4 mr-2" />
                  CSV Export
                </Button>
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  ADP Export
                </Button>
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  QuickBooks Export
                </Button>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-lg">
                <h4 className="font-medium mb-2">Export Filters</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All Shifts" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Shifts</SelectItem>
                      <SelectItem value="a">A Shift</SelectItem>
                      <SelectItem value="b">B Shift</SelectItem>
                      <SelectItem value="c">C Shift</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Date Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current">Current Period</SelectItem>
                      <SelectItem value="previous">Previous Period</SelectItem>
                      <SelectItem value="ytd">Year to Date</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Overtime Trends</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-slate-500">
                  Chart visualization would go here
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="h-5 w-5" />
                  <span>Cost Breakdown</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-slate-500">
                  Chart visualization would go here
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
