
import { useState } from "react";
import { Users, Plus, Search, Filter, Mail, Phone, Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const EmployeeManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const employees = [
    {
      id: 1,
      name: "Captain John Smith",
      rank: "Captain",
      station: "Engine 1",
      department: "Suppression",
      phone: "(555) 123-4567",
      email: "j.smith@fireops.gov",
      certifications: ["EMT-P", "Fire Officer I", "Hazmat Tech"],
      status: "Active",
      shift: "A Shift",
      hiredDate: "2015-03-15",
    },
    {
      id: 2,
      name: "Lieutenant Sarah Davis",
      rank: "Lieutenant", 
      station: "Ladder 3",
      department: "Suppression",
      phone: "(555) 234-5678",
      email: "s.davis@fireops.gov",
      certifications: ["EMT-B", "Fire Officer II", "Technical Rescue"],
      status: "Active",
      shift: "B Shift",
      hiredDate: "2018-07-22",
    },
    {
      id: 3,
      name: "Firefighter Mike Johnson",
      rank: "Firefighter",
      station: "Rescue 5",
      department: "EMS",
      phone: "(555) 345-6789",
      email: "m.johnson@fireops.gov",
      certifications: ["EMT-P", "Hazmat Ops", "Swift Water Rescue"],
      status: "On Leave",
      shift: "C Shift",
      hiredDate: "2020-01-10",
    },
  ];

  const departments = ["all", "Suppression", "EMS", "Prevention", "Training"];

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.rank.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "all" || employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Personnel Management</h1>
          <p className="text-slate-300">Manage firefighter profiles, certifications, and assignments</p>
        </div>
        <div className="flex space-x-3">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Personnel
          </Button>
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search personnel..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/95 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="px-4 py-2 bg-white/95 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {departments.map(dept => (
            <option key={dept} value={dept}>
              {dept === "all" ? "All Departments" : dept}
            </option>
          ))}
        </select>
      </div>

      {/* Personnel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <Card key={employee.id} className="bg-white/95 backdrop-blur-sm border-slate-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{employee.name}</CardTitle>
                  <p className="text-slate-600">{employee.rank}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    employee.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {employee.status}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-500">Station</p>
                  <p className="font-medium">{employee.station}</p>
                </div>
                <div>
                  <p className="text-slate-500">Department</p>
                  <p className="font-medium">{employee.department}</p>
                </div>
                <div>
                  <p className="text-slate-500">Shift</p>
                  <p className="font-medium">{employee.shift}</p>
                </div>
                <div>
                  <p className="text-slate-500">Hired</p>
                  <p className="font-medium">{new Date(employee.hiredDate).getFullYear()}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <Phone className="h-4 w-4" />
                  <span>{employee.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <Mail className="h-4 w-4" />
                  <span>{employee.email}</span>
                </div>
              </div>

              <div>
                <p className="text-slate-500 text-sm mb-2">Certifications</p>
                <div className="flex flex-wrap gap-1">
                  {employee.certifications.map((cert, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  View Details
                </Button>
                <Button size="sm" className="flex-1 bg-red-600 hover:bg-red-700">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">{employees.length}</p>
            <p className="text-slate-600 text-sm">Total Personnel</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">{employees.filter(e => e.status === "Active").length}</p>
            <p className="text-slate-600 text-sm">Active Duty</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">{employees.filter(e => e.status === "On Leave").length}</p>
            <p className="text-slate-600 text-sm">On Leave</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">12</p>
            <p className="text-slate-600 text-sm">Certifications Due</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
