"use client"

import { Search, Plus, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Farm Dashboard
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Real-time insights for Greenfield Valley Farm
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search fields, crops..."
            className="w-64 h-9 pl-9 pr-4 text-sm bg-secondary/50 border border-border rounded-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 text-[10px] font-medium text-muted-foreground">
            ⌘K
          </kbd>
        </div>

        {/* Refresh */}
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 border-border bg-secondary/50 hover:bg-secondary"
        >
          <RefreshCw className="w-4 h-4" />
        </Button>

        {/* Add Field */}
        <Button
          size="sm"
          className="h-9 gap-2 bg-primary text-primary-foreground hover:bg-primary/90 glow-primary"
        >
          <Plus className="w-4 h-4" />
          Add Field
        </Button>
      </div>
    </header>
  )
}
