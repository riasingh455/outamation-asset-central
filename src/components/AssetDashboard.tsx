
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Package,
  Laptop,
  Smartphone,
  Monitor,
  AlertTriangle,
  TrendingUp,
  Calendar,
  MapPin,
} from "lucide-react";

interface AssetDashboardProps {
  currentUser: any;
}

// Mock data - will be replaced with Supabase queries
const mockStats = {
  totalAssets: 247,
  activeAssets: 189,
  inRepair: 8,
  retired: 50,
  warrantyExpiring: 12,
};

const mockAssetTypes = [
  { type: "Laptops", count: 98, icon: Laptop, color: "bg-blue-500" },
  { type: "Phones", count: 67, icon: Smartphone, color: "bg-green-500" },
  { type: "Monitors", count: 54, icon: Monitor, color: "bg-purple-500" },
  { type: "Other", count: 28, icon: Package, color: "bg-orange-500" },
];

const mockRecentActivity = [
  { id: 1, action: "Asset assigned", asset: "MacBook Pro #LP-001", user: "Sarah Johnson", time: "2 hours ago" },
  { id: 2, action: "Status updated", asset: "iPhone 14 #PH-045", user: "Mike Chen", time: "4 hours ago" },
  { id: 3, action: "Warranty expires soon", asset: "Dell Monitor #MN-023", user: "System", time: "1 day ago" },
  { id: 4, action: "Asset returned", asset: "Surface Pro #LP-078", user: "Jessica Wong", time: "2 days ago" },
];

export const AssetDashboard = ({ currentUser }: AssetDashboardProps) => {
  const utilizationRate = Math.round((mockStats.activeAssets / mockStats.totalAssets) * 100);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {currentUser.name}!</h1>
        <p className="text-gray-500 mt-1">Here's an overview of your asset management system.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalAssets}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Assets</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.activeAssets}</div>
            <p className="text-xs text-muted-foreground">
              {utilizationRate}% utilization rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Repair</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.inRepair}</div>
            <p className="text-xs text-muted-foreground">
              3 scheduled for return
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warranty Expiring</CardTitle>
            <Calendar className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.warrantyExpiring}</div>
            <p className="text-xs text-muted-foreground">
              Within next 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Asset Types and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Asset Types */}
        <Card>
          <CardHeader>
            <CardTitle>Asset Distribution</CardTitle>
            <CardDescription>Breakdown by asset type</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockAssetTypes.map((type) => {
              const Icon = type.icon;
              const percentage = Math.round((type.count / mockStats.totalAssets) * 100);
              
              return (
                <div key={type.type} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg ${type.color} flex items-center justify-center`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{type.type}</p>
                      <p className="text-sm text-gray-500">{type.count} assets</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{percentage}%</p>
                    <Progress value={percentage} className="w-16 h-2" />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest asset management updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRecentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    <p className="text-sm text-gray-600">{activity.asset}</p>
                    <p className="text-xs text-gray-500">by {activity.user}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <Package className="h-8 w-8 text-blue-600 mb-2" />
              <h3 className="font-medium mb-1">Add New Asset</h3>
              <p className="text-sm text-gray-500">Register a new device or equipment</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <MapPin className="h-8 w-8 text-green-600 mb-2" />
              <h3 className="font-medium mb-1">Track Location</h3>
              <p className="text-sm text-gray-500">Update asset locations and assignments</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <Calendar className="h-8 w-8 text-purple-600 mb-2" />
              <h3 className="font-medium mb-1">Schedule Maintenance</h3>
              <p className="text-sm text-gray-500">Plan upcoming service and repairs</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
