
import { Download, FileText, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ExportUtilsProps {
  title: string;
  data: any[];
  filters?: {
    shift?: string;
    station?: string;
    incidentType?: string;
    dateRange?: string;
  };
}

export const ExportUtils = ({ title, data, filters }: ExportUtilsProps) => {
  const exportToPDF = () => {
    console.log("Exporting to PDF...", { title, data, filters });
    // In a real implementation, this would use a library like jsPDF or react-to-pdf
  };

  const exportToCSV = () => {
    console.log("Exporting to CSV...", { title, data, filters });
    // In a real implementation, this would generate and download CSV
    const csvContent = "data:text/csv;charset=utf-8," + 
      data.map(row => Object.values(row).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${title.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateShareableLink = () => {
    console.log("Generating shareable link...", { title, filters });
    // In a real implementation, this would create a secure shareable link
    const shareLink = `${window.location.origin}/shared/${btoa(JSON.stringify({ title, filters }))}`;
    navigator.clipboard.writeText(shareLink);
    alert("Shareable link copied to clipboard!");
  };

  const exportNFIRS = () => {
    console.log("Exporting NFIRS template...", { data, filters });
    // NFIRS-specific export logic would go here
  };

  const exportNEMSIS = () => {
    console.log("Exporting NEMSIS template...", { data, filters });
    // NEMSIS-specific export logic would go here
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Export Options</span>
          <div className="flex space-x-2">
            <Button size="sm" onClick={exportToPDF} className="bg-red-600 hover:bg-red-700">
              <FileText className="h-4 w-4 mr-2" />
              PDF
            </Button>
            <Button size="sm" onClick={exportToCSV} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              CSV
            </Button>
            <Button size="sm" onClick={generateShareableLink} variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Standard Exports</h4>
              <div className="space-y-2">
                <Button size="sm" onClick={exportToPDF} variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Export as PDF Report
                </Button>
                <Button size="sm" onClick={exportToCSV} variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export as CSV Data
                </Button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Compliance Templates</h4>
              <div className="space-y-2">
                <Button size="sm" onClick={exportNFIRS} variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  NFIRS Summary
                </Button>
                <Button size="sm" onClick={exportNEMSIS} variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  NEMSIS Export
                </Button>
              </div>
            </div>
          </div>
          
          {filters && (
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-2">Current Filters</h4>
              <div className="text-sm text-slate-600 space-y-1">
                {filters.shift && <div>Shift: {filters.shift}</div>}
                {filters.station && <div>Station: {filters.station}</div>}
                {filters.incidentType && <div>Incident Type: {filters.incidentType}</div>}
                {filters.dateRange && <div>Date Range: {filters.dateRange}</div>}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
