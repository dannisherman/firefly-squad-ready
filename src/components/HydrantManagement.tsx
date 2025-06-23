
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Wrench, Calendar, AlertTriangle, CheckCircle, Search, Plus } from "lucide-react";

interface Hydrant {
  id: string;
  location: string;
  latitude: number;
  longitude: number;
  type: "Standard" | "Dry Barrel" | "Wet Barrel";
  flowRate: number;
  pressure: number;
  lastInspection: string;
  nextMaintenance: string;
  status: "Active" | "Out of Service" | "Needs Repair" | "Scheduled Maintenance";
  isoCompliant: boolean;
  notes: string;
}

interface MaintenanceTask {
  id: string;
  hydrantId: string;
  type: "Inspection" | "Flow Test" | "Repair" | "Replacement";
  scheduledDate: string;
  completedDate?: string;
  technician: string;
  status: "Scheduled" | "In Progress" | "Completed" | "Overdue";
  notes: string;
}

export const HydrantManagement = () => {
  const [hydrants] = useState<Hydrant[]>([
    {
      id: "H-001",
      location: "Main St & 1st Ave",
      latitude: 40.7128,
      longitude: -74.0060,
      type: "Standard",
      flowRate: 1200,
      pressure: 65,
      lastInspection: "2024-05-15",
      nextMaintenance: "2024-07-15",
      status: "Active",
      isoCompliant: true,
      notes: "Good condition, clear access"
    },
    {
      id: "H-002",
      location: "Oak St & Pine Ave",
      latitude: 40.7580,
      longitude: -73.9855,
      type: "Dry Barrel",
      flowRate: 800,
      pressure: 45,
      lastInspection: "2024-06-01",
      nextMaintenance: "2024-08-01",
      status: "Needs Repair",
      isoCompliant: false,
      notes: "Low pressure, valve issue"
    }
  ]);

  const [maintenanceTasks] = useState<MaintenanceTask[]>([
    {
      id: "MT-001",
      hydrantId: "H-002",
      type: "Repair",
      scheduledDate: "2024-06-25",
      technician: "Smith, J.",
      status: "Scheduled",
      notes: "Replace valve assembly"
    },
    {
      id: "MT-002",
      hydrantId: "H-001",
      type: "Flow Test",
      scheduledDate: "2024-07-15",
      technician: "Johnson, R.",
      status: "Scheduled",
      notes: "Annual flow test"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Out of Service": return "bg-red-100 text-red-800";
      case "Needs Repair": return "bg-orange-100 text-orange-800";
      case "Scheduled Maintenance": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Scheduled": return "bg-yellow-100 text-yellow-800";
      case "Overdue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredHydrants = hydrants.filter(hydrant => {
    const matchesSearch = hydrant.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hydrant.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || hydrant.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Hydrant Management</h1>
        <p className="text-slate-300">Track hydrant data, maintenance, and ISO compliance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">{hydrants.length}</p>
            <p className="text-slate-600 text-sm">Total Hydrants</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">
              {hydrants.filter(h => h.status === "Active").length}
            </p>
            <p className="text-slate-600 text-sm">Active</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">
              {hydrants.filter(h => h.status === "Needs Repair").length}
            </p>
            <p className="text-slate-600 text-sm">Need Repair</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <Wrench className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">
              {maintenanceTasks.filter(t => t.status === "Scheduled").length}
            </p>
            <p className="text-slate-600 text-sm">Scheduled Tasks</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="hydrants" className="space-y-6">
        <TabsList className="bg-white/10 backdrop-blur-sm">
          <TabsTrigger value="hydrants" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
            Hydrant Directory
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
            Maintenance Tasks
          </TabsTrigger>
          <TabsTrigger value="iso" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
            ISO Compliance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hydrants" className="space-y-6">
          <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle>Search & Filter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search by location or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Needs Repair">Needs Repair</SelectItem>
                    <SelectItem value="Out of Service">Out of Service</SelectItem>
                  </SelectContent>
                </Select>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Hydrant
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredHydrants.map((hydrant) => (
              <Card key={hydrant.id} className="bg-white/95 backdrop-blur-sm border-slate-200">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <MapPin className="h-5 w-5" />
                        <span>{hydrant.id}</span>
                      </CardTitle>
                      <p className="text-sm text-slate-600 mt-1">{hydrant.location}</p>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge className={getStatusColor(hydrant.status)}>
                        {hydrant.status}
                      </Badge>
                      {hydrant.isoCompliant && (
                        <Badge className="bg-green-100 text-green-800">
                          ISO Compliant
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-600">Type:</span>
                      <p className="font-medium">{hydrant.type}</p>
                    </div>
                    <div>
                      <span className="text-slate-600">Flow Rate:</span>
                      <p className="font-medium">{hydrant.flowRate} GPM</p>
                    </div>
                    <div>
                      <span className="text-slate-600">Pressure:</span>
                      <p className="font-medium">{hydrant.pressure} PSI</p>
                    </div>
                    <div>
                      <span className="text-slate-600">Last Inspection:</span>
                      <p className="font-medium">{hydrant.lastInspection}</p>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-sm text-slate-600">Notes:</p>
                    <p className="text-sm">{hydrant.notes}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-xs text-slate-600">
                      Next Maintenance: {hydrant.nextMaintenance}
                    </div>
                    <div className="space-x-2">
                      <Button size="sm" variant="outline">
                        <Wrench className="h-3 w-3 mr-1" />
                        Schedule
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
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-6">
          <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle>Maintenance Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {maintenanceTasks.map((task) => (
                  <div key={task.id} className="p-4 border rounded-lg bg-slate-50">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{task.type} - {task.hydrantId}</h4>
                        <p className="text-sm text-slate-600">Technician: {task.technician}</p>
                      </div>
                      <Badge className={getTaskStatusColor(task.status)}>
                        {task.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-600">Scheduled:</span>
                        <p>{task.scheduledDate}</p>
                      </div>
                      {task.completedDate && (
                        <div>
                          <span className="text-slate-600">Completed:</span>
                          <p>{task.completedDate}</p>
                        </div>
                      )}
                    </div>
                    <p className="text-sm mt-2">{task.notes}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="iso" className="space-y-6">
          <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle>ISO Compliance Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {hydrants.filter(h => h.isoCompliant).length}
                  </p>
                  <p className="text-sm text-slate-600">Compliant Hydrants</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">
                    {hydrants.filter(h => !h.isoCompliant).length}
                  </p>
                  <p className="text-sm text-slate-600">Non-Compliant</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {Math.round((hydrants.filter(h => h.isoCompliant).length / hydrants.length) * 100)}%
                  </p>
                  <p className="text-sm text-slate-600">Compliance Rate</p>
                </div>
              </div>
              
              <Button className="w-full">
                Generate ISO Compliance Report
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
