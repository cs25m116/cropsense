"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { FlaskConical, AlertCircle, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

const soilData = [
  { name: "N", value: 85, optimal: 80, unit: "ppm", label: "Nitrogen" },
  { name: "P", value: 45, optimal: 50, unit: "ppm", label: "Phosphorus" },
  { name: "K", value: 120, optimal: 100, unit: "ppm", label: "Potassium" },
  { name: "pH", value: 6.5, optimal: 6.5, unit: "", label: "pH Level" },
  { name: "OM", value: 3.2, optimal: 4.0, unit: "%", label: "Organic Matter" },
]

const soilAlerts = [
  {
    type: "warning",
    field: "North Field",
    message: "Phosphorus levels below optimal",
    action: "Consider applying phosphate fertilizer",
  },
  {
    type: "success",
    field: "East Field",
    message: "All nutrients within optimal range",
    action: "Continue current maintenance",
  },
]

export function SoilIntelligence() {
  return (
    <div className="glass-card-hover rounded-xl p-6 h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-chart-4/10">
            <FlaskConical className="w-5 h-5 text-chart-4" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Soil Intelligence
            </h3>
            <p className="text-sm text-muted-foreground">
              Nutrient levels & composition
            </p>
          </div>
        </div>
        <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
          Last sampled 3h ago
        </span>
      </div>

      {/* Nutrient Chart */}
      <div className="h-48 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={soilData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="oklch(0.3 0.02 260)"
              vertical={false}
            />
            <XAxis
              dataKey="name"
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
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.12 0.015 260)",
                border: "1px solid oklch(0.3 0.02 260)",
                borderRadius: "8px",
                padding: "12px",
              }}
              labelStyle={{ color: "oklch(0.95 0 0)", marginBottom: "8px" }}
              formatter={(value: number, name: string, props: { payload: { label: string; unit: string; optimal: number } }) => [
                `${value}${props.payload.unit} (Optimal: ${props.payload.optimal}${props.payload.unit})`,
                props.payload.label,
              ]}
            />
            <Bar
              dataKey="value"
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
              animationEasing="ease-out"
            >
              {soilData.map((entry, index) => {
                const isOptimal = entry.name === "pH" 
                  ? Math.abs(entry.value - entry.optimal) < 0.3
                  : entry.value >= entry.optimal * 0.9
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={isOptimal ? "oklch(0.72 0.19 145)" : "oklch(0.6 0.2 30)"}
                  />
                )
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Nutrient Details */}
      <div className="grid grid-cols-5 gap-2 mb-6">
        {soilData.map((nutrient) => {
          const isOptimal = nutrient.name === "pH"
            ? Math.abs(nutrient.value - nutrient.optimal) < 0.3
            : nutrient.value >= nutrient.optimal * 0.9
          return (
            <div
              key={nutrient.name}
              className="text-center p-2 rounded-lg bg-secondary/30"
            >
              <p className="text-xs text-muted-foreground mb-1">
                {nutrient.label}
              </p>
              <p
                className={cn(
                  "text-sm font-semibold",
                  isOptimal ? "text-primary" : "text-chart-4"
                )}
              >
                {nutrient.value}
                {nutrient.unit}
              </p>
            </div>
          )
        })}
      </div>

      {/* Alerts */}
      <div className="space-y-2">
        {soilAlerts.map((alert, index) => (
          <div
            key={index}
            className={cn(
              "flex items-start gap-3 p-3 rounded-lg",
              alert.type === "warning"
                ? "bg-chart-4/10 border border-chart-4/20"
                : "bg-primary/10 border border-primary/20"
            )}
          >
            {alert.type === "warning" ? (
              <AlertCircle className="w-4 h-4 text-chart-4 mt-0.5 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            )}
            <div>
              <p className="text-sm font-medium text-foreground">
                {alert.field}: {alert.message}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {alert.action}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
