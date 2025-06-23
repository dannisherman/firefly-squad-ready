
import { useState } from "react";
import { Calendar, Plus, Filter, Download, RefreshCw, Users, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExportUtils } from "./ExportUtils";

export const ScheduleManager = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"week" | "month">("week");
  const [filterByShift, setFilterByShift] = useState<string>("all");
  const [filterByStation, setFilterByStation] = useState<string>("all");

  const shifts = [
    {
      id: 1,
      station: "Engine 1",
      date: "2024-06-24",
      time: "6:00 AM - 6:00 PM",
      personnel: [
        { name: "Smith, J.", status: "on-duty", certifications: ["EMT-P", "FF-I"] },
        { name: "Davis, R.", status: "on-duty", certifications: ["EMT-B", "FF-II"] },
        { name: "Wilson, K.", status: "on-duty", certifications: ["EMT-I", "FF-I"] }
      ],
      status: "Confirmed",
      overtime: false,
    },
    {
      id: 2,
      station: "Ladder 3",
      date: "2024-06-24",
      time: "6:00 PM - 6:00 AM",
      personnel: [
        { name: "Brown, M.", status: "off-duty", certifications: ["EMT-P", "FF-I"] },
        { name: "Taylor, S.", status: "on-duty", certifications: ["EMT-B", "FF-II"] }
      ],
      status: "Needs Staff",
      overtime: true,
    },
    {
      id: 3,
      station: "Rescue 5",
      date: "2024-06-25",
      time: "8:00 AM - 8:00 PM",
      personnel: [
        { name: "Johnson, L.", status: "on-duty", certifications: ["EMT-P", "FF-I", "HAZMAT"] },
        { name: "Anderson, P.", status: "on-duty", certifications: ["EMT-I", "FF-II"] },
        { name: "Martinez, C.", status: "on-duty", certifications: ["EMT-B", "FF-I"] }
      ],
      status: "Confirmed",
      overtime: false,
    },
  ];

  const stations = ["Engine 1", "Engine 2", "Ladder 3", "Rescue 5", "Battalion 1"];
  const shiftTypes = ["Day", "Night", "Relief"];

  const filteredShifts = shifts.filter(shift => {
    if (filterByStation !== "all" && shift.station !== filterByStation) return false;
    if (filterByShift !== "all" && !shift.time.toLowerCase().includes(filterByShift.toLowerCase())) return false;
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-duty": return "bg-green-100 text-green-800";
      case "off-duty": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Schedule Management</h1>
          <p className="text-slate-300">Manage shifts, assignments, and personnel scheduling</p>
        </div>
        <div className="flex space-x-3">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            New Shift
          </Button>
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Station</label>
              <select 
                value={filterByStation}
                onChange={(e) => setFilterByStation(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Stations</option>
                {stations.map(station => (
                  <option key={station} value={station}>{station}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Shift Type</label>
              <select 
                value={filterByShift}
                onChange={(e) => setFilterByShift(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Shifts</option>
                {shiftTypes.map(shift => (
                  <option key={shift} value={shift}>{shift}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <Button onClick={() => { setFilterByStation("all"); setFilterByShift("all"); }}>
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* View Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div className="flex space-x-2">
          <Button
            variant={viewMode === "week" ? "default" : "outline"}
            onClick={() => setViewMode("week")}
            className={viewMode === "week" ? "bg-red-600 hover:bg-red-700" : "border-slate-600 text-slate-300 hover:bg-slate-700"}
          >
            Week View
          </Button>
          <Button
            variant={viewMode === "month" ? "default" : "outline"}
            onClick={() => setViewMode("month")}
            className={viewMode === "month" ? "bg-red-600 hover:bg-red-700" : "border-slate-600 text-slate-300 hover:bg-slate-700"}
          >
            Month View
          </Button>
        </div>
        <div className="flex items-center space-x-2 text-white">
          <Calendar className="h-5 w-5" />
          <span className="font-medium">June 23-29, 2024</span>
        </div>
      </div>

      {/* Personnel Status Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              On-Duty Personnel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredShifts.flatMap(shift => shift.personnel.filter(p => p.status === "on-duty")).map((person, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div>
                    <div className="font-medium">{person.name}</div>
                    <div className="text-sm text-slate-600">
                      {person.certifications.join(", ")}
                    </div>
                  </div>
                  <Badge className={getStatusColor(person.status)}>
                    {person.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle>Open Shifts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredShifts.filter(shift => shift.status === "Needs Staff").map((shift) => (
                <div key={shift.id} className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-slate-900">{shift.station}</h4>
                      <p className="text-slate-600 text-sm">{shift.time}</p>
                      <p className="text-slate-500 text-xs mt-1">{shift.date}</p>
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Fill Shift
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Overtime Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-slate-900">Johnson, M.</h4>
                    <p className="text-slate-600 text-sm">56.5 hours this week</p>
                    <p className="text-orange-600 text-xs font-medium">Approaching limit</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-orange-600">56.5</p>
                    <p className="text-xs text-slate-500">of 60 hrs</p>
                  </div>
                </div>
              </div>
              <div className="p-4 border border-slate-200 bg-slate-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-slate-900">Davis, R.</h4>
                    <p className="text-slate-600 text-sm">42.0 hours this week</p>
                    <p className="text-green-600 text-xs font-medium">Within limits</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-slate-600">42.0</p>
                    <p className="text-xs text-slate-500">of 60 hrs</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <ExportUtils 
        title="Schedule Management"
        data={filteredShifts}
        filters={{
          shift: filterByShift !== "all" ? filterByShift : undefined,
          station: filterByStation !== "all" ? filterByStation : undefined,
          dateRange: "Current week"
        }}
      />
    </div>
  );
};
