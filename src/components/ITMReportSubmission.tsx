
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Send } from "lucide-react";
import { toast } from "sonner";

export const ITMReportSubmission = () => {
  const [formData, setFormData] = useState({
    reportTitle: "",
    serviceDate: "",
    nextServiceDate: "",
    itmOccupancyId: "",
    systemId: "",
    typeOfService: "",
    typeOfSystem: "",
    status: "",
    contactName: "",
    contactPhone: "",
    contactEmail: ""
  });

  const serviceTypes = [
    "Inspection",
    "Testing",
    "Maintenance",
    "Repair",
    "Installation",
    "Annual Service"
  ];

  const systemTypes = [
    "Fire Alarm System",
    "Sprinkler System",
    "Fire Pump",
    "Emergency Lighting",
    "Fire Extinguisher",
    "Kitchen Hood System",
    "Smoke Control System"
  ];

  const statusOptions = [
    "Satisfactory",
    "Deficient",
    "Impaired",
    "Out of Service",
    "Needs Follow-up"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Submitting ITM report:", formData);
    toast.success("ITM report submitted successfully!");
  };

  const handleSaveDraft = () => {
    console.log("Saving draft:", formData);
    toast.success("Report saved as draft");
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            ITM Report Submission
          </CardTitle>
          <CardDescription>
            Submit inspection, testing, and maintenance reports
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Report Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reportTitle" className="text-slate-300">Report Title</Label>
              <Input
                id="reportTitle"
                value={formData.reportTitle}
                onChange={(e) => handleInputChange("reportTitle", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Enter report title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="serviceDate" className="text-slate-300">Service Date</Label>
              <Input
                id="serviceDate"
                type="date"
                value={formData.serviceDate}
                onChange={(e) => handleInputChange("serviceDate", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nextServiceDate" className="text-slate-300">Next Service Date</Label>
              <Input
                id="nextServiceDate"
                type="date"
                value={formData.nextServiceDate}
                onChange={(e) => handleInputChange("nextServiceDate", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="itmOccupancyId" className="text-slate-300">ITM Occupancy ID Number</Label>
              <Input
                id="itmOccupancyId"
                value={formData.itmOccupancyId}
                onChange={(e) => handleInputChange("itmOccupancyId", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Enter occupancy ID"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="systemId" className="text-slate-300">System ID</Label>
              <Input
                id="systemId"
                value={formData.systemId}
                onChange={(e) => handleInputChange("systemId", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Enter system ID"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="typeOfService" className="text-slate-300">Type of Service</Label>
              <Select value={formData.typeOfService} onValueChange={(value) => handleInputChange("typeOfService", value)}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  {serviceTypes.map((type) => (
                    <SelectItem key={type} value={type} className="text-white hover:bg-slate-600">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="typeOfSystem" className="text-slate-300">Type of System</Label>
              <Select value={formData.typeOfSystem} onValueChange={(value) => handleInputChange("typeOfSystem", value)}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Select system type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  {systemTypes.map((type) => (
                    <SelectItem key={type} value={type} className="text-white hover:bg-slate-600">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status" className="text-slate-300">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  {statusOptions.map((status) => (
                    <SelectItem key={status} value={status} className="text-white hover:bg-slate-600">
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Property Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-slate-600 pb-2">
              Property Contact Information
            </h3>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactName" className="text-slate-300">Contact Name</Label>
                <Input
                  id="contactName"
                  value={formData.contactName}
                  onChange={(e) => handleInputChange("contactName", e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Enter contact name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone" className="text-slate-300">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  value={formData.contactPhone}
                  onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Enter phone number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail" className="text-slate-300">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Enter email address"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-6">
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleSaveDraft} className="border-slate-600 text-slate-300 hover:text-white">
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button onClick={handleSubmit} className="bg-red-600 hover:bg-red-700">
                <Send className="h-4 w-4 mr-2" />
                Submit Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
