
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, AlertCircle, CheckCircle } from "lucide-react";

interface ClockInOutProps {
  currentUser: {
    id: string;
    name: string;
    badge: string;
    role: string;
    station: string;
    shift: string;
  };
  activeShift: {
    isActive: boolean;
    startTime: string;
    shiftType: string;
    station: string;
  };
}

export const ClockInOut = ({ currentUser, activeShift }: ClockInOutProps) => {
  const [clockedIn, setClockedIn] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState("Station 1");
  const [shiftDuration, setShiftDuration] = useState(0);

  const [clockEvents] = useState([
    {
      id: "CE-001",
      type: "Clock In",
      timestamp: "2024-06-24 06:00:00",
      location: "Station 1",
      notes: "Start of 24-hour shift"
    },
    {
      id: "CE-002", 
      type: "Break Start",
      timestamp: "2024-06-24 12:00:00",
      location: "Station 1",
      notes: "Lunch break"
    },
    {
      id: "CE-003",
      type: "Break End", 
      timestamp: "2024-06-24 12:45:00",
      location: "Station 1",
      notes: "Return from lunch"
    }
  ]);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      if (activeShift.isActive) {
        const start = new Date(activeShift.startTime);
        const now = new Date();
        const duration = Math.floor((now.getTime() - start.getTime()) / 1000);
        setShiftDuration(duration);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [activeShift]);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const handleClockAction = (action: string) => {
    console.log(`${action} at ${currentTime.toLocaleString()} - Location: ${location}`);
    if (action === "Clock Out") {
      setClockedIn(false);
    } else if (action === "Clock In") {
      setClockedIn(true);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Clock Controls */}
      <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Clock In/Out Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Status */}
          <div className="text-center">
            <div className="text-4xl font-mono font-bold text-slate-900 mb-2">
              {currentTime.toLocaleTimeString()}
            </div>
            <div className="text-lg text-slate-600 mb-4">
              {currentTime.toLocaleDateString()}
            </div>
            <Badge className={clockedIn ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
              {clockedIn ? "Clocked In" : "Clocked Out"}
            </Badge>
          </div>

          {/* Shift Duration */}
          {activeShift.isActive && (
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-600 mb-1">Current Shift Duration</p>
              <p className="text-2xl font-bold text-blue-800">{formatDuration(shiftDuration)}</p>
              <p className="text-xs text-blue-600">{activeShift.shiftType} shift</p>
            </div>
          )}

          {/* Location */}
          <div className="flex items-center space-x-2 p-3 bg-slate-50 rounded-lg">
            <MapPin className="h-4 w-4 text-slate-600" />
            <span className="text-sm text-slate-700">Location: {location}</span>
          </div>

          {/* Clock Actions */}
          <div className="space-y-3">
            {clockedIn ? (
              <>
                <Button 
                  onClick={() => handleClockAction("Clock Out")}
                  className="w-full bg-red-600 hover:bg-red-700"
                  size="lg"
                >
                  Clock Out
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    onClick={() => handleClockAction("Break Start")}
                    variant="outline"
                    size="sm"
                  >
                    Start Break
                  </Button>
                  <Button 
                    onClick={() => handleClockAction("Break End")}
                    variant="outline"
                    size="sm"
                  >
                    End Break
                  </Button>
                </div>
              </>
            ) : (
              <Button 
                onClick={() => handleClockAction("Clock In")}
                className="w-full bg-green-600 hover:bg-green-700"
                size="lg"
              >
                Clock In
              </Button>
            )}
          </div>

          {/* Validation Messages */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-green-600 text-sm">
              <CheckCircle className="h-4 w-4" />
              <span>Location verified</span>
            </div>
            <div className="flex items-center space-x-2 text-orange-600 text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>Reminder: Submit timesheet by end of pay period</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Clock Events */}
      <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
        <CardHeader>
          <CardTitle>Recent Clock Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {clockEvents.map((event) => (
              <div key={event.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-slate-900">{event.type}</h4>
                    <p className="text-sm text-slate-600">{new Date(event.timestamp).toLocaleString()}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {event.location}
                  </Badge>
                </div>
                {event.notes && (
                  <p className="text-xs text-slate-500 mt-2">{event.notes}</p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
