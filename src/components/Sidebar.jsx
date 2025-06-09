import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const DEFAULT_NAV_ITEMS = [
  { url: "/dashboard", name: "Dashboard", icon: "/assets/icons/dashboard.svg" },
  { url: "/projects", name: "Projects", icon: "/assets/icons/projects.svg" },
  { url: "/team", name: "Team", icon: "/assets/icons/team.svg" },
];

const SidebarLogo = () => (
  <Link href="/" className="sidebar-logo">
    <img
      src="/assets/icons/logo-full-brand.svg"
      alt="logo"
      width={160}
      height={50}
      className="hidden h-auto lg:block"
    />
    <img
      src="/assets/icons/logo-brand.svg"
      alt="logo"
      width={160}
      height={50}
      className="lg:hidden"
    />
  </Link>
);

const NavItem = ({ item, isActive }) => (
  <li className={cn("sidebar-nav-item", isActive && "shad-active")}>
    <img
      src={item.icon}
      alt={item.name}
      width={24}
      height={24}
      className={cn("nav-icon", isActive && "nav-icon-active")}
      onError={(e) => {
        e.target.src = "/assets/icons/default-nav-icon.svg"; // Fallback icon
      }}
    />
    <p className="hidden lg:block">{item.name}</p>
  </li>
);

const SidebarNav = ({ navItems, pathname }) => (
  <nav aria-label="Main navigation" className="sidebar-nav">
    <ul className="flex flex-1 flex-col gap-6">
      {navItems.map((item) => (
        <NavItem key={item.url} item={item} isActive={pathname === item.url} />
      ))}
    </ul>
  </nav>
);

const SidebarUserInfo = ({ user }) => (
  <div className="sidebar-user-info">
    <img
      src={user.avatar || "/assets/images/userAvatar.png"}
      alt="avatar"
      width={44}
      height={44}
      className="sidebar-user-avatar"
      onError={(e) => {
        e.target.src = "/assets/images/userAvatar.png"; // Fallback avatar
      }}
    />
    <div className="hidden lg:block">
      <p className="subtitle-2 capitalize">{user.fullName}</p>
      <p className="caption">{user.email}</p>
    </div>
  </div>
);

const Sidebar = ({
  fullName = "Guest User",
  avatar = "",
  email = "guest@example.com",
  navItems = DEFAULT_NAV_ITEMS,
}) => {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <SidebarLogo />
      <SidebarNav navItems={navItems} pathname={pathname} />
      <SidebarUserInfo user={{ fullName, avatar, email }} />
    </aside>
  );
};

export default Sidebar;
