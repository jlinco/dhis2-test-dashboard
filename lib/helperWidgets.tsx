'use client'
import { BarChartBig, LineChart, BarChartHorizontalBig, PieChart, BarChart2, Gauge, CandlestickChart } from "lucide-react"

export const renderVizTypeIcons = (vizType: string) => {
  let vizIcon
  if (vizType === 'COLUMN') vizIcon = <BarChartBig size={20} color="#615c5c" strokeWidth={1.25} />
  if (vizType === 'LINE') vizIcon = <LineChart size={20} color="#615c5c" strokeWidth={1.25} />
  if (vizType === 'STACKED_COLUMN') vizIcon = <BarChartHorizontalBig size={20} color="#615c5c" strokeWidth={1.25} />
  if (vizType === 'PIE') vizIcon = <PieChart size={20} color="#615c5c" strokeWidth={1.25} />
  if (vizType === 'PIVOT_TABLE') vizIcon = <BarChart2 size={20} color="#615c5c" strokeWidth={1.25} />
  if (vizType === 'GAUGE') vizIcon = <Gauge size={20} color="#615c5c" strokeWidth={1.25} />
  if (vizType === 'YEAR_OVER_YEAR_LINE') vizIcon = <CandlestickChart size={20} color="#615c5c" strokeWidth={1.25} />

  return vizIcon
}