
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  FileText,
  Download,
  TrendingUp,
  Package,
  AlertTriangle,
  Calendar,
} from "lucide-react";
import { useState } from "react";

interface ReportsProps {
  currentUser: any;
}

// Mock data for charts
const assetTypeData = [
  { name: "Laptops", value: 98, color: "#3b82f6" },
  { name: "Phones", value: 67, color: "#10b981" },
  { name: "Monitors", value: 54, color: "#8b5cf6" },
  { name: "Other", value: 28, color: "#f59e0b" },
];

const monthlyData = [
  { month: "Jan", acquired: 12, retired: 3 },
  { month: "Feb", acquired: 15, retired: 5 },
  { month: "Mar", acquired: 8, retired: 2 },
  { month: "Apr", acquired: 23, retired: 8 },
  { month: "May", acquired: 18, retired: 4 },
  { month: "Jun", acquired: 21, retired: 6 },
];

const departmentData = [
  { department: "IT", assets: 45 },
  { department: "Sales", assets: 38 },
  { department: "Marketing", assets: 32 },
  { department: "HR", assets: 18 },
  { department: "Finance", assets: 24 },
  { department: "Operations", assets: 28 },
];

const COLORS = ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b"];

export const Reports = ({ currentUser }: ReportsProps) => {
  const [reportType, setReportType] = useState("overview");
  const [dateRange, setDateRange] = useState("30days");

  const exportReport = (format: string) => {
    // Mock export functionality
    console.log(`Exporting ${reportType} report in ${format} format for ${dateRange}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-500 mt-1">Asset insights and performance metrics</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => exportReport("csv")}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" onClick={() => exportReport("pdf")}>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Report Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Report Type</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="overview">Asset Overview</SelectItem>
                  <SelectItem value="utilization">Utilization Report</SelectItem>
                  <SelectItem value="maintenance">Maintenance Schedule</SelectItem>
                  <SelectItem value="financial">Financial Summary</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Date Range</label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                  <SelectItem value="1year">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Asset Utilization</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76.5%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.1%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$284,500</div>
            <p className="text-xs text-muted-foreground">
              Current asset portfolio value
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance Due</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              Assets requiring attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Asset Age</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18 mo</div>
            <p className="text-xs text-muted-foreground">
              Average across all assets
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Asset Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Asset Distribution by Type</CardTitle>
            <CardDescription>Current inventory breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={assetTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {assetTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Acquisition/Retirement */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Asset Activity</CardTitle>
            <CardDescription>Asset acquisitions vs retirements</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="acquired" fill="#3b82f6" name="Acquired" />
                <Bar dataKey="retired" fill="#ef4444" name="Retired" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Assets by Department</CardTitle>
            <CardDescription>Asset allocation across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="department" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="assets" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Upcoming Warranty Expirations */}
        <Card>
          <CardHeader>
            <CardTitle>Warranty Status Overview</CardTitle>
            <CardDescription>Assets with upcoming warranty expirations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <p className="font-medium text-red-900">Expired</p>
                  <p className="text-sm text-red-600">5 assets</p>
                </div>
                <Badge className="bg-red-100 text-red-800">Urgent</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-medium text-yellow-900">Expiring Soon</p>
                  <p className="text-sm text-yellow-600">12 assets (next 30 days)</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">Attention</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-blue-900">Expiring Later</p>
                  <p className="text-sm text-blue-600">34 assets (next 90 days)</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">Monitor</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-green-900">Valid Warranty</p>
                  <p className="text-sm text-green-600">196 assets</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Good</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Report Templates</CardTitle>
          <CardDescription>Pre-configured reports for common use cases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <FileText className="h-8 w-8 text-blue-600 mb-2" />
              <h3 className="font-medium mb-1">Monthly Asset Report</h3>
              <p className="text-sm text-gray-500">Complete overview of assets and their status</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <AlertTriangle className="h-8 w-8 text-yellow-600 mb-2" />
              <h3 className="font-medium mb-1">Maintenance Schedule</h3>
              <p className="text-sm text-gray-500">Upcoming maintenance and warranty expirations</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <TrendingUp className="h-8 w-8 text-green-600 mb-2" />
              <h3 className="font-medium mb-1">Utilization Analysis</h3>
              <p className="text-sm text-gray-500">Asset usage patterns and optimization opportunities</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
