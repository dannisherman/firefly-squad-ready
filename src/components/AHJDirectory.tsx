
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Map, Filter, Phone, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";

interface AHJEntry {
  id: string;
  jurisdiction: string;
  address: string;
  phone: string;
  email: string;
  coverage: string;
  status: string;
}

export const AHJDirectory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchRange, setSearchRange] = useState("10");
  const [filterType, setFilterType] = useState("all");

  const [ahjEntries] = useState<AHJEntry[]>([
    {
      id: "1",
      jurisdiction: "City Fire Department",
      address: "123 Main St, Anytown, ST 12345",
      phone: "(555) 123-4567",
      email: "fire@cityfd.gov",
      coverage: "Downtown District",
      status: "Active"
    },
    {
      id: "2",
      jurisdiction: "County Fire Marshal",
      address: "456 County Rd, County Seat, ST 12346",
      phone: "(555) 987-6543",
      email: "marshal@countyfire.gov",
      coverage: "Unincorporated Areas",
      status: "Active"
    },
    {
      id: "3",
      jurisdiction: "Regional Fire Authority",
      address: "789 Regional Blvd, Metro City, ST 12347",
      phone: "(555) 456-7890",
      email: "admin@regionalfire.org",
      coverage: "Multi-jurisdictional",
      status: "Active"
    }
  ]);

  const filteredEntries = ahjEntries.filter(entry => {
    const matchesSearch = searchQuery === "" || 
      entry.jurisdiction.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.coverage.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterType === "all" || entry.status.toLowerCase() === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const handleSearch = () => {
    toast.success(`Searching for AHJ entries within ${searchRange} miles`);
  };

  const handleMapSearch = () => {
    toast.success("Opening map search interface");
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">AHJ Directory</CardTitle>
          <CardDescription>
            Ensure reports reach the right jurisdiction using the AHJ directory
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search Controls */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Filter Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-700 border-slate-600 text-white"
                  placeholder="Search jurisdictions..."
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-slate-300">Search Range (miles)</Label>
              <Select value={searchRange} onValueChange={setSearchRange}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="5" className="text-white hover:bg-slate-600">5 miles</SelectItem>
                  <SelectItem value="10" className="text-white hover:bg-slate-600">10 miles</SelectItem>
                  <SelectItem value="25" className="text-white hover:bg-slate-600">25 miles</SelectItem>
                  <SelectItem value="50" className="text-white hover:bg-slate-600">50 miles</SelectItem>
                  <SelectItem value="100" className="text-white hover:bg-slate-600">100 miles</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Filter Type</Label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="all" className="text-white hover:bg-slate-600">All</SelectItem>
                  <SelectItem value="active" className="text-white hover:bg-slate-600">Active</SelectItem>
                  <SelectItem value="inactive" className="text-white hover:bg-slate-600">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Actions</Label>
              <div className="flex gap-2">
                <Button onClick={handleSearch} size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Search className="h-4 w-4 mr-1" />
                  Search
                </Button>
                <Button onClick={handleMapSearch} size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:text-white">
                  <Map className="h-4 w-4 mr-1" />
                  Map
                </Button>
              </div>
            </div>
          </div>

          {/* Results Table */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                AHJ Directory ({filteredEntries.length} entries)
              </h3>
              <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:text-white">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
            </div>
            
            <div className="border border-slate-600 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-600">
                    <TableHead className="text-slate-300">Jurisdiction</TableHead>
                    <TableHead className="text-slate-300">Address</TableHead>
                    <TableHead className="text-slate-300">Contact</TableHead>
                    <TableHead className="text-slate-300">Coverage Area</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                    <TableHead className="text-slate-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEntries.map((entry) => (
                    <TableRow key={entry.id} className="border-slate-600">
                      <TableCell className="text-white font-medium">
                        {entry.jurisdiction}
                      </TableCell>
                      <TableCell className="text-white">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-slate-400 mr-2" />
                          {entry.address}
                        </div>
                      </TableCell>
                      <TableCell className="text-white">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Phone className="h-3 w-3 text-slate-400 mr-2" />
                            {entry.phone}
                          </div>
                          <div className="flex items-center text-sm">
                            <Mail className="h-3 w-3 text-slate-400 mr-2" />
                            {entry.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-white">{entry.coverage}</TableCell>
                      <TableCell>
                        <Badge className={entry.status === "Active" ? "bg-green-500" : "bg-red-500"}>
                          {entry.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:text-white">
                            Contact
                          </Button>
                          <Button size="sm" className="bg-red-600 hover:bg-red-700">
                            Select
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
