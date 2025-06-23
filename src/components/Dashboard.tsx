import { Calendar, Users, Clock, AlertTriangle, TrendingUp, Shield, Bell, BarChart3, Activity, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

export const Dashboard = () => {
  const stats = [
    {
      title: "Active Personnel",
      value: "127",
      icon: Users,
      trend: "+3 this week",
      color: "text-blue-600",
    },
    {
      title: "Avg Response Time",
      value: "4.2m",
      icon: Clock,
      trend: "-8% from target",
      color: "text-green-600",
    },
    {
      title: "Open Shifts",
      value: "8",
      icon: Calendar,
      trend: "2 urgent",
      color: "text-yellow-600",
    },
    {
      title: "Performance Score",
      value: "94%",
      icon: Target,
      trend: "+2% this month",
      color: "text-green-600",
    },
  ];

  // Response time trend data
  const responseTimeData = [
    { month: "Jan", avgTime: 4.8, target: 5.0 },
    { month: "Feb", avgTime: 4.5, target: 5.0 },
    { month: "Mar", avgTime: 4.3, target: 5.0 },
    { month: "Apr", avgTime: 4.6, target: 5.0 },
    { month: "May", avgTime: 4.2, target: 5.0 },
    { month: "Jun", avgTime: 4.1, target: 5.0 },
  ];

  // Call volume data
  const callVolumeData = [
    { day: "Mon", emergency: 12, medical: 8, fire: 3 },
    { day: "Tue", emergency: 15, medical: 11, fire: 2 },
    { day: "Wed", emergency: 18, medical: 9, fire: 4 },
    { day: "Thu", emergency: 14, medical: 12, fire: 1 },
    { day: "Fri", emergency: 20, medical: 15, fire: 3 },
    { day: "Sat", emergency: 25, medical: 18, fire: 5 },
    { day: "Sun", emergency: 22, medical: 16, fire: 2 },
  ];

  // Performance metrics pie chart data
  const performanceData = [
    { name: "On Target", value: 87, color: "#10B981" },
    { name: "Over Target", value: 13, color: "#EF4444" },
  ];

  const recentAlerts = [
    {
      id: 1,
      type: "Schedule Conflict",
      message: "Engine 4 - Shift overlap detected for tomorrow",
      time: "5 minutes ago",
      priority: "high",
    },
    {
      id: 2,
      type: "Overtime Alert",
      message: "Johnson, M. approaching 60-hour limit",
      time: "15 minutes ago",
      priority: "medium",
    },
    {
      id: 3,
      type: "Callback Request",
      message: "Emergency callback needed - Station 7",
      time: "1 hour ago",
      priority: "critical",
    },
  ];

  const upcomingShifts = [
    {
      id: 1,
      station: "Engine 1",
      time: "6:00 AM - 6:00 PM",
      personnel: ["Smith, J.", "Davis, R.", "Wilson, K."],
      status: "Fully Staffed",
    },
    {
      id: 2,
      station: "Ladder 3",
      time: "6:00 PM - 6:00 AM",
      personnel: ["Brown, M.", "Taylor, S."],
      status: "Need 1 More",
    },
    {
      id: 3,
      station: "Rescue 5",
      time: "8:00 AM - 8:00 PM",
      personnel: ["Johnson, L.", "Anderson, P.", "Martinez, C."],
      status: "Fully Staffed",
    },
  ];

  const chartConfig = {
    avgTime: { label: "Avg Response Time", color: "#3B82F6" },
    target: { label: "Target", color: "#EF4444" },
    emergency: { label: "Emergency", color: "#EF4444" },
    medical: { label: "Medical", color: "#10B981" },
    fire: { label: "Fire", color: "#F59E0B" },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Operations Dashboard</h1>
          <p className="text-slate-300">Real-time analytics and performance monitoring</p>
        </div>
        <div className="flex items-center space-x-3">
          <Shield className="h-8 w-8 text-red-500" />
          <div className="text-right">
            <p className="text-white font-semibold">Station 1</p>
            <p className="text-slate-400 text-sm">All Systems Operational</p>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-white/95 backdrop-blur-sm border-slate-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm font-medium">{stat.title}</p>
                    <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
                    <p className={`text-sm mt-1 ${stat.color}`}>{stat.trend}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Response Time Trends */}
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span>Response Time Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={responseTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="avgTime" stroke="#3B82F6" strokeWidth={2} />
                  <Line type="monotone" dataKey="target" stroke="#EF4444" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Call Volume Analysis */}
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-green-600" />
              <span>Weekly Call Volume</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={callVolumeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="emergency" fill="#EF4444" />
                  <Bar dataKey="medical" fill="#10B981" />
                  <Bar dataKey="fire" fill="#F59E0B" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Monitoring Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Score */}
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-purple-600" />
              <span>Performance Score</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={performanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {performanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm">On Target (87%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span className="text-sm">Over Target (13%)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Real-time Monitoring */}
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-green-600" />
              <span>Live Monitoring</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Active Units</span>
                <span className="font-semibold text-green-600">12/15</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Available Personnel</span>
                <span className="font-semibold text-blue-600">89%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Open Calls</span>
                <span className="font-semibold text-yellow-600">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Avg Response</span>
                <span className="font-semibold text-green-600">4.2m</span>
              </div>
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-800">All systems operational</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-red-600" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button className="w-full p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Emergency Callback
              </button>
              <button className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Generate Report
              </button>
              <button className="w-full p-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                Schedule Override
              </button>
              <button className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                View Analytics
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Existing Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-red-600" />
              <span>Recent Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    alert.priority === "critical"
                      ? "border-red-500 bg-red-50"
                      : alert.priority === "high"
                      ? "border-yellow-500 bg-yellow-50"
                      : "border-blue-500 bg-blue-50"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-slate-900">{alert.type}</p>
                      <p className="text-slate-700 text-sm mt-1">{alert.message}</p>
                    </div>
                    <span className="text-xs text-slate-500">{alert.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Shifts */}
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span>Upcoming Shifts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingShifts.map((shift) => (
                <div key={shift.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-slate-900">{shift.station}</h4>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        shift.status === "Fully Staffed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {shift.status}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm mb-2">{shift.time}</p>
                  <div className="flex flex-wrap gap-1">
                    {shift.personnel.map((person, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs"
                      >
                        {person}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
