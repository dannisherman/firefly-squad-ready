
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Edit, Save, AlertTriangle, CheckCircle, Clock, Eye } from "lucide-react";

interface TimesheetViewProps {
  currentUser: {
    id: string;
    name: string;
    badge: string;
    role: string;
    station: string;
    shift: string;
  };
}

export const TimesheetView = ({ currentUser }: TimesheetViewProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState("2024-06-17");
  const [editingEntry, setEditingEntry] = useState<string | null>(null);

  const [timesheetEntries, setTimesheetEntries] = useState([
    {
      id: "TE-001",
      date: "2024-06-24",
      clockIn: "06:00",
      clockOut: "06:00+1",
      regularHours: 24,
      overtimeHours: 0,
      location: "Station 1",
      status: "Submitted",
      hasError: false,
      comments: "",
      lastModified: "2024-06-24 18:30:00",
      modifiedBy: "John Smith"
    },
    {
      id: "TE-002", 
      date: "2024-06-22",
      clockIn: "06:00",
      clockOut: "06:00+1",
      regularHours: 24,
      overtimeHours: 4,
      location: "Station 1",
      status: "Flagged",
      hasError: true,
      errorMessage: "Overtime exceeds daily limit without approval",
      comments: "Extended shift due to emergency calls",
      lastModified: "2024-06-23 08:15:00",
      modifiedBy: "John Smith"
    },
    {
      id: "TE-003",
      date: "2024-06-20",
      clockIn: "06:00", 
      clockOut: "06:00+1",
      regularHours: 24,
      overtimeHours: 0,
      location: "Station 1",
      status: "Approved",
      hasError: false,
      comments: "",
      lastModified: "2024-06-21 09:00:00",
      modifiedBy: "Captain Davis"
    }
  ]);

  const [auditTrail] = useState([
    {
      id: "AT-001",
      entryId: "TE-002",
      action: "Modified",
      field: "Overtime Hours",
      oldValue: "2",
      newValue: "4",
      modifiedBy: "John Smith",
      timestamp: "2024-06-23 08:15:00",
      reason: "Correction after supervisor review"
    },
    {
      id: "AT-002",
      entryId: "TE-001",
      action: "Submitted",
      field: "Status",
      oldValue: "Draft",
      newValue: "Submitted", 
      modifiedBy: "John Smith",
      timestamp: "2024-06-24 18:30:00",
      reason: "End of shift submission"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-100 text-green-800";
      case "Submitted": return "bg-blue-100 text-blue-800";
      case "Flagged": return "bg-red-100 text-red-800";
      case "Draft": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleEditEntry = (entryId: string) => {
    setEditingEntry(entryId);
  };

  const handleSaveEntry = (entryId: string) => {
    console.log(`Saving entry ${entryId}`);
    setEditingEntry(null);
    
    // Log audit trail
    console.log("Audit trail entry created for modification");
  };

  const handleSubmitTimesheet = () => {
    console.log("Submitting timesheet for period:", selectedPeriod);
  };

  const calculateTotals = () => {
    const totals = timesheetEntries.reduce((acc, entry) => {
      acc.regular += entry.regularHours;
      acc.overtime += entry.overtimeHours;
      return acc;
    }, { regular: 0, overtime: 0 });

    return {
      ...totals,
      total: totals.regular + totals.overtime
    };
  };

  const totals = calculateTotals();

  return (
    <div className="space-y-6">
      {/* Period Selection & Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-4">
            <label className="text-sm font-medium text-slate-700 mb-2 block">
              Pay Period
            </label>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024-06-17">June 17-30, 2024</SelectItem>
                <SelectItem value="2024-06-03">June 3-16, 2024</SelectItem>
                <SelectItem value="2024-05-20">May 20-June 2, 2024</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-4 text-center">
            <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="text-lg font-bold text-slate-900">{totals.regular}</p>
            <p className="text-xs text-slate-600">Regular Hours</p>
          </CardContent>
        </Card>

        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-4 text-center">
            <Clock className="h-6 w-6 text-orange-600 mx-auto mb-2" />
            <p className="text-lg font-bold text-slate-900">{totals.overtime}</p>
            <p className="text-xs text-slate-600">Overtime Hours</p>
          </CardContent>
        </Card>

        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-6 w-6 text-red-600 mx-auto mb-2" />
            <p className="text-lg font-bold text-slate-900">
              {timesheetEntries.filter(e => e.hasError).length}
            </p>
            <p className="text-xs text-slate-600">Flagged Entries</p>
          </CardContent>
        </Card>
      </div>

      {/* Timesheet Entries */}
      <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Timesheet Entries
            </CardTitle>
            <Button onClick={handleSubmitTimesheet}>
              Submit Timesheet
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Clock In</TableHead>
                <TableHead>Clock Out</TableHead>
                <TableHead>Regular</TableHead>
                <TableHead>Overtime</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {timesheetEntries.map((entry) => (
                <TableRow key={entry.id} className={entry.hasError ? "bg-red-50" : ""}>
                  <TableCell className="font-medium">{entry.date}</TableCell>
                  <TableCell>
                    {editingEntry === entry.id ? (
                      <Input
                        type="time"
                        defaultValue={entry.clockIn}
                        className="w-24"
                      />
                    ) : (
                      entry.clockIn
                    )}
                  </TableCell>
                  <TableCell>
                    {editingEntry === entry.id ? (
                      <Input
                        defaultValue={entry.clockOut}
                        className="w-24"
                      />
                    ) : (
                      entry.clockOut
                    )}
                  </TableCell>
                  <TableCell>{entry.regularHours}</TableCell>
                  <TableCell className="text-orange-600">{entry.overtimeHours}</TableCell>
                  <TableCell>{entry.location}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(entry.status)}>
                        {entry.status}
                      </Badge>
                      {entry.hasError && (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      {editingEntry === entry.id ? (
                        <Button
                          size="sm"
                          onClick={() => handleSaveEntry(entry.id)}
                        >
                          <Save className="h-3 w-3" />
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditEntry(entry.id)}
                          disabled={entry.status === "Approved"}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Error Messages */}
          {timesheetEntries.some(e => e.hasError) && (
            <div className="mt-4 space-y-2">
              <h4 className="font-medium text-red-800">Flagged Entries:</h4>
              {timesheetEntries
                .filter(e => e.hasError)
                .map(entry => (
                  <div key={entry.id} className="p-3 bg-red-50 border border-red-200 rounded">
                    <p className="text-sm text-red-800">
                      <span className="font-medium">{entry.date}:</span> {entry.errorMessage}
                    </p>
                    {entry.comments && (
                      <p className="text-xs text-red-600 mt-1">
                        Comment: {entry.comments}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Audit Trail */}
      <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Eye className="h-5 w-5 mr-2" />
            Audit Trail
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {auditTrail.map((audit) => (
              <div key={audit.id} className="p-3 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {audit.action}: {audit.field}
                    </p>
                    {audit.oldValue && audit.newValue && (
                      <p className="text-xs text-slate-600">
                        Changed from "{audit.oldValue}" to "{audit.newValue}"
                      </p>
                    )}
                    <p className="text-xs text-slate-500">
                      By: {audit.modifiedBy} | {audit.timestamp}
                    </p>
                    {audit.reason && (
                      <p className="text-xs text-slate-600 mt-1">
                        Reason: {audit.reason}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
