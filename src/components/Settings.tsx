
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Bell, Truck, Link, DollarSign, Shield, BarChart3, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Settings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("system");

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your configuration has been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-slate-300 mt-2">Configure your FireOps Command Center</p>
        </div>
        <Button onClick={handleSaveSettings} className="bg-red-600 hover:bg-red-700">
          <Save className="w-4 h-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-7 bg-slate-800 text-slate-300">
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            System
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Alerts
          </TabsTrigger>
          <TabsTrigger value="units" className="flex items-center gap-2">
            <Truck className="w-4 h-4" />
            Units
          </TabsTrigger>
          <TabsTrigger value="integration" className="flex items-center gap-2">
            <Link className="w-4 h-4" />
            Integration
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="reporting" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Reporting
          </TabsTrigger>
        </TabsList>

        <TabsContent value="system" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Department Information</CardTitle>
              <CardDescription>Configure your fire department details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-300">Department Name</label>
                  <Input placeholder="Metro Fire Department" className="bg-slate-700 border-slate-600 text-white" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-300">Station Number</label>
                  <Input placeholder="Station 1" className="bg-slate-700 border-slate-600 text-white" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300">Address</label>
                <Textarea placeholder="123 Main Street, City, State 12345" className="bg-slate-700 border-slate-600 text-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-300">Emergency Contact</label>
                  <Input placeholder="(555) 911-0000" className="bg-slate-700 border-slate-600 text-white" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-300">Administrative Contact</label>
                  <Input placeholder="(555) 123-4567" className="bg-slate-700 border-slate-600 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">System Preferences</CardTitle>
              <CardDescription>General system configuration options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-slate-300">24-Hour Time Format</label>
                  <p className="text-xs text-slate-400">Use military time format</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-slate-300">Auto-Save Changes</label>
                  <p className="text-xs text-slate-400">Automatically save configuration changes</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300">Default Language</label>
                <Select>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Emergency Alert Configuration</CardTitle>
              <CardDescription>Set up emergency alert thresholds and notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-300">Priority 1 Response Time (minutes)</label>
                <Input type="number" placeholder="8" className="bg-slate-700 border-slate-600 text-white" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300">Priority 2 Response Time (minutes)</label>
                <Input type="number" placeholder="12" className="bg-slate-700 border-slate-600 text-white" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-slate-300">SMS Notifications</label>
                  <p className="text-xs text-slate-400">Send SMS alerts for emergencies</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-slate-300">Email Notifications</label>
                  <p className="text-xs text-slate-400">Send email alerts for incidents</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-slate-300">Radio Integration</label>
                  <p className="text-xs text-slate-400">Integrate with radio dispatch system</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Escalation Procedures</CardTitle>
              <CardDescription>Configure automatic escalation rules</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-300">Escalation Delay (minutes)</label>
                <Input type="number" placeholder="15" className="bg-slate-700 border-slate-600 text-white" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300">Escalation Recipients</label>
                <Textarea placeholder="Chief, Assistant Chief, Duty Officer" className="bg-slate-700 border-slate-600 text-white" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="units" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Vehicle Configuration</CardTitle>
              <CardDescription>Manage apparatus and vehicle settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-300">Default Unit Staffing</label>
                  <Input type="number" placeholder="4" className="bg-slate-700 border-slate-600 text-white" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-300">Minimum Response Units</label>
                  <Input type="number" placeholder="2" className="bg-slate-700 border-slate-600 text-white" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-slate-300">GPS Tracking</label>
                  <p className="text-xs text-slate-400">Enable real-time unit tracking</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-slate-300">Automatic Maintenance Alerts</label>
                  <p className="text-xs text-slate-400">Alert when maintenance is due</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Equipment Management</CardTitle>
              <CardDescription>Configure equipment inventory settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-300">Low Stock Threshold (%)</label>
                <Input type="number" placeholder="20" className="bg-slate-700 border-slate-600 text-white" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300">Maintenance Schedule Interval (days)</label>
                <Input type="number" placeholder="30" className="bg-slate-700 border-slate-600 text-white" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integration" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">CAD System Integration</CardTitle>
              <CardDescription>Configure Computer Aided Dispatch connections</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-300">CAD System URL</label>
                <Input placeholder="https://cad.firepd.gov/api" className="bg-slate-700 border-slate-600 text-white" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300">API Key</label>
                <Input type="password" placeholder="••••••••••••••••" className="bg-slate-700 border-slate-600 text-white" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-slate-300">Real-time Sync</label>
                  <p className="text-xs text-slate-400">Enable live data synchronization</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Hospital Communication</CardTitle>
              <CardDescription>Configure hospital and EMS communication protocols</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-300">HDE Integration URL</label>
                <Input placeholder="https://hde.regionalhospital.org" className="bg-slate-700 border-slate-600 text-white" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-slate-300">Automatic Patient Alerts</label>
                  <p className="text-xs text-slate-400">Send patient data to receiving hospitals</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Revenue Cycle Management</CardTitle>
              <CardDescription>Configure billing and financial settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-300">Default Billing Rate ($/hour)</label>
                <Input type="number" placeholder="150" className="bg-slate-700 border-slate-600 text-white" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300">Emergency Transport Rate</label>
                <Input type="number" placeholder="1200" className="bg-slate-700 border-slate-600 text-white" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-slate-300">Automated Billing</label>
                  <p className="text-xs text-slate-400">Enable automatic bill generation</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-slate-300">Insurance Verification</label>
                  <p className="text-xs text-slate-400">Verify patient insurance automatically</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Membership Programs</CardTitle>
              <CardDescription>Configure membership and subscription services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-300">Annual Membership Fee</label>
                <Input type="number" placeholder="75" className="bg-slate-700 border-slate-600 text-white" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-slate-300">Auto-renewal</label>
                  <p className="text-xs text-slate-400">Automatically renew memberships</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Access Control</CardTitle>
              <CardDescription>Configure user authentication and permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-300">Session Timeout (minutes)</label>
                <Input type="number" placeholder="30" className="bg-slate-700 border-slate-600 text-white" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300">Password Policy</label>
                <Select>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Select policy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic (8 chars)</SelectItem>
                    <SelectItem value="standard">Standard (12 chars + special)</SelectItem>
                    <SelectItem value="strict">Strict (16 chars + complexity)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-slate-300">Two-Factor Authentication</label>
                  <p className="text-xs text-slate-400">Require 2FA for all users</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-slate-300">Audit Logging</label>
                  <p className="text-xs text-slate-400">Log all user actions</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Data Protection</CardTitle>
              <CardDescription>Configure data encryption and backup settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-300">Data Retention Period (days)</label>
                <Input type="number" placeholder="2555" className="bg-slate-700 border-slate-600 text-white" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-slate-300">Automatic Backups</label>
                  <p className="text-xs text-slate-400">Daily system backups</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reporting" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Default Report Settings</CardTitle>
              <CardDescription>Configure default parameters for reports and analytics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-300">Default Report Period</label>
                <Select>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300">Report Format</label>
                <Select>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-slate-300">Automated Report Generation</label>
                  <p className="text-xs text-slate-400">Generate reports automatically</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Dashboard Customization</CardTitle>
              <CardDescription>Configure dashboard display preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-300">Refresh Interval (seconds)</label>
                <Input type="number" placeholder="30" className="bg-slate-700 border-slate-600 text-white" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-slate-300">Real-time Updates</label>
                  <p className="text-xs text-slate-400">Enable live dashboard updates</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-slate-300">Show Historical Trends</label>
                  <p className="text-xs text-slate-400">Display trend analysis on dashboard</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
