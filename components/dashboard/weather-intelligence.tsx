"use client"

import { Cloud, CloudRain, Sun, Wind, Droplets, ThermometerSun, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

interface ForecastDay {
  day: string
  icon: React.ElementType
  high: number
  low: number
  condition: string
}

const forecast: ForecastDay[] = [
  { day: "Today", icon: Sun, high: 24, low: 16, condition: "Sunny" },
  { day: "Tue", icon: Cloud, high: 22, low: 15, condition: "Cloudy" },
  { day: "Wed", icon: CloudRain, high: 19, low: 14, condition: "Rain" },
  { day: "Thu", icon: CloudRain, high: 18, low: 13, condition: "Rain" },
  { day: "Fri", icon: Sun, high: 23, low: 15, condition: "Sunny" },
]

const weatherMetrics = [
  { icon: Wind, label: "Wind", value: "12 km/h", subtext: "NW" },
  { icon: Droplets, label: "Humidity", value: "68%", subtext: "Moderate" },
  { icon: Eye, label: "Visibility", value: "10 km", subtext: "Clear" },
  { icon: ThermometerSun, label: "UV Index", value: "6", subtext: "High" },
]

export function WeatherIntelligence() {
  return (
    <div className="glass-card-hover rounded-xl p-6 h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/10">
            <CloudSun className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Weather Intelligence
            </h3>
            <p className="text-sm text-muted-foreground">
              5-day forecast & conditions
            </p>
          </div>
        </div>
        <span className="text-xs text-muted-foreground">
          Updated 15 min ago
        </span>
      </div>

      {/* Current Weather */}
      <div className="flex items-center gap-6 mb-6 p-4 rounded-xl bg-secondary/30">
        <div className="relative">
          <Sun className="w-16 h-16 text-chart-3 animate-float" />
          <div className="absolute inset-0 blur-xl bg-chart-3/20 rounded-full" />
        </div>
        <div>
          <p className="text-4xl font-bold text-foreground">24°C</p>
          <p className="text-muted-foreground">Feels like 26°C</p>
          <p className="text-sm text-primary mt-1">Optimal growing conditions</p>
        </div>
      </div>

      {/* 5-Day Forecast */}
      <div className="grid grid-cols-5 gap-2 mb-6">
        {forecast.map((day, index) => {
          const Icon = day.icon
          return (
            <div
              key={day.day}
              className={cn(
                "flex flex-col items-center p-3 rounded-lg transition-all",
                index === 0
                  ? "bg-primary/10 border border-primary/20"
                  : "hover:bg-secondary/50"
              )}
            >
              <span className="text-xs text-muted-foreground mb-2">
                {day.day}
              </span>
              <Icon
                className={cn(
                  "w-6 h-6 mb-2",
                  day.condition === "Sunny"
                    ? "text-chart-3"
                    : day.condition === "Rain"
                    ? "text-accent"
                    : "text-muted-foreground"
                )}
              />
              <span className="text-sm font-medium text-foreground">
                {day.high}°
              </span>
              <span className="text-xs text-muted-foreground">{day.low}°</span>
            </div>
          )
        })}
      </div>

      {/* Weather Metrics */}
      <div className="grid grid-cols-2 gap-3">
        {weatherMetrics.map((metric) => {
          const Icon = metric.icon
          return (
            <div
              key={metric.label}
              className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30"
            >
              <Icon className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  {metric.value}
                </p>
                <p className="text-xs text-muted-foreground">
                  {metric.label} · {metric.subtext}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function CloudSun(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="M20 12h2" />
      <path d="m19.07 4.93-1.41 1.41" />
      <path d="M15.947 12.65a4 4 0 0 0-5.925-4.128" />
      <path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" />
    </svg>
  )
}
