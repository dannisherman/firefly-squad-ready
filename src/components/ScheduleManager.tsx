
import { useState } from "react";
import { Calendar, Plus, Filter, Download, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const ScheduleManager = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"week" | "month">("week");

  const shifts = [
    {
      id: 1,
      station: "Engine 1",
      date: "2024-06-24",
      time: "6:00 AM - 6:00 PM",
      personnel: ["Smith, J.", "Davis, R.", "Wilson, K."],
      status: "Confirmed",
      overtime: false,
    },
    {
      id: 2,
      station: "Ladder 3",
      date: "2024-06-24",
      time: "6:00 PM - 6:00 AM",
      personnel: ["Brown, M.", "Taylor, S."],
      status: "Needs Staff",
      overtime: true,
    },
    {
      id: 3,
      station: "Rescue 5",
      date: "2024-06-25",
      time: "8:00 AM - 8:00 PM",
      personnel: ["Johnson, L.", "Anderson, P.", "Martinez, C."],
      status: "Confirmed",
      overtime: false,
    },
  ];

  const timeSlots = [
    "6:00 AM", "8:00 AM", "10:00 AM", "12:00 PM", 
    "2:00 PM", "4:00 PM", "6:00 PM", "8:00 PM", "10:00 PM"
  ];

  const stations = ["Engine 1", "Engine 2", "Ladder 3", "Rescue 5", "Battalion 1"];

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

      {/* Schedule Grid */}
      <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Weekly Schedule</span>
            <Button size="sm" variant="outline" className="border-slate-300">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left p-3 font-semibold">Station/Unit</th>
                  <th className="text-center p-3 font-semibold">Mon 24</th>
                  <th className="text-center p-3 font-semibold">Tue 25</th>
                  <th className="text-center p-3 font-semibold">Wed 26</th>
                  <th className="text-center p-3 font-semibold">Thu 27</th>
                  <th className="text-center p-3 font-semibold">Fri 28</th>
                  <th className="text-center p-3 font-semibold">Sat 29</th>
                  <th className="text-center p-3 font-semibold">Sun 30</th>
                </tr>
              </thead>
              <tbody>
                {stations.map((station, stationIdx) => (
                  <tr key={stationIdx} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-3 font-medium">{station}</td>
                    {[...Array(7)].map((_, dayIdx) => (
                      <td key={dayIdx} className="p-3 text-center">
                        <div className="space-y-1">
                          {/* Day Shift */}
                          <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs cursor-pointer hover:bg-blue-200 transition-colors">
                            Day: Smith, J.
                          </div>
                          {/* Night Shift */}
                          <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs cursor-pointer hover:bg-purple-200 transition-colors">
                            Night: Brown, M.
                          </div>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Shift Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle>Open Shifts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {shifts.filter(shift => shift.status === "Needs Staff").map((shift) => (
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
            <CardTitle>Overtime Tracking</CardTitle>
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
    </div>
  );
};
