
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, CheckCircle, XCircle, Clock, Edit, Eye, PenTool } from "lucide-react";

interface TimecardManagerProps {
  currentUser: {
    id: string;
    name: string;
    badge: string;
    role: string;
    station: string;
    shift: string;
  };
}

export const TimecardManager = ({ currentUser }: TimecardManagerProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState("current");
  
  const [timecards] = useState([
    {
      id: "TC-001",
      period: "June 17-23, 2024",
      regularHours: 40.0,
      overtimeHours: 8.5,
      totalHours: 48.5,
      status: "Pending Review",
      submitted: "2024-06-23",
      signature: null,
      approved: false,
      approver: null
    },
    {
      id: "TC-002", 
      period: "June 10-16, 2024",
      regularHours: 40.0,
      overtimeHours: 4.0,
      totalHours: 44.0,
      status: "Approved",
      submitted: "2024-06-16",
      signature: "John Smith - 2024-06-16 15:30",
      approved: true,
      approver: "Captain Davis"
    },
    {
      id: "TC-003",
      period: "June 3-9, 2024", 
      regularHours: 40.0,
      overtimeHours: 2.0,
      totalHours: 42.0,
      status: "Approved",
      submitted: "2024-06-09",
      signature: "John Smith - 2024-06-09 14:15",
      approved: true,
      approver: "Captain Davis"
    }
  ]);

  const [dailyEntries] = useState([
    {
      date: "2024-06-23",
      clockIn: "06:00 AM",
      clockOut: "06:30 PM", 
      breakTime: 30,
      regularHours: 8.0,
      overtimeHours: 2.5,
      location: "Station 1",
      notes: "Responded to 3 calls, training session"
    },
    {
      date: "2024-06-22",
      clockIn: "06:00 AM", 
      clockOut: "06:00 PM",
      breakTime: 45,
      regularHours: 8.0,
      overtimeHours: 0.0,
      location: "Station 1", 
      notes: "Equipment maintenance"
    },
    {
      date: "2024-06-21",
      clockIn: "06:00 AM",
      clockOut: "08:00 PM",
      breakTime: 30,
      regularHours: 8.0,
      overtimeHours: 6.0,
      location: "Station 1",
      notes: "Multiple emergency calls, extended shift"
    }
  ]);

  // Admin view for reviewing timecards
  const [pendingTimecards] = useState([
    {
      id: "TC-004",
      employee: "Davis, Robert",
      badge: "FF-102",
      period: "June 17-23, 2024",
      totalHours: 52.0,
      overtimeHours: 12.0,
      submitted: "2024-06-23",
      needsReview: true
    },
    {
      id: "TC-005", 
      employee: "Wilson, Kate",
      badge: "EMT-201",
      period: "June 17-23, 2024", 
      totalHours: 45.5,
      overtimeHours: 5.5,
      submitted: "2024-06-23",
      needsReview: true
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-100 text-green-800";
      case "Pending Review": return "bg-yellow-100 text-yellow-800";
      case "Rejected": return "bg-red-100 text-red-800";
      case "Draft": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleDigitalSignature = (timecardId: string) => {
    console.log(`Digital signature applied to timecard ${timecardId} by ${currentUser.name}`);
    // In a real implementation, this would capture a digital signature
  };

  const handleApproveTimecard = (timecardId: string) => {
    console.log(`Timecard ${timecardId} approved by ${currentUser.name}`);
  };

  const handleRejectTimecard = (timecardId: string) => {
    console.log(`Timecard ${timecardId} rejected by ${currentUser.name}`);
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Timecard Management
          </div>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Period</SelectItem>
              <SelectItem value="last">Last Period</SelectItem>
              <SelectItem value="all">All Periods</SelectItem>
            </SelectContent>
          </Select>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={currentUser.role === "admin" ? "review" : "my-timecards"}>
          <TabsList>
            <TabsTrigger value="my-timecards">My Timecards</TabsTrigger>
            <TabsTrigger value="daily-detail">Daily Detail</TabsTrigger>
            {currentUser.role === "admin" && (
              <TabsTrigger value="review">Review & Approve</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="my-timecards" className="space-y-4">
            {timecards.map((timecard) => (
              <div key={timecard.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold">{timecard.period}</h4>
                    <p className="text-sm text-slate-600">
                      Total: {timecard.totalHours} hours 
                      ({timecard.regularHours} regular + {timecard.overtimeHours} overtime)
                    </p>
                    <p className="text-xs text-slate-500">Submitted: {timecard.submitted}</p>
                  </div>
                  <Badge className={getStatusColor(timecard.status)}>
                    {timecard.status}
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    {timecard.signature ? (
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        <span>Signed: {timecard.signature}</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-orange-600">
                        <XCircle className="h-4 w-4 mr-1" />
                        <span>Digital signature required</span>
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    {timecard.status === "Draft" && (
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    )}
                    {!timecard.signature && timecard.status === "Pending Review" && (
                      <Button 
                        size="sm"
                        onClick={() => handleDigitalSignature(timecard.id)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <PenTool className="h-3 w-3 mr-1" />
                        Sign
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="daily-detail">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Clock In</TableHead>
                  <TableHead>Clock Out</TableHead>
                  <TableHead>Break</TableHead>
                  <TableHead>Regular</TableHead>
                  <TableHead>Overtime</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dailyEntries.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{entry.date}</TableCell>
                    <TableCell>{entry.clockIn}</TableCell>
                    <TableCell>{entry.clockOut}</TableCell>
                    <TableCell>{entry.breakTime} min</TableCell>
                    <TableCell>{entry.regularHours}</TableCell>
                    <TableCell className="text-orange-600">{entry.overtimeHours}</TableCell>
                    <TableCell>{entry.location}</TableCell>
                    <TableCell className="max-w-xs truncate">{entry.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          {currentUser.role === "admin" && (
            <TabsContent value="review" className="space-y-4">
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Pending Timecard Reviews</h4>
                <p className="text-sm text-slate-600">
                  Review and approve employee timecards with digital signatures.
                </p>
              </div>

              {pendingTimecards.map((timecard) => (
                <div key={timecard.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold">{timecard.employee}</h4>
                      <p className="text-sm text-slate-600">Badge: {timecard.badge}</p>
                      <p className="text-sm text-slate-600">
                        Period: {timecard.period}
                      </p>
                      <p className="text-sm text-slate-600">
                        Total: {timecard.totalHours} hours 
                        (OT: {timecard.overtimeHours})
                      </p>
                      <p className="text-xs text-slate-500">
                        Submitted: {timecard.submitted}
                      </p>
                    </div>
                    {timecard.needsReview && (
                      <Badge className="bg-orange-100 text-orange-800">
                        Needs Review
                      </Badge>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleApproveTimecard(timecard.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Approve
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleRejectTimecard(timecard.id)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <XCircle className="h-3 w-3 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
};
