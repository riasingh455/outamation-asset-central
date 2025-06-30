
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HardwareFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
}

const componentTypes = [
  "laptop", "desktop", "server", "monitor", "phone", "tablet", 
  "router", "switch", "printer", "scanner", "other"
];

const currencies = ["USD", "INR"];

export const HardwareForm = ({ initialData, onSubmit }: HardwareFormProps) => {
  const [formData, setFormData] = useState({
    deviceName: initialData?.deviceName || "",
    componentType: initialData?.componentType || "",
    serialNumber: initialData?.serialNumber || "",
    assetId: initialData?.assetId || "",
    assignedUser: initialData?.assignedUser || "",
    assignedLocation: initialData?.assignedLocation || "",
    assignmentStatus: initialData?.assignmentStatus || "available",
    startDate: initialData?.startDate || "",
    endDate: initialData?.endDate || "",
    vendorName: initialData?.vendorName || "",
    invoiceNumber: initialData?.invoiceNumber || "",
    purchaseCurrency: initialData?.purchaseCurrency || "USD",
    purchaseAmount: initialData?.purchaseAmount || "",
    purchaseDate: initialData?.purchaseDate || "",
    notes: initialData?.notes || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, id: initialData?.id });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="deviceName">Device Name *</Label>
          <Input
            id="deviceName"
            value={formData.deviceName}
            onChange={(e) => handleChange("deviceName", e.target.value)}
            placeholder="e.g., MacBook Pro 16 inch M2"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="componentType">Component Type *</Label>
          <Select value={formData.componentType} onValueChange={(value) => handleChange("componentType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select component type" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {componentTypes.map(type => (
                <SelectItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="serialNumber">Serial Number *</Label>
          <Input
            id="serialNumber"
            value={formData.serialNumber}
            onChange={(e) => handleChange("serialNumber", e.target.value)}
            placeholder="Manufacturer serial number"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="assetId">Asset/Device ID *</Label>
          <Input
            id="assetId"
            value={formData.assetId}
            onChange={(e) => handleChange("assetId", e.target.value)}
            placeholder="e.g., OUTM-LP-001"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="assignedUser">Assigned User</Label>
          <Input
            id="assignedUser"
            value={formData.assignedUser}
            onChange={(e) => handleChange("assignedUser", e.target.value)}
            placeholder="Employee name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="assignmentStatus">Assignment Status *</Label>
          <Select value={formData.assignmentStatus} onValueChange={(value) => handleChange("assignmentStatus", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="assigned">Assigned</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="under_repair">Under Repair</SelectItem>
              <SelectItem value="scrapped">Scrapped</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="assignedLocation">Assigned Location *</Label>
          <Input
            id="assignedLocation"
            value={formData.assignedLocation}
            onChange={(e) => handleChange("assignedLocation", e.target.value)}
            placeholder="e.g., San Francisco Office - Floor 2, Desk 23 or Server Room Rack A3"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date of Use</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => handleChange("startDate", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate">End/Termination Date</Label>
          <Input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) => handleChange("endDate", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="vendorName">Vendor Name *</Label>
          <Input
            id="vendorName"
            value={formData.vendorName}
            onChange={(e) => handleChange("vendorName", e.target.value)}
            placeholder="e.g., Apple Inc., Dell Technologies"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="invoiceNumber">Invoice Number *</Label>
          <Input
            id="invoiceNumber"
            value={formData.invoiceNumber}
            onChange={(e) => handleChange("invoiceNumber", e.target.value)}
            placeholder="e.g., INV-2023-001"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="purchaseCurrency">Purchase Currency *</Label>
          <Select value={formData.purchaseCurrency} onValueChange={(value) => handleChange("purchaseCurrency", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {currencies.map(curr => (
                <SelectItem key={curr} value={curr}>{curr}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="purchaseAmount">Purchase Amount *</Label>
          <Input
            id="purchaseAmount"
            type="number"
            step="0.01"
            value={formData.purchaseAmount}
            onChange={(e) => handleChange("purchaseAmount", e.target.value)}
            placeholder="0.00"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="purchaseDate">Purchase Date *</Label>
          <Input
            id="purchaseDate"
            type="date"
            value={formData.purchaseDate}
            onChange={(e) => handleChange("purchaseDate", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            placeholder="Additional information, specifications, etc."
            rows={3}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit">
          {initialData ? "Update Hardware" : "Add Hardware"}
        </Button>
      </div>
    </form>
  );
};
