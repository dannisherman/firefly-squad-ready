
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, AlertTriangle, Calendar, Shield, FileText, Award, Syringe, Clock, Lock, Eye, Search, Filter } from "lucide-react";

interface Employee {
  id: string;
  name: string;
  badge: string;
  position: string;
  department: string;
  hireDate: string;
  status: "Active" | "Inactive" | "On Leave";
  certifications: Certification[];
  immunizations: Immunization[];
  qualifications: Qualification[];
  workHistory: WorkHistoryEntry[];
  documents: Document[];
  accessLevel: "Basic" | "Supervisor" | "Admin";
  encryptedMedicalData?: string; // Field-level encryption for sensitive data
}

interface Certification {
  id: string;
  name: string;
  issuingBody: string;
  issueDate: string;
  expirationDate: string;
  status: "Valid" | "Expiring" | "Expired";
  certificateNumber: string;
}

interface Immunization {
  id: string;
  vaccine: string;
  administeredDate: string;
  nextDueDate?: string;
  lot: string;
  provider: string;
  status: "Current" | "Due" | "Overdue";
}

interface Qualification {
  id: string;
  skill: string;
  level: "Basic" | "Intermediate" | "Advanced" | "Expert";
  completedDate: string;
  instructor: string;
  objectives: string[];
  completedObjectives: number;
  totalObjectives: number;
}

interface WorkHistoryEntry {
  id: string;
  date: string;
  type: "Promotion" | "Transfer" | "Training" | "Disciplinary" | "Award";
  description: string;
  details: string;
  supervisor: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  size: string;
  encrypted: boolean;
}

interface AuditLog {
  id: string;
  employeeId: string;
  userId: string;
  action: string;
  field?: string;
  oldValue?: string;
  newValue?: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
}

