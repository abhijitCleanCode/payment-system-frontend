import { useLocation } from "react-router-dom";
import { FilePlus, Home, Key, UserPlus } from "lucide-react";
import { useSidebar } from "@/hooks/useSidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "../ui/sidebar";
import MenuItem from "./MenuItem";

const menuItems = [
  {
    id: "home",
    title: "Home",
    icon: Home,
    to: "/",
    can_access: true,
  },
  {
    id: "user-management", // New ID for the subheading
    title: "User Management", // Subheading title
    type: "subheading", // Add a type to identify it as a subheading
    children: [
      {
        id: "create-user",
        title: "Create User",
        icon: UserPlus,
        to: "/create-user", // Changed to a real path for demonstration
        can_access: true,
      },
      {
        id: "change-password",
        title: "Change Password",
        icon: Key,
        to: "/change-password", // Changed to a real path for demonstration
        can_access: true,
      },
    ],
  },
  {
    id: "document-ops", // Another subheading
    title: "Document Operations",
    type: "subheading",
    children: [
      {
        id: "create-header",
        title: "Create Header",
        icon: FilePlus,
        to: "/create-header", // Changed to a real path for demonstration
        can_access: true,
      },
    ],
  },
];

// main container
const AppSidebar = () => {
  const { isOpen } = useSidebar();

  const location = useLocation();
  const pathname = location.pathname;

  return (
    <Sidebar variant={isOpen ? "default" : "compact"} className="">
      <SidebarHeader>Payment System</SidebarHeader>
      <SidebarContent className="ml-2">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </nav>
      </SidebarContent>
      <SidebarFooter>User Profile</SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
