
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
import { CalendarIcon, Plane, Heart, Coffee, Clock, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface LeaveRequestProps {
  currentUser: {
    id: string;
    name: string;
    badge: string;
    role: string;
    station: string;
    shift: string;
  };
}

export const LeaveRequest = ({ currentUser }: LeaveRequestProps) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  
  const [accrualBalances] = useState({
    vacation: { available: 120, used: 32, total: 152 },
    sick: { available: 96, used: 8, total: 104 },
    personal: { available: 24, used: 4, total: 28 },
    compTime: { available: 16, used: 0, total: 16 }
  });

  const [leaveRequests] = useState([
    {
      id: "LV-001",
      type: "Vacation",
      startDate: "2024-07-01",
      endDate: "2024-07-05",
      hours: 120,
      status: "Pending",
      reason: "Family vacation",
      submitted: "2024-06-24"
    },
    {
      id: "LV-002",
      type: "Sick",
      startDate: "2024-06-15",
      endDate: "2024-06-15", 
      hours: 24,
      status: "Approved",
      reason: "Medical appointment",
      submitted: "2024-06-14"
    }
  ]);

  const [newLeave, setNewLeave] = useState({
    type: "",
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Vacation": return <Plane className="h-4 w-4" />;
      case "Sick": return <Heart className="h-4 w-4" />;
      case "Personal": return <Coffee className="h-4 w-4" />;
      case "Comp Time": return <DollarSign className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const calculateHours = () => {
    if (!startDate || !endDate) return 0;
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays * 24; // 24-hour shifts
  };

  const handleSubmitLeave = () => {
    if (!startDate || !endDate || !newLeave.type || !newLeave.reason) {
      alert("Please fill in all required fields");
      return;
    }

    console.log("Submitting leave request:", {
      type: newLeave.type,
      startDate,
      endDate,
      hours: calculateHours(),
      reason: newLeave.reason,
      notes: newLeave.notes
    });

    // Reset form
    setStartDate(undefined);
    setEndDate(undefined);
    setNewLeave({ type: "", reason: "", notes: "" });
  };

  return (
    <div className="space-y-6">
      {/* Accrual Balances */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-4 text-center">
            <Plane className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="text-lg font-bold text-slate-900">{accrualBalances.vacation.available}</p>
            <p className="text-xs text-slate-600">Vacation Hours</p>
            <p className="text-xs text-slate-500">Used: {accrualBalances.vacation.used}</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-4 text-center">
            <Heart className="h-6 w-6 text-red-600 mx-auto mb-2" />
            <p className="text-lg font-bold text-slate-900">{accrualBalances.sick.available}</p>
            <p className="text-xs text-slate-600">Sick Hours</p>
            <p className="text-xs text-slate-500">Used: {accrualBalances.sick.used}</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-4 text-center">
            <Coffee className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <p className="text-lg font-bold text-slate-900">{accrualBalances.personal.available}</p>
            <p className="text-xs text-slate-600">Personal Hours</p>
            <p className="text-xs text-slate-500">Used: {accrualBalances.personal.used}</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-4 text-center">
            <DollarSign className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-lg font-bold text-slate-900">{accrualBalances.compTime.available}</p>
            <p className="text-xs text-slate-600">Comp Time Hours</p>
            <p className="text-xs text-slate-500">Used: {accrualBalances.compTime.used}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* New Leave Request */}
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plane className="h-5 w-5 mr-2" />
              Request Leave
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Leave Type
              </label>
              <Select value={newLeave.type} onValueChange={(value) => 
                setNewLeave({...newLeave, type: value})
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Select leave type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Vacation">Vacation</SelectItem>
                  <SelectItem value="Sick">Sick Leave</SelectItem>
                  <SelectItem value="Personal">Personal Day</SelectItem>
                  <SelectItem value="Comp Time">Comp Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Start Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  End Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "End date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {startDate && endDate && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-600">
                  Total Hours Requested: <span className="font-bold">{calculateHours()}</span>
                </p>
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Reason
              </label>
              <Input
                value={newLeave.reason}
                onChange={(e) => setNewLeave({...newLeave, reason: e.target.value})}
                placeholder="Brief reason for leave"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Additional Notes
              </label>
              <Textarea
                value={newLeave.notes}
                onChange={(e) => setNewLeave({...newLeave, notes: e.target.value})}
                placeholder="Any additional details..."
                rows={3}
              />
            </div>

            <Button onClick={handleSubmitLeave} className="w-full">
              Submit Leave Request
            </Button>
          </CardContent>
        </Card>

        {/* Leave Requests History */}
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle>Leave Request History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {leaveRequests.map((request) => (
                <div key={request.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        {getTypeIcon(request.type)}
                        <h4 className="font-medium text-slate-900">{request.type}</h4>
                        <Badge className={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600">
                        {request.startDate} to {request.endDate}
                      </p>
                      <p className="text-xs text-slate-500">
                        {request.hours} hours | {request.reason}
                      </p>
                      <p className="text-xs text-slate-500">
                        Submitted: {request.submitted}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
