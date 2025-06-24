
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Users, AlertTriangle, CheckCircle, XCircle, Plus, FileText, Plane } from "lucide-react";

interface TimeOffRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: "Vacation" | "Sick" | "Personal" | "Comp Time" | "FMLA";
  startDate: string;
  endDate: string;
  totalHours: number;
  status: "Pending" | "Approved" | "Denied" | "Cancelled";
  reason?: string;
  approvedBy?: string;
  submittedDate: string;
  notes?: string;
}

interface TimeOffPolicy {
  type: "Vacation" | "Sick" | "Personal" | "Comp Time" | "FMLA";
  maxConsecutiveDays: number;
  minAdvanceNotice: number;
  approvalRequired: boolean;
  maxRequestsPerYear?: number;
  blackoutPeriods?: string[];
  doctorsNoteRequired?: number; // days
}

interface CalendarDay {
  date: string;
  requests: TimeOffRequest[];
  isBlackout: boolean;
}

export const TimeOffManager = ({ currentUser }: { currentUser: any }) => {
  const [requests, setRequests] = useState<TimeOffRequest[]>([
    {
      id: "TO-001",
      employeeId: "EMP-001",
      employeeName: "John Smith",
      type: "Vacation",
      startDate: "2024-07-01",
      endDate: "2024-07-05",
      totalHours: 40,
      status: "Pending",
      reason: "Family vacation",
      submittedDate: "2024-06-15",
      notes: "Pre-planned family trip to Colorado"
    },
    {
      id: "TO-002",
      employeeId: "EMP-002",
      employeeName: "Jane Doe",
      type: "Sick",
      startDate: "2024-06-20",
      endDate: "2024-06-20",
      totalHours: 8,
      status: "Approved",
      approvedBy: "Captain Johnson",
      submittedDate: "2024-06-20"
    }
  ]);

  const [policies] = useState<TimeOffPolicy[]>([
    {
      type: "Vacation",
      maxConsecutiveDays: 14,
      minAdvanceNotice: 7,
      maxRequestsPerYear: 12,
      blackoutPeriods: ["2024-12-20 to 2024-01-05", "2024-07-04"],
      approvalRequired: true
    },
    {
      type: "Sick",
      maxConsecutiveDays: 5,
      minAdvanceNotice: 0,
      approvalRequired: false,
      doctorsNoteRequired: 3
    },
    {
      type: "Personal",
      maxConsecutiveDays: 3,
      minAdvanceNotice: 2,
      maxRequestsPerYear: 6,
      approvalRequired: true
    }
  ]);

  const [newRequest, setNewRequest] = useState({
    type: "Vacation",
    startDate: "",
    endDate: "",
    reason: "",
    notes: ""
  });

  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Denied": return "bg-red-100 text-red-800";
      case "Cancelled": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Vacation": return "bg-blue-100 text-blue-800";
      case "Sick": return "bg-red-100 text-red-800";
      case "Personal": return "bg-purple-100 text-purple-800";
      case "Comp Time": return "bg-green-100 text-green-800";
      case "FMLA": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleSubmitRequest = () => {
    const request: TimeOffRequest = {
      id: `TO-${String(requests.length + 1).padStart(3, '0')}`,
      employeeId: currentUser.id,
      employeeName: currentUser.name,
      type: newRequest.type as TimeOffRequest['type'],
      startDate: newRequest.startDate,
      endDate: newRequest.endDate,
      totalHours: calculateHours(newRequest.startDate, newRequest.endDate),
      status: "Pending",
      reason: newRequest.reason,
      submittedDate: new Date().toISOString().split('T')[0],
      notes: newRequest.notes
    };

    setRequests([...requests, request]);
    setNewRequest({ type: "Vacation", startDate: "", endDate: "", reason: "", notes: "" });
  };

  const calculateHours = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays * 8; // Assuming 8-hour days
  };

  const approveRequest = (requestId: string) => {
    setRequests(requests.map(req => 
      req.id === requestId 
        ? { ...req, status: "Approved" as const, approvedBy: "Current User" }
        : req
    ));
  };

  const denyRequest = (requestId: string) => {
    setRequests(requests.map(req => 
      req.id === requestId 
        ? { ...req, status: "Denied" as const }
        : req
    ));
  };

  // Get policy for specific type
  const getPolicyForType = (type: string) => {
    return policies.find(p => p.type === type);
  };

  // Check if type supports certain properties
  const hasMaxRequestsPerYear = (policy: TimeOffPolicy) => {
    return 'maxRequestsPerYear' in policy;
  };

  const hasBlackoutPeriods = (policy: TimeOffPolicy) => {
    return 'blackoutPeriods' in policy;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Time Off Management</h2>
          <p className="text-slate-300">Request time off, view calendar, and manage policies</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">{requests.filter(r => r.status === "Pending").length}</p>
            <p className="text-slate-600 text-sm">Pending Requests</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">{requests.filter(r => r.status === "Approved").length}</p>
            <p className="text-slate-600 text-sm">Approved Requests</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">120</p>
            <p className="text-slate-600 text-sm">Available Hours</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <Plane className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">32</p>
            <p className="text-slate-600 text-sm">Hours Used YTD</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="requests" className="space-y-4">
        <TabsList className="bg-white/10 backdrop-blur-sm">
          <TabsTrigger value="requests" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
            My Requests
          </TabsTrigger>
          <TabsTrigger value="calendar" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
            Calendar View
          </TabsTrigger>
          <TabsTrigger value="policies" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
            Policies & Rules
          </TabsTrigger>
          {currentUser.role === "admin" && (
            <TabsTrigger value="admin" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
              Admin Review
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="requests">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>New Time Off Request</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">Request Type</label>
                  <Select value={newRequest.type} onValueChange={(value) => 
                    setNewRequest({...newRequest, type: value})
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Vacation">Vacation</SelectItem>
                      <SelectItem value="Sick">Sick Leave</SelectItem>
                      <SelectItem value="Personal">Personal Day</SelectItem>
                      <SelectItem value="Comp Time">Comp Time</SelectItem>
                      <SelectItem value="FMLA">FMLA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700">Start Date</label>
                    <Input 
                      type="date" 
                      value={newRequest.startDate}
                      onChange={(e) => setNewRequest({...newRequest, startDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">End Date</label>
                    <Input 
                      type="date" 
                      value={newRequest.endDate}
                      onChange={(e) => setNewRequest({...newRequest, endDate: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">Reason</label>
                  <Input 
                    value={newRequest.reason}
                    onChange={(e) => setNewRequest({...newRequest, reason: e.target.value})}
                    placeholder="Brief reason for request"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">Additional Notes</label>
                  <Textarea 
                    value={newRequest.notes}
                    onChange={(e) => setNewRequest({...newRequest, notes: e.target.value})}
                    placeholder="Any additional details"
                    rows={3}
                  />
                </div>

                <Button onClick={handleSubmitRequest} className="w-full">
                  Submit Request
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Recent Requests</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {requests.filter(req => req.employeeId === currentUser.id).map((request) => (
                    <div key={request.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <Badge className={getTypeColor(request.type)}>
                              {request.type}
                            </Badge>
                            <Badge className={getStatusColor(request.status)}>
                              {request.status}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium">{request.startDate} to {request.endDate}</p>
                          <p className="text-xs text-slate-500">{request.totalHours} hours</p>
                          {request.reason && (
                            <p className="text-xs text-slate-600">Reason: {request.reason}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-xs text-slate-500">
                        Submitted: {request.submittedDate}
                        {request.approvedBy && (
                          <span> • Approved by: {request.approvedBy}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="calendar">
          <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Time Off Calendar</span>
                </div>
                <Input 
                  type="month" 
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-40"
                />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="p-2 text-center font-medium text-slate-600">
                    {day}
                  </div>
                ))}
              </div>
              <div className="h-64 flex items-center justify-center text-slate-500">
                Calendar grid would be implemented here with actual dates and requests
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies">
          <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Time Off Policies & Rules</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {policies.map((policy) => (
                  <div key={policy.type} className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge className={getTypeColor(policy.type)}>
                        {policy.type}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-slate-600">Max Consecutive Days:</span>
                        <p className="font-medium">{policy.maxConsecutiveDays}</p>
                      </div>
                      <div>
                        <span className="text-slate-600">Advance Notice:</span>
                        <p className="font-medium">{policy.minAdvanceNotice} days</p>
                      </div>
                      {hasMaxRequestsPerYear(policy) && policy.maxRequestsPerYear && (
                        <div>
                          <span className="text-slate-600">Max Requests/Year:</span>
                          <p className="font-medium">{policy.maxRequestsPerYear}</p>
                        </div>
                      )}
                      <div>
                        <span className="text-slate-600">Approval Required:</span>
                        <p className="font-medium">{policy.approvalRequired ? "Yes" : "No"}</p>
                      </div>
                      {'doctorsNoteRequired' in policy && policy.doctorsNoteRequired && (
                        <div>
                          <span className="text-slate-600">Doctor's Note After:</span>
                          <p className="font-medium">{policy.doctorsNoteRequired} days</p>
                        </div>
                      )}
                    </div>

                    {hasBlackoutPeriods(policy) && policy.blackoutPeriods && policy.blackoutPeriods.length > 0 && (
                      <div className="mt-3">
                        <span className="text-slate-600 text-sm">Blackout Periods:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {policy.blackoutPeriods.map((period, index) => (
                            <Badge key={index} className="bg-red-100 text-red-800 text-xs">
                              {period}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {currentUser.role === "admin" && (
          <TabsContent value="admin">
            <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Admin Review Panel</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requests.filter(req => req.status === "Pending").map((request) => (
                    <div key={request.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">{request.employeeName}</h4>
                          <div className="flex items-center space-x-2 mb-1">
                            <Badge className={getTypeColor(request.type)}>
                              {request.type}
                            </Badge>
                            <Badge className={getStatusColor(request.status)}>
                              {request.status}
                            </Badge>
                          </div>
                          <p className="text-sm">{request.startDate} to {request.endDate}</p>
                          <p className="text-xs text-slate-500">{request.totalHours} hours</p>
                          {request.reason && (
                            <p className="text-xs text-slate-600 mt-1">Reason: {request.reason}</p>
                          )}
                          {request.notes && (
                            <p className="text-xs text-slate-600">Notes: {request.notes}</p>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            onClick={() => approveRequest(request.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => denyRequest(request.id)}
                          >
                            <XCircle className="h-3 w-3 mr-1" />
                            Deny
                          </Button>
                        </div>
                      </div>
                      <div className="text-xs text-slate-500">
                        Submitted: {request.submittedDate} • Employee ID: {request.employeeId}
                      </div>
                    </div>
                  ))}
                  
                  {requests.filter(req => req.status === "Pending").length === 0 && (
                    <div className="text-center py-8 text-slate-500">
                      No pending requests to review
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};
