
import { useState } from "react";
import { Heart, AlertTriangle, Activity, Clock, Filter, Tag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExportUtils } from "./ExportUtils";

export const PatientAlertSystem = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"priority" | "time">("priority");

  const alertTypes = ["cardiac", "trauma", "pediatrics", "respiratory", "overdose", "burn"];
  
  const patientAlerts = [
    {
      id: 1,
      patientId: "P-2024-001",
      priority: "critical",
      tags: ["cardiac", "trauma"],
      chief_complaint: "Chest pain with trauma",
      vitals: {
        bp: "180/110",
        hr: 125,
        rr: 22,
        spo2: 94,
        temp: "98.6°F",
        glucose: 140
      },
      location: "1247 Oak Street",
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      assignedUnit: "Medic 7",
      status: "en-route",
      eta: "3 minutes"
    },
    {
      id: 2,
      patientId: "P-2024-002", 
      priority: "high",
      tags: ["pediatrics", "respiratory"],
      chief_complaint: "Pediatric respiratory distress",
      vitals: {
        bp: "90/60",
        hr: 140,
        rr: 35,
        spo2: 89,
        temp: "102.3°F",
        glucose: null
      },
      location: "456 Maple Avenue",
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      assignedUnit: "Medic 3",
      status: "on-scene",
      eta: null
    },
    {
      id: 3,
      patientId: "P-2024-003",
      priority: "moderate",
      tags: ["overdose"],
      chief_complaint: "Suspected opioid overdose",
      vitals: {
        bp: "110/70",
        hr: 60,
        rr: 8,
        spo2: 85,
        temp: "97.2°F", 
        glucose: 95
      },
      location: "789 Pine Street",
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      assignedUnit: "Engine 12",
      status: "transporting",
      eta: "12 minutes to hospital"
    }
  ];

  const filteredAlerts = patientAlerts.filter(alert => 
    selectedTags.length === 0 || selectedTags.some(tag => alert.tags.includes(tag))
  ).sort((a, b) => {
    if (sortBy === "priority") {
      const priorityOrder = { critical: 3, high: 2, moderate: 1 };
      return (priorityOrder[b.priority as keyof typeof priorityOrder] || 0) - 
             (priorityOrder[a.priority as keyof typeof priorityOrder] || 0);
    }
    return b.timestamp.getTime() - a.timestamp.getTime();
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-100 text-red-800 border-red-200";
      case "high": return "bg-orange-100 text-orange-800 border-orange-200";
      case "moderate": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "en-route": return "bg-blue-100 text-blue-800";
      case "on-scene": return "bg-green-100 text-green-800";
      case "transporting": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Patient Alert System</h1>
          <p className="text-slate-300">Critical alerts with pre-hospital vitals monitoring</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant={sortBy === "priority" ? "default" : "outline"}
            onClick={() => setSortBy("priority")}
            className={sortBy === "priority" ? "bg-red-600 hover:bg-red-700" : "border-slate-600 text-slate-300 hover:bg-slate-700"}
          >
            Priority
          </Button>
          <Button
            variant={sortBy === "time" ? "default" : "outline"}
            onClick={() => setSortBy("time")}
            className={sortBy === "time" ? "bg-red-600 hover:bg-red-700" : "border-slate-600 text-slate-300 hover:bg-slate-700"}
          >
            <Clock className="h-4 w-4 mr-2" />
            Time
          </Button>
        </div>
      </div>

      {/* Tag Filters */}
      <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Tag className="h-5 w-5 mr-2" />
            Filter by Alert Type
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {alertTypes.map(tag => (
              <Button
                key={tag}
                size="sm"
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                onClick={() => toggleTag(tag)}
                className={selectedTags.includes(tag) ? "bg-red-600 hover:bg-red-700" : ""}
              >
                {tag}
              </Button>
            ))}
            {selectedTags.length > 0 && (
              <Button size="sm" variant="ghost" onClick={() => setSelectedTags([])}>
                Clear All
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Active Alerts */}
      <div className="grid gap-6">
        {filteredAlerts.map((alert) => (
          <Card key={alert.id} className={`bg-white/95 backdrop-blur-sm border-l-4 ${
            alert.priority === "critical" ? "border-l-red-500" :
            alert.priority === "high" ? "border-l-orange-500" : "border-l-yellow-500"
          }`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <Badge className={getPriorityColor(alert.priority)}>
                      {alert.priority.toUpperCase()}
                    </Badge>
                    <Badge className={getStatusColor(alert.status)}>
                      {alert.status}
                    </Badge>
                    <span className="text-sm text-slate-600">
                      {alert.assignedUnit} • {alert.patientId}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    {alert.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="text-right text-sm text-slate-600">
                  <div>{alert.timestamp.toLocaleTimeString()}</div>
                  {alert.eta && <div className="text-blue-600 font-medium">ETA: {alert.eta}</div>}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Patient Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Chief Complaint:</strong> {alert.chief_complaint}</div>
                    <div><strong>Location:</strong> {alert.location}</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Activity className="h-4 w-4 mr-2" />
                    Pre-Hospital Vitals
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex justify-between">
                      <span>BP:</span>
                      <span className={alert.vitals.bp && (alert.vitals.bp.startsWith("180") || alert.vitals.bp.startsWith("200")) ? "text-red-600 font-medium" : ""}>
                        {alert.vitals.bp}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>HR:</span>
                      <span className={alert.vitals.hr > 120 || alert.vitals.hr < 60 ? "text-red-600 font-medium" : ""}>
                        {alert.vitals.hr} bpm
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>RR:</span>
                      <span className={alert.vitals.rr > 30 || alert.vitals.rr < 10 ? "text-red-600 font-medium" : ""}>
                        {alert.vitals.rr} /min
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>SpO2:</span>
                      <span className={alert.vitals.spo2 < 90 ? "text-red-600 font-medium" : ""}>
                        {alert.vitals.spo2}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Temp:</span>
                      <span className={alert.vitals.temp && parseFloat(alert.vitals.temp) > 101 ? "text-red-600 font-medium" : ""}>
                        {alert.vitals.temp}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Glucose:</span>
                      <span>{alert.vitals.glucose ? `${alert.vitals.glucose} mg/dL` : "N/A"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ExportUtils 
        title="Patient Alerts"
        data={filteredAlerts}
        filters={{
          incidentType: selectedTags.join(", "),
          dateRange: "Current shift"
        }}
      />
    </div>
  );
};
