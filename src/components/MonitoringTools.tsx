
import { useState, useEffect } from "react";
import { Activity, AlertTriangle, CheckCircle, Clock, Users, MapPin, Radio, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const MonitoringTools = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const activeUnits = [
    { id: "E1", type: "Engine", station: "Station 1", status: "Available", location: "Quarters", crew: 4 },
    { id: "E4", type: "Engine", station: "Station 4", status: "En Route", location: "Main St & 5th", crew: 4 },
    { id: "L3", type: "Ladder", station: "Station 3", status: "On Scene", location: "Industrial Park", crew: 3 },
    { id: "R5", type: "Rescue", station: "Station 5", status: "Available", location: "Quarters", crew: 2 },
    { id: "A2", type: "Ambulance", station: "Station 2", status: "Transport", location: "General Hospital", crew: 2 },
  ];

  const activeCalls = [
    {
      id: "2024-001234",
      type: "Structure Fire",
      address: "123 Industrial Blvd",
      priority: "High",
      units: ["E1", "E4", "L3"],
      timeDispatched: "14:23:45",
      status: "En Route"
    },
    {
      id: "2024-001235", 
      type: "Medical Emergency",
      address: "456 Residential Dr",
      priority: "Medium",
      units: ["A2"],
      timeDispatched: "14:18:12",
      status: "On Scene"
    },
    {
      id: "2024-001236",
      type: "Vehicle Accident",
      address: "Main St & Oak Ave",
      priority: "Medium", 
      units: ["E2", "R5"],
      timeDispatched: "14:15:33",
      status: "Transport"
    },
  ];

  const systemStatus = [
    { system: "Dispatch CAD", status: "Operational", uptime: "99.8%" },
    { system: "Radio Network", status: "Operational", uptime: "99.9%" },
    { system: "GPS Tracking", status: "Operational", uptime: "98.5%" },
    { system: "Mobile Data", status: "Degraded", uptime: "95.2%" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available": return "bg-green-100 text-green-800";
      case "En Route": return "bg-yellow-100 text-yellow-800";
      case "On Scene": return "bg-blue-100 text-blue-800";
      case "Transport": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800 border-l-red-500";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-l-yellow-500";
      case "Low": return "bg-green-100 text-green-800 border-l-green-500";
      default: return "bg-gray-100 text-gray-800 border-l-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Live Clock */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Live Monitoring Center</h1>
          <p className="text-slate-300">Real-time operational status and unit tracking</p>
        </div>
        <div className="text-right">
          <p className="text-white font-bold text-xl">{currentTime.toLocaleTimeString()}</p>
          <p className="text-slate-400 text-sm">{currentTime.toLocaleDateString()}</p>
        </div>
      </div>

      {/* System Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <Activity className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">5</p>
            <p className="text-slate-600 text-sm">Active Units</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">3</p>
            <p className="text-slate-600 text-sm">Active Calls</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">15</p>
            <p className="text-slate-600 text-sm">Personnel On Duty</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">4.2m</p>
            <p className="text-slate-600 text-sm">Avg Response</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Units */}
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Radio className="h-5 w-5 text-blue-600" />
              <span>Active Units</span>
              <div className="ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeUnits.map((unit) => (
                <div key={unit.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="text-center">
                      <p className="font-bold text-slate-900">{unit.id}</p>
                      <p className="text-xs text-slate-600">{unit.type}</p>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{unit.station}</p>
                      <p className="text-sm text-slate-600 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {unit.location}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(unit.status)}`}>
                      {unit.status}
                    </span>
                    <p className="text-xs text-slate-600 mt-1">Crew: {unit.crew}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Calls */}
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span>Active Incidents</span>
              <div className="ml-auto w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeCalls.map((call) => (
                <div key={call.id} className={`p-4 border-l-4 rounded-lg ${getPriorityColor(call.priority)}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-slate-900">{call.type}</p>
                      <p className="text-sm text-slate-600">{call.address}</p>
                    </div>
                    <span className="text-xs text-slate-500">{call.timeDispatched}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-1">
                      {call.units.map((unit) => (
                        <span key={unit} className="px-2 py-1 bg-slate-200 text-slate-700 rounded text-xs">
                          {unit}
                        </span>
                      ))}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(call.status)}`}>
                      {call.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health */}
      <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-green-600" />
            <span>System Health Monitor</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {systemStatus.map((system, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-slate-900">{system.system}</h4>
                  {system.status === "Operational" ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  )}
                </div>
                <p className={`text-sm font-medium ${
                  system.status === "Operational" ? "text-green-600" : "text-yellow-600"
                }`}>
                  {system.status}
                </p>
                <p className="text-xs text-slate-600">Uptime: {system.uptime}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
