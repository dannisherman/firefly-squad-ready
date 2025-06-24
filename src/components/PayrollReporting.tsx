
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, Download, FileText, Clock, AlertTriangle, TrendingUp } from "lucide-react";
import { ExportUtils } from "./ExportUtils";

export const PayrollReporting = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("current");
  const [flsaCycle, setFlsaCycle] = useState("weekly");

  const [flsaData] = useState([
    {
      employee: "Smith, John",
      badge: "FF-101",
      regularHours: 40.0,
      overtimeHours: 8.5,
      totalHours: 48.5,
      overtimeRate: 1.5,
      grossPay: 2280.00,
      flsaWeek: "Week 25",
      violations: []
    },
    {
      employee: "Davis, Robert", 
      badge: "FF-102",
      regularHours: 40.0,
      overtimeHours: 16.0,
      totalHours: 56.0,
      overtimeRate: 1.5,
      grossPay: 2640.00,
      flsaWeek: "Week 25",
      violations: ["Excessive OT"]
    },
    {
      employee: "Wilson, Kate",
      badge: "EMT-201",
      regularHours: 40.0,
      overtimeHours: 4.0,
      totalHours: 44.0,
      overtimeRate: 1.5,
      grossPay: 1980.00,
      flsaWeek: "Week 25",
      violations: []
    }
  ]);

  const [overtimeRules] = useState({
    weeklyThreshold: 40,
    dailyThreshold: null, // California would be 8
    consecutiveHoursLimit: 16,
    maxWeeklyHours: 60,
    mandatoryRestHours: 8,
    overtimeRate: 1.5,
    doubleTimeRate: 2.0,
    doubleTimeThreshold: 12
  });

  const [payrollSummary] = useState({
    totalEmployees: 45,
    totalRegularHours: 1800,
    totalOvertimeHours: 285,
    totalGrossPay: 98750.00,
    averageOvertimePerEmployee: 6.3,
    flsaViolations: 3,
    payPeriod: "June 17-23, 2024"
  });

  const [cannedReports] = useState([
    {
      name: "Weekly FLSA Summary",
      description: "Standard weekly overtime compliance report",
      lastRun: "2024-06-23",
      frequency: "Weekly"
    },
    {
      name: "Monthly Payroll Export",
      description: "Complete payroll data for external processing",
      lastRun: "2024-06-01", 
      frequency: "Monthly"
    },
    {
      name: "Overtime Analysis",
      description: "Detailed overtime patterns and cost analysis",
      lastRun: "2024-06-20",
      frequency: "Bi-weekly"
    },
    {
      name: "NFIRS Integration Report",
      description: "Scheduling data formatted for NFIRS reporting",
      lastRun: "2024-06-15",
      frequency: "Monthly"
    }
  ]);

  const generatePayrollExport = (format: string) => {
    console.log(`Generating payroll export in ${format} format`);
    // Export logic would go here
  };

  const runCannedReport = (reportName: string) => {
    console.log(`Running canned report: ${reportName}`);
  };

  const exportToPayrollProvider = (provider: string) => {
    console.log(`Exporting to ${provider} payroll provider`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Payroll & FLSA Reporting</h2>
          <p className="text-slate-300">Overtime management, FLSA compliance, and payroll exports</p>
        </div>
        <div className="flex space-x-2">
          <Select value={flsaCycle} onValueChange={setFlsaCycle}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly FLSA</SelectItem>
              <SelectItem value="biweekly">Bi-Weekly</SelectItem>
              <SelectItem value="custom">Custom Cycle</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">${payrollSummary.totalGrossPay.toLocaleString()}</p>
            <p className="text-slate-600 text-sm">Total Gross Pay</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">{payrollSummary.totalOvertimeHours}</p>
            <p className="text-slate-600 text-sm">Overtime Hours</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">{payrollSummary.averageOvertimePerEmployee}</p>
            <p className="text-slate-600 text-sm">Avg OT/Employee</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">{payrollSummary.flsaViolations}</p>
            <p className="text-slate-600 text-sm">FLSA Violations</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="flsa-report" className="space-y-4">
        <TabsList className="bg-white/10 backdrop-blur-sm">
          <TabsTrigger value="flsa-report" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
            FLSA Report
          </TabsTrigger>
          <TabsTrigger value="overtime" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
            Overtime Rules
          </TabsTrigger>
          <TabsTrigger value="exports" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
            Payroll Exports
          </TabsTrigger>
          <TabsTrigger value="reports" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
            Canned Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="flsa-report">
          <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle>FLSA Compliance Report - {payrollSummary.payPeriod}</CardTitle>
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
                    <TableHead>Gross Pay</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {flsaData.map((employee, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{employee.employee}</TableCell>
                      <TableCell>{employee.badge}</TableCell>
                      <TableCell>{employee.regularHours}</TableCell>
                      <TableCell className="text-orange-600">{employee.overtimeHours}</TableCell>
                      <TableCell>{employee.totalHours}</TableCell>
                      <TableCell className="font-medium">${employee.grossPay.toLocaleString()}</TableCell>
                      <TableCell>
                        {employee.violations.length > 0 ? (
                          <Badge className="bg-red-100 text-red-800">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Violations
                          </Badge>
                        ) : (
                          <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overtime">
          <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle>Overtime Rules & FLSA Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Current Rules</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between p-3 bg-slate-50 rounded">
                      <span>Weekly Overtime Threshold:</span>
                      <span className="font-medium">{overtimeRules.weeklyThreshold} hours</span>
                    </div>
                    <div className="flex justify-between p-3 bg-slate-50 rounded">
                      <span>Overtime Rate:</span>
                      <span className="font-medium">{overtimeRules.overtimeRate}x</span>
                    </div>
                    <div className="flex justify-between p-3 bg-slate-50 rounded">
                      <span>Double Time Rate:</span>
                      <span className="font-medium">{overtimeRules.doubleTimeRate}x</span>
                    </div>
                    <div className="flex justify-between p-3 bg-slate-50 rounded">
                      <span>Max Weekly Hours:</span>
                      <span className="font-medium">{overtimeRules.maxWeeklyHours} hours</span>
                    </div>
                    <div className="flex justify-between p-3 bg-slate-50 rounded">
                      <span>Mandatory Rest:</span>
                      <span className="font-medium">{overtimeRules.mandatoryRestHours} hours</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">FLSA Cycle Configuration</h4>
                  <div className="space-y-3">
                    <div className="p-4 border rounded">
                      <h5 className="font-medium mb-2">Current Cycle: {flsaCycle}</h5>
                      <p className="text-sm text-slate-600">
                        Automatically converts hours to overtime based on your FLSA cycle settings.
                      </p>
                      <Button size="sm" className="mt-2" variant="outline">
                        Configure Cycle
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exports">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle>Payroll Provider Exports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      onClick={() => exportToPayrollProvider("ADP")}
                      variant="outline" 
                      className="justify-start"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      ADP Export
                    </Button>
                    <Button 
                      onClick={() => exportToPayrollProvider("Paychex")}
                      variant="outline"
                      className="justify-start"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Paychex Export
                    </Button>
                    <Button 
                      onClick={() => exportToPayrollProvider("QuickBooks")}
                      variant="outline"
                      className="justify-start"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      QuickBooks
                    </Button>
                    <Button 
                      onClick={() => exportToPayrollProvider("Generic")}
                      variant="outline"
                      className="justify-start"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Generic CSV
                    </Button>
                  </div>
                  <div className="pt-4 border-t">
                    <h5 className="font-medium mb-2">Export Options</h5>
                    <div className="space-y-2">
                      <Button
                        onClick={() => generatePayrollExport("detailed")}
                        size="sm"
                        variant="outline"
                        className="w-full justify-start"
                      >
                        Detailed Payroll Report
                      </Button>
                      <Button
                        onClick={() => generatePayrollExport("summary")}
                        size="sm"
                        variant="outline"
                        className="w-full justify-start"
                      >
                        Summary Export
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle>Integration Exports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-slate-600 mb-4">
                    Export scheduling data to other systems for comprehensive reporting.
                  </p>
                  <div className="space-y-2">
                    <Button
                      onClick={() => generatePayrollExport("nfirs")}
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      NFIRS Integration
                    </Button>
                    <Button
                      onClick={() => generatePayrollExport("epcr")}
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      ePCR System
                    </Button>
                    <Button
                      onClick={() => generatePayrollExport("training")}
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Training Records
                    </Button>
                    <Button
                      onClick={() => generatePayrollExport("assets")}
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Asset Management
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle>Canned & Ad Hoc Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cannedReports.map((report, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{report.name}</h4>
                        <p className="text-sm text-slate-600">{report.description}</p>
                        <p className="text-xs text-slate-500 mt-1">
                          Last run: {report.lastRun} • Frequency: {report.frequency}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => runCannedReport(report.name)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Run Report
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ExportUtils
        title="Payroll & FLSA Reporting"
        data={flsaData}
        filters={{
          dateRange: payrollSummary.payPeriod,
          flsaCycle: flsaCycle
        }}
      />
    </div>
  );
};
