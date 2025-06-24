
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
import { Plus, Pill, ArrowRight, AlertTriangle, FileText, Shield } from "lucide-react";

interface Medication {
  id: string;
  name: string;
  genericName: string;
  scheduleClass: "II" | "III" | "IV" | "Non-Controlled";
  dosage: string;
  quantity: number;
  unit: string;
  lotNumber: string;
  controlNumber: string;
  expirationDate: string;
  location: string;
  kitId?: string;
  status: "active" | "expired" | "recalled" | "transferred";
}

interface MedicationTransfer {
  id: string;
  medicationId: string;
  fromLocation: string;
  toLocation: string;
  quantity: number;
  transferDate: string;
  authorizedBy: string;
  reason: string;
}

export const MedicationManager = () => {
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: "1",
      name: "Morphine Sulfate",
      genericName: "Morphine",
      scheduleClass: "II",
      dosage: "10mg/mL",
      quantity: 5,
      unit: "vials",
      lotNumber: "MOR2024001",
      controlNumber: "CN-001-2024",
      expirationDate: "2024-12-31",
      location: "Ambulance 1 - Controlled Drug Box",
      kitId: "amb1-narcotics",
      status: "active"
    },
    {
      id: "2",
      name: "Fentanyl Citrate",
      genericName: "Fentanyl",
      scheduleClass: "II",
      dosage: "50mcg/mL",
      quantity: 8,
      unit: "vials",
      lotNumber: "FEN2024002",
      controlNumber: "CN-002-2024",
      expirationDate: "2024-11-15",
      location: "Emergency Department",
      status: "active"
    }
  ]);

  const [transfers, setTransfers] = useState<MedicationTransfer[]>([
    {
      id: "1",
      medicationId: "1",
      fromLocation: "Pharmacy",
      toLocation: "Ambulance 1",
      quantity: 2,
      transferDate: "2024-01-15",
      authorizedBy: "Dr. Smith",
      reason: "Routine restocking"
    }
  ]);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showTransferDialog, setShowTransferDialog] = useState(false);

  const getScheduleColor = (schedule: string) => {
    switch (schedule) {
      case "II": return "bg-red-600";
      case "III": return "bg-orange-500";
      case "IV": return "bg-yellow-500";
      default: return "bg-green-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "expired": return "bg-red-500";
      case "recalled": return "bg-orange-500";
      case "transferred": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Controlled Substance Management</h2>
        <div className="flex gap-2">
          <Dialog open={showTransferDialog} onOpenChange={setShowTransferDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-slate-600">
                <ArrowRight className="h-4 w-4 mr-2" />
                Transfer
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-slate-700">
              <DialogHeader>
                <DialogTitle className="text-white">Medication Transfer</DialogTitle>
                <DialogDescription>Transfer controlled substances between locations</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <Label htmlFor="medication" className="text-white">Medication</Label>
                  <Select>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Select medication" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      {medications.map(med => (
                        <SelectItem key={med.id} value={med.id}>
                          {med.name} - {med.dosage}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="from-location" className="text-white">From Location</Label>
                    <Input 
                      id="from-location" 
                      placeholder="Current location"
                      className="bg-slate-700 border-slate-600 text-white" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="to-location" className="text-white">To Location</Label>
                    <Input 
                      id="to-location" 
                      placeholder="Destination location"
                      className="bg-slate-700 border-slate-600 text-white" 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quantity" className="text-white">Quantity</Label>
                    <Input 
                      id="quantity" 
                      type="number"
                      placeholder="0"
                      className="bg-slate-700 border-slate-600 text-white" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="authorized-by" className="text-white">Authorized By</Label>
                    <Input 
                      id="authorized-by" 
                      placeholder="Name of authorizing person"
                      className="bg-slate-700 border-slate-600 text-white" 
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="reason" className="text-white">Transfer Reason</Label>
                  <Textarea 
                    id="reason"
                    placeholder="Reason for transfer..."
                    className="bg-slate-700 border-slate-600 text-white" 
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowTransferDialog(false)}>Cancel</Button>
                <Button className="bg-red-600 hover:bg-red-700">Process Transfer</Button>
              </div>
            </DialogContent>
          </Dialog>
          
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Medication
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-white">Add New Medication</DialogTitle>
                <DialogDescription>Register a new controlled substance</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="med-name" className="text-white">Medication Name</Label>
                    <Input 
                      id="med-name" 
                      placeholder="Morphine Sulfate"
                      className="bg-slate-700 border-slate-600 text-white" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="generic-name" className="text-white">Generic Name</Label>
                    <Input 
                      id="generic-name" 
                      placeholder="Morphine"
                      className="bg-slate-700 border-slate-600 text-white" 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="schedule" className="text-white">Schedule Class</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="II">Schedule II</SelectItem>
                        <SelectItem value="III">Schedule III</SelectItem>
                        <SelectItem value="IV">Schedule IV</SelectItem>
                        <SelectItem value="Non-Controlled">Non-Controlled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="dosage" className="text-white">Dosage</Label>
                    <Input 
                      id="dosage" 
                      placeholder="10mg/mL"
                      className="bg-slate-700 border-slate-600 text-white" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="quantity" className="text-white">Quantity</Label>
                    <Input 
                      id="quantity" 
                      type="number"
                      placeholder="0"
                      className="bg-slate-700 border-slate-600 text-white" 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="lot-number" className="text-white">Lot Number</Label>
                    <Input 
                      id="lot-number" 
                      placeholder="MOR2024001"
                      className="bg-slate-700 border-slate-600 text-white" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="control-number" className="text-white">Control Number</Label>
                    <Input 
                      id="control-number" 
                      placeholder="CN-001-2024"
                      className="bg-slate-700 border-slate-600 text-white" 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiration" className="text-white">Expiration Date</Label>
                    <Input 
                      id="expiration" 
                      type="date"
                      className="bg-slate-700 border-slate-600 text-white" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="location" className="text-white">Location</Label>
                    <Input 
                      id="location" 
                      placeholder="Ambulance 1 - Drug Box"
                      className="bg-slate-700 border-slate-600 text-white" 
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
                <Button className="bg-red-600 hover:bg-red-700">Add Medication</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-red-400" />
              <div>
                <p className="text-2xl font-bold text-white">13</p>
                <p className="text-slate-400 text-sm">Schedule II</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Pill className="h-8 w-8 text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-white">47</p>
                <p className="text-slate-400 text-sm">Total Medications</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-8 w-8 text-yellow-400" />
              <div>
                <p className="text-2xl font-bold text-white">3</p>
                <p className="text-slate-400 text-sm">Expiring Soon</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <ArrowRight className="h-8 w-8 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-white">5</p>
                <p className="text-slate-400 text-sm">Recent Transfers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Medication Inventory</CardTitle>
            <CardDescription>Complete controlled substance tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-slate-300">Medication</TableHead>
                  <TableHead className="text-slate-300">Schedule</TableHead>
                  <TableHead className="text-slate-300">Dosage</TableHead>
                  <TableHead className="text-slate-300">Quantity</TableHead>
                  <TableHead className="text-slate-300">Control #</TableHead>
                  <TableHead className="text-slate-300">Lot #</TableHead>
                  <TableHead className="text-slate-300">Expiration</TableHead>
                  <TableHead className="text-slate-300">Location</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {medications.map((med) => (
                  <TableRow key={med.id} className="border-slate-700">
                    <TableCell className="text-white font-medium">
                      <div>
                        <p>{med.name}</p>
                        <p className="text-slate-400 text-sm">{med.genericName}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getScheduleColor(med.scheduleClass)} text-white`}>
                        {med.scheduleClass}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-300">{med.dosage}</TableCell>
                    <TableCell className="text-slate-300">{med.quantity} {med.unit}</TableCell>
                    <TableCell className="text-slate-300">{med.controlNumber}</TableCell>
                    <TableCell className="text-slate-300">{med.lotNumber}</TableCell>
                    <TableCell className="text-slate-300">{med.expirationDate}</TableCell>
                    <TableCell className="text-slate-300">{med.location}</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(med.status)} text-white`}>
                        {med.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Transfer History
            </CardTitle>
            <CardDescription>Recent medication transfers and movements</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-slate-300">Date</TableHead>
                  <TableHead className="text-slate-300">Medication</TableHead>
                  <TableHead className="text-slate-300">From</TableHead>
                  <TableHead className="text-slate-300">To</TableHead>
                  <TableHead className="text-slate-300">Quantity</TableHead>
                  <TableHead className="text-slate-300">Authorized By</TableHead>
                  <TableHead className="text-slate-300">Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transfers.map((transfer) => {
                  const medication = medications.find(m => m.id === transfer.medicationId);
                  return (
                    <TableRow key={transfer.id} className="border-slate-700">
                      <TableCell className="text-slate-300">{transfer.transferDate}</TableCell>
                      <TableCell className="text-white">{medication?.name}</TableCell>
                      <TableCell className="text-slate-300">{transfer.fromLocation}</TableCell>
                      <TableCell className="text-slate-300">{transfer.toLocation}</TableCell>
                      <TableCell className="text-slate-300">{transfer.quantity}</TableCell>
                      <TableCell className="text-slate-300">{transfer.authorizedBy}</TableCell>
                      <TableCell className="text-slate-300">{transfer.reason}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
