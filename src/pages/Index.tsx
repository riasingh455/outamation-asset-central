
import { useState } from "react";
import { AssetDashboard } from "@/components/AssetDashboard";
import { HardwareList } from "@/components/HardwareList";
import { SoftwareList } from "@/components/SoftwareList";
import { UserManagement } from "@/components/UserManagement";
import { Reports } from "@/components/Reports";
import { BudgetTracking } from "@/components/BudgetTracking";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currency, setCurrency] = useState("USD"); // USD or INR
  const { toast } = useToast();

  // Mock user data - will be replaced with Supabase auth
  const currentUser = {
    id: "1",
    name: "John Doe",
    email: "john.doe@outamation.com",
    role: "admin", // admin, it_manager, team_lead, employee
    department: "IT",
    location: "San Francisco, USA",
    avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face"
  };

  const renderCurrentView = () => {
    const commonProps = { currentUser, currency, setCurrency };
    
    switch (currentView) {
      case "dashboard":
        return <AssetDashboard {...commonProps} />;
      case "hardware":
        return <HardwareList {...commonProps} />;
      case "software":
        return <SoftwareList {...commonProps} />;
      case "users":
        return <UserManagement {...commonProps} />;
      case "budget":
        return <BudgetTracking {...commonProps} />;
      case "reports":
        return <Reports {...commonProps} />;
      default:
        return <AssetDashboard {...commonProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar 
        currentView={currentView}
        setCurrentView={setCurrentView}
        currentUser={currentUser}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      
      <div className="flex-1 flex flex-col">
        <Header 
          currentUser={currentUser}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          currency={currency}
          setCurrency={setCurrency}
        />
        
        <main className="flex-1 p-6">
          {renderCurrentView()}
        </main>
      </div>
    </div>
  );
};

export default Index;
