"use client"

import { useState } from "react"
import { Brain, Sparkles, AlertTriangle, CheckCircle, Clock, ChevronRight, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface Diagnosis {
  id: string
  severity: "critical" | "warning" | "info"
  title: string
  description: string
  field: string
  confidence: number
  timestamp: string
  actions: string[]
}

const diagnoses: Diagnosis[] = [
  {
    id: "1",
    severity: "critical",
    title: "Early Blight Detected",
    description: "AI detected patterns consistent with early blight (Alternaria solani) in tomato crops. Immediate attention recommended.",
    field: "North Field - Sector B",
    confidence: 94,
    timestamp: "2 hours ago",
    actions: ["Apply fungicide treatment", "Isolate affected area", "Monitor adjacent sectors"],
  },
  {
    id: "2",
    severity: "warning",
    title: "Nutrient Deficiency Risk",
    description: "Spectral analysis indicates potential nitrogen deficiency developing in wheat crops.",
    field: "South Field - Sector A",
    confidence: 87,
    timestamp: "5 hours ago",
    actions: ["Soil test recommended", "Consider nitrogen supplement"],
  },
  {
    id: "3",
    severity: "info",
    title: "Optimal Growth Conditions",
    description: "AI analysis confirms ideal conditions for current growth stage. Yield projections updated.",
    field: "East Field - All Sectors",
    confidence: 96,
    timestamp: "1 day ago",
    actions: ["Continue current protocol", "Schedule harvest planning"],
  },
]

export function AIDiagnosis() {
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleNewAnalysis = () => {
    setIsAnalyzing(true)
    setTimeout(() => setIsAnalyzing(false), 3000)
  }

  return (
    <div className="glass-card-hover rounded-xl p-6 h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative p-2 rounded-lg bg-accent/10">
            <Brain className="w-5 h-5 text-accent" />
            <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-accent animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              AI Diagnosis
              <span className="px-1.5 py-0.5 text-[10px] font-medium bg-accent/20 text-accent rounded">
                BETA
              </span>
            </h3>
            <p className="text-sm text-muted-foreground">
              Automated crop health analysis
            </p>
          </div>
        </div>
        <Button
          size="sm"
          onClick={handleNewAnalysis}
          disabled={isAnalyzing}
          className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90 glow-accent"
        >
          {isAnalyzing ? (
            <>
              <div className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              New Scan
            </>
          )}
        </Button>
      </div>

      {/* Analysis Status */}
      {isAnalyzing && (
        <div className="mb-6 p-4 rounded-xl bg-accent/5 border border-accent/20 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
              <Brain className="absolute inset-0 m-auto w-4 h-4 text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                Running AI Analysis
              </p>
              <p className="text-xs text-muted-foreground">
                Scanning satellite imagery and sensor data...
              </p>
            </div>
          </div>
          <div className="mt-4 h-1 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-accent rounded-full animate-[progress_3s_ease-out]" style={{ width: "100%" }} />
          </div>
        </div>
      )}

      {/* Diagnoses List */}
      <div className="space-y-3">
        {diagnoses.map((diagnosis) => (
          <DiagnosisCard
            key={diagnosis.id}
            diagnosis={diagnosis}
            expanded={selectedDiagnosis === diagnosis.id}
            onToggle={() =>
              setSelectedDiagnosis(
                selectedDiagnosis === diagnosis.id ? null : diagnosis.id
              )
            }
          />
        ))}
      </div>

      {/* AI Summary */}
      <div className="mt-6 p-4 rounded-xl bg-secondary/30 border border-border/50">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-foreground">AI Summary</span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Overall farm health is at <span className="text-primary font-medium">87%</span>. 
          Priority attention needed on North Field Sector B. 
          Weather conditions favorable for the next 48 hours. 
          Projected yield on track with seasonal targets.
        </p>
      </div>
    </div>
  )
}

interface DiagnosisCardProps {
  diagnosis: Diagnosis
  expanded: boolean
  onToggle: () => void
}

function DiagnosisCard({ diagnosis, expanded, onToggle }: DiagnosisCardProps) {
  const severityConfig = {
    critical: {
      icon: AlertTriangle,
      bg: "bg-destructive/10",
      border: "border-destructive/20",
      iconColor: "text-destructive",
      badge: "bg-destructive/20 text-destructive",
    },
    warning: {
      icon: Clock,
      bg: "bg-chart-4/10",
      border: "border-chart-4/20",
      iconColor: "text-chart-4",
      badge: "bg-chart-4/20 text-chart-4",
    },
    info: {
      icon: CheckCircle,
      bg: "bg-primary/10",
      border: "border-primary/20",
      iconColor: "text-primary",
      badge: "bg-primary/20 text-primary",
    },
  }

  const config = severityConfig[diagnosis.severity]
  const Icon = config.icon

  return (
    <div
      className={cn(
        "rounded-xl border transition-all cursor-pointer",
        config.bg,
        config.border,
        expanded && "ring-1 ring-offset-1 ring-offset-background",
        expanded && diagnosis.severity === "critical" && "ring-destructive",
        expanded && diagnosis.severity === "warning" && "ring-chart-4",
        expanded && diagnosis.severity === "info" && "ring-primary"
      )}
      onClick={onToggle}
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <Icon className={cn("w-5 h-5 mt-0.5 shrink-0", config.iconColor)} />
            <div>
              <p className="text-sm font-medium text-foreground">
                {diagnosis.title}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {diagnosis.field}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={cn("px-2 py-0.5 text-[10px] font-medium rounded-full", config.badge)}>
              {diagnosis.confidence}% confidence
            </span>
            <ChevronRight
              className={cn(
                "w-4 h-4 text-muted-foreground transition-transform",
                expanded && "rotate-90"
              )}
            />
          </div>
        </div>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-border/50 animate-in fade-in slide-in-from-top-2">
            <p className="text-sm text-muted-foreground mb-4">
              {diagnosis.description}
            </p>
            <div className="space-y-2">
              <p className="text-xs font-medium text-foreground">
                Recommended Actions:
              </p>
              {diagnosis.actions.map((action, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-xs text-muted-foreground"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                  {action}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Detected {diagnosis.timestamp}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
