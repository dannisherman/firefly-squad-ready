
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, FileText, AlertCircle, CheckCircle, Clock, TrendingUp, Users, Calendar } from "lucide-react";

export const BillingManagement = () => {
  const [claims] = useState([
    { id: "CLM-001", patient: "John Smith", service: "ALS Emergency", amount: 1250.00, status: "Pending", date: "2024-01-15" },
    { id: "CLM-002", patient: "Sarah Johnson", service: "BLS Transport", amount: 850.00, status: "Approved", date: "2024-01-14" },
    { id: "CLM-003", patient: "Mike Wilson", service: "Critical Care", amount: 2100.00, status: "Denied", date: "2024-01-13" },
  ]);

  const [memberships] = useState([
    { id: "MEM-001", name: "Johnson Family", type: "Premium", status: "Active", expires: "2024-12-31", members: 4 },
    { id: "MEM-002", name: "Smith Household", type: "Basic", status: "Expiring", expires: "2024-02-28", members: 2 },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": case "Active": return "bg-green-100 text-green-800";
      case "Pending": case "Processing": return "bg-yellow-100 text-yellow-800";
      case "Denied": case "Expired": return "bg-red-100 text-red-800";
      case "Expiring": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Billing Management</h1>
        <p className="text-slate-300">Revenue cycle management and automated billing processes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">$45,200</p>
            <p className="text-slate-600 text-sm">Monthly Revenue</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">127</p>
            <p className="text-slate-600 text-sm">Pending Claims</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">94.2%</p>
            <p className="text-slate-600 text-sm">Collection Rate</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">342</p>
            <p className="text-slate-600 text-sm">Active Members</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="claims" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="claims">Claims Management</TabsTrigger>
          <TabsTrigger value="automation">Workflow Automation</TabsTrigger>
          <TabsTrigger value="memberships">Memberships</TabsTrigger>
          <TabsTrigger value="reports">Financial Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="claims" className="space-y-4">
          <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Recent Claims</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {claims.map((claim) => (
                  <div key={claim.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{claim.id} - {claim.patient}</p>
                      <p className="text-sm text-slate-600">{claim.service}</p>
                      <p className="text-xs text-slate-500">{claim.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${claim.amount.toFixed(2)}</p>
                      <Badge className={getStatusColor(claim.status)}>
                        {claim.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Automated Processes</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Data Import Rules</span>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Service Level Assignment</span>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Third-party Verification</span>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Remittance Processing</span>
                  <Badge className="bg-yellow-100 text-yellow-800">Processing</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span>Background Jobs</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Monthly Report Generation</span>
                  <Badge className="bg-blue-100 text-blue-800">Running</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Bulk Payment Processing</span>
                  <Badge className="bg-green-100 text-green-800">Completed</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Data Validation</span>
                  <Badge className="bg-green-100 text-green-800">Completed</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="memberships" className="space-y-4">
          <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Membership Programs</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {memberships.map((membership) => (
                  <div key={membership.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{membership.name}</p>
                      <p className="text-sm text-slate-600">{membership.type} Plan</p>
                      <p className="text-xs text-slate-500">Expires: {membership.expires}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{membership.members} members</p>
                      <Badge className={getStatusColor(membership.status)}>
                        {membership.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>January 2024</span>
                    <span className="font-bold">$45,200</span>
                  </div>
                  <div className="flex justify-between">
                    <span>December 2023</span>
                    <span className="font-bold">$42,800</span>
                  </div>
                  <div className="flex justify-between">
                    <span>November 2023</span>
                    <span className="font-bold">$38,900</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle>Collection Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>First Pass Rate</span>
                    <span className="font-bold">87.3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Collection Time</span>
                    <span className="font-bold">32 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Denial Rate</span>
                    <span className="font-bold">5.8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
