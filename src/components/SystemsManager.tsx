
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Edit, Save } from "lucide-react";
import { toast } from "sonner";

interface System {
  id: string;
  system: string;
  systemType: string;
  systemId: string;
  date: string;
  initialStatus: string;
  currentStatus: string;
  actions: string;
}

export const SystemsManager = () => {
  const [address, setAddress] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [systems, setSystems] = useState<System[]>([
    {
      id: "1",
      system: "Fire Alarm Panel",
      systemType: "Fire Alarm System",
      systemId: "FA-001",
      date: "2024-01-15",
      initialStatus: "Satisfactory",
      currentStatus: "Satisfactory",
      actions: "None Required"
    }
  ]);

  const [newSystem, setNewSystem] = useState<Partial<System>>({
    system: "",
    systemType: "",
    systemId: "",
    date: "",
    initialStatus: "",
    currentStatus: "",
    actions: ""
  });

  const systemTypes = [
    "Fire Alarm System",
    "Sprinkler System",
    "Fire Pump",
    "Emergency Lighting",
    "Fire Extinguisher",
    "Kitchen Hood System",
    "Smoke Control System"
  ];

  const statusOptions = [
    "Satisfactory",
    "Deficient",
    "Impaired",
    "Out of Service",
    "Needs Follow-up"
  ];

  const addSystem = () => {
    if (!newSystem.system || !newSystem.systemType || !newSystem.systemId) {
      toast.error("Please fill in all required fields");
      return;
    }

    const system: System = {
      id: Date.now().toString(),
      system: newSystem.system!,
      systemType: newSystem.systemType!,
      systemId: newSystem.systemId!,
      date: newSystem.date || new Date().toISOString().split('T')[0],
      initialStatus: newSystem.initialStatus || "Satisfactory",
      currentStatus: newSystem.currentStatus || "Satisfactory",
      actions: newSystem.actions || "None Required"
    };

    setSystems(prev => [...prev, system]);
    setNewSystem({
      system: "",
      systemType: "",
      systemId: "",
      date: "",
      initialStatus: "",
      currentStatus: "",
      actions: ""
    });
    toast.success("System added successfully");
  };

  const removeSystem = (id: string) => {
    setSystems(prev => prev.filter(system => system.id !== id));
    toast.success("System removed");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Satisfactory":
        return "bg-green-500";
      case "Deficient":
        return "bg-yellow-500";
      case "Impaired":
        return "bg-orange-500";
      case "Out of Service":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Manage Multiple Systems</CardTitle>
          <CardDescription>
            Upload reports for all systems and addresses through a secure online portal
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Property Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="address" className="text-slate-300">Address</Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Enter property address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessName" className="text-slate-300">Business Name</Label>
              <Input
                id="businessName"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Enter business name"
              />
            </div>
          </div>

          {/* Add New System */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-slate-600 pb-2">
              Add New System
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">System</Label>
                <Input
                  value={newSystem.system || ""}
                  onChange={(e) => setNewSystem(prev => ({ ...prev, system: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="System name"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">System Type</Label>
                <Select 
                  value={newSystem.systemType || ""} 
                  onValueChange={(value) => setNewSystem(prev => ({ ...prev, systemType: value }))}
                >
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    {systemTypes.map((type) => (
                      <SelectItem key={type} value={type} className="text-white hover:bg-slate-600">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">System ID</Label>
                <Input
                  value={newSystem.systemId || ""}
                  onChange={(e) => setNewSystem(prev => ({ ...prev, systemId: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="System ID"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Date</Label>
                <Input
                  type="date"
                  value={newSystem.date || ""}
                  onChange={(e) => setNewSystem(prev => ({ ...prev, date: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Initial Status</Label>
                <Select 
                  value={newSystem.initialStatus || ""} 
                  onValueChange={(value) => setNewSystem(prev => ({ ...prev, initialStatus: value }))}
                >
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status} className="text-white hover:bg-slate-600">
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Current Status</Label>
                <Select 
                  value={newSystem.currentStatus || ""} 
                  onValueChange={(value) => setNewSystem(prev => ({ ...prev, currentStatus: value }))}
                >
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status} className="text-white hover:bg-slate-600">
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Actions</Label>
                <Input
                  value={newSystem.actions || ""}
                  onChange={(e) => setNewSystem(prev => ({ ...prev, actions: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Required actions"
                />
              </div>
            </div>

            <Button onClick={addSystem} className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add System
            </Button>
          </div>

          {/* Systems Table */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Current Systems</h3>
            <div className="border border-slate-600 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-600">
                    <TableHead className="text-slate-300">System</TableHead>
                    <TableHead className="text-slate-300">Type</TableHead>
                    <TableHead className="text-slate-300">ID</TableHead>
                    <TableHead className="text-slate-300">Date</TableHead>
                    <TableHead className="text-slate-300">Initial Status</TableHead>
                    <TableHead className="text-slate-300">Current Status</TableHead>
                    <TableHead className="text-slate-300">Actions</TableHead>
                    <TableHead className="text-slate-300 w-20"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {systems.map((system) => (
                    <TableRow key={system.id} className="border-slate-600">
                      <TableCell className="text-white">{system.system}</TableCell>
                      <TableCell className="text-white">{system.systemType}</TableCell>
                      <TableCell className="text-white">{system.systemId}</TableCell>
                      <TableCell className="text-white">{system.date}</TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(system.initialStatus)} text-white`}>
                          {system.initialStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(system.currentStatus)} text-white`}>
                          {system.currentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-white">{system.actions}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeSystem(system.id)}
                          className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
