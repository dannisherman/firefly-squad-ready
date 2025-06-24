
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, Clock, MapPin, DollarSign, CheckCircle, UserCheck } from "lucide-react";

interface ShiftCalendarProps {
  currentUser: {
    id: string;
    name: string;
    badge: string;
    role: string;
    station: string;
    shift: string;
  };
}

export const ShiftCalendar = ({ currentUser }: ShiftCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState<"month" | "week">("month");
  const [availabilityMode, setAvailabilityMode] = useState(false);

  const [shifts] = useState([
    {
      id: "SHIFT-001",
      date: "2024-06-24",
      station: "Engine 1",
      position: "Driver/Operator",
      time: "6:00 AM - 6:00 PM",
      status: "Assigned",
      overtime: false,
      canBid: false
    },
    {
      id: "SHIFT-002",
      date: "2024-06-25",
      station: "Ladder 3",
      position: "Firefighter",
      time: "6:00 PM - 6:00 AM",
      status: "Available",
      overtime: true,
      canBid: true,
      bidDeadline: "2024-06-24 2:00 PM"
    },
    {
      id: "SHIFT-003",
      date: "2024-06-26",
      station: "Engine 1",
      position: "EMT",
      time: "8:00 AM - 8:00 PM",
      status: "Requested",
      overtime: false,
      canBid: false
    }
  ]);

  const [vacationRequests] = useState([
    {
      id: "VAC-001",
      startDate: "2024-07-15",
      endDate: "2024-07-22",
      days: 7,
      status: "Pending",
      type: "Vacation"
    },
    {
      id: "VAC-002",
      startDate: "2024-08-10",
      endDate: "2024-08-10",
      days: 1,
      status: "Approved",
      type: "Personal"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Assigned": return "bg-green-100 text-green-800";
      case "Available": return "bg-blue-100 text-blue-800";
      case "Requested": return "bg-yellow-100 text-yellow-800";
      case "Approved": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Denied": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div className="flex space-x-2">
          <Button
            variant={viewMode === "month" ? "default" : "outline"}
            onClick={() => setViewMode("month")}
            className={viewMode === "month" ? "bg-red-600 hover:bg-red-700" : ""}
          >
            Month View
          </Button>
          <Button
            variant={viewMode === "week" ? "default" : "outline"}
            onClick={() => setViewMode("week")}
            className={viewMode === "week" ? "bg-red-600 hover:bg-red-700" : ""}
          >
            Week View
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={availabilityMode ? "default" : "outline"}
            onClick={() => setAvailabilityMode(!availabilityMode)}
            className={availabilityMode ? "bg-green-600 hover:bg-green-700" : ""}
          >
            <UserCheck className="h-4 w-4 mr-2" />
            {availabilityMode ? "Exit Availability Mode" : "Mark Availability"}
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Request Vacation
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarDays className="h-5 w-5 mr-2" />
              Shift Calendar
              {availabilityMode && (
                <Badge className="ml-2 bg-green-100 text-green-800">
                  Availability Mode
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
            
            {availabilityMode && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-2">Mark Your Availability</h4>
                <p className="text-sm text-green-700 mb-3">
                  Click on dates to mark yourself available for call shifts. This helps with the vacancy-filling process.
                </p>
                <div className="flex space-x-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Mark Available
                  </Button>
                  <Button size="sm" variant="outline">
                    Mark Unavailable
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Shift Details */}
        <div className="space-y-6">
          {/* Current Shifts */}
          <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                My Shifts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {shifts.map((shift) => (
                  <div key={shift.id} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-sm">{shift.station}</h4>
                        <p className="text-xs text-slate-600">{shift.position}</p>
                        <p className="text-xs text-slate-500">{shift.date}</p>
                        <p className="text-xs text-slate-500">{shift.time}</p>
                      </div>
                      <Badge className={getStatusColor(shift.status)}>
                        {shift.status}
                      </Badge>
                    </div>
                    
                    {shift.overtime && (
                      <Badge className="bg-orange-100 text-orange-800 text-xs">
                        Overtime
                      </Badge>
                    )}
                    
                    {shift.canBid && (
                      <div className="mt-2">
                        <p className="text-xs text-orange-600 mb-1">
                          Deadline: {shift.bidDeadline}
                        </p>
                        <Button size="sm" className="w-full">
                          Bid for Shift
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Vacation Requests */}
          <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Vacation Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {vacationRequests.map((request) => (
                  <div key={request.id} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-sm">{request.type}</h4>
                        <p className="text-xs text-slate-600">
                          {request.startDate} - {request.endDate}
                        </p>
                        <p className="text-xs text-slate-500">{request.days} days</p>
                      </div>
                      <Badge className={getStatusColor(request.status)}>
                        {request.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button size="sm" className="w-full mt-3" variant="outline">
                New Vacation Request
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
