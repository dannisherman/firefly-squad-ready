
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, Clock, CheckCircle, XCircle, AlertCircle, Plus, FileText } from "lucide-react";

interface TimeOffManagerProps {
  currentUser: {
    id: string;
    name: string;
    badge: string;
    role: string;
    station: string;
    shift: string;
  };
}

export const TimeOffManager = ({ currentUser }: TimeOffManagerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [requestType, setRequestType] = useState("vacation");

  const [timeOffRequests] = useState([
    {
      id: "REQ-001",
      type: "Vacation",
      startDate: "2024-07-15",
      endDate: "2024-07-22",
      days: 7,
      hours: 56,
      status: "Pending",
      reason: "Family vacation",
      submitted: "2024-06-20",
      approver: null,
      conflicts: 0
    },
    {
      id: "REQ-002", 
      type: "Personal",
      startDate: "2024-08-10",
      endDate: "2024-08-10",
      days: 1,
      hours: 8,
      status: "Approved",
      reason: "Medical appointment",
      submitted: "2024-06-15",
      approver: "Captain Davis",
      conflicts: 0
    }
  ]);

  const [timeOffRules] = useState({
    vacation: {
      maxConsecutiveDays: 14,
      minAdvanceNotice: 30,
      maxRequestsPerYear: 4,
      blackoutPeriods: ["2024-12-20 to 2024-01-05", "2024-07-01 to 2024-07-07"],
      approvalRequired: true
    },
    sick: {
      maxConsecutiveDays: 5,
      minAdvanceNotice: 0,
      approvalRequired: false,
      doctorsNoteRequired: 3
    },
    personal: {
      maxConsecutiveDays: 3,
      minAdvanceNotice: 7,
      maxRequestsPerYear: 12,
      approvalRequired: true
    }
  });

  const [pendingApprovals] = useState([
    {
      id: "REQ-003",
      employee: "Wilson, Kate",
      badge: "EMT-201",
      type: "Vacation",
      startDate: "2024-07-20",
      endDate: "2024-07-27",
      days: 7,
      reason: "Annual vacation",
      conflicts: 2,
      replacementNeeded: true
    },
    {
      id: "REQ-004",
      employee: "Johnson, Mike", 
      badge: "FF-102",
      type: "Personal",
      startDate: "2024-07-02",
      endDate: "2024-07-02",
      days: 1,
      reason: "Personal matter",
      conflicts: 0,
      replacementNeeded: false
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Denied": return "bg-red-100 text-red-800"; 
      case "Cancelled": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleNewRequest = () => {
    console.log("Creating new time-off request");
    // Modal form would open here
  };

  const handleApproveRequest = (requestId: string) => {
    console.log(`Approving request ${requestId}`);
  };

  const handleDenyRequest = (requestId: string) => {
    console.log(`Denying request ${requestId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Time Off Management</h2>
          <p className="text-slate-300">Manage vacation requests, personal time, and time-off scheduling</p>
        </div>
        <Button onClick={handleNewRequest} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          New Request
        </Button>
      </div>

      <Tabs defaultValue="my-requests" className="space-y-4">
        <TabsList className="bg-white/10 backdrop-blur-sm">
          <TabsTrigger value="my-requests" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
            My Requests
          </TabsTrigger>
          <TabsTrigger value="calendar" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
            Time-Off Calendar
          </TabsTrigger>
          <TabsTrigger value="rules" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
            Policies & Rules
          </TabsTrigger>
          {currentUser.role === "admin" && (
            <TabsTrigger value="approvals" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
              Pending Approvals
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="my-requests">
          <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle>My Time-Off Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeOffRequests.map((request) => (
                  <div key={request.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">{request.type}</h4>
                        <p className="text-slate-600">
                          {request.startDate} - {request.endDate} ({request.days} days, {request.hours} hours)
                        </p>
                        <p className="text-sm text-slate-500 mt-1">Reason: {request.reason}</p>
                        <p className="text-xs text-slate-400">Submitted: {request.submitted}</p>
                      </div>
                      <div className="space-y-2">
                        <Badge className={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                        {request.conflicts > 0 && (
                          <Badge className="bg-orange-100 text-orange-800">
                            {request.conflicts} Conflicts
                          </Badge>
                        )}
                      </div>
                    </div>
                    {request.approver && (
                      <p className="text-sm text-green-600">Approved by: {request.approver}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-white/95 backdrop-blur-sm border-slate-200 lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarDays className="h-5 w-5 mr-2" />
                  Time-Off Calendar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
                <div className="mt-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="text-sm">Approved Time Off</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                    <span className="text-sm">Pending Requests</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span className="text-sm">Blackout Periods</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle>Team Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 border border-red-200 rounded">
                    <h4 className="font-medium text-red-800">July 20-27</h4>
                    <p className="text-sm text-red-600">3 staff members out</p>
                    <p className="text-xs text-red-500">Critical staffing level</p>
                  </div>
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <h4 className="font-medium text-yellow-800">August 10</h4>
                    <p className="text-sm text-yellow-600">2 staff members out</p>
                    <p className="text-xs text-yellow-500">Moderate impact</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rules">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(timeOffRules).map(([type, rules]) => (
              <Card key={type} className="bg-white/95 backdrop-blur-sm border-slate-200">
                <CardHeader>
                  <CardTitle className="capitalize">{type} Policy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    {rules.maxConsecutiveDays && (
                      <div className="flex justify-between">
                        <span>Max consecutive days:</span>
                        <span className="font-medium">{rules.maxConsecutiveDays}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Advance notice:</span>
                      <span className="font-medium">{rules.minAdvanceNotice} days</span>
                    </div>
                    {rules.maxRequestsPerYear && (
                      <div className="flex justify-between">
                        <span>Max requests/year:</span>
                        <span className="font-medium">{rules.maxRequestsPerYear}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Approval required:</span>
                      <span className="font-medium">{rules.approvalRequired ? "Yes" : "No"}</span>
                    </div>
                    {rules.blackoutPeriods && (
                      <div>
                        <span className="font-medium">Blackout Periods:</span>
                        {rules.blackoutPeriods.map((period, idx) => (
                          <p key={idx} className="text-xs text-slate-500 mt-1">{period}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {currentUser.role === "admin" && (
          <TabsContent value="approvals">
            <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle>Pending Approvals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingApprovals.map((request) => (
                    <div key={request.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold">{request.employee}</h4>
                          <p className="text-sm text-slate-600">Badge: {request.badge}</p>
                          <p className="text-sm text-slate-600">
                            {request.type}: {request.startDate} - {request.endDate} ({request.days} days)
                          </p>
                          <p className="text-sm text-slate-500">Reason: {request.reason}</p>
                        </div>
                        <div className="space-y-2">
                          {request.conflicts > 0 && (
                            <Badge className="bg-orange-100 text-orange-800">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              {request.conflicts} Conflicts
                            </Badge>
                          )}
                          {request.replacementNeeded && (
                            <Badge className="bg-blue-100 text-blue-800">
                              Replacement Needed
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleApproveRequest(request.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleDenyRequest(request.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          <XCircle className="h-3 w-3 mr-1" />
                          Deny
                        </Button>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};
