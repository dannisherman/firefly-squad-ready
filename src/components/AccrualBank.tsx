
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, DollarSign, Clock, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

interface AccrualBankProps {
  currentUser: {
    id: string;
    name: string;
    badge: string;
    role: string;
    station: string;
    shift: string;
  };
}

export const AccrualBank = ({ currentUser }: AccrualBankProps) => {
  const [accrualData] = useState({
    vacation: {
      current: 156.5,
      annual: 200,
      used: 43.5,
      accrualRate: 8.33, // hours per month
      projectedYear: 200
    },
    sick: {
      current: 89.25,
      annual: 96,
      used: 6.75,
      accrualRate: 4.0,
      projectedYear: 96
    },
    personal: {
      current: 24.0,
      annual: 32,
      used: 8.0,
      accrualRate: 2.67,
      projectedYear: 32
    },
    compensatory: {
      current: 12.5,
      annual: null, // No annual limit
      used: 18.0,
      accrualRate: null, // Earned through overtime
      projectedYear: null
    }
  });

  const [accrualHistory] = useState([
    {
      date: "2024-06-15",
      type: "Vacation",
      description: "Monthly Accrual",
      earned: 8.33,
      used: 0,
      balance: 156.5
    },
    {
      date: "2024-06-10",
      type: "Vacation", 
      description: "Vacation Day",
      earned: 0,
      used: -8.0,
      balance: 148.17
    },
    {
      date: "2024-06-01",
      type: "Sick",
      description: "Monthly Accrual",
      earned: 4.0,
      used: 0,
      balance: 89.25
    },
    {
      date: "2024-05-28",
      type: "Compensatory",
      description: "Overtime Worked",
      earned: 4.5,
      used: 0,
      balance: 12.5
    }
  ]);

  const [upcomingRequests] = useState([
    {
      id: "REQ-001",
      type: "Vacation",
      startDate: "2024-07-15",
      endDate: "2024-07-22",
      hours: 64,
      status: "Pending"
    },
    {
      id: "REQ-002",
      type: "Personal",
      startDate: "2024-08-10",
      endDate: "2024-08-10", 
      hours: 8,
      status: "Approved"
    }
  ]);

  const getProgressColor = (current: number, annual: number | null) => {
    if (!annual) return "bg-blue-600";
    const percentage = (current / annual) * 100;
    if (percentage >= 90) return "bg-red-600";
    if (percentage >= 75) return "bg-orange-600";
    return "bg-green-600";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Denied": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Accrual Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <Badge className="bg-blue-100 text-blue-800">Vacation</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Current</span>
                <span className="font-bold">{accrualData.vacation.current} hrs</span>
              </div>
              <Progress 
                value={(accrualData.vacation.current / accrualData.vacation.annual) * 100} 
                className="h-2"
              />
              <div className="flex justify-between text-xs text-slate-600">
                <span>Used: {accrualData.vacation.used}</span>
                <span>Annual: {accrualData.vacation.annual}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Clock className="h-5 w-5 text-red-600" />
              <Badge className="bg-red-100 text-red-800">Sick</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Current</span>
                <span className="font-bold">{accrualData.sick.current} hrs</span>
              </div>
              <Progress 
                value={(accrualData.sick.current / accrualData.sick.annual) * 100} 
                className="h-2"
              />
              <div className="flex justify-between text-xs text-slate-600">
                <span>Used: {accrualData.sick.used}</span>
                <span>Annual: {accrualData.sick.annual}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <Badge className="bg-green-100 text-green-800">Personal</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Current</span>
                <span className="font-bold">{accrualData.personal.current} hrs</span>
              </div>
              <Progress 
                value={(accrualData.personal.current / accrualData.personal.annual) * 100} 
                className="h-2"
              />
              <div className="flex justify-between text-xs text-slate-600">
                <span>Used: {accrualData.personal.used}</span>
                <span>Annual: {accrualData.personal.annual}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="h-5 w-5 text-orange-600" />
              <Badge className="bg-orange-100 text-orange-800">Comp Time</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Current</span>
                <span className="font-bold">{accrualData.compensatory.current} hrs</span>
              </div>
              <div className="text-xs text-slate-600">
                <div>Used: {accrualData.compensatory.used} hrs</div>
                <div className="text-orange-600 mt-1">Earned through overtime</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="summary" className="space-y-4">
        <TabsList className="bg-white/10 backdrop-blur-sm">
          <TabsTrigger value="summary" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
            Summary
          </TabsTrigger>
          <TabsTrigger value="history" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
            History
          </TabsTrigger>
          <TabsTrigger value="requests" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
            Requests
          </TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle>Accrual Rates & Projections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">Vacation</h4>
                      <p className="text-sm text-slate-600">
                        {accrualData.vacation.accrualRate} hrs/month
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">
                        {accrualData.vacation.projectedYear} hrs
                      </p>
                      <p className="text-xs text-slate-500">projected annual</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">Sick Leave</h4>
                      <p className="text-sm text-slate-600">
                        {accrualData.sick.accrualRate} hrs/month
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-red-600">
                        {accrualData.sick.projectedYear} hrs
                      </p>
                      <p className="text-xs text-slate-500">projected annual</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">Personal Time</h4>
                      <p className="text-sm text-slate-600">
                        {accrualData.personal.accrualRate} hrs/month
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">
                        {accrualData.personal.projectedYear} hrs
                      </p>
                      <p className="text-xs text-slate-500">projected annual</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle>Usage Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-800">Good Standing</h4>
                      <p className="text-sm text-green-700">
                        Your vacation accrual is on track. Consider planning time off.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-orange-800">Comp Time Notice</h4>
                      <p className="text-sm text-orange-700">
                        You have {accrualData.compensatory.current} comp hours available. 
                        Consider using them soon.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle>Accrual History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Earned</TableHead>
                    <TableHead>Used</TableHead>
                    <TableHead>Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accrualHistory.map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell>{entry.date}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{entry.type}</Badge>
                      </TableCell>
                      <TableCell>{entry.description}</TableCell>
                      <TableCell className="text-green-600">
                        {entry.earned > 0 ? `+${entry.earned}` : '-'}
                      </TableCell>
                      <TableCell className="text-red-600">
                        {entry.used < 0 ? entry.used : '-'}
                      </TableCell>
                      <TableCell className="font-medium">{entry.balance}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests">
          <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Time Off Requests</span>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  New Request
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingRequests.map((request) => (
                  <div key={request.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{request.type} Request</h4>
                        <p className="text-sm text-slate-600">
                          {request.startDate} - {request.endDate}
                        </p>
                        <p className="text-sm text-slate-600">
                          {request.hours} hours requested
                        </p>
                      </div>
                      <Badge className={getStatusColor(request.status)}>
                        {request.status}
                      </Badge>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      {request.status === "Pending" && (
                        <Button size="sm" variant="outline">
                          Edit Request
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
