import { Sidebar } from "@/components/dashboard/sidebar"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { DashboardHeader } from "@/components/dashboard/header"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { NDVIAnalytics } from "@/components/dashboard/ndvi-analytics"
import { WeatherIntelligence } from "@/components/dashboard/weather-intelligence"
import { SoilIntelligence } from "@/components/dashboard/soil-intelligence"
import { AIDiagnosis } from "@/components/dashboard/ai-diagnosis"
import { FieldMap } from "@/components/dashboard/field-map"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar - Desktop */}
      <Sidebar className="hidden lg:flex" />

      {/* Mobile Navigation */}
      <MobileNav />

      {/* Main Content */}
      <main className="lg:pl-[260px] min-h-screen">
        <div className="p-4 lg:p-8 pt-20 lg:pt-8">
          {/* Header */}
          <DashboardHeader />

          {/* Stats Cards */}
          <StatsCards />

          {/* Main Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            {/* NDVI Analytics - Takes 2 columns on xl */}
            <div className="xl:col-span-2">
              <NDVIAnalytics />
            </div>

            {/* Weather Intelligence */}
            <div className="xl:col-span-1">
              <WeatherIntelligence />
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Field Map */}
            <FieldMap />

            {/* Soil Intelligence */}
            <SoilIntelligence />
          </div>

          {/* AI Diagnosis - Full Width */}
          <div className="mb-6">
            <AIDiagnosis />
          </div>

          {/* Footer */}
          <footer className="mt-8 pt-6 border-t border-border/50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                © 2026 CropSense. AI-powered agriculture intelligence.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Documentation
                </a>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Support
                </a>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  API
                </a>
              </div>
            </div>
          </footer>
        </div>
      </main>

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Primary glow */}
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "oklch(0.72 0.19 145 / 0.3)" }}
        />
        {/* Accent glow */}
        <div
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl"
          style={{ background: "oklch(0.7 0.15 195 / 0.3)" }}
        />
      </div>
    </div>
  )
}
