
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClockInOut } from "./ClockInOut";
import { ShiftSwapRequest } from "./ShiftSwapRequest";
import { LeaveRequest } from "./LeaveRequest";
import { TimesheetView } from "./TimesheetView";
import { SupervisorDashboard } from "./SupervisorDashboard";
import { useUserRole } from "@/hooks/useUserRole";
import { Calendar, Clock, FileText, Users, AlertTriangle } from "lucide-react";

interface ShiftLoggingProps {
  currentUser: {
    id: string;
    name: string;
    badge: string;
    role: string;
    station: string;
    shift: string;
  };
}

export const ShiftLogging = ({ currentUser }: ShiftLoggingProps) => {
  const { userRole, hasAccess } = useUserRole();
  const [activeShift, setActiveShift] = useState({
    isActive: true,
    startTime: "2024-06-24 06:00:00",
    shiftType: "24-on",
    station: "Station 1"
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Shift Logging</h1>
          <p className="text-slate-300">
            {currentUser.name} - Badge #{currentUser.badge} | {currentUser.station} - Shift {currentUser.shift}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-white text-sm">
            <p>Current Shift: {activeShift.shiftType}</p>
            <p>Started: {new Date(activeShift.startTime).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">18.5</p>
            <p className="text-slate-600 text-sm">Hours This Shift</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">2</p>
            <p className="text-slate-600 text-sm">Pending Swaps</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <FileText className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">1</p>
            <p className="text-slate-600 text-sm">Timesheet Issues</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">120</p>
            <p className="text-slate-600 text-sm">Available Leave Hours</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="timesheet" className="space-y-4">
        <TabsList className="bg-white/10 backdrop-blur-sm">
          <TabsTrigger value="timesheet" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
            My Timesheet
          </TabsTrigger>
          <TabsTrigger value="clock" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
            Clock In/Out
          </TabsTrigger>
          <TabsTrigger value="swaps" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
            Shift Swaps
          </TabsTrigger>
          <TabsTrigger value="leave" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
            Leave Requests
          </TabsTrigger>
          {(userRole === "admin" || hasAccess("schedule")) && (
            <TabsTrigger value="supervisor" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
              Supervisor Panel
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="timesheet">
          <TimesheetView currentUser={currentUser} />
        </TabsContent>

        <TabsContent value="clock">
          <ClockInOut currentUser={currentUser} activeShift={activeShift} />
        </TabsContent>

        <TabsContent value="swaps">
          <ShiftSwapRequest currentUser={currentUser} />
        </TabsContent>

        <TabsContent value="leave">
          <LeaveRequest currentUser={currentUser} />
        </TabsContent>

        {(userRole === "admin" || hasAccess("schedule")) && (
          <TabsContent value="supervisor">
            <SupervisorDashboard currentUser={currentUser} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};
