
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Hospital, Wifi, Shield, MessageSquare, Clock, Users, Phone, AlertTriangle } from "lucide-react";

export const HospitalCommHub = () => {
  const [connections] = useState([
    { id: "GH-001", name: "General Hospital", status: "Connected", lastSync: "2 min ago", alerts: 3 },
    { id: "MC-002", name: "Medical Center", status: "Connected", lastSync: "5 min ago", alerts: 1 },
    { id: "CH-003", name: "Children's Hospital", status: "Offline", lastSync: "15 min ago", alerts: 0 },
    { id: "TC-004", name: "Trauma Center", status: "Connected", lastSync: "1 min ago", alerts: 5 },
  ]);

  const [transmissions] = useState([
    {
      id: "TX-001",
      hospital: "General Hospital",
      patient: "John Smith",
      type: "Critical Alert",
      time: "14:25:33",
      status: "Delivered"
    },
    {
      id: "TX-002", 
      hospital: "Trauma Center",
      patient: "Sarah Johnson",
      type: "ETA Update",
      time: "14:20:15",
      status: "Acknowledged"
    },
    {
      id: "TX-003",
      hospital: "Medical Center",
      patient: "Mike Wilson",
      type: "Patient Data",
      time: "14:18:42",
      status: "Delivered"
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Connected": return "bg-green-100 text-green-800";
      case "Offline": return "bg-red-100 text-red-800";
      case "Delivered": return "bg-green-100 text-green-800";
      case "Acknowledged": return "bg-blue-100 text-blue-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Hospital Communication Hub</h1>
        <p className="text-slate-300">Secure EMS-hospital data transmission and coordination</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <Hospital className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">4</p>
            <p className="text-slate-600 text-sm">Connected Hospitals</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <MessageSquare className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">47</p>
            <p className="text-slate-600 text-sm">Messages Today</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <Shield className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">100%</p>
            <p className="text-slate-600 text-sm">HIPAA Compliant</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">1.2s</p>
            <p className="text-slate-600 text-sm">Avg Transmission</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wifi className="h-5 w-5 text-green-600" />
              <span>Hospital Connections</span>
              <div className="ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {connections.map((connection) => (
                <div key={connection.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Hospital className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-slate-900">{connection.name}</p>
                      <p className="text-sm text-slate-600">Last sync: {connection.lastSync}</p>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge className={getStatusColor(connection.status)}>
                      {connection.status}
                    </Badge>
                    {connection.alerts > 0 && (
                      <div className="flex items-center space-x-1">
                        <AlertTriangle className="h-3 w-3 text-red-500" />
                        <span className="text-xs text-red-600">{connection.alerts} alerts</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              <span>Recent Transmissions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transmissions.map((transmission) => (
                <div key={transmission.id} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-slate-900">{transmission.patient}</p>
                      <p className="text-sm text-slate-600">{transmission.hospital}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500">{transmission.time}</p>
                      <Badge className={getStatusColor(transmission.status)}>
                        {transmission.status}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700">{transmission.type}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-green-600" />
            <span>Security & Compliance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg text-center">
              <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-medium">HIPAA Compliant</h4>
              <p className="text-sm text-slate-600">End-to-end encryption</p>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-medium">Access Control</h4>
              <p className="text-sm text-slate-600">Role-based permissions</p>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-medium">Audit Trail</h4>
              <p className="text-sm text-slate-600">Complete transmission logs</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
