"use client"

import { useState } from "react"
import { Map, Layers, ZoomIn, ZoomOut, Maximize2, Satellite } from "lucide-react"
import { cn } from "@/lib/utils"

const fieldData = [
  { id: "north-a", name: "North A", ndvi: 0.82, status: "healthy", x: 15, y: 10, width: 35, height: 25 },
  { id: "north-b", name: "North B", ndvi: 0.65, status: "warning", x: 55, y: 10, width: 30, height: 25 },
  { id: "south-a", name: "South A", ndvi: 0.78, status: "healthy", x: 10, y: 40, width: 40, height: 30 },
  { id: "south-b", name: "South B", ndvi: 0.88, status: "excellent", x: 55, y: 40, width: 35, height: 30 },
  { id: "east", name: "East Field", ndvi: 0.92, status: "excellent", x: 30, y: 75, width: 50, height: 20 },
]

const layers = [
  { id: "ndvi", label: "NDVI", active: true },
  { id: "moisture", label: "Moisture", active: false },
  { id: "thermal", label: "Thermal", active: false },
]

export function FieldMap() {
  const [selectedField, setSelectedField] = useState<string | null>(null)
  const [activeLayers, setActiveLayers] = useState(["ndvi"])
  const [zoom, setZoom] = useState(1)

  const toggleLayer = (layerId: string) => {
    setActiveLayers((prev) =>
      prev.includes(layerId)
        ? prev.filter((id) => id !== layerId)
        : [...prev, layerId]
    )
  }

  const getFieldColor = (status: string, ndvi: number) => {
    if (status === "excellent") return "bg-primary/40 border-primary"
    if (status === "healthy") return "bg-primary/25 border-primary/60"
    if (status === "warning") return "bg-chart-4/40 border-chart-4"
    return "bg-destructive/40 border-destructive"
  }

  return (
    <div className="glass-card-hover rounded-xl p-6 h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/10">
            <Map className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Field Map
            </h3>
            <p className="text-sm text-muted-foreground">
              Interactive farm overview
            </p>
          </div>
        </div>

        {/* Map Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setZoom(Math.min(zoom + 0.25, 2))}
            className="p-1.5 rounded-lg bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom(Math.max(zoom - 0.25, 0.5))}
            className="p-1.5 rounded-lg bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-lg bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Layer Toggles */}
      <div className="flex items-center gap-2 mb-4">
        <Layers className="w-4 h-4 text-muted-foreground" />
        {layers.map((layer) => (
          <button
            key={layer.id}
            onClick={() => toggleLayer(layer.id)}
            className={cn(
              "px-3 py-1 text-xs rounded-full transition-all",
              activeLayers.includes(layer.id)
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/50 text-muted-foreground hover:text-foreground"
            )}
          >
            {layer.label}
          </button>
        ))}
      </div>

      {/* Map Container */}
      <div
        className="relative w-full h-64 rounded-xl bg-secondary/30 border border-border/50 overflow-hidden"
        style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, oklch(0.3 0.02 260 / 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, oklch(0.3 0.02 260 / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "10% 10%",
          }}
        />

        {/* Satellite indicator */}
        <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-1 rounded bg-background/80 text-xs text-muted-foreground">
          <Satellite className="w-3 h-3" />
          Live Feed
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        </div>

        {/* Field polygons */}
        {fieldData.map((field) => (
          <button
            key={field.id}
            onClick={() => setSelectedField(selectedField === field.id ? null : field.id)}
            className={cn(
              "absolute rounded-lg border-2 transition-all duration-300 hover:scale-105",
              getFieldColor(field.status, field.ndvi),
              selectedField === field.id && "ring-2 ring-offset-2 ring-offset-background ring-foreground"
            )}
            style={{
              left: `${field.x}%`,
              top: `${field.y}%`,
              width: `${field.width}%`,
              height: `${field.height}%`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-medium text-foreground px-1.5 py-0.5 rounded bg-background/80">
                {field.name}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Field Details */}
      {selectedField && (
        <div className="mt-4 p-4 rounded-xl bg-secondary/30 animate-in fade-in slide-in-from-bottom-2">
          {(() => {
            const field = fieldData.find((f) => f.id === selectedField)
            if (!field) return null
            return (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {field.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Status: {field.status.charAt(0).toUpperCase() + field.status.slice(1)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-primary">
                    {field.ndvi.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">NDVI Score</p>
                </div>
              </div>
            )
          })()}
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-primary/40 border border-primary" />
          <span className="text-xs text-muted-foreground">Excellent</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-primary/25 border border-primary/60" />
          <span className="text-xs text-muted-foreground">Healthy</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-chart-4/40 border border-chart-4" />
          <span className="text-xs text-muted-foreground">Warning</span>
        </div>
      </div>
    </div>
  )
}
