
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
import { Plus, TestTube, Package, AlertTriangle, CheckCircle } from "lucide-react";

interface Equipment {
  id: string;
  name: string;
  type: string;
  serialNumber: string;
  status: "active" | "maintenance" | "testing" | "retired";
  location: string;
  lastTest: string;
  nextTest: string;
  condition: "excellent" | "good" | "fair" | "poor";
  kitId?: string;
}

export const EquipmentManager = () => {
  const [equipment, setEquipment] = useState<Equipment[]>([
    {
      id: "1",
      name: "SCBA Unit #12",
      type: "Breathing Apparatus",
      serialNumber: "BA-2023-012",
      status: "active",
      location: "Engine 1 - Compartment A",
      lastTest: "2024-01-10",
      nextTest: "2024-02-10",
      condition: "excellent",
      kitId: "kit-1"
    },
    {
      id: "2",
      name: "Fire Hose 2.5in x 50ft",
      type: "Hose",
      serialNumber: "H-2022-045",
      status: "testing",
      location: "Ladder 1 - Side Mount",
      lastTest: "2024-01-05",
      nextTest: "2024-01-19",
      condition: "good"
    }
  ]);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showTestDialog, setShowTestDialog] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "maintenance": return "bg-yellow-500";
      case "testing": return "bg-blue-500";
      case "retired": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "excellent": return "text-green-400";
      case "good": return "text-blue-400";
      case "fair": return "text-yellow-400";
      case "poor": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Equipment Management</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="border-slate-600">
            <TestTube className="h-4 w-4 mr-2" />
            Bulk Test
          </Button>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Equipment
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-slate-700">
              <DialogHeader>
                <DialogTitle className="text-white">Add New Equipment</DialogTitle>
                <DialogDescription>Create a new equipment record</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-white">Equipment Name</Label>
                    <Input id="name" placeholder="SCBA Unit #13" className="bg-slate-700 border-slate-600 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="type" className="text-white">Type</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="breathing-apparatus">Breathing Apparatus</SelectItem>
                        <SelectItem value="hose">Hose</SelectItem>
                        <SelectItem value="ladder">Ladder</SelectItem>
                        <SelectItem value="extinguisher">Fire Extinguisher</SelectItem>
                        <SelectItem value="medical">Medical Equipment</SelectItem>
                        <SelectItem value="tool">Tool</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="serial" className="text-white">Serial Number</Label>
                    <Input id="serial" placeholder="BA-2024-001" className="bg-slate-700 border-slate-600 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="location" className="text-white">Location</Label>
                    <Input id="location" placeholder="Engine 1 - Compartment A" className="bg-slate-700 border-slate-600 text-white" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
                <Button className="bg-red-600 hover:bg-red-700">Create Equipment</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Equipment Inventory</CardTitle>
            <CardDescription>Track all emergency equipment and tools</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-slate-300">Equipment</TableHead>
                  <TableHead className="text-slate-300">Type</TableHead>
                  <TableHead className="text-slate-300">Serial #</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-slate-300">Location</TableHead>
                  <TableHead className="text-slate-300">Condition</TableHead>
                  <TableHead className="text-slate-300">Next Test</TableHead>
                  <TableHead className="text-slate-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {equipment.map((eq) => (
                  <TableRow key={eq.id} className="border-slate-700">
                    <TableCell className="text-white font-medium">{eq.name}</TableCell>
                    <TableCell className="text-slate-300">{eq.type}</TableCell>
                    <TableCell className="text-slate-300">{eq.serialNumber}</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(eq.status)} text-white`}>
                        {eq.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-300">{eq.location}</TableCell>
                    <TableCell className={getConditionColor(eq.condition)}>
                      {eq.condition}
                    </TableCell>
                    <TableCell className="text-slate-300">{eq.nextTest}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedEquipment(eq);
                            setShowTestDialog(true);
                          }}
                        >
                          <TestTube className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Package className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Package className="h-5 w-5" />
                Kit Management
              </CardTitle>
              <CardDescription>Organize equipment into kits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Turnout Gear Kit</h4>
                    <p className="text-slate-400 text-sm">5 items</p>
                  </div>
                  <Badge className="bg-green-500 text-white">Complete</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">SCBA Kit</h4>
                    <p className="text-slate-400 text-sm">3 items</p>
                  </div>
                  <Badge className="bg-yellow-500 text-white">Testing</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">Medical Response Kit</h4>
                    <p className="text-slate-400 text-sm">12 items</p>
                  </div>
                  <Badge className="bg-green-500 text-white">Complete</Badge>
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Create New Kit
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Maintenance Alerts
              </CardTitle>
              <CardDescription>Equipment requiring attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-red-900/50 border border-red-500/50 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <div>
                    <h4 className="text-white font-medium">Ladder #3 - Overdue Test</h4>
                    <p className="text-red-400 text-sm">Due 3 days ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-yellow-900/50 border border-yellow-500/50 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  <div>
                    <h4 className="text-white font-medium">SCBA #8 - Service Due</h4>
                    <p className="text-yellow-400 text-sm">Due in 2 days</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Equipment Test Dialog */}
      <Dialog open={showTestDialog} onOpenChange={setShowTestDialog}>
        <DialogContent className="bg-slate-800 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">Equipment Test - {selectedEquipment?.name}</DialogTitle>
            <DialogDescription>Complete equipment testing and inspection</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-4">
              <div>
                <Label htmlFor="test-type" className="text-white">Test Type</Label>
                <Select>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Select test type" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="routine">Routine Inspection</SelectItem>
                    <SelectItem value="annual">Annual Certification</SelectItem>
                    <SelectItem value="repair">Post-Repair Test</SelectItem>
                    <SelectItem value="incident">Post-Incident Check</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-slate-300">Visual inspection passed</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-slate-300">Functionality test passed</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-slate-300">Safety check passed</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-slate-300">Calibration verified</span>
                </div>
              </div>

              <div>
                <Label htmlFor="test-notes" className="text-white">Test Notes</Label>
                <Textarea 
                  id="test-notes"
                  placeholder="Any observations or issues found during testing..."
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowTestDialog(false)}>Cancel</Button>
            <Button className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="h-4 w-4 mr-2" />
              Complete Test
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
