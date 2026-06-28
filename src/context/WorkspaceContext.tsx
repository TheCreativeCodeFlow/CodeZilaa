"use client";

import React, { createContext, useContext, useState } from "react";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type: "system" | "achievement" | "practice" | "roadmap";
}

interface WorkspaceContextType {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSidebar: () => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  rightPanelOpen: boolean;
  setRightPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  unreadCount: number;
}

const initialNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "Daily Streak Achieved! 🔥",
    message: "You have maintained a 12-day coding streak. Keep going!",
    time: "10m ago",
    unread: true,
    type: "achievement",
  },
  {
    id: "2",
    title: "New Roadmap Module Unlocked 🚀",
    message: "Advanced Dynamic Programming module is now available in your placement roadmap.",
    time: "2h ago",
    unread: true,
    type: "roadmap",
  },
  {
    id: "3",
    title: "Weekly Mock Interview Scheduled 📅",
    message: "Your AI Technical Interview session is scheduled for tomorrow at 4:00 PM.",
    time: "1d ago",
    unread: false,
    type: "system",
  },
];

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  const toggleSidebar = () => setSidebarCollapsed((prev) => !prev);

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <WorkspaceContext.Provider
      value={{
        sidebarCollapsed,
        setSidebarCollapsed,
        toggleSidebar,
        commandPaletteOpen,
        setCommandPaletteOpen,
        rightPanelOpen,
        setRightPanelOpen,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        unreadCount,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
}
