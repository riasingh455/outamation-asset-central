
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
import { Plus, Search, Edit, Trash2, Eye, Download } from "lucide-react";
import { HardwareForm } from "./HardwareForm";
import { HardwareDetails } from "./HardwareDetails";

interface HardwareListProps {
  currentUser: any;
  currency: string;
  setCurrency: (currency: string) => void;
}

// Mock hardware data
const mockHardware = [
  {
    id: "HW-001",
    deviceName: "MacBook Pro 16\" M2",
    componentType: "laptop",
    serialNumber: "C02ZD0XXMD6T",
    assetId: "OUTM-LP-001",
    assignedUser: "Sarah Johnson",
    assignedLocation: "San Francisco Office - Floor 2, Desk 23",
    assignmentStatus: "assigned",
    startDate: "2023-08-15",
    endDate: null,
    vendorName: "Apple Inc.",
    invoiceNumber: "INV-2023-001",
    purchaseCurrency: "USD",
    purchaseAmount: 2499.00,
    purchaseDate: "2023-08-10",
  },
  {
    id: "HW-002",
    deviceName: "Dell OptiPlex 7090",
    componentType: "desktop",
    serialNumber: "5CD12345ABC",
    assetId: "OUTM-DT-002",
    assignedUser: "Mike Chen",
    assignedLocation: "Mumbai Office - Floor 1, Workstation 15",
    assignmentStatus: "assigned",
    startDate: "2023-09-01",
    endDate: null,
    vendorName: "Dell Technologies",
    invoiceNumber: "INV-2023-045",
    purchaseCurrency: "INR",
    purchaseAmount: 65000,
    purchaseDate: "2023-08-25",
  },
  {
    id: "HW-003",
    deviceName: "HP ProDesk Server",
    componentType: "server",
    serialNumber: "SRV789XYZ",
    assetId: "OUTM-SRV-001",
    assignedUser: null,
    assignedLocation: "San Francisco - Server Room Rack A3",
    assignmentStatus: "available",
    startDate: null,
    endDate: null,
    vendorName: "HP Enterprise",
    invoiceNumber: "INV-2023-012",
    purchaseCurrency: "USD",
    purchaseAmount: 4500.00,
    purchaseDate: "2023-07-15",
  }
];

const statusColors = {
  assigned: "bg-green-100 text-green-800",
  available: "bg-blue-100 text-blue-800",
  under_repair: "bg-yellow-100 text-yellow-800",
  scrapped: "bg-red-100 text-red-800",
};

const componentTypes = [
  "laptop", "desktop", "server", "monitor", "phone", "tablet", 
  "router", "switch", "printer", "scanner", "other"
];

export const HardwareList = ({ currentUser, currency }: HardwareListProps) => {
  const [hardware, setHardware] = useState(mockHardware);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedHardware, setSelectedHardware] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  const filteredHardware = hardware.filter((item) => {
    const matchesSearch = item.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.assetId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.assignedUser && item.assignedUser.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === "all" || item.componentType === typeFilter;
    const matchesStatus = statusFilter === "all" || item.assignmentStatus === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleAddHardware = (newHardware: any) => {
    setHardware([...hardware, { ...newHardware, id: `HW-${Date.now()}` }]);
    setIsAddDialogOpen(false);
  };

  const handleEditHardware = (updatedHardware: any) => {
    setHardware(hardware.map(item => 
      item.id === updatedHardware.id ? updatedHardware : item
    ));
    setIsEditDialogOpen(false);
    setSelectedHardware(null);
  };

  const handleScrapHardware = (hardwareId: string) => {
    setHardware(hardware.map(item => 
      item.id === hardwareId 
        ? { ...item, assignmentStatus: "scrapped", endDate: new Date().toISOString().split('T')[0] }
        : item
    ));
  };

  const canEdit = currentUser.role === "admin" || currentUser.role === "it_manager";

  const formatCurrency = (amount: number, curr: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: curr,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hardware Assets</h1>
          <p className="text-gray-500 mt-1">Track and manage all physical devices</p>
        </div>
        {canEdit && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Hardware
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl bg-white">
              <DialogHeader>
                <DialogTitle>Add New Hardware Asset</DialogTitle>
                <DialogDescription>
                  Register a new hardware device in the system
                </DialogDescription>
              </DialogHeader>
              <HardwareForm onSubmit={handleAddHardware} />
            </DialogContent>
          </Dialog>
        )}
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
                placeholder="Search by device name, serial number, asset ID, or assigned user..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Component Type" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Types</SelectItem>
                {componentTypes.map(type => (
                  <SelectItem key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="under_repair">Under Repair</SelectItem>
                <SelectItem value="scrapped">Scrapped</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Hardware Table */}
      <Card>
        <CardHeader>
          <CardTitle>Hardware Assets ({filteredHardware.length})</CardTitle>
          <CardDescription>
            Manage your company's hardware inventory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset ID</TableHead>
                <TableHead>Device & Type</TableHead>
                <TableHead>Assigned User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Purchase Info</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHardware.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.assetId}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{item.deviceName}</p>
                      <p className="text-sm text-gray-500 capitalize">{item.componentType}</p>
                    </div>
                  </TableCell>
                  <TableCell>{item.assignedUser || "Unassigned"}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[item.assignmentStatus as keyof typeof statusColors]}>
                      {item.assignmentStatus.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-32 truncate">{item.assignedLocation}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{formatCurrency(item.purchaseAmount, item.purchaseCurrency)}</p>
                      <p className="text-gray-500">{item.purchaseDate}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedHardware(item);
                          setIsDetailsDialogOpen(true);
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
                              setSelectedHardware(item);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          {item.assignmentStatus !== "scrapped" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleScrapHardware(item.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
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
            <DialogTitle>Edit Hardware Asset</DialogTitle>
            <DialogDescription>
              Update hardware information
            </DialogDescription>
          </DialogHeader>
          {selectedHardware && (
            <HardwareForm 
              initialData={selectedHardware}
              onSubmit={handleEditHardware}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-4xl bg-white">
          <DialogHeader>
            <DialogTitle>Hardware Asset Details</DialogTitle>
          </DialogHeader>
          {selectedHardware && <HardwareDetails hardware={selectedHardware} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};
