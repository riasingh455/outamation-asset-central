
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

interface SoftwareFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
}

const licenseTypes = ["single-user", "multi-user", "floating", "site-license"];
const renewalTerms = ["monthly", "quarterly", "annual", "perpetual"];
const currencies = ["USD", "INR"];
const departments = ["IT", "Marketing", "Sales", "HR", "Finance", "Operations", "Company-wide"];

export const SoftwareForm = ({ initialData, onSubmit }: SoftwareFormProps) => {
  const [formData, setFormData] = useState({
    softwareName: initialData?.softwareName || "",
    licenseType: initialData?.licenseType || "",
    assignedUsers: initialData?.assignedUsers?.join(", ") || "",
    startDate: initialData?.startDate || "",
    endDate: initialData?.endDate || "",
    renewalTerm: initialData?.renewalTerm || "",
    vendorName: initialData?.vendorName || "",
    invoiceNumber: initialData?.invoiceNumber || "",
    paymentAmount: initialData?.paymentAmount || "",
    paymentCurrency: initialData?.paymentCurrency || "USD",
    status: initialData?.status || "active",
    department: initialData?.department || "",
    notes: initialData?.notes || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const processedData = {
      ...formData,
      assignedUsers: formData.assignedUsers.split(",").map(user => user.trim()).filter(user => user),
      id: initialData?.id
    };
    onSubmit(processedData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="softwareName">Software Name *</Label>
          <Input
            id="softwareName"
            value={formData.softwareName}
            onChange={(e) => handleChange("softwareName", e.target.value)}
            placeholder="e.g., Adobe Creative Suite"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="licenseType">License Type *</Label>
          <Select value={formData.licenseType} onValueChange={(value) => handleChange("licenseType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select license type" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {licenseTypes.map(type => (
                <SelectItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="assignedUsers">Assigned Users</Label>
          <Textarea
            id="assignedUsers"
            value={formData.assignedUsers}
            onChange={(e) => handleChange("assignedUsers", e.target.value)}
            placeholder="Enter user names separated by commas (e.g., John Doe, Jane Smith)"
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date *</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => handleChange("startDate", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate">End Date *</Label>
          <Input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) => handleChange("endDate", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="renewalTerm">Renewal Term *</Label>
          <Select value={formData.renewalTerm} onValueChange={(value) => handleChange("renewalTerm", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select renewal term" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {renewalTerms.map(term => (
                <SelectItem key={term} value={term}>
                  {term.charAt(0).toUpperCase() + term.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="department">Department *</Label>
          <Select value={formData.department} onValueChange={(value) => handleChange("department", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {departments.map(dept => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="vendorName">Vendor Name *</Label>
          <Input
            id="vendorName"
            value={formData.vendorName}
            onChange={(e) => handleChange("vendorName", e.target.value)}
            placeholder="e.g., Adobe Inc., Microsoft Corporation"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="invoiceNumber">Invoice Number *</Label>
          <Input
            id="invoiceNumber"
            value={formData.invoiceNumber}
            onChange={(e) => handleChange("invoiceNumber", e.target.value)}
            placeholder="e.g., INV-2023-050"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="paymentCurrency">Payment Currency *</Label>
          <Select value={formData.paymentCurrency} onValueChange={(value) => handleChange("paymentCurrency", value)}>
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
          <Label htmlFor="paymentAmount">Payment Amount *</Label>
          <Input
            id="paymentAmount"
            type="number"
            step="0.01"
            value={formData.paymentAmount}
            onChange={(e) => handleChange("paymentAmount", e.target.value)}
            placeholder="0.00"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status *</Label>
          <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="expiring_soon">Expiring Soon</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            placeholder="Additional information about the software license"
            rows={3}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit">
          {initialData ? "Update Software" : "Add Software"}
        </Button>
      </div>
    </form>
  );
};
