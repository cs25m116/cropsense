"use client"

import { useState } from "react"
import { Menu, X, Leaf } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Map,
  TrendingUp,
  CloudSun,
  FlaskConical,
  Brain,
  Droplets,
  Bug,
  Sprout,
  Settings,
  Bell,
} from "lucide-react"

const navItems = [
  { icon: LayoutDashboard, label: "Overview", href: "#overview" },
  { icon: Map, label: "Field Map", href: "#map" },
  { icon: TrendingUp, label: "NDVI Analytics", href: "#ndvi" },
  { icon: CloudSun, label: "Weather", href: "#weather" },
  { icon: FlaskConical, label: "Soil Analysis", href: "#soil" },
  { icon: Brain, label: "AI Diagnosis", href: "#diagnosis" },
  { icon: Droplets, label: "Irrigation", href: "#irrigation" },
  { icon: Bug, label: "Pest Control", href: "#pests" },
  { icon: Sprout, label: "Crop Health", href: "#health" },
]

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
              <Leaf className="w-4 h-4 text-primary" />
            </div>
            <span className="font-semibold text-foreground">CropSense</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-secondary/50 transition-colors relative">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              {isOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <nav
        className={cn(
          "lg:hidden fixed top-0 right-0 z-50 h-full w-64 glass-card border-l border-border/50 transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <span className="font-semibold text-foreground">Menu</span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        <div className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </a>
            )
          })}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border/50">
          <a
            href="#settings"
            className="flex items-center gap-3 p-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
          >
            <Settings className="w-5 h-5" />
            <span className="text-sm font-medium">Settings</span>
          </a>
        </div>
      </nav>
    </>
  )
}
