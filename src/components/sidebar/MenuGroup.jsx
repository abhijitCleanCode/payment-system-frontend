import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/useSidebar";
import MenuItem from "./MenuItem";
import { Tooltip, TooltipContent } from "../ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";

const MenuGroup = ({ group }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isOpen: isSidebarOpen } = useSidebar();

  const location = useLocation();
  const pathname = location.pathname;

  // // check if child is active
  //! error: some cannot read properties
  // const hasActiveChild = group.children.some((child) => pathname === child.to);
  // // auto open the group if child is active
  // if (hasActiveChild && !isOpen) setIsOpen(true);

  // collapsed state
  if (!isSidebarOpen) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "h-9 w-9 flex items-center justify-center rounded-md",
              "hover:bg-accent text-muted-foreground"
            )}
          >
            <group.icon className="h-4 w-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">{group.title}</TooltipContent>
      </Tooltip>
    );
  }

  return (
    // expanded state
    <div className="space-y-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center h-9 px-3 py-2 rounded-md text-sm font-medium",
          "hover:bg-accent hover:text-accent-foreground",
          "justify-between gap-3"
        )}
      >
        <div className="flex items-center gap-3">
          <group.icon className="h-4 w-4" />
          <span>{group.title}</span>
        </div>
        {isOpen ? (
          <ChevronDown className="h-4 w-4 transition-all" />
        ) : (
          <ChevronRight className="h-4 w-4 transition-all" />
        )}
      </button>

      {isOpen && (
        <div className="ml-4 space-y-1">
          {group.children.map((child) => (
            <MenuItem key={child.id} item={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuGroup;
