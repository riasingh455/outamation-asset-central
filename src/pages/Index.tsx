
import { useState } from "react";
import { AssetDashboard } from "@/components/AssetDashboard";
import { AssetList } from "@/components/AssetList";
import { UserManagement } from "@/components/UserManagement";
import { Reports } from "@/components/Reports";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { toast } = useToast();

  // Mock user data - will be replaced with Supabase auth
  const currentUser = {
    id: "1",
    name: "John Doe",
    email: "john.doe@outamation.com",
    role: "admin", // admin, it_manager, employee
    avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face"
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "dashboard":
        return <AssetDashboard currentUser={currentUser} />;
      case "assets":
        return <AssetList currentUser={currentUser} />;
      case "users":
        return <UserManagement currentUser={currentUser} />;
      case "reports":
        return <Reports currentUser={currentUser} />;
      default:
        return <AssetDashboard currentUser={currentUser} />;
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
        />
        
        <main className="flex-1 p-6">
          {renderCurrentView()}
        </main>
      </div>
    </div>
  );
};

export default Index;
