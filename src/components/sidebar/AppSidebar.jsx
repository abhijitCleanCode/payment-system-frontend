import { useLocation } from "react-router-dom";
import { FilePlus, Home, Key, UserPlus } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
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
    id: "user-management",
    title: "User Management",
    type: "subheading",
    children: [
      {
        id: "create-user",
        title: "Create User",
        icon: UserPlus,
        to: "/create-user",
        can_access: true,
      },
      {
        id: "change-password",
        title: "Change Password",
        icon: Key,
        to: "/change-password",
        can_access: true,
      },
    ],
  },
  {
    id: "document-ops",
    title: "Document Operations",
    type: "subheading",
    children: [
      {
        id: "create-header",
        title: "Create Header",
        icon: FilePlus,
        to: "/create-header",
        can_access: true,
      },
    ],
  },
];

// main container
const AppSidebar = () => {
  const { open } = useSidebar();

  const location = useLocation();
  const pathname = location.pathname;

  return (
    <Sidebar
      variant={open ? "floating" : "compact"}
      className=""
      collapsible="icon"
    >
      <SidebarHeader>{open ? "Payment System" : "PS"}</SidebarHeader>
      <SidebarContent className="ml-2">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </nav>
      </SidebarContent>
      <SidebarFooter>{open ? "User Profile" : "UP"}</SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
