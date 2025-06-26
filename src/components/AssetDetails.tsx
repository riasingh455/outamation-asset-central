
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  MapPin,
  User,
  Package,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";

interface AssetDetailsProps {
  asset: any;
}

const statusColors = {
  in_use: { bg: "bg-green-100", text: "text-green-800", icon: CheckCircle },
  in_storage: { bg: "bg-gray-100", text: "text-gray-800", icon: Package },
  under_repair: { bg: "bg-yellow-100", text: "text-yellow-800", icon: AlertTriangle },
  retired: { bg: "bg-red-100", text: "text-red-800", icon: Clock },
};

const conditionColors = {
  good: { bg: "bg-green-100", text: "text-green-800" },
  needs_service: { bg: "bg-yellow-100", text: "text-yellow-800" },
  damaged: { bg: "bg-red-100", text: "text-red-800" },
};

export const AssetDetails = ({ asset }: AssetDetailsProps) => {
  const statusInfo = statusColors[asset.status as keyof typeof statusColors];
  const StatusIcon = statusInfo.icon;

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString();
  };

  const isWarrantyExpiring = () => {
    if (!asset.warrantyExpiration) return false;
    const expirationDate = new Date(asset.warrantyExpiration);
    const today = new Date();
    const thirtyDaysFromNow = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000));
    return expirationDate <= thirtyDaysFromNow && expirationDate >= today;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{asset.name}</h2>
          <p className="text-gray-500 mt-1">Asset ID: {asset.id}</p>
        </div>
        <div className="flex items-center space-x-2">
          <StatusIcon className="h-5 w-5 text-gray-600" />
          <Badge className={`${statusInfo.bg} ${statusInfo.text}`}>
            {asset.status.replace('_', ' ')}
          </Badge>
        </div>
      </div>

      <Separator />

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Package className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Asset Type</p>
                <p className="text-sm text-gray-600 capitalize">{asset.type}</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-900">Serial Number</p>
              <p className="text-sm text-gray-600">{asset.serialNumber || "Not specified"}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-900">Condition</p>
              <Badge className={conditionColors[asset.condition as keyof typeof conditionColors].bg + " " + conditionColors[asset.condition as keyof typeof conditionColors].text}>
                {asset.condition.replace('_', ' ')}
              </Badge>
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
                <p className="text-sm font-medium text-gray-900">Assigned To</p>
                <p className="text-sm text-gray-600">{asset.assignedTo || "Unassigned"}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Location</p>
                <p className="text-sm text-gray-600">{asset.location || "Not specified"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dates and Warranty */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Important Dates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Purchase Date</p>
                <p className="text-sm text-gray-600">{formatDate(asset.purchaseDate)}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Warranty Expiration</p>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-gray-600">{formatDate(asset.warrantyExpiration)}</p>
                  {isWarrantyExpiring() && (
                    <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                      Expiring Soon
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      {asset.notes && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Notes & Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">{asset.notes}</p>
          </CardContent>
        </Card>
      )}

      {/* Action History (Mock) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Asset updated</p>
                <p className="text-xs text-gray-500">Status changed to {asset.status.replace('_', ' ')} • 2 days ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Asset assigned</p>
                <p className="text-xs text-gray-500">Assigned to {asset.assignedTo} • 1 week ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Asset registered</p>
                <p className="text-xs text-gray-500">Added to inventory • {formatDate(asset.purchaseDate)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