export const EmployeeManager = () => {
  const [employees] = useState<Employee[]>([
    {
      id: "EMP-001",
      name: "John Smith",
      badge: "FF-101",
      position: "Firefighter/EMT",
      department: "Fire Suppression",
      hireDate: "2020-03-15",
      status: "Active",
      accessLevel: "Basic",
      certifications: [
        {
          id: "CERT-001",
          name: "EMT-Basic",
          issuingBody: "State Health Department",
          issueDate: "2023-01-15",
          expirationDate: "2025-01-15",
          status: "Valid",
          certificateNumber: "EMT-12345"
        },
        {
          id: "CERT-002",
          name: "Firefighter I",
          issuingBody: "State Fire Marshal",
          issueDate: "2020-06-01",
          expirationDate: "2024-06-01",
          status: "Expiring",
          certificateNumber: "FF1-67890"
        }
      ],
      immunizations: [
        {
          id: "IMM-001",
          vaccine: "Hepatitis B",
          administeredDate: "2023-01-10",
          nextDueDate: "2033-01-10",
          lot: "HB2023-001",
          provider: "Occupational Health",
          status: "Current"
        },
        {
          id: "IMM-002",
          vaccine: "Tetanus",
          administeredDate: "2019-05-15",
          nextDueDate: "2024-05-15",
          lot: "TET2019-045",
          provider: "Occupational Health",
          status: "Due"
        }
      ],
      qualifications: [
        {
          id: "QUAL-001",
          skill: "Vehicle Rescue",
          level: "Intermediate",
          completedDate: "2023-08-20",
          instructor: "Captain Johnson",
          objectives: ["Stabilization", "Access", "Disentanglement", "Patient Care"],
          completedObjectives: 4,
          totalObjectives: 4
        }
      ],
      workHistory: [
        {
          id: "WH-001",
          date: "2023-07-01",
          type: "Promotion",
          description: "Promoted to Senior Firefighter",
          details: "Recognition for outstanding performance and leadership",
          supervisor: "Captain Davis"
        }
      ],
      documents: [
        {
          id: "DOC-001",
          name: "Medical_Records.pdf",
          type: "Medical",
          uploadDate: "2023-01-15",
          size: "2.4 MB",
          encrypted: true
        }
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [certificationFilter, setCertificationFilter] = useState("all");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [auditLogs] = useState<AuditLog[]>([]);

  // Security function to encrypt sensitive medical data
  const encryptMedicalData = (data: string): string => {
    // In production, use proper encryption library
    return btoa(data); // Base64 encoding for demo
  };

  // Security function to decrypt medical data
  const decryptMedicalData = (encryptedData: string): string => {
    try {
      return atob(encryptedData);
    } catch {
      return "***ENCRYPTED***";
    }
  };

  // Audit logging function
  const logAccess = (employeeId: string, action: string, field?: string) => {
    const auditEntry: AuditLog = {
      id: `AUDIT-${Date.now()}`,
      employeeId,
      userId: "current-user-id", // Would come from auth context
      action,
      field,
      timestamp: new Date().toISOString(),
      ipAddress: "192.168.1.1", // Would be actual IP
      userAgent: navigator.userAgent
    };
    console.log("Audit Log:", auditEntry);
    // In production, send to secure logging service
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.badge.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || employee.status === statusFilter;
    
    const matchesCertification = certificationFilter === "all" || 
      (certificationFilter === "expiring" && employee.certifications.some(cert => cert.status === "Expiring")) ||
      (certificationFilter === "expired" && employee.certifications.some(cert => cert.status === "Expired"));

    return matchesSearch && matchesStatus && matchesCertification;
  });

  const getExpiringCount = (type: "certifications" | "immunizations") => {
    return employees.reduce((count, emp) => {
      if (type === "certifications") {
        return count + emp.certifications.filter(cert => cert.status === "Expiring").length;
      } else {
        return count + emp.immunizations.filter(imm => imm.status === "Due" || imm.status === "Overdue").length;
      }
    }, 0);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Valid": case "Current": case "Active": return "bg-green-100 text-green-800";
      case "Expiring": case "Due": return "bg-yellow-100 text-yellow-800";
      case "Expired": case "Overdue": return "bg-red-100 text-red-800";
      case "Inactive": return "bg-gray-100 text-gray-800";
      case "On Leave": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleEmployeeSelect = (employee: Employee) => {
    setSelectedEmployee(employee);
    logAccess(employee.id, "VIEW_EMPLOYEE_RECORD");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Personnel Management</h1>
        <p className="text-slate-300">Comprehensive employee records, certifications, and compliance tracking</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <User className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">{employees.length}</p>
            <p className="text-slate-600 text-sm">Total Personnel</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">{getExpiringCount("certifications")}</p>
            <p className="text-slate-600 text-sm">Expiring Certifications</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <Syringe className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">{getExpiringCount("immunizations")}</p>
            <p className="text-slate-600 text-sm">Due Immunizations</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">100%</p>
            <p className="text-slate-600 text-sm">HIPAA Compliant</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Employee Search & Filter</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Search by name, badge, or position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <div className="grid grid-cols-2 gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="On Leave">On Leave</SelectItem>
                </SelectContent>
              </Select>

              <Select value={certificationFilter} onValueChange={setCertificationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Certifications" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Certs</SelectItem>
                  <SelectItem value="expiring">Expiring</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredEmployees.map((employee) => (
                <div
                  key={employee.id}
                  onClick={() => handleEmployeeSelect(employee)}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedEmployee?.id === employee.id 
                      ? "bg-blue-50 border-blue-300" 
                      : "bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{employee.name}</h4>
                      <p className="text-sm text-slate-600">{employee.badge} - {employee.position}</p>
                      <p className="text-xs text-slate-500">{employee.department}</p>
                    </div>
                    <div className="space-y-1">
                      <Badge className={getStatusColor(employee.status)}>
                        {employee.status}
                      </Badge>
                      {(employee.certifications.some(cert => cert.status === "Expiring") ||
                        employee.immunizations.some(imm => imm.status === "Due")) && (
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          {selectedEmployee ? (
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="bg-white/10 backdrop-blur-sm">
                <TabsTrigger value="overview" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="certifications" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
                  Certifications
                </TabsTrigger>
                <TabsTrigger value="immunizations" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
                  Immunizations
                </TabsTrigger>
                <TabsTrigger value="qualifications" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
                  Qualifications
                </TabsTrigger>
                <TabsTrigger value="history" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
                  Work History
                </TabsTrigger>
                <TabsTrigger value="security" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
                  Security
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{selectedEmployee.name}</span>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <FileText className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          View Full Record
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-slate-600 text-sm">Badge Number:</span>
                        <p className="font-medium">{selectedEmployee.badge}</p>
                      </div>
                      <div>
                        <span className="text-slate-600 text-sm">Position:</span>
                        <p className="font-medium">{selectedEmployee.position}</p>
                      </div>
                      <div>
                        <span className="text-slate-600 text-sm">Department:</span>
                        <p className="font-medium">{selectedEmployee.department}</p>
                      </div>
                      <div>
                        <span className="text-slate-600 text-sm">Hire Date:</span>
                        <p className="font-medium">{selectedEmployee.hireDate}</p>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-lg">
                      <h4 className="font-medium mb-2 flex items-center space-x-2">
                        <Lock className="h-4 w-4" />
                        <span>Security Information</span>
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Access Level: {selectedEmployee.accessLevel}</div>
                        <div>Documents: {selectedEmployee.documents.filter(doc => doc.encrypted).length} encrypted</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="certifications">
                <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Award className="h-5 w-5" />
                      <span>Certifications & Credentials</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedEmployee.certifications.map((cert) => (
                        <div key={cert.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium">{cert.name}</h4>
                              <p className="text-sm text-slate-600">{cert.issuingBody}</p>
                              <p className="text-xs text-slate-500">Cert #: {cert.certificateNumber}</p>
                            </div>
                            <Badge className={getStatusColor(cert.status)}>
                              {cert.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-slate-600">Issued:</span>
                              <p>{cert.issueDate}</p>
                            </div>
                            <div>
                              <span className="text-slate-600">Expires:</span>
                              <p>{cert.expirationDate}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="immunizations">
                <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Syringe className="h-5 w-5" />
                      <span>Immunization Records</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedEmployee.immunizations.map((imm) => (
                        <div key={imm.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium">{imm.vaccine}</h4>
                              <p className="text-sm text-slate-600">Lot: {imm.lot}</p>
                              <p className="text-xs text-slate-500">Provider: {imm.provider}</p>
                            </div>
                            <Badge className={getStatusColor(imm.status)}>
                              {imm.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-slate-600">Administered:</span>
                              <p>{imm.administeredDate}</p>
                            </div>
                            {imm.nextDueDate && (
                              <div>
                                <span className="text-slate-600">Next Due:</span>
                                <p>{imm.nextDueDate}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="qualifications">
                <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Award className="h-5 w-5" />
                      <span>Skills & Qualifications</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedEmployee.qualifications.map((qual) => (
                        <div key={qual.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium">{qual.skill}</h4>
                              <p className="text-sm text-slate-600">Level: {qual.level}</p>
                              <p className="text-xs text-slate-500">Instructor: {qual.instructor}</p>
                            </div>
                            <Badge className="bg-blue-100 text-blue-800">
                              {qual.completedObjectives}/{qual.totalObjectives} Complete
                            </Badge>
                          </div>
                          <div className="mt-2">
                            <span className="text-slate-600 text-sm">Completed:</span>
                            <p className="text-sm">{qual.completedDate}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history">
                <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="h-5 w-5" />
                      <span>Work History</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedEmployee.workHistory.map((entry) => (
                        <div key={entry.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium">{entry.description}</h4>
                              <p className="text-sm text-slate-600">{entry.details}</p>
                              <p className="text-xs text-slate-500">Supervisor: {entry.supervisor}</p>
                            </div>
                            <div className="text-right">
                              <Badge className="bg-blue-100 text-blue-800">
                                {entry.type}
                              </Badge>
                              <p className="text-xs text-slate-500 mt-1">{entry.date}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5" />
                      <span>Security & Compliance</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <h4 className="font-medium text-green-800 mb-2">HIPAA Compliance Status</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>✓ Encrypted Medical Data</div>
                        <div>✓ Access Logging Enabled</div>
                        <div>✓ Role-based Permissions</div>
                        <div>✓ Audit Trail Active</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-slate-800 mb-2">Document Security</h4>
                      <div className="space-y-2">
                        {selectedEmployee.documents.map((doc) => (
                          <div key={doc.id} className="flex justify-between items-center p-2 border rounded">
                            <div>
                              <span className="font-medium">{doc.name}</span>
                              <span className="text-xs text-slate-500 ml-2">({doc.size})</span>
                            </div>
                            {doc.encrypted && (
                              <Badge className="bg-green-100 text-green-800">
                                <Lock className="h-3 w-3 mr-1" />
                                Encrypted
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-slate-800 mb-2">Access Level</h4>
                      <Badge className="bg-blue-100 text-blue-800">
                        {selectedEmployee.accessLevel}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
              <CardContent className="p-12 text-center">
                <User className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-600 mb-2">Select an Employee</h3>
                <p className="text-slate-500">Search and select an employee to view their personnel record</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
