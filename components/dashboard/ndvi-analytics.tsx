"use client"

import { useState } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, Calendar, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const ndviData = [
  { date: "Jan", north: 0.65, south: 0.58, east: 0.72 },
  { date: "Feb", north: 0.68, south: 0.62, east: 0.74 },
  { date: "Mar", north: 0.72, south: 0.68, east: 0.78 },
  { date: "Apr", north: 0.76, south: 0.73, east: 0.81 },
  { date: "May", north: 0.79, south: 0.76, east: 0.84 },
  { date: "Jun", north: 0.82, south: 0.79, east: 0.86 },
  { date: "Jul", north: 0.78, south: 0.75, east: 0.82 },
  { date: "Aug", north: 0.74, south: 0.71, east: 0.79 },
  { date: "Sep", north: 0.77, south: 0.74, east: 0.81 },
  { date: "Oct", north: 0.80, south: 0.77, east: 0.84 },
  { date: "Nov", north: 0.76, south: 0.72, east: 0.80 },
  { date: "Dec", north: 0.71, south: 0.67, east: 0.75 },
]

const timeRanges = ["7D", "30D", "90D", "1Y"]

export function NDVIAnalytics() {
  const [selectedRange, setSelectedRange] = useState("1Y")
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <div className="glass-card-hover rounded-xl p-6 h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              NDVI Analytics
            </h3>
            <p className="text-sm text-muted-foreground">
              Vegetation health index by field
            </p>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-secondary/50 border border-border rounded-lg text-muted-foreground hover:text-foreground transition-colors"
          >
            <Calendar className="w-4 h-4" />
            {selectedRange}
            <ChevronDown className="w-3 h-3" />
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-24 py-1 bg-popover border border-border rounded-lg shadow-lg z-10">
              {timeRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => {
                    setSelectedRange(range)
                    setShowDropdown(false)
                  }}
                  className={cn(
                    "w-full px-3 py-1.5 text-sm text-left hover:bg-secondary/50 transition-colors",
                    selectedRange === range
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {range}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground">North Field</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent" />
          <span className="text-xs text-muted-foreground">South Field</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-chart-3" />
          <span className="text-xs text-muted-foreground">East Field</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={ndviData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="northGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.72 0.19 145)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="oklch(0.72 0.19 145)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="southGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.7 0.15 195)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="oklch(0.7 0.15 195)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="eastGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.75 0.18 85)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="oklch(0.75 0.18 85)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="oklch(0.3 0.02 260)"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              stroke="oklch(0.5 0 0)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="oklch(0.5 0 0)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={[0.5, 1]}
              ticks={[0.5, 0.6, 0.7, 0.8, 0.9, 1.0]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.12 0.015 260)",
                border: "1px solid oklch(0.3 0.02 260)",
                borderRadius: "8px",
                padding: "12px",
              }}
              labelStyle={{ color: "oklch(0.95 0 0)", marginBottom: "8px" }}
              itemStyle={{ color: "oklch(0.7 0 0)" }}
            />
            <Area
              type="monotone"
              dataKey="north"
              stroke="oklch(0.72 0.19 145)"
              strokeWidth={2}
              fill="url(#northGradient)"
              animationDuration={1500}
              animationEasing="ease-out"
            />
            <Area
              type="monotone"
              dataKey="south"
              stroke="oklch(0.7 0.15 195)"
              strokeWidth={2}
              fill="url(#southGradient)"
              animationDuration={1500}
              animationEasing="ease-out"
            />
            <Area
              type="monotone"
              dataKey="east"
              stroke="oklch(0.75 0.18 85)"
              strokeWidth={2}
              fill="url(#eastGradient)"
              animationDuration={1500}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
