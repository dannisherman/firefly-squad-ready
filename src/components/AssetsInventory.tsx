
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApparatusManager } from "./ApparatusManager";
import { EquipmentManager } from "./EquipmentManager";
import { InventoryManager } from "./InventoryManager";
import { WorkOrderBoard } from "./WorkOrderBoard";
import { MedicationManager } from "./MedicationManager";
import { Truck, Wrench, Package, ClipboardList, Pill } from "lucide-react";

export const AssetsInventory = () => {
  const [activeTab, setActiveTab] = useState("apparatus");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Assets & Inventory</h1>
          <p className="text-slate-400">Manage your Fire & EMS fleet, equipment, and inventory</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-slate-800">
          <TabsTrigger value="apparatus" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Apparatus
          </TabsTrigger>
          <TabsTrigger value="equipment" className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            Equipment
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Inventory
          </TabsTrigger>
          <TabsTrigger value="work-orders" className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4" />
            Work Orders
          </TabsTrigger>
          <TabsTrigger value="medications" className="flex items-center gap-2">
            <Pill className="h-4 w-4" />
            Medications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="apparatus">
          <ApparatusManager />
        </TabsContent>

        <TabsContent value="equipment">
          <EquipmentManager />
        </TabsContent>

        <TabsContent value="inventory">
          <InventoryManager />
        </TabsContent>

        <TabsContent value="work-orders">
          <WorkOrderBoard />
        </TabsContent>

        <TabsContent value="medications">
          <MedicationManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};
