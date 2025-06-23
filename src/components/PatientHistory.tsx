
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Calendar, AlertTriangle, Pill, FileText, Search, Heart, Phone, Clock } from "lucide-react";

interface PatientRecord {
  id: string;
  name: string;
  dateOfBirth: string;
  address: string;
  phone: string;
  emergencyContact: string;
  emergencyPhone: string;
  medicalRecordNumber: string;
  bloodType: string;
  allergies: string[];
  medications: Medication[];
  conditions: MedicalCondition[];
  encounters: Encounter[];
  notes: string;
}

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  prescribedBy: string;
  startDate: string;
  active: boolean;
}

interface MedicalCondition {
  condition: string;
  severity: "Mild" | "Moderate" | "Severe" | "Critical";
  diagnosed: string;
  status: "Active" | "Resolved" | "Chronic";
}

interface Encounter {
  id: string;
  date: string;
  type: "Emergency" | "Transport" | "Medical" | "Trauma";
  chiefComplaint: string;
  disposition: string;
  unit: string;
  crew: string[];
}

export const PatientHistory = () => {
  const [patients] = useState<PatientRecord[]>([
    {
      id: "P-001",
      name: "Robert Johnson",
      dateOfBirth: "1965-03-15",
      address: "123 Elm Street, Springfield",
      phone: "(555) 123-4567",
      emergencyContact: "Mary Johnson",
      emergencyPhone: "(555) 987-6543",
      medicalRecordNumber: "MR-789456",
      bloodType: "O+",
      allergies: ["Penicillin", "Shellfish", "Latex"],
      medications: [
        {
          name: "Metformin",
          dosage: "500mg",
          frequency: "Twice daily",
          prescribedBy: "Dr. Smith",
          startDate: "2023-01-15",
          active: true
        },
        {
          name: "Lisinopril",
          dosage: "10mg",
          frequency: "Daily",
          prescribedBy: "Dr. Smith",
          startDate: "2023-02-01",
          active: true
        }
      ],
      conditions: [
        {
          condition: "Type 2 Diabetes",
          severity: "Moderate",
          diagnosed: "2023-01-10",
          status: "Chronic"
        },
        {
          condition: "Hypertension",
          severity: "Mild",
          diagnosed: "2023-02-01",
          status: "Chronic"
        }
      ],
      encounters: [
        {
          id: "E-001",
          date: "2024-06-15",
          type: "Emergency",
          chiefComplaint: "Chest pain",
          disposition: "Transported to General Hospital",
          unit: "A-7",
          crew: ["Johnson, M.", "Davis, K."]
        },
        {
          id: "E-002",
          date: "2024-05-20",
          type: "Medical",
          chiefComplaint: "Hypoglycemic episode",
          disposition: "Treated on scene, refused transport",
          unit: "A-3",
          crew: ["Wilson, T.", "Brown, L."]
        }
      ],
      notes: "Patient has history of cardiac events. Lives alone but has good support system."
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<PatientRecord | null>(null);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.medicalRecordNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "bg-red-100 text-red-800";
      case "Severe": return "bg-orange-100 text-orange-800";
      case "Moderate": return "bg-yellow-100 text-yellow-800";
      case "Mild": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getEncounterTypeColor = (type: string) => {
    switch (type) {
      case "Emergency": return "bg-red-100 text-red-800";
      case "Trauma": return "bg-orange-100 text-orange-800";
      case "Medical": return "bg-blue-100 text-blue-800";
      case "Transport": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Patient History System</h1>
        <p className="text-slate-300">Instant access to patient medical history and encounter data</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <User className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">{patients.length}</p>
            <p className="text-slate-600 text-sm">Patient Records</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">
              {patients.reduce((acc, p) => acc + p.allergies.length, 0)}
            </p>
            <p className="text-slate-600 text-sm">Total Allergies</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <Pill className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">
              {patients.reduce((acc, p) => acc + p.medications.filter(m => m.active).length, 0)}
            </p>
            <p className="text-slate-600 text-sm">Active Medications</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <FileText className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">
              {patients.reduce((acc, p) => acc + p.encounters.length, 0)}
            </p>
            <p className="text-slate-600 text-sm">Total Encounters</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Search */}
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Patient Search</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Search by name, MR#, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  onClick={() => setSelectedPatient(patient)}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedPatient?.id === patient.id 
                      ? "bg-blue-50 border-blue-300" 
                      : "bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{patient.name}</h4>
                      <p className="text-sm text-slate-600">
                        Age: {calculateAge(patient.dateOfBirth)} | {patient.bloodType}
                      </p>
                      <p className="text-xs text-slate-500">{patient.medicalRecordNumber}</p>
                    </div>
                    {patient.allergies.length > 0 && (
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Patient Details */}
        <div className="lg:col-span-2">
          {selectedPatient ? (
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="bg-white/10 backdrop-blur-sm">
                <TabsTrigger value="overview" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="medical" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
                  Medical History
                </TabsTrigger>
                <TabsTrigger value="encounters" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
                  Encounters
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{selectedPatient.name}</span>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Phone className="h-3 w-3 mr-1" />
                          Call
                        </Button>
                        <Button size="sm">
                          <FileText className="h-3 w-3 mr-1" />
                          New Encounter
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-slate-600 text-sm">Age:</span>
                        <p className="font-medium">{calculateAge(selectedPatient.dateOfBirth)} years old</p>
                      </div>
                      <div>
                        <span className="text-slate-600 text-sm">Blood Type:</span>
                        <p className="font-medium">{selectedPatient.bloodType}</p>
                      </div>
                      <div>
                        <span className="text-slate-600 text-sm">Phone:</span>
                        <p className="font-medium">{selectedPatient.phone}</p>
                      </div>
                      <div>
                        <span className="text-slate-600 text-sm">MR Number:</span>
                        <p className="font-medium">{selectedPatient.medicalRecordNumber}</p>
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-600 text-sm">Address:</span>
                      <p className="font-medium">{selectedPatient.address}</p>
                    </div>

                    <div>
                      <span className="text-slate-600 text-sm">Emergency Contact:</span>
                      <p className="font-medium">{selectedPatient.emergencyContact} - {selectedPatient.emergencyPhone}</p>
                    </div>

                    {selectedPatient.allergies.length > 0 && (
                      <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                        <h4 className="font-medium text-red-800 flex items-center space-x-2 mb-2">
                          <AlertTriangle className="h-4 w-4" />
                          <span>ALLERGIES</span>
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedPatient.allergies.map((allergy, index) => (
                            <Badge key={index} className="bg-red-100 text-red-800">
                              {allergy}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedPatient.notes && (
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <h4 className="font-medium mb-2">Notes:</h4>
                        <p className="text-sm">{selectedPatient.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="medical">
                <div className="space-y-4">
                  <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Pill className="h-5 w-5" />
                        <span>Current Medications</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {selectedPatient.medications.filter(m => m.active).map((med, index) => (
                          <div key={index} className="p-3 border rounded-lg bg-slate-50">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{med.name}</h4>
                                <p className="text-sm text-slate-600">{med.dosage} - {med.frequency}</p>
                                <p className="text-xs text-slate-500">Prescribed by {med.prescribedBy}</p>
                              </div>
                              <Badge className="bg-green-100 text-green-800">Active</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Heart className="h-5 w-5" />
                        <span>Medical Conditions</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {selectedPatient.conditions.map((condition, index) => (
                          <div key={index} className="p-3 border rounded-lg bg-slate-50">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{condition.condition}</h4>
                                <p className="text-sm text-slate-600">Diagnosed: {condition.diagnosed}</p>
                              </div>
                              <div className="space-y-1">
                                <Badge className={getSeverityColor(condition.severity)}>
                                  {condition.severity}
                                </Badge>
                                <Badge className="bg-blue-100 text-blue-800 block">
                                  {condition.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="encounters">
                <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="h-5 w-5" />
                      <span>Previous Encounters</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedPatient.encounters.map((encounter) => (
                        <div key={encounter.id} className="p-4 border rounded-lg bg-slate-50">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium">{encounter.chiefComplaint}</h4>
                              <p className="text-sm text-slate-600">{encounter.date}</p>
                            </div>
                            <Badge className={getEncounterTypeColor(encounter.type)}>
                              {encounter.type}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-slate-600">Unit:</span>
                              <p>{encounter.unit}</p>
                            </div>
                            <div>
                              <span className="text-slate-600">Crew:</span>
                              <p>{encounter.crew.join(", ")}</p>
                            </div>
                          </div>
                          <div className="mt-2">
                            <span className="text-slate-600 text-sm">Disposition:</span>
                            <p className="text-sm">{encounter.disposition}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
              <CardContent className="p-12 text-center">
                <User className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-600 mb-2">Select a Patient</h3>
                <p className="text-slate-500">Search and select a patient to view their medical history</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
