
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Laptop,
  Software,
  Users,
  DollarSign,
  FileBarChart,
  Settings,
  HelpCircle,
} from "lucide-react";

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  currentUser: any;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const navigation = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "hardware", label: "Hardware Assets", icon: Laptop },
  { id: "software", label: "Software & Licenses", icon: Software },
  { id: "users", label: "User Management", icon: Users, adminOnly: true },
  { id: "budget", label: "Budget Tracking", icon: DollarSign, adminOnly: true },
  { id: "reports", label: "Reports & Audit", icon: FileBarChart },
];

export const Sidebar = ({ currentView, setCurrentView, currentUser, isOpen }: SidebarProps) => {
  const isAdmin = currentUser.role === "admin";
  const isManager = currentUser.role === "admin" || currentUser.role === "it_manager";

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 transition-all duration-300 flex flex-col",
      isOpen ? "w-64" : "w-16"
    )}>
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Laptop className="h-5 w-5 text-white" />
          </div>
          {isOpen && (
            <div>
              <h1 className="text-xl font-bold text-gray-900">Outamation</h1>
              <p className="text-sm text-gray-500">Asset Manager</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          if (item.adminOnly && !isAdmin) return null;
          
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start h-10",
                isActive && "bg-blue-600 text-white hover:bg-blue-700",
                !isOpen && "px-2"
              )}
              onClick={() => setCurrentView(item.id)}
            >
              <Icon className="h-5 w-5" />
              {isOpen && <span className="ml-3">{item.label}</span>}
            </Button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <Button variant="ghost" className={cn("w-full justify-start h-10", !isOpen && "px-2")}>
          <Settings className="h-5 w-5" />
          {isOpen && <span className="ml-3">Settings</span>}
        </Button>
        <Button variant="ghost" className={cn("w-full justify-start h-10", !isOpen && "px-2")}>
          <HelpCircle className="h-5 w-5" />
          {isOpen && <span className="ml-3">Help</span>}
        </Button>
      </div>
    </div>
  );
};
