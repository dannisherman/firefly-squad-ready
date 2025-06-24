
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Play, Pause, Square, Timer, MapPin } from "lucide-react";

interface TimeTrackerProps {
  currentUser: {
    id: string;
    name: string;
    badge: string;
    role: string;
    station: string;
    shift: string;
  };
}

export const TimeTracker = ({ currentUser }: TimeTrackerProps) => {
  const [isClocked, setIsClocked] = useState(false);
  const [clockInTime, setClockInTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentBreak, setCurrentBreak] = useState<{ start: Date; type: string } | null>(null);
  const [breakTime, setBreakTime] = useState(0);

  const [todaysSummary] = useState({
    clockIn: "06:00 AM",
    expectedClockOut: "06:00 PM",
    regularHours: 8.0,
    overtimeHours: 0.5,
    breakTime: 30,
    location: "Station 1"
  });

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isClocked && clockInTime) {
      interval = setInterval(() => {
        const now = new Date();
        const diff = Math.floor((now.getTime() - clockInTime.getTime()) / 1000);
        setElapsedTime(diff);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isClocked, clockInTime]);

  // Break timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (currentBreak) {
      interval = setInterval(() => {
        const now = new Date();
        const diff = Math.floor((now.getTime() - currentBreak.start.getTime()) / 1000);
        setBreakTime(diff);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentBreak]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleClockIn = () => {
    setIsClocked(true);
    setClockInTime(new Date());
    setElapsedTime(0);
    console.log(`${currentUser.name} clocked in at ${new Date().toLocaleTimeString()}`);
  };

  const handleClockOut = () => {
    setIsClocked(false);
    setClockInTime(null);
    setCurrentBreak(null);
    console.log(`${currentUser.name} clocked out at ${new Date().toLocaleTimeString()}`);
  };

  const handleBreakStart = (type: string) => {
    setCurrentBreak({ start: new Date(), type });
    setBreakTime(0);
  };

  const handleBreakEnd = () => {
    if (currentBreak) {
      console.log(`Break ended: ${currentBreak.type} - Duration: ${formatTime(breakTime)}`);
      setCurrentBreak(null);
      setBreakTime(0);
    }
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Timer className="h-5 w-5 mr-2" />
          Time Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Status */}
        <div className="text-center">
          <div className="text-3xl font-mono font-bold text-slate-900 mb-2">
            {formatTime(elapsedTime)}
          </div>
          <Badge className={isClocked ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
            {isClocked ? "Clocked In" : "Clocked Out"}
          </Badge>
          {currentBreak && (
            <div className="mt-2">
              <Badge className="bg-orange-100 text-orange-800">
                On {currentBreak.type} - {formatTime(breakTime)}
              </Badge>
            </div>
          )}
        </div>

        {/* Clock Controls */}
        <div className="space-y-3">
          {!isClocked ? (
            <Button 
              onClick={handleClockIn}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <Play className="h-4 w-4 mr-2" />
              Clock In
            </Button>
          ) : (
            <Button 
              onClick={handleClockOut}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              <Square className="h-4 w-4 mr-2" />
              Clock Out
            </Button>
          )}

          {isClocked && !currentBreak && (
            <div className="grid grid-cols-2 gap-2">
              <Button 
                onClick={() => handleBreakStart("Lunch")}
                variant="outline"
                size="sm"
              >
                <Pause className="h-3 w-3 mr-1" />
                Lunch
              </Button>
              <Button 
                onClick={() => handleBreakStart("Break")}
                variant="outline"
                size="sm"
              >
                <Pause className="h-3 w-3 mr-1" />
                Break
              </Button>
            </div>
          )}

          {currentBreak && (
            <Button 
              onClick={handleBreakEnd}
              className="w-full bg-orange-600 hover:bg-orange-700"
            >
              <Play className="h-4 w-4 mr-2" />
              End {currentBreak.type}
            </Button>
          )}
        </div>

        {/* Today's Summary */}
        <div className="border-t pt-4">
          <h4 className="font-medium mb-3 flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            Today's Summary
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Clock In:</span>
              <span className="font-medium">{todaysSummary.clockIn}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Expected Out:</span>
              <span className="font-medium">{todaysSummary.expectedClockOut}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Regular Hours:</span>
              <span className="font-medium">{todaysSummary.regularHours}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Overtime:</span>
              <span className="font-medium text-orange-600">{todaysSummary.overtimeHours}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Break Time:</span>
              <span className="font-medium">{todaysSummary.breakTime} min</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Location:</span>
              <div className="flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                <span className="font-medium">{todaysSummary.location}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
