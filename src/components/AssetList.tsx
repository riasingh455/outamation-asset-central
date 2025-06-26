
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
import { Plus, Search, Filter, Edit, Trash2, Eye } from "lucide-react";
import { AssetForm } from "./AssetForm";
import { AssetDetails } from "./AssetDetails";

interface AssetListProps {
  currentUser: any;
}

// Mock asset data - will be replaced with Supabase queries
const mockAssets = [
  {
    id: "LP-001",
    name: "MacBook Pro 16\"",
    type: "laptop",
    serialNumber: "C02ZD0XXMD6T",
    assignedTo: "Sarah Johnson",
    status: "in_use",
    location: "San Francisco Office - Floor 2",
    purchaseDate: "2023-08-15",
    warrantyExpiration: "2026-08-15",
    condition: "good",
    notes: "Latest model with M2 chip"
  },
  {
    id: "PH-045",
    name: "iPhone 14 Pro",
    type: "phone",
    serialNumber: "F2G3H4J5K6L7",
    assignedTo: "Mike Chen",
    status: "in_use",
    location: "New York Office - Floor 1",
    purchaseDate: "2023-09-22",
    warrantyExpiration: "2024-09-22",
    condition: "good",
    notes: "Company phone for sales team"
  },
  {
    id: "MN-023",
    name: "Dell UltraSharp 27\"",
    type: "monitor",
    serialNumber: "CN0G7HXG",
    assignedTo: "Jessica Wong",
    status: "under_repair",
    location: "IT Storage Room",
    purchaseDate: "2022-03-10",
    warrantyExpiration: "2024-03-10",
    condition: "needs_service",
    notes: "Flickering issue reported"
  },
  // Add more mock data...
];

const statusColors = {
  in_use: "bg-green-100 text-green-800",
  in_storage: "bg-gray-100 text-gray-800",
  under_repair: "bg-yellow-100 text-yellow-800",
  retired: "bg-red-100 text-red-800",
};

const conditionColors = {
  good: "bg-green-100 text-green-800",
  needs_service: "bg-yellow-100 text-yellow-800",
  damaged: "bg-red-100 text-red-800",
};

export const AssetList = ({ currentUser }: AssetListProps) => {
  const [assets, setAssets] = useState(mockAssets);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  // Filter assets based on search and filters
  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || asset.type === typeFilter;
    const matchesStatus = statusFilter === "all" || asset.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleAddAsset = (newAsset: any) => {
    setAssets([...assets, { ...newAsset, id: `AS-${Date.now()}` }]);
    setIsAddDialogOpen(false);
  };

  const handleEditAsset = (updatedAsset: any) => {
    setAssets(assets.map(asset => 
      asset.id === updatedAsset.id ? updatedAsset : asset
    ));
    setIsEditDialogOpen(false);
    setSelectedAsset(null);
  };

  const handleDeleteAsset = (assetId: string) => {
    setAssets(assets.filter(asset => asset.id !== assetId));
  };

  const canEdit = currentUser.role === "admin" || currentUser.role === "it_manager";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Asset Management</h1>
          <p className="text-gray-500 mt-1">Track and manage all company assets</p>
        </div>
        {canEdit && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Asset
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-white">
              <DialogHeader>
                <DialogTitle>Add New Asset</DialogTitle>
                <DialogDescription>
                  Register a new asset in the system
                </DialogDescription>
              </DialogHeader>
              <AssetForm onSubmit={handleAddAsset} />
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
                placeholder="Search by name, serial number, or assigned user..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Asset Type" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="laptop">Laptops</SelectItem>
                <SelectItem value="phone">Phones</SelectItem>
                <SelectItem value="monitor">Monitors</SelectItem>
                <SelectItem value="software">Software</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="in_use">In Use</SelectItem>
                <SelectItem value="in_storage">In Storage</SelectItem>
                <SelectItem value="under_repair">Under Repair</SelectItem>
                <SelectItem value="retired">Retired</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Asset Table */}
      <Card>
        <CardHeader>
          <CardTitle>Assets ({filteredAssets.length})</CardTitle>
          <CardDescription>
            Manage your company's asset inventory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset ID</TableHead>
                <TableHead>Name & Type</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell className="font-medium">{asset.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{asset.name}</p>
                      <p className="text-sm text-gray-500 capitalize">{asset.type}</p>
                    </div>
                  </TableCell>
                  <TableCell>{asset.assignedTo}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[asset.status as keyof typeof statusColors]}>
                      {asset.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={conditionColors[asset.condition as keyof typeof conditionColors]}>
                      {asset.condition.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-32 truncate">{asset.location}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedAsset(asset);
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
                              setSelectedAsset(asset);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteAsset(asset.id)}
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
        <DialogContent className="max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle>Edit Asset</DialogTitle>
            <DialogDescription>
              Update asset information
            </DialogDescription>
          </DialogHeader>
          {selectedAsset && (
            <AssetForm 
              initialData={selectedAsset}
              onSubmit={handleEditAsset}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle>Asset Details</DialogTitle>
          </DialogHeader>
          {selectedAsset && <AssetDetails asset={selectedAsset} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};
