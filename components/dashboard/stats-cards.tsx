"use client"

import { ArrowUpRight, ArrowDownRight, Leaf, Droplets, ThermometerSun, Gauge } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCard {
  label: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ElementType
  iconColor: string
}

const stats: StatCard[] = [
  {
    label: "Avg. NDVI Score",
    value: "0.78",
    change: "+5.4%",
    trend: "up",
    icon: Leaf,
    iconColor: "text-primary",
  },
  {
    label: "Soil Moisture",
    value: "34%",
    change: "-2.1%",
    trend: "down",
    icon: Droplets,
    iconColor: "text-accent",
  },
  {
    label: "Temperature",
    value: "24°C",
    change: "+1.2°",
    trend: "up",
    icon: ThermometerSun,
    iconColor: "text-chart-3",
  },
  {
    label: "Crop Health Index",
    value: "92%",
    change: "+3.2%",
    trend: "up",
    icon: Gauge,
    iconColor: "text-primary",
  },
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <StatCardItem key={stat.label} stat={stat} index={index} />
      ))}
    </div>
  )
}

interface StatCardItemProps {
  stat: StatCard
  index: number
}

function StatCardItem({ stat, index }: StatCardItemProps) {
  const Icon = stat.icon
  const TrendIcon = stat.trend === "up" ? ArrowUpRight : ArrowDownRight

  return (
    <div
      className="glass-card-hover rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: "both" }}
    >
      <div className="flex items-start justify-between">
        <div className={cn("p-2 rounded-lg bg-secondary/50", stat.iconColor)}>
          <Icon className="w-5 h-5" />
        </div>
        <div
          className={cn(
            "flex items-center gap-1 text-xs font-medium",
            stat.trend === "up" ? "text-primary" : "text-chart-4"
          )}
        >
          <TrendIcon className="w-3 h-3" />
          {stat.change}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-2xl font-semibold tracking-tight text-foreground">
          {stat.value}
        </p>
        <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
      </div>
    </div>
  )
}
