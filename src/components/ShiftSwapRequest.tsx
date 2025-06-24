
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Users, RefreshCw, CheckCircle, XCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShiftSwapRequestProps {
  currentUser: {
    id: string;
    name: string;
    badge: string;
    role: string;
    station: string;
    shift: string;
  };
}

export const ShiftSwapRequest = ({ currentUser }: ShiftSwapRequestProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [swapRequests] = useState([
    {
      id: "SW-001",
      requester: "John Smith",
      partner: "Mike Johnson",
      originalDate: "2024-07-01",
      proposedDate: "2024-07-08", 
      reason: "Family event",
      status: "Pending",
      submitted: "2024-06-24",
      shiftType: "24-on"
    },
    {
      id: "SW-002",
      requester: "Jane Doe", 
      partner: "John Smith",
      originalDate: "2024-07-05",
      proposedDate: "2024-07-12",
      reason: "Medical appointment",
      status: "Approved",
      submitted: "2024-06-20",
      shiftType: "24-on"
    }
  ]);

  const [availablePartners] = useState([
    { id: "EMP-002", name: "Mike Johnson", badge: "FF-102", shift: "A" },
    { id: "EMP-003", name: "Sarah Wilson", badge: "FF-103", shift: "A" },
    { id: "EMP-004", name: "Tom Davis", badge: "FF-104", shift: "B" }
  ]);

  const [newSwap, setNewSwap] = useState({
    partner: "",
    reason: "",
    notes: ""
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Denied": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleSubmitSwap = () => {
    if (!selectedDate || !newSwap.partner || !newSwap.reason) {
      alert("Please fill in all required fields");
      return;
    }

    console.log("Submitting swap request:", {
      date: selectedDate,
      partner: newSwap.partner,
      reason: newSwap.reason,
      notes: newSwap.notes
    });

    // Reset form
    setSelectedDate(undefined);
    setNewSwap({ partner: "", reason: "", notes: "" });
  };

  const handleSwapAction = (swapId: string, action: string) => {
    console.log(`${action} swap request ${swapId}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* New Swap Request */}
      <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <RefreshCw className="h-5 w-5 mr-2" />
            Request Shift Swap
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">
              Select Date to Swap
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">
              Select Partner
            </label>
            <Select value={newSwap.partner} onValueChange={(value) => 
              setNewSwap({...newSwap, partner: value})
            }>
              <SelectTrigger>
                <SelectValue placeholder="Choose a partner" />
              </SelectTrigger>
              <SelectContent>
                {availablePartners.map((partner) => (
                  <SelectItem key={partner.id} value={partner.id}>
                    {partner.name} - Badge #{partner.badge} (Shift {partner.shift})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">
              Reason for Swap
            </label>
            <Select value={newSwap.reason} onValueChange={(value) => 
              setNewSwap({...newSwap, reason: value})
            }>
              <SelectTrigger>
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="personal">Personal/Family</SelectItem>
                <SelectItem value="medical">Medical Appointment</SelectItem>
                <SelectItem value="education">Training/Education</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">
              Additional Notes
            </label>
            <Textarea
              value={newSwap.notes}
              onChange={(e) => setNewSwap({...newSwap, notes: e.target.value})}
              placeholder="Any additional details..."
              rows={3}
            />
          </div>

          <Button onClick={handleSubmitSwap} className="w-full">
            Submit Swap Request
          </Button>
        </CardContent>
      </Card>

      {/* Swap Requests History */}
      <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Swap Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {swapRequests.map((swap) => (
              <div key={swap.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium text-slate-900">
                        {swap.requester} ↔ {swap.partner}
                      </h4>
                      <Badge className={getStatusColor(swap.status)}>
                        {swap.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600">
                      Original: {swap.originalDate} → Proposed: {swap.proposedDate}
                    </p>
                    <p className="text-xs text-slate-500">
                      Reason: {swap.reason} | {swap.shiftType}
                    </p>
                    <p className="text-xs text-slate-500">
                      Submitted: {swap.submitted}
                    </p>
                  </div>
                </div>

                {swap.status === "Pending" && swap.partner === currentUser.name && (
                  <div className="flex space-x-2 mt-3">
                    <Button 
                      size="sm"
                      onClick={() => handleSwapAction(swap.id, "Approve")}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Approve
                    </Button>
                    <Button 
                      size="sm"
                      variant="destructive"
                      onClick={() => handleSwapAction(swap.id, "Deny")}
                    >
                      <XCircle className="h-3 w-3 mr-1" />
                      Deny
                    </Button>
                  </div>
                )}

                {swap.status === "Pending" && swap.requester === currentUser.name && (
                  <div className="flex items-center space-x-2 mt-3 text-orange-600 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>Waiting for {swap.partner} to respond</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
