
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
import { Card, CardContent } from "@/components/ui/card";

interface AssetFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
}

export const AssetForm = ({ initialData, onSubmit }: AssetFormProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    type: initialData?.type || "",
    serialNumber: initialData?.serialNumber || "",
    assignedTo: initialData?.assignedTo || "",
    status: initialData?.status || "in_storage",
    location: initialData?.location || "",
    purchaseDate: initialData?.purchaseDate || "",
    warrantyExpiration: initialData?.warrantyExpiration || "",
    condition: initialData?.condition || "good",
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
          <Label htmlFor="name">Asset Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="e.g., MacBook Pro 16\""
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Asset Type *</Label>
          <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="laptop">Laptop</SelectItem>
              <SelectItem value="phone">Phone</SelectItem>
              <SelectItem value="monitor">Monitor</SelectItem>
              <SelectItem value="software">Software License</SelectItem>
              <SelectItem value="printer">Printer</SelectItem>
              <SelectItem value="tablet">Tablet</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="serialNumber">Serial Number / Asset ID</Label>
          <Input
            id="serialNumber"
            value={formData.serialNumber}
            onChange={(e) => handleChange("serialNumber", e.target.value)}
            placeholder="Serial number or unique identifier"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="assignedTo">Assigned To</Label>
          <Input
            id="assignedTo"
            value={formData.assignedTo}
            onChange={(e) => handleChange("assignedTo", e.target.value)}
            placeholder="Employee name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status *</Label>
          <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="in_use">In Use</SelectItem>
              <SelectItem value="in_storage">In Storage</SelectItem>
              <SelectItem value="under_repair">Under Repair</SelectItem>
              <SelectItem value="retired">Retired</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="condition">Condition *</Label>
          <Select value={formData.condition} onValueChange={(value) => handleChange("condition", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select condition" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="good">Good</SelectItem>
              <SelectItem value="needs_service">Needs Service</SelectItem>
              <SelectItem value="damaged">Damaged</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="Office, building, room number"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="purchaseDate">Purchase Date</Label>
          <Input
            id="purchaseDate"
            type="date"
            value={formData.purchaseDate}
            onChange={(e) => handleChange("purchaseDate", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="warrantyExpiration">Warranty Expiration</Label>
          <Input
            id="warrantyExpiration"
            type="date"
            value={formData.warrantyExpiration}
            onChange={(e) => handleChange("warrantyExpiration", e.target.value)}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            placeholder="Additional information, model details, etc."
            rows={3}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit">
          {initialData ? "Update Asset" : "Add Asset"}
        </Button>
      </div>
    </form>
  );
};
