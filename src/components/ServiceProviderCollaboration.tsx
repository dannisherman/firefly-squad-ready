
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw, Send, Eye, Edit, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface Submission {
  id: string;
  reportId: string;
  submissionDate: string;
  systemType: string;
  status: string;
  ahjFeedback: string;
  lastUpdate: string;
}

export const ServiceProviderCollaboration = () => {
  const [submissions] = useState<Submission[]>([
    {
      id: "1",
      reportId: "ITM-2024-001",
      submissionDate: "2024-01-15",
      systemType: "Fire Alarm System",
      status: "Under Review",
      ahjFeedback: "Report received and being processed",
      lastUpdate: "2024-01-15"
    },
    {
      id: "2",
      reportId: "ITM-2024-002",
      submissionDate: "2024-01-10",
      systemType: "Sprinkler System",
      status: "Needs Correction",
      ahjFeedback: "Missing hydrostatic test documentation",
      lastUpdate: "2024-01-12"
    },
    {
      id: "3",
      reportId: "ITM-2024-003",
      submissionDate: "2024-01-08",
      systemType: "Fire Pump",
      status: "Approved",
      ahjFeedback: "Report approved. Next inspection due in 12 months.",
      lastUpdate: "2024-01-14"
    }
  ]);

  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);
  const [correctionNotes, setCorrectionNotes] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-500";
      case "Under Review":
        return "bg-blue-500";
      case "Needs Correction":
        return "bg-yellow-500";
      case "Rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="h-4 w-4" />;
      case "Under Review":
        return <AlertCircle className="h-4 w-4" />;
      case "Needs Correction":
        return <RefreshCw className="h-4 w-4" />;
      case "Rejected":
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const handleUpdateSubmission = () => {
    if (!selectedSubmission) {
      toast.error("Please select a submission to update");
      return;
    }
    toast.success("Submission updated successfully");
    setCorrectionNotes("");
    setSelectedSubmission(null);
  };

  const handleResubmit = (submissionId: string) => {
    toast.success("Report resubmitted to AHJ");
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Service Provider Collaboration</CardTitle>
          <CardDescription>
            Review, correct, and resubmit reports directly to the AHJ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="submissions" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-slate-700">
              <TabsTrigger value="submissions" className="text-white">
                Current Submissions
              </TabsTrigger>
              <TabsTrigger value="corrections" className="text-white">
                Make Corrections
              </TabsTrigger>
            </TabsList>

            <TabsContent value="submissions" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">
                  Report Submissions ({submissions.length})
                </h3>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>

              <div className="border border-slate-600 rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-600">
                      <TableHead className="text-slate-300">Report ID</TableHead>
                      <TableHead className="text-slate-300">System Type</TableHead>
                      <TableHead className="text-slate-300">Submission Date</TableHead>
                      <TableHead className="text-slate-300">Status</TableHead>
                      <TableHead className="text-slate-300">AHJ Feedback</TableHead>
                      <TableHead className="text-slate-300">Last Update</TableHead>
                      <TableHead className="text-slate-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((submission) => (
                      <TableRow key={submission.id} className="border-slate-600">
                        <TableCell className="text-white font-medium">
                          {submission.reportId}
                        </TableCell>
                        <TableCell className="text-white">
                          {submission.systemType}
                        </TableCell>
                        <TableCell className="text-white">
                          {submission.submissionDate}
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(submission.status)} text-white flex items-center gap-1 w-fit`}>
                            {getStatusIcon(submission.status)}
                            {submission.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-white max-w-xs truncate">
                          {submission.ahjFeedback}
                        </TableCell>
                        <TableCell className="text-white">
                          {submission.lastUpdate}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="border-slate-600 text-slate-300 hover:text-white"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {submission.status === "Needs Correction" && (
                              <Button 
                                size="sm" 
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleResubmit(submission.id)}
                              >
                                <Send className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="corrections" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-slate-750 border-slate-600">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Select Submission</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-slate-300">Report ID</Label>
                      <Select value={selectedSubmission || ""} onValueChange={setSelectedSubmission}>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue placeholder="Select a report to correct" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600">
                          {submissions
                            .filter(s => s.status === "Needs Correction")
                            .map((submission) => (
                              <SelectItem 
                                key={submission.id} 
                                value={submission.id} 
                                className="text-white hover:bg-slate-600"
                              >
                                {submission.reportId} - {submission.systemType}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedSubmission && (
                      <div className="space-y-2">
                        <Label className="text-slate-300">AHJ Feedback</Label>
                        <div className="p-3 bg-slate-700 rounded border border-slate-600">
                          <p className="text-white text-sm">
                            {submissions.find(s => s.id === selectedSubmission)?.ahjFeedback}
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-slate-750 border-slate-600">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Correction Notes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-slate-300">Response to AHJ Feedback</Label>
                      <Textarea
                        value={correctionNotes}
                        onChange={(e) => setCorrectionNotes(e.target.value)}
                        className="bg-slate-700 border-slate-600 text-white min-h-32"
                        placeholder="Describe the corrections made to address the AHJ feedback..."
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        onClick={handleUpdateSubmission}
                        className="bg-green-600 hover:bg-green-700 flex-1"
                        disabled={!selectedSubmission}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Update Submission
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-slate-600 text-slate-300 hover:text-white"
                        onClick={() => {
                          setSelectedSubmission(null);
                          setCorrectionNotes("");
                        }}
                      >
                        Clear
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
