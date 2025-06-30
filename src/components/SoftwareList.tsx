
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Search, Edit, Trash2, Eye, AlertTriangle } from "lucide-react";
import { SoftwareForm } from "./SoftwareForm";

interface SoftwareListProps {
  currentUser: any;
  currency: string;
  setCurrency: (currency: string) => void;
}

// Mock software data
const mockSoftware = [
  {
    id: "SW-001",
    softwareName: "Adobe Creative Suite",
    licenseType: "single-user",
    assignedUsers: ["Sarah Johnson"],
    startDate: "2023-08-01",
    endDate: "2024-08-01",
    renewalTerm: "annual",
    vendorName: "Adobe Inc.",
    invoiceNumber: "INV-2023-050",
    paymentAmount: 599.88,
    paymentCurrency: "USD",
    status: "active",
    department: "Marketing"
  },
  {
    id: "SW-002",
    softwareName: "Microsoft Office 365 Business",
    licenseType: "multi-user",
    assignedUsers: ["Mike Chen", "Jessica Wong", "David Kumar"],
    startDate: "2023-01-01",
    endDate: "2024-01-01",
    renewalTerm: "annual",
    vendorName: "Microsoft Corporation",
    invoiceNumber: "INV-2023-005",
    paymentAmount: 45000,
    paymentCurrency: "INR",
    status: "active",
    department: "IT"
  },
  {
    id: "SW-003",
    softwareName: "Slack Pro",
    licenseType: "floating",
    assignedUsers: ["All Employees"],
    startDate: "2023-06-01",
    endDate: "2024-06-01",
    renewalTerm: "annual",
    vendorName: "Slack Technologies",
    invoiceNumber: "INV-2023-089",
    paymentAmount: 1200,
    paymentCurrency: "USD",
    status: "expiring_soon",
    department: "Company-wide"
  }
];

const statusColors = {
  active: "bg-green-100 text-green-800",
  expired: "bg-red-100 text-red-800",
  expiring_soon: "bg-yellow-100 text-yellow-800",
  cancelled: "bg-gray-100 text-gray-800",
};

const licenseTypes = ["single-user", "multi-user", "floating", "site-license"];
const renewalTerms = ["monthly", "quarterly", "annual", "perpetual"];

export const SoftwareList = ({ currentUser, currency }: SoftwareListProps) => {
  const [software, setSoftware] = useState(mockSoftware);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [selectedSoftware, setSelectedSoftware] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const filteredSoftware = software.filter((item) => {
    const matchesSearch = item.softwareName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.assignedUsers.some(user => user.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesDepartment = departmentFilter === "all" || item.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const handleAddSoftware = (newSoftware: any) => {
    setSoftware([...software, { ...newSoftware, id: `SW-${Date.now()}` }]);
    setIsAddDialogOpen(false);
  };

  const handleEditSoftware = (updatedSoftware: any) => {
    setSoftware(software.map(item => 
      item.id === updatedSoftware.id ? updatedSoftware : item
    ));
    setIsEditDialogOpen(false);
    setSelectedSoftware(null);
  };

  const canEdit = currentUser.role === "admin" || currentUser.role === "it_manager";

  const formatCurrency = (amount: number, curr: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: curr,
    }).format(amount);
  };

  const isExpiringSoon = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000));
    return end <= thirtyDaysFromNow && end >= now;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Software & Licenses</h1>
          <p className="text-gray-500 mt-1">Track and manage software subscriptions and licenses</p>
        </div>
        {canEdit && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Software
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl bg-white">
              <DialogHeader>
                <DialogTitle>Add New Software License</DialogTitle>
                <DialogDescription>
                  Register a new software license or subscription
                </DialogDescription>
              </DialogHeader>
              <SoftwareForm onSubmit={handleAddSoftware} />
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Licenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {software.filter(s => s.status === "active").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {software.filter(s => s.status === "expiring_soon").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Annual Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${software.reduce((total, s) => {
                if (s.paymentCurrency === "USD") return total + s.paymentAmount;
                return total + (s.paymentAmount * 0.012); // Mock conversion rate
              }, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Vendors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(software.map(s => s.vendorName)).size}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by software name, vendor, or assigned user..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expiring_soon">Expiring Soon</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="IT">IT</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
                <SelectItem value="Company-wide">Company-wide</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Software Table */}
      <Card>
        <CardHeader>
          <CardTitle>Software & Subscriptions ({filteredSoftware.length})</CardTitle>
          <CardDescription>
            Manage your company's software licenses and subscriptions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Software Name</TableHead>
                <TableHead>License Type</TableHead>
                <TableHead>Assigned Users</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Renewal Date</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSoftware.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{item.softwareName}</p>
                      <p className="text-sm text-gray-500">{item.vendorName}</p>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">{item.licenseType.replace('-', ' ')}</TableCell>
                  <TableCell>
                    <div className="max-w-32">
                      {item.assignedUsers.length <= 2 ? (
                        item.assignedUsers.join(", ")
                      ) : (
                        `${item.assignedUsers.slice(0, 2).join(", ")} +${item.assignedUsers.length - 2} more`
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[item.status as keyof typeof statusColors]}>
                      {item.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(item.endDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {formatCurrency(item.paymentAmount, item.paymentCurrency)}
                    <p className="text-xs text-gray-500 capitalize">{item.renewalTerm}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          // View details functionality
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {canEdit && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedSoftware(item);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSoftware(software.map(s => 
                                s.id === item.id ? { ...s, status: "cancelled" } : s
                              ));
                            }}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl bg-white">
          <DialogHeader>
            <DialogTitle>Edit Software License</DialogTitle>
            <DialogDescription>
              Update software license information
            </DialogDescription>
          </DialogHeader>
          {selectedSoftware && (
            <SoftwareForm 
              initialData={selectedSoftware}
              onSubmit={handleEditSoftware}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
