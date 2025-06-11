// currently not in use
import { useState } from "react";

export function useSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeGroup, setActiveGroup] = useState(null);

  return {
    isOpen,
    activeGroup,
    toggle: () => setIsOpen(!isOpen),
    openGroup: function (id) {
      setActiveGroup(id === activeGroup ? null : id);
    },
  };
}
