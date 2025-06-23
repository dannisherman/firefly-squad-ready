
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, User, Clock, MapPin, Heart, Phone, Camera, FileText } from "lucide-react";

interface PatientAlert {
  id: string;
  patientName: string;
  age: number;
  condition: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  location: string;
  eta: string;
  vitals: {
    heartRate: number;
    bloodPressure: string;
    oxygenSat: number;
  };
  notes: string;
  photos: number;
  videos: number;
  status: "En Route" | "At Scene" | "Transport" | "Arrived";
}

export const PatientAlertSystem = () => {
  const [alerts] = useState<PatientAlert[]>([
    {
      id: "PA-001",
      patientName: "John Smith",
      age: 45,
      condition: "Cardiac Arrest",
      severity: "Critical",
      location: "123 Main St",
      eta: "8 minutes",
      vitals: { heartRate: 45, bloodPressure: "90/60", oxygenSat: 88 },
      notes: "Patient found unconscious, CPR in progress",
      photos: 2,
      videos: 1,
      status: "Transport"
    },
    {
      id: "PA-002", 
      patientName: "Sarah Johnson",
      age: 32,
      condition: "Motor Vehicle Accident",
      severity: "High",
      location: "Highway 101 & Oak St",
      eta: "12 minutes",
      vitals: { heartRate: 110, bloodPressure: "120/80", oxygenSat: 95 },
      notes: "Possible head trauma, conscious and alert",
      photos: 3,
      videos: 0,
      status: "En Route"
    }
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "bg-red-100 text-red-800 border-red-300";
      case "High": return "bg-orange-100 text-orange-800 border-orange-300";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Low": return "bg-green-100 text-green-800 border-green-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En Route": return "bg-blue-100 text-blue-800";
      case "At Scene": return "bg-yellow-100 text-yellow-800";
      case "Transport": return "bg-purple-100 text-purple-800";
      case "Arrived": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Patient Alert System</h1>
        <p className="text-slate-300">Real-time patient information and hospital notifications</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">2</p>
            <p className="text-slate-600 text-sm">Active Alerts</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <Heart className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">5</p>
            <p className="text-slate-600 text-sm">Patients Today</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">3.2m</p>
            <p className="text-slate-600 text-sm">Avg Notification Time</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {alerts.map((alert) => (
          <Card key={alert.id} className="bg-white/95 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>{alert.patientName}, {alert.age}</span>
                  </CardTitle>
                  <p className="text-sm text-slate-600 mt-1">{alert.condition}</p>
                </div>
                <div className="text-right space-y-2">
                  <Badge className={getSeverityColor(alert.severity)}>
                    {alert.severity}
                  </Badge>
                  <Badge className={getStatusColor(alert.status)}>
                    {alert.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-slate-600" />
                  <span className="text-sm">{alert.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-slate-600" />
                  <span className="text-sm">ETA: {alert.eta}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg">
                <h4 className="font-medium text-sm mb-2">Vitals</h4>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>HR: {alert.vitals.heartRate}</div>
                  <div>BP: {alert.vitals.bloodPressure}</div>
                  <div>O2: {alert.vitals.oxygenSat}%</div>
                </div>
              </div>

              <div>
                <p className="text-sm text-slate-600">{alert.notes}</p>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex space-x-4 text-xs text-slate-600">
                  <span className="flex items-center space-x-1">
                    <Camera className="h-3 w-3" />
                    <span>{alert.photos} photos</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <FileText className="h-3 w-3" />
                    <span>{alert.videos} videos</span>
                  </span>
                </div>
                <div className="space-x-2">
                  <Button size="sm" variant="outline">
                    <Phone className="h-3 w-3 mr-1" />
                    Call
                  </Button>
                  <Button size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
