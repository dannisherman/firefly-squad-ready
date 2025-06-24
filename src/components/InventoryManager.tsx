
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Plus, Package, ShoppingCart, AlertTriangle, Truck } from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  sku: string;
  currentStock: number;
  minLevel: number;
  maxLevel: number;
  unit: string;
  cost: number;
  supplier: string;
  lastOrdered: string;
}

interface Order {
  id: string;
  orderNumber: string;
  items: { name: string; quantity: number; cost: number }[];
  status: "pending" | "ordered" | "shipped" | "received";
  orderDate: string;
  expectedDate: string;
  total: number;
}

export const InventoryManager = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: "1",
      name: "Medical Gloves (Nitrile)",
      category: "Medical Supplies",
      sku: "MED-GLV-001",
      currentStock: 450,
      minLevel: 200,
      maxLevel: 1000,
      unit: "boxes",
      cost: 12.50,
      supplier: "MedSupply Co",
      lastOrdered: "2024-01-10"
    },
    {
      id: "2",
      name: "Fire Extinguisher Powder",
      category: "Fire Suppression",
      sku: "FRE-PWD-002",
      currentStock: 25,
      minLevel: 50,
      maxLevel: 200,
      unit: "lbs",
      cost: 45.00,
      supplier: "SafetyFirst Inc",
      lastOrdered: "2023-12-15"
    }
  ]);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      orderNumber: "PO-2024-001",
      items: [
        { name: "Medical Gloves (Nitrile)", quantity: 20, cost: 250.00 },
        { name: "Bandages", quantity: 50, cost: 125.00 }
      ],
      status: "shipped",
      orderDate: "2024-01-15",
      expectedDate: "2024-01-22",
      total: 375.00
    }
  ]);

  const getStockLevel = (item: InventoryItem) => {
    const percentage = (item.currentStock / item.maxLevel) * 100;
    if (item.currentStock <= item.minLevel) return "low";
    if (percentage > 80) return "high";
    return "normal";
  };

  const getStockColor = (level: string) => {
    switch (level) {
      case "low": return "text-red-400";
      case "high": return "text-green-400";
      default: return "text-yellow-400";
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500";
      case "ordered": return "bg-blue-500";
      case "shipped": return "bg-purple-500";
      case "received": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Inventory Management</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="border-slate-600">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Create Order
          </Button>
          <Button className="bg-red-600 hover:bg-red-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Package className="h-8 w-8 text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-white">247</p>
                <p className="text-slate-400 text-sm">Total Items</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-8 w-8 text-red-400" />
              <div>
                <p className="text-2xl font-bold text-white">8</p>
                <p className="text-slate-400 text-sm">Low Stock</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-8 w-8 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-white">3</p>
                <p className="text-slate-400 text-sm">Pending Orders</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Truck className="h-8 w-8 text-purple-400" />
              <div>
                <p className="text-2xl font-bold text-white">2</p>
                <p className="text-slate-400 text-sm">In Transit</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Current Inventory</CardTitle>
            <CardDescription>All inventory items and stock levels</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-slate-300">Item</TableHead>
                  <TableHead className="text-slate-300">Category</TableHead>
                  <TableHead className="text-slate-300">SKU</TableHead>
                  <TableHead className="text-slate-300">Stock Level</TableHead>
                  <TableHead className="text-slate-300">Unit Cost</TableHead>
                  <TableHead className="text-slate-300">Supplier</TableHead>
                  <TableHead className="text-slate-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventory.map((item) => {
                  const stockLevel = getStockLevel(item);
                  const stockPercentage = (item.currentStock / item.maxLevel) * 100;
                  
                  return (
                    <TableRow key={item.id} className="border-slate-700">
                      <TableCell className="text-white font-medium">{item.name}</TableCell>
                      <TableCell className="text-slate-300">{item.category}</TableCell>
                      <TableCell className="text-slate-300">{item.sku}</TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className={getStockColor(stockLevel)}>
                              {item.currentStock} {item.unit}
                            </span>
                            {stockLevel === "low" && (
                              <AlertTriangle className="h-4 w-4 text-red-400" />
                            )}
                          </div>
                          <Progress value={stockPercentage} className="w-20 h-2" />
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-300">${item.cost.toFixed(2)}</TableCell>
                      <TableCell className="text-slate-300">{item.supplier}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Package className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Order Tracking</CardTitle>
            <CardDescription>Manage purchase orders and deliveries</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-slate-300">Order #</TableHead>
                  <TableHead className="text-slate-300">Items</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-slate-300">Order Date</TableHead>
                  <TableHead className="text-slate-300">Expected</TableHead>
                  <TableHead className="text-slate-300">Total</TableHead>
                  <TableHead className="text-slate-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id} className="border-slate-700">
                    <TableCell className="text-white font-medium">{order.orderNumber}</TableCell>
                    <TableCell className="text-slate-300">{order.items.length} items</TableCell>
                    <TableCell>
                      <Badge className={`${getOrderStatusColor(order.status)} text-white`}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-300">{order.orderDate}</TableCell>
                    <TableCell className="text-slate-300">{order.expectedDate}</TableCell>
                    <TableCell className="text-slate-300">${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
