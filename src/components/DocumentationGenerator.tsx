
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Wand2, Save, Copy, Check, Clock, User, MapPin } from "lucide-react";

interface IncidentData {
  incidentNumber: string;
  date: string;
  time: string;
  location: string;
  incidentType: string;
  priority: string;
  unit: string;
  crew: string[];
  patientInfo: {
    name: string;
    age: number;
    gender: string;
    chiefComplaint: string;
  };
  vitals: {
    pulse: string;
    bloodPressure: string;
    respirations: string;
    oxygenSat: string;
    bloodGlucose: string;
    temperature: string;
  };
  assessment: string;
  treatment: string[];
  medications: string[];
  disposition: string;
  transportDestination: string;
  responseTime: string;
}

interface GeneratedNarrative {
  id: string;
  incidentNumber: string;
  generatedAt: string;
  narrative: string;
  status: "Draft" | "Reviewed" | "Finalized";
  reviewedBy?: string;
  finalizedBy?: string;
}

export const DocumentationGenerator = () => {
  const [incidentData, setIncidentData] = useState<IncidentData>({
    incidentNumber: "2024-001234",
    date: "2024-06-23",
    time: "14:30",
    location: "123 Main Street, Springfield",
    incidentType: "Medical Emergency",
    priority: "Priority 1",
    unit: "A-7",
    crew: ["Johnson, M.", "Davis, K."],
    patientInfo: {
      name: "Robert Johnson",
      age: 58,
      gender: "Male",
      chiefComplaint: "Chest pain"
    },
    vitals: {
      pulse: "110",
      bloodPressure: "150/90",
      respirations: "22",
      oxygenSat: "94%",
      bloodGlucose: "120",
      temperature: "98.6°F"
    },
    assessment: "58-year-old male presenting with acute chest pain, possible cardiac event",
    treatment: ["Oxygen therapy", "IV access", "Cardiac monitoring", "Aspirin administration"],
    medications: ["Aspirin 324mg", "Nitroglycerin 0.4mg SL"],
    disposition: "Transported",
    transportDestination: "General Hospital Emergency Department",
    responseTime: "6 minutes"
  });

  const [generatedNarratives] = useState<GeneratedNarrative[]>([
    {
      id: "N-001",
      incidentNumber: "2024-001234",
      generatedAt: "2024-06-23 14:45",
      narrative: "Unit A-7 responded to a Priority 1 medical emergency at 123 Main Street, Springfield at 14:30 hours. Upon arrival, crew found a 58-year-old male patient complaining of acute chest pain. Patient was conscious and alert, experiencing substernal chest pain rated 8/10 that began approximately 30 minutes prior to EMS arrival. Initial vital signs revealed pulse 110, blood pressure 150/90, respirations 22, oxygen saturation 94% on room air. Patient appeared diaphoretic and anxious. Assessment indicated possible acute coronary syndrome. Treatment included high-flow oxygen via non-rebreather mask, establishment of 18-gauge IV access in left antecubital vein, continuous cardiac monitoring showing sinus tachycardia, and administration of aspirin 324mg PO and nitroglycerin 0.4mg SL with improvement in chest pain to 5/10. Patient was placed on stretcher in position of comfort and transported to General Hospital Emergency Department without incident. Continuous monitoring en route showed stable vital signs. Patient care transferred to ED staff with verbal report. Total response time: 6 minutes.",
      status: "Draft"
    }
  ]);

  const [activeTab, setActiveTab] = useState("input");
  const [copied, setCopied] = useState(false);

  const generateNarrative = () => {
    // This would typically call an AI service, but for demo we'll use template
    const narrative = `Unit ${incidentData.unit} responded to a ${incidentData.priority} ${incidentData.incidentType.toLowerCase()} at ${incidentData.location} at ${incidentData.time} hours on ${incidentData.date}. 

Upon arrival, crew found a ${incidentData.patientInfo.age}-year-old ${incidentData.patientInfo.gender.toLowerCase()} patient complaining of ${incidentData.patientInfo.chiefComplaint}. 

Initial assessment: ${incidentData.assessment}

Vital signs on scene: Pulse ${incidentData.vitals.pulse}, Blood Pressure ${incidentData.vitals.bloodPressure}, Respirations ${incidentData.vitals.respirations}, Oxygen Saturation ${incidentData.vitals.oxygenSat}, Temperature ${incidentData.vitals.temperature}.

Treatment provided: ${incidentData.treatment.join(", ")}.

Medications administered: ${incidentData.medications.join(", ")}.

Patient was ${incidentData.disposition.toLowerCase()} to ${incidentData.transportDestination}. 

Response time: ${incidentData.responseTime}.`;

    setActiveTab("generated");
    return narrative;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Documentation Generator</h1>
        <p className="text-slate-300">AI-powered patient narrative generation and clinical documentation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">12</p>
            <p className="text-slate-600 text-sm">Generated Today</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <Wand2 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">1.2m</p>
            <p className="text-slate-600 text-sm">Avg Generation Time</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <Check className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">98%</p>
            <p className="text-slate-600 text-sm">Accuracy Rate</p>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">75%</p>
            <p className="text-slate-600 text-sm">Time Saved</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-white/10 backdrop-blur-sm">
          <TabsTrigger value="input" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
            Incident Data Input
          </TabsTrigger>
          <TabsTrigger value="generated" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
            Generated Narrative
          </TabsTrigger>
          <TabsTrigger value="history" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
            Documentation History
          </TabsTrigger>
          <TabsTrigger value="templates" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
            Custom Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="input" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle>Incident Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Incident Number</label>
                    <Input value={incidentData.incidentNumber} readOnly />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Unit</label>
                    <Input value={incidentData.unit} readOnly />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Date</label>
                    <Input type="date" value={incidentData.date} readOnly />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Time</label>
                    <Input type="time" value={incidentData.time} readOnly />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <Input value={incidentData.location} readOnly />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Incident Type</label>
                    <Select value={incidentData.incidentType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Medical Emergency">Medical Emergency</SelectItem>
                        <SelectItem value="Trauma">Trauma</SelectItem>
                        <SelectItem value="Cardiac Arrest">Cardiac Arrest</SelectItem>
                        <SelectItem value="Motor Vehicle Accident">Motor Vehicle Accident</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Priority</label>
                    <Select value={incidentData.priority}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Priority 1">Priority 1</SelectItem>
                        <SelectItem value="Priority 2">Priority 2</SelectItem>
                        <SelectItem value="Priority 3">Priority 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle>Patient Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Patient Name</label>
                  <Input value={incidentData.patientInfo.name} readOnly />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Age</label>
                    <Input type="number" value={incidentData.patientInfo.age} readOnly />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Gender</label>
                    <Select value={incidentData.patientInfo.gender}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Chief Complaint</label>
                  <Input value={incidentData.patientInfo.chiefComplaint} />
                </div>
                <div>
                  <label className="text-sm font-medium">Assessment</label>
                  <Textarea value={incidentData.assessment} rows={3} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle>Vital Signs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Pulse</label>
                    <Input value={incidentData.vitals.pulse} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Blood Pressure</label>
                    <Input value={incidentData.vitals.bloodPressure} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Respirations</label>
                    <Input value={incidentData.vitals.respirations} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Oxygen Saturation</label>
                    <Input value={incidentData.vitals.oxygenSat} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Blood Glucose</label>
                    <Input value={incidentData.vitals.bloodGlucose} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Temperature</label>
                    <Input value={incidentData.vitals.temperature} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle>Treatment & Disposition</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Treatment Provided</label>
                  <Textarea 
                    value={incidentData.treatment.join(", ")} 
                    rows={3}
                    placeholder="List treatments provided..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Medications Administered</label>
                  <Textarea 
                    value={incidentData.medications.join(", ")} 
                    rows={2}
                    placeholder="List medications given..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Disposition</label>
                  <Select value={incidentData.disposition}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Transported">Transported</SelectItem>
                      <SelectItem value="Refused Transport">Refused Transport</SelectItem>
                      <SelectItem value="Treated and Released">Treated and Released</SelectItem>
                      <SelectItem value="No Treatment Required">No Treatment Required</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Transport Destination</label>
                  <Input value={incidentData.transportDestination} />
                </div>
                
                <Button onClick={generateNarrative} className="w-full">
                  <Wand2 className="h-4 w-4 mr-2" />
                  Generate Narrative
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="generated" className="space-y-6">
          <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Generated Patient Narrative</span>
                <div className="space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => copyToClipboard(generatedNarratives[0]?.narrative || "")}
                  >
                    {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                  <Button size="sm">
                    <Save className="h-3 w-3 mr-1" />
                    Save Draft
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-blue-500">
                <Textarea 
                  value={generatedNarratives[0]?.narrative || "Click 'Generate Narrative' to create documentation..."}
                  rows={12}
                  className="w-full resize-none"
                />
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-slate-600">
                  Status: <Badge className="ml-1">Draft</Badge>
                </div>
                <div className="space-x-2">
                  <Button variant="outline">
                    Request Review
                  </Button>
                  <Button>
                    Finalize Documentation
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle>Documentation History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {generatedNarratives.map((narrative) => (
                  <div key={narrative.id} className="p-4 border rounded-lg bg-slate-50">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">Incident #{narrative.incidentNumber}</h4>
                        <p className="text-sm text-slate-600">Generated: {narrative.generatedAt}</p>
                      </div>
                      <Badge className={
                        narrative.status === "Finalized" ? "bg-green-100 text-green-800" :
                        narrative.status === "Reviewed" ? "bg-blue-100 text-blue-800" :
                        "bg-yellow-100 text-yellow-800"
                      }>
                        {narrative.status}
                      </Badge>
                    </div>
                    <p className="text-sm line-clamp-2">{narrative.narrative}</p>
                    <div className="mt-2 space-x-2">
                      <Button size="sm" variant="outline">View Full</Button>
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="outline">Export</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle>Custom Documentation Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Cardiac Emergency Template</h4>
                  <p className="text-sm text-slate-600 mt-1">Specialized template for cardiac-related incidents</p>
                  <Button size="sm" className="mt-2">Use Template</Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Trauma Template</h4>
                  <p className="text-sm text-slate-600 mt-1">Comprehensive template for trauma incidents</p>
                  <Button size="sm" className="mt-2">Use Template</Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Pediatric Template</h4>
                  <p className="text-sm text-slate-600 mt-1">Specialized template for pediatric patients</p>
                  <Button size="sm" className="mt-2">Use Template</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
