
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
} from "recharts";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Download,
  AlertTriangle,
} from "lucide-react";
import { useState } from "react";

interface BudgetTrackingProps {
  currentUser: any;
  currency: string;
  setCurrency: (currency: string) => void;
}

// Mock budget data
const budgetData = [
  {
    category: "Hardware",
    budgetUSD: 50000,
    budgetINR: 4000000,
    spentUSD: 42500,
    spentINR: 3400000,
    remaining: "15%",
    status: "on_track"
  },
  {
    category: "Software",
    budgetUSD: 25000,
    budgetINR: 2000000,
    spentUSD: 28500,
    spentINR: 2280000,
    remaining: "-14%",
    status: "over_budget"
  },
  {
    category: "Services",
    budgetUSD: 15000,
    budgetINR: 1200000,
    spentUSD: 8900,
    spentINR: 712000,
    remaining: "41%",
    status: "under_budget"
  }
];

const monthlySpendData = [
  { month: "Jan", hardware: 8500, software: 3200, services: 1200 },
  { month: "Feb", hardware: 6200, software: 2800, services: 900 },
  { month: "Mar", hardware: 12000, software: 4500, services: 1800 },
  { month: "Apr", hardware: 9800, software: 3800, services: 1500 },
  { month: "May", hardware: 5900, software: 6200, services: 2100 },
  { month: "Jun", hardware: 0, software: 8000, services: 1400 },
];

const categoryDistribution = [
  { name: "Hardware", value: 42500, color: "#3b82f6" },
  { name: "Software", value: 28500, color: "#10b981" },
  { name: "Services", value: 8900, color: "#8b5cf6" },
];

const statusColors = {
  on_track: "bg-green-100 text-green-800",
  over_budget: "bg-red-100 text-red-800",
  under_budget: "bg-blue-100 text-blue-800",
};

export const BudgetTracking = ({ currentUser, currency, setCurrency }: BudgetTrackingProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState("2024");
  const [selectedQuarter, setSelectedQuarter] = useState("Q2");

  const formatCurrency = (amount: number, curr: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: curr,
    }).format(amount);
  };

  const getCurrentBudget = (item: any) => {
    return currency === "USD" ? item.budgetUSD : item.budgetINR;
  };

  const getCurrentSpent = (item: any) => {
    return currency === "USD" ? item.spentUSD : item.spentINR;
  };

  const totalBudget = budgetData.reduce((sum, item) => sum + getCurrentBudget(item), 0);
  const totalSpent = budgetData.reduce((sum, item) => sum + getCurrentSpent(item), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Budget Tracking</h1>
          <p className="text-gray-500 mt-1">Monitor spending and budget allocation</p>
        </div>
        <div className="flex space-x-4">
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="INR">INR</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalBudget, currency)}
            </div>
            <p className="text-xs text-muted-foreground">Annual allocation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalSpent, currency)}
            </div>
            <p className="text-xs text-muted-foreground">
              {((totalSpent / totalBudget) * 100).toFixed(1)}% of budget
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining Budget</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalBudget - totalSpent, currency)}
            </div>
            <p className="text-xs text-muted-foreground">
              {(((totalBudget - totalSpent) / totalBudget) * 100).toFixed(1)}% remaining
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Variance</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(3500, currency)}
            </div>
            <p className="text-xs text-muted-foreground">Over budget (Software)</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Budget Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedQuarter} onValueChange={setSelectedQuarter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Quarter" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="Q1">Q1</SelectItem>
                <SelectItem value="Q2">Q2</SelectItem>
                <SelectItem value="Q3">Q3</SelectItem>
                <SelectItem value="Q4">Q4</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Spending Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Spending Trend</CardTitle>
            <CardDescription>Spending by category over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlySpendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(Number(value), currency)} />
                <Bar dataKey="hardware" fill="#3b82f6" name="Hardware" />
                <Bar dataKey="software" fill="#10b981" name="Software" />
                <Bar dataKey="services" fill="#8b5cf6" name="Services" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Spending Distribution</CardTitle>
            <CardDescription>Current year spending by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value), currency)} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Budget vs Actual Table */}
      <Card>
        <CardHeader>
          <CardTitle>Budget vs Actual Spending</CardTitle>
          <CardDescription>Detailed breakdown by category</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Spent</TableHead>
                <TableHead>Remaining</TableHead>
                <TableHead>Variance</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {budgetData.map((item) => {
                const budget = getCurrentBudget(item);
                const spent = getCurrentSpent(item);
                const remaining = budget - spent;
                const variance = ((spent - budget) / budget) * 100;
                
                return (
                  <TableRow key={item.category}>
                    <TableCell className="font-medium">{item.category}</TableCell>
                    <TableCell>{formatCurrency(budget, currency)}</TableCell>
                    <TableCell>{formatCurrency(spent, currency)}</TableCell>
                    <TableCell>{formatCurrency(remaining, currency)}</TableCell>
                    <TableCell className={variance > 0 ? "text-red-600" : "text-green-600"}>
                      {variance > 0 ? "+" : ""}{variance.toFixed(1)}%
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[item.status as keyof typeof statusColors]}>
                        {item.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Vendor Spending */}
      <Card>
        <CardHeader>
          <CardTitle>Top Vendors by Spending</CardTitle>
          <CardDescription>Largest expenses by vendor</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Apple Inc.</p>
                <p className="text-sm text-gray-600">Hardware purchases</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{formatCurrency(15000, currency)}</p>
                <p className="text-sm text-gray-600">18.8% of total</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Microsoft Corporation</p>
                <p className="text-sm text-gray-600">Software licenses</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{formatCurrency(12000, currency)}</p>
                <p className="text-sm text-gray-600">15.0% of total</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Adobe Inc.</p>
                <p className="text-sm text-gray-600">Creative software</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{formatCurrency(8500, currency)}</p>
                <p className="text-sm text-gray-600">10.6% of total</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
