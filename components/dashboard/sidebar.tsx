"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Map,
  Sprout,
  CloudSun,
  FlaskConical,
  Brain,
  Settings,
  Bell,
  ChevronLeft,
  ChevronRight,
  Leaf,
  TrendingUp,
  Droplets,
  Bug,
} from "lucide-react"

interface NavItem {
  icon: React.ElementType
  label: string
  href: string
  badge?: string
}

const mainNavItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Overview", href: "#overview" },
  { icon: Map, label: "Field Map", href: "#map" },
  { icon: TrendingUp, label: "NDVI Analytics", href: "#ndvi" },
  { icon: CloudSun, label: "Weather", href: "#weather" },
  { icon: FlaskConical, label: "Soil Analysis", href: "#soil" },
  { icon: Brain, label: "AI Diagnosis", href: "#diagnosis", badge: "AI" },
]

const secondaryNavItems: NavItem[] = [
  { icon: Droplets, label: "Irrigation", href: "#irrigation" },
  { icon: Bug, label: "Pest Control", href: "#pests" },
  { icon: Sprout, label: "Crop Health", href: "#health" },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [activeItem, setActiveItem] = useState("Overview")

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen glass-card flex flex-col transition-all duration-300",
        collapsed ? "w-[72px]" : "w-[260px]",
        className
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 p-4 border-b border-border/50">
        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 glow-primary">
          <Leaf className="w-5 h-5 text-primary" />
          <div className="absolute inset-0 rounded-xl animate-pulse-glow" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-lg font-semibold tracking-tight text-foreground">
              CropSense
            </h1>
            <p className="text-xs text-muted-foreground">AI Agriculture</p>
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <div className={cn("mb-4", !collapsed && "px-2")}>
          {!collapsed && (
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Main
            </p>
          )}
          {mainNavItems.map((item) => (
            <NavButton
              key={item.label}
              item={item}
              collapsed={collapsed}
              active={activeItem === item.label}
              onClick={() => setActiveItem(item.label)}
            />
          ))}
        </div>

        <div className={cn(!collapsed && "px-2")}>
          {!collapsed && (
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Monitoring
            </p>
          )}
          {secondaryNavItems.map((item) => (
            <NavButton
              key={item.label}
              item={item}
              collapsed={collapsed}
              active={activeItem === item.label}
              onClick={() => setActiveItem(item.label)}
            />
          ))}
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-border/50 space-y-1">
        <button
          className={cn(
            "flex items-center gap-3 w-full p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all",
            collapsed && "justify-center"
          )}
        >
          <Bell className="w-5 h-5" />
          {!collapsed && <span className="text-sm">Notifications</span>}
          {!collapsed && (
            <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              3
            </span>
          )}
        </button>
        <button
          className={cn(
            "flex items-center gap-3 w-full p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all",
            collapsed && "justify-center"
          )}
        >
          <Settings className="w-5 h-5" />
          {!collapsed && <span className="text-sm">Settings</span>}
        </button>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3" />
        ) : (
          <ChevronLeft className="w-3 h-3" />
        )}
      </button>
    </aside>
  )
}

interface NavButtonProps {
  item: NavItem
  collapsed: boolean
  active: boolean
  onClick: () => void
}

function NavButton({ item, collapsed, active, onClick }: NavButtonProps) {
  const Icon = item.icon

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 w-full p-2.5 rounded-lg transition-all duration-200",
        collapsed && "justify-center",
        active
          ? "bg-primary/10 text-primary glow-primary"
          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
      )}
    >
      <Icon className={cn("w-5 h-5", active && "drop-shadow-[0_0_8px_var(--primary)]")} />
      {!collapsed && (
        <>
          <span className="text-sm font-medium">{item.label}</span>
          {item.badge && (
            <span className="ml-auto text-[10px] font-medium px-1.5 py-0.5 rounded bg-accent text-accent-foreground">
              {item.badge}
            </span>
          )}
        </>
      )}
    </button>
  )
}
