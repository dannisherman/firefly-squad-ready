
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Users, Bell, DollarSign, CheckCircle, XCircle, User, CalendarDays, Timer, FileText } from "lucide-react";
import { ShiftCalendar } from "./ShiftCalendar";
import { TimeTracker } from "./TimeTracker";
import { TimecardManager } from "./TimecardManager";
import { AccrualBank } from "./AccrualBank";

export const EmployeeCenter = () => {
  const [currentUser] = useState({
    id: "EMP-001",
    name: "John Smith",
    badge: "FF-101",
    role: "employee", // or "admin"
    station: "Engine 1",
    shift: "A"
  });

  const [todaysAssignments] = useState([
    {
      id: "ASSIGN-001",
      station: "Engine 1",
      position: "Driver/Operator",
      shift: "Day (6:00 AM - 6:00 PM)",
      status: "Confirmed",
      overtime: false
    },
    {
      id: "ASSIGN-002", 
      station: "Rescue 5",
      position: "EMT",
      shift: "Night (6:00 PM - 6:00 AM)",
      status: "Available",
      overtime: true
    }
  ]);

  const [announcements] = useState([
    {
      id: "ANN-001",
      title: "Monthly Safety Training",
      message: "Mandatory safety training scheduled for next week. Please check your assignments.",
      date: "2024-06-23",
      priority: "high",
      read: false
    },
    {
      id: "ANN-002",
      title: "Equipment Update",
      message: "New breathing apparatus has been installed on Engine 2.",
      date: "2024-06-22",
      priority: "medium",
      read: true
    }
  ]);

  const [availableShifts] = useState([
    {
      id: "SHIFT-001",
      station: "Ladder 3",
      position: "Firefighter",
      date: "2024-06-25",
      time: "6:00 AM - 6:00 PM",
      overtime: true,
      premium: "$45/hr",
      deadline: "2024-06-24 12:00 PM"
    },
    {
      id: "SHIFT-002",
      station: "Engine 2", 
      position: "Driver/Operator",
      date: "2024-06-26",
      time: "6:00 PM - 6:00 AM",
      overtime: false,
      premium: "$38/hr",
      deadline: "2024-06-25 2:00 PM"
    }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed": return "bg-green-100 text-green-800";
      case "Available": return "bg-blue-100 text-blue-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Employee Center</h1>
          <p className="text-slate-300">Welcome back, {currentUser.name} - Badge #{currentUser.badge}</p>
        </div>
        <div className="flex items-center space-x-2 text-white">
          <User className="h-5 w-5" />
          <span className="font-medium">{currentUser.station} - Shift {currentUser.shift}</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">8.5</p>
            <p className="text-slate-600 text-sm">Hours Today</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <CalendarDays className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">{availableShifts.length}</p>
            <p className="text-slate-600 text-sm">Available Shifts</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <DollarSign className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">156.5</p>
            <p className="text-slate-600 text-sm">Vacation Hours</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <Bell className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">{announcements.filter(a => !a.read).length}</p>
            <p className="text-slate-600 text-sm">New Announcements</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList className="bg-white/10 backdrop-blur-sm">
          <TabsTrigger value="dashboard" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="shifts" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
            My Shifts
          </TabsTrigger>
          <TabsTrigger value="timecard" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
            Timecard
          </TabsTrigger>
          <TabsTrigger value="accruals" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
            Accrual Bank
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Today's Assignments */}
            <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Today's Assignments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaysAssignments.map((assignment) => (
                    <div key={assignment.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{assignment.station}</h4>
                          <p className="text-sm text-slate-600">{assignment.position}</p>
                          <p className="text-xs text-slate-500">{assignment.shift}</p>
                        </div>
                        <div className="space-y-1">
                          <Badge className={getStatusColor(assignment.status)}>
                            {assignment.status}
                          </Badge>
                          {assignment.overtime && (
                            <Badge className="bg-orange-100 text-orange-800">
                              Overtime
                            </Badge>
                          )}
                        </div>
                      </div>
                      {assignment.status === "Available" && (
                        <Button size="sm" className="w-full mt-2">
                          Bid for Shift
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Available Call Shifts */}
            <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Available Call Shifts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {availableShifts.map((shift) => (
                    <div key={shift.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{shift.station}</h4>
                          <p className="text-sm text-slate-600">{shift.position}</p>
                          <p className="text-xs text-slate-500">{shift.date} • {shift.time}</p>
                          <p className="text-xs text-orange-600">Deadline: {shift.deadline}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">{shift.premium}</p>
                          {shift.overtime && (
                            <Badge className="bg-orange-100 text-orange-800">
                              Overtime
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button size="sm" className="w-full">
                        Apply for Shift
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Announcements */}
            <Card className="bg-white/95 backdrop-blur-sm border-slate-200 lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Announcements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <div key={announcement.id} className={`p-4 border rounded-lg ${!announcement.read ? 'bg-blue-50 border-blue-200' : 'bg-white'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold">{announcement.title}</h4>
                            <Badge className={getPriorityColor(announcement.priority)}>
                              {announcement.priority}
                            </Badge>
                            {!announcement.read && (
                              <Badge className="bg-blue-100 text-blue-800">
                                New
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-slate-600 mt-1">{announcement.message}</p>
                          <p className="text-xs text-slate-500 mt-2">{announcement.date}</p>
                        </div>
                        {!announcement.read && (
                          <Button size="sm" variant="outline">
                            Mark Read
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="shifts">
          <ShiftCalendar currentUser={currentUser} />
        </TabsContent>

        <TabsContent value="timecard">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <TimeTracker currentUser={currentUser} />
            </div>
            <div className="lg:col-span-2">
              <TimecardManager currentUser={currentUser} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="accruals">
          <AccrualBank currentUser={currentUser} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
