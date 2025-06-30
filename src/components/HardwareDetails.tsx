
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  User,
  Package,
  DollarSign,
  FileText,
  Download,
} from "lucide-react";

interface HardwareDetailsProps {
  hardware: any;
}

const statusColors = {
  assigned: { bg: "bg-green-100", text: "text-green-800" },
  available: { bg: "bg-blue-100", text: "text-blue-800" },
  under_repair: { bg: "bg-yellow-100", text: "text-yellow-800" },
  scrapped: { bg: "bg-red-100", text: "text-red-800" },
};

export const HardwareDetails = ({ hardware }: HardwareDetailsProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{hardware.deviceName}</h2>
          <p className="text-gray-500 mt-1">Asset ID: {hardware.assetId}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className={`${statusColors[hardware.assignmentStatus].bg} ${statusColors[hardware.assignmentStatus].text}`}>
            {hardware.assignmentStatus.replace('_', ' ')}
          </Badge>
        </div>
      </div>

      <Separator />

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Device Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Package className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Component Type</p>
                <p className="text-sm text-gray-600 capitalize">{hardware.componentType}</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-900">Serial Number</p>
              <p className="text-sm text-gray-600">{hardware.serialNumber}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-900">Vendor Name</p>
              <p className="text-sm text-gray-600">{hardware.vendorName}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Assignment & Location</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Assigned User</p>
                <p className="text-sm text-gray-600">{hardware.assignedUser || "Unassigned"}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Location</p>
                <p className="text-sm text-gray-600">{hardware.assignedLocation}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assignment Dates */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Assignment Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Start Date</p>
                <p className="text-sm text-gray-600">{formatDate(hardware.startDate)}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">End Date</p>
                <p className="text-sm text-gray-600">{formatDate(hardware.endDate)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Purchase Date</p>
                <p className="text-sm text-gray-600">{formatDate(hardware.purchaseDate)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Financial Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <DollarSign className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Purchase Amount</p>
                <p className="text-sm text-gray-600">
                  {formatCurrency(hardware.purchaseAmount, hardware.purchaseCurrency)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Invoice Number</p>
                <p className="text-sm text-gray-600">{hardware.invoiceNumber}</p>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download Invoice
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      {hardware.notes && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Notes & Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">{hardware.notes}</p>
          </CardContent>
        </Card>
      )}

      {/* Assignment History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Assignment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Assigned to {hardware.assignedUser}</p>
                <p className="text-xs text-gray-500">
                  {formatDate(hardware.startDate)} • Location: {hardware.assignedLocation}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Device registered</p>
                <p className="text-xs text-gray-500">
                  {formatDate(hardware.purchaseDate)} • Purchased from {hardware.vendorName}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
