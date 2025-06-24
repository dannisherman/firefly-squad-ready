
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Wrench, DollarSign, Clock, User, AlertTriangle } from "lucide-react";

interface WorkOrder {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "critical";
  status: "pending" | "in-progress" | "review" | "completed";
  assignedTo: string;
  createdDate: string;
  dueDate: string;
  estimatedCost: number;
  actualCost?: number;
  apparatus?: string;
  equipment?: string;
}

export const WorkOrderBoard = () => {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([
    {
      id: "1",
      title: "Engine 1 - Brake System Repair",
      description: "Replace brake pads and check brake fluid system",
      priority: "high",
      status: "in-progress",
      assignedTo: "Mike Johnson",
      createdDate: "2024-01-15",
      dueDate: "2024-01-20",
      estimatedCost: 450.00,
      apparatus: "Engine 1"
    },
    {
      id: "2",
      title: "SCBA Unit #12 - Annual Service",
      description: "Complete annual maintenance and certification",
      priority: "medium",
      status: "pending",
      assignedTo: "Sarah Davis",
      createdDate: "2024-01-16",
      dueDate: "2024-01-25",
      estimatedCost: 125.00,
      equipment: "SCBA Unit #12"
    },
    {
      id: "3",
      title: "Ladder 1 - Light Bar Replacement",
      description: "Replace damaged emergency light bar",
      priority: "medium",
      status: "completed",
      assignedTo: "Tom Wilson",
      createdDate: "2024-01-10",
      dueDate: "2024-01-15",
      estimatedCost: 275.00,
      actualCost: 280.00,
      apparatus: "Ladder 1"
    }
  ]);

  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-600";
      case "high": return "bg-orange-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-gray-500";
      case "in-progress": return "bg-blue-500";
      case "review": return "bg-purple-500";
      case "completed": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getWorkOrdersByStatus = (status: string) => {
    return workOrders.filter(wo => wo.status === status);
  };

  const moveWorkOrder = (id: string, newStatus: string) => {
    setWorkOrders(prev => prev.map(wo => 
      wo.id === id ? { ...wo, status: newStatus as any } : wo
    ));
  };

  const WorkOrderCard = ({ workOrder }: { workOrder: WorkOrder }) => (
    <Card className="bg-slate-700/50 border-slate-600 mb-3">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h4 className="text-white font-medium text-sm">{workOrder.title}</h4>
            <Badge className={`${getPriorityColor(workOrder.priority)} text-white text-xs`}>
              {workOrder.priority}
            </Badge>
          </div>
          
          <p className="text-slate-300 text-xs">{workOrder.description}</p>
          
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1 text-slate-400">
              <User className="h-3 w-3" />
              {workOrder.assignedTo}
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              <Clock className="h-3 w-3" />
              {workOrder.dueDate}
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              <DollarSign className="h-3 w-3" />
              ${workOrder.estimatedCost}
            </div>
          </div>
          
          {workOrder.apparatus && (
            <Badge variant="outline" className="text-xs">
              {workOrder.apparatus}
            </Badge>
          )}
          {workOrder.equipment && (
            <Badge variant="outline" className="text-xs">
              {workOrder.equipment}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Work Order Board</h2>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Work Order
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">Create New Work Order</DialogTitle>
              <DialogDescription>Generate a new maintenance work order</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="wo-title" className="text-white">Title</Label>
                <Input 
                  id="wo-title" 
                  placeholder="Brief description of the work needed"
                  className="bg-slate-700 border-slate-600 text-white" 
                />
              </div>
              
              <div>
                <Label htmlFor="wo-description" className="text-white">Description</Label>
                <Textarea 
                  id="wo-description"
                  placeholder="Detailed description of the issue and required work"
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="wo-priority" className="text-white">Priority</Label>
                  <Select>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="wo-assigned" className="text-white">Assigned To</Label>
                  <Select>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Select technician" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="mike">Mike Johnson</SelectItem>
                      <SelectItem value="sarah">Sarah Davis</SelectItem>
                      <SelectItem value="tom">Tom Wilson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="wo-apparatus" className="text-white">Apparatus (Optional)</Label>
                  <Input 
                    id="wo-apparatus" 
                    placeholder="Engine 1, Ladder 2, etc."
                    className="bg-slate-700 border-slate-600 text-white" 
                  />
                </div>
                
                <div>
                  <Label htmlFor="wo-cost" className="text-white">Estimated Cost</Label>
                  <Input 
                    id="wo-cost" 
                    type="number"
                    placeholder="0.00"
                    className="bg-slate-700 border-slate-600 text-white" 
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="wo-due" className="text-white">Due Date</Label>
                <Input 
                  id="wo-due" 
                  type="date"
                  className="bg-slate-700 border-slate-600 text-white" 
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
              <Button className="bg-red-600 hover:bg-red-700">Create Work Order</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              Pending
              <Badge variant="secondary" className="ml-auto">
                {getWorkOrdersByStatus("pending").length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {getWorkOrdersByStatus("pending").map(wo => (
              <WorkOrderCard key={wo.id} workOrder={wo} />
            ))}
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              In Progress
              <Badge variant="secondary" className="ml-auto">
                {getWorkOrdersByStatus("in-progress").length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {getWorkOrdersByStatus("in-progress").map(wo => (
              <WorkOrderCard key={wo.id} workOrder={wo} />
            ))}
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              Review
              <Badge variant="secondary" className="ml-auto">
                {getWorkOrdersByStatus("review").length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {getWorkOrdersByStatus("review").map(wo => (
              <WorkOrderCard key={wo.id} workOrder={wo} />
            ))}
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              Completed
              <Badge variant="secondary" className="ml-auto">
                {getWorkOrdersByStatus("completed").length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {getWorkOrdersByStatus("completed").map(wo => (
              <WorkOrderCard key={wo.id} workOrder={wo} />
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Cost Tracking Summary */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Cost Tracking Summary
          </CardTitle>
          <CardDescription>Monthly maintenance spending overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">$1,245</p>
              <p className="text-slate-400 text-sm">This Month</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">$850</p>
              <p className="text-slate-400 text-sm">Pending Orders</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">$14,680</p>
              <p className="text-slate-400 text-sm">YTD Total</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">-15%</p>
              <p className="text-slate-400 text-sm">vs Last Year</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
