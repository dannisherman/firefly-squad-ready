
import { useState } from "react";
import { FileText, Download, Filter, Calendar, TrendingUp, AlertTriangle, Clock, Users, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, Area, AreaChart } from "recharts";

export const ReportingModule = () => {
  const [selectedReport, setSelectedReport] = useState("performance");
  const [dateRange, setDateRange] = useState("30days");

  // Performance analysis data
  const performanceData = [
    { date: "2024-01", responseTime: 4.2, targetTime: 5.0, calls: 156, onTarget: 89 },
    { date: "2024-02", responseTime: 4.5, targetTime: 5.0, calls: 143, onTarget: 85 },
    { date: "2024-03", responseTime: 4.1, targetTime: 5.0, calls: 167, onTarget: 92 },
    { date: "2024-04", responseTime: 4.3, targetTime: 5.0, calls: 159, onTarget: 88 },
    { date: "2024-05", responseTime: 4.0, targetTime: 5.0, calls: 171, onTarget: 94 },
    { date: "2024-06", responseTime: 3.9, targetTime: 5.0, calls: 168, onTarget: 95 },
  ];

  // Root cause analysis data
  const rootCauseData = [
    { cause: "Traffic Delays", incidents: 23, percentage: 34 },
    { cause: "Equipment Issues", incidents: 15, percentage: 22 },
    { cause: "Staffing Shortage", incidents: 12, percentage: 18 },
    { cause: "Weather Conditions", incidents: 10, percentage: 15 },
    { cause: "Communication Delays", incidents: 7, percentage: 11 },
  ];

  // Overtime analysis
  const overtimeData = [
    { week: "Week 1", regular: 2080, overtime: 240, cost: 15600 },
    { week: "Week 2", regular: 2080, overtime: 320, cost: 18400 },
    { week: "Week 3", regular: 2080, overtime: 180, cost: 14200 },
    { week: "Week 4", regular: 2080, overtime: 280, cost: 17200 },
  ];

  const reportTypes = [
    { id: "performance", label: "Performance Analysis", icon: TrendingUp },
    { id: "response", label: "Response Times", icon: Clock },
    { id: "staffing", label: "Staffing Reports", icon: Users },
    { id: "incidents", label: "Incident Analysis", icon: AlertTriangle },
  ];

  const chartConfig = {
    responseTime: { label: "Response Time", color: "#3B82F6" },
    targetTime: { label: "Target", color: "#EF4444" },
    calls: { label: "Total Calls", color: "#10B981" },
    onTarget: { label: "On Target %", color: "#8B5CF6" },
    regular: { label: "Regular Hours", color: "#10B981" },
    overtime: { label: "Overtime Hours", color: "#F59E0B" },
    cost: { label: "Cost ($)", color: "#EF4444" },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Analytics & Reporting</h1>
          <p className="text-slate-300">Comprehensive performance analysis and insights</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-white/95 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="year">Last Year</option>
          </select>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Report Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {reportTypes.map((report) => {
          const Icon = report.icon;
          return (
            <button
              key={report.id}
              onClick={() => setSelectedReport(report.id)}
              className={`p-4 rounded-lg border transition-all ${
                selectedReport === report.id
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white/95 text-slate-700 border-slate-200 hover:bg-blue-50"
              }`}
            >
              <Icon className="h-6 w-6 mx-auto mb-2" />
              <p className="text-sm font-medium">{report.label}</p>
            </button>
          );
        })}
      </div>

      {/* Performance Analysis Report */}
      {selectedReport === "performance" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle>Response Time Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area type="monotone" dataKey="responseTime" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                    <Line type="monotone" dataKey="targetTime" stroke="#EF4444" strokeDasharray="5 5" />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle>Root Cause Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rootCauseData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{item.cause}</span>
                        <span className="text-sm text-slate-600">{item.incidents} incidents</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Staffing Report */}
      {selectedReport === "staffing" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle>Overtime Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={overtimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="regular" fill="#10B981" />
                    <Bar dataKey="overtime" fill="#F59E0B" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle>Staffing Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">127</p>
                    <p className="text-sm text-slate-600">Total Personnel</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">94%</p>
                    <p className="text-sm text-slate-600">Availability Rate</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Shift Coverage</span>
                      <span className="text-sm text-slate-600">89%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "89%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Overtime Usage</span>
                      <span className="text-sm text-slate-600">23%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "23%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Key Performance Indicators */}
      <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-purple-600" />
            <span>Key Performance Indicators</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">4.2m</p>
              <p className="text-slate-600">Avg Response Time</p>
              <p className="text-sm text-green-600">↓ 8% vs target</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">94%</p>
              <p className="text-slate-600">Performance Score</p>
              <p className="text-sm text-blue-600">↑ 2% this month</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">168</p>
              <p className="text-slate-600">Total Calls</p>
              <p className="text-sm text-purple-600">+5% vs last month</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">23%</p>
              <p className="text-slate-600">Overtime Rate</p>
              <p className="text-sm text-orange-600">↓ 3% improvement</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
