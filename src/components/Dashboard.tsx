
import { Calendar, Users, Clock, AlertTriangle, TrendingUp, Shield, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      title: "Overtime Hours",
      value: "284",
      icon: Clock,
      trend: "-12% from last month",
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
      title: "Active Alerts",
      value: "3",
      icon: AlertTriangle,
      trend: "1 critical",
      color: "text-red-600",
    },
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Operations Dashboard</h1>
          <p className="text-slate-300">Real-time overview of your department's scheduling and operations</p>
        </div>
        <div className="flex items-center space-x-3">
          <Shield className="h-8 w-8 text-red-500" />
          <div className="text-right">
            <p className="text-white font-semibold">Station 1</p>
            <p className="text-slate-400 text-sm">All Systems Operational</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
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
