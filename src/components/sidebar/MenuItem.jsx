import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useSidebar } from "@/components/ui/sidebar";

const MenuItem = ({ item, level = 0 }) => {
  const { open } = useSidebar();

  const location = useLocation();
  const pathname = location.pathname;
  const isActive = pathname === item.to || pathname.startsWith(`${item.to}/`);

  const baseStyles = cn(
    "flex items-center rounded-md text-sm font-medium transition-colors",
    "hover:bg-accent hover:text-accent-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    level > 0 ? "pl-6" : "",
    isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
  );

  // subheading
  if (item.type === "subheading") {
    return (
      <div className="space-y-1">
        {open && (
          <h3
            className={cn(
              "px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
              level > 0 ? "pl-6" : ""
            )}
          >
            {item.title}
          </h3>
        )}
        {item.children &&
          item.children.map((child) => (
            <MenuItem key={child.id} item={child} level={level + 1} /> // Recursively render children
          ))}
      </div>
    );
  }

  // collapse state
  if (!open) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Link
            to={item.to}
            className={cn(baseStyles, "h-9 w-9 justify-center p-0")}
          >
            <item.icon className="h-4 w-4" />
            <span className="sr-only">{item.title}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{item.title}</TooltipContent>
      </Tooltip>
    );
  }

  return (
    // expanded state
    <Link
      to={item.to}
      className={cn(baseStyles, "h-9 px-3 py-2 justify-start gap-3")}
    >
      <item.icon className={cn("h-4 w-4", isActive ? "text-green-500" : "")} />
      <span>{item.title}</span>
      {isActive && (
        <span className="ml-auto h-2 w-2 rounded-full bg-light-200" />
      )}
    </Link>
  );
};

export default MenuItem;
