
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Settings, CheckCircle, AlertCircle, Wrench, Move } from "lucide-react";

interface Apparatus {
  id: string;
  unit: string;
  type: string;
  make: string;
  model: string;
  year: number;
  status: "in-service" | "out-of-service" | "maintenance" | "testing";
  mileage: number;
  lastCheck: string;
  nextCheck: string;
  location: string;
}

export const ApparatusManager = () => {
  const [apparatus, setApparatus] = useState<Apparatus[]>([
    {
      id: "1",
      unit: "Engine 1",
      type: "Fire Engine",
      make: "Pierce",
      model: "Arrow XT",
      year: 2020,
      status: "in-service",
      mileage: 45230,
      lastCheck: "2024-01-15",
      nextCheck: "2024-01-22",
      location: "Station 1"
    },
    {
      id: "2",
      unit: "Ladder 1",
      type: "Ladder Truck",
      make: "E-ONE",
      model: "HP 104",
      year: 2018,
      status: "maintenance",
      mileage: 67890,
      lastCheck: "2024-01-10",
      nextCheck: "2024-01-17",
      location: "Maintenance Shop"
    }
  ]);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showCheckDialog, setShowCheckDialog] = useState(false);
  const [selectedApparatus, setSelectedApparatus] = useState<Apparatus | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-service": return "bg-green-500";
      case "out-of-service": return "bg-red-500";
      case "maintenance": return "bg-yellow-500";
      case "testing": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    setApparatus(prev => prev.map(app => 
      app.id === id ? { ...app, status: newStatus as any } : app
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Apparatus Dashboard</h2>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Apparatus
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">Add New Apparatus</DialogTitle>
              <DialogDescription>Create a new apparatus record</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="unit" className="text-white">Unit Number</Label>
                  <Input id="unit" placeholder="Engine 1" className="bg-slate-700 border-slate-600 text-white" />
                </div>
                <div>
                  <Label htmlFor="type" className="text-white">Type</Label>
                  <Select>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="fire-engine">Fire Engine</SelectItem>
                      <SelectItem value="ladder-truck">Ladder Truck</SelectItem>
                      <SelectItem value="ambulance">Ambulance</SelectItem>
                      <SelectItem value="rescue">Rescue Vehicle</SelectItem>
                      <SelectItem value="tanker">Tanker</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="make" className="text-white">Make</Label>
                  <Input id="make" placeholder="Pierce" className="bg-slate-700 border-slate-600 text-white" />
                </div>
                <div>
                  <Label htmlFor="model" className="text-white">Model</Label>
                  <Input id="model" placeholder="Arrow XT" className="bg-slate-700 border-slate-600 text-white" />
                </div>
                <div>
                  <Label htmlFor="year" className="text-white">Year</Label>
                  <Input id="year" type="number" placeholder="2020" className="bg-slate-700 border-slate-600 text-white" />
                </div>
              </div>
              <div>
                <Label htmlFor="location" className="text-white">Station/Location</Label>
                <Input id="location" placeholder="Station 1" className="bg-slate-700 border-slate-600 text-white" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
              <Button className="bg-red-600 hover:bg-red-700">Create Apparatus</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Fleet Overview</CardTitle>
            <CardDescription>Current status of all apparatus</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-slate-300">Unit</TableHead>
                  <TableHead className="text-slate-300">Type</TableHead>
                  <TableHead className="text-slate-300">Make/Model</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-slate-300">Mileage</TableHead>
                  <TableHead className="text-slate-300">Next Check</TableHead>
                  <TableHead className="text-slate-300">Location</TableHead>
                  <TableHead className="text-slate-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apparatus.map((app) => (
                  <TableRow key={app.id} className="border-slate-700">
                    <TableCell className="text-white font-medium">{app.unit}</TableCell>
                    <TableCell className="text-slate-300">{app.type}</TableCell>
                    <TableCell className="text-slate-300">{app.make} {app.model} ({app.year})</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(app.status)} text-white`}>
                        {app.status.replace("-", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-300">{app.mileage.toLocaleString()} mi</TableCell>
                    <TableCell className="text-slate-300">{app.nextCheck}</TableCell>
                    <TableCell className="text-slate-300">{app.location}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedApparatus(app);
                            setShowCheckDialog(true);
                          }}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Select onValueChange={(value) => handleStatusChange(app.id, value)}>
                          <SelectTrigger className="w-32 h-8 bg-slate-700 border-slate-600">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-700 border-slate-600">
                            <SelectItem value="in-service">In Service</SelectItem>
                            <SelectItem value="out-of-service">Out of Service</SelectItem>
                            <SelectItem value="maintenance">Maintenance</SelectItem>
                            <SelectItem value="testing">Testing</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Equipment Check Dialog */}
      <Dialog open={showCheckDialog} onOpenChange={setShowCheckDialog}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Equipment Check - {selectedApparatus?.unit}</DialogTitle>
            <DialogDescription>Complete vehicle inspection and equipment checks</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold text-white">Vehicle Inspection</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-slate-300">Engine oil level</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-slate-300">Brake fluid level</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-slate-300">Tire pressure</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-slate-300">Emergency lights</span>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-white">Equipment Check</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-slate-300">Hoses (5)</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-slate-300">SCBA units (4)</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-slate-300">Extinguishers (3)</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-slate-300">Medical kit</span>
                </div>
              </div>

              <div>
                <Label htmlFor="notes" className="text-white">Notes/Issues</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Any issues or observations..."
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowCheckDialog(false)}>Cancel</Button>
            <Button className="bg-green-600 hover:bg-green-700">Complete Check</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
