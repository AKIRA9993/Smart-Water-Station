'use client';
import { useState } from "react";
import {
  Atom, ChartBarStacked, ChartNoAxesCombined, Flower, WindArrowDown,
} from "lucide-react";
import PageHeader from "@/_components/fixed-components/PageHeader/PageHeader";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card, CardContent, CardDescription,
  CardFooter, CardHeader, CardTitle,
} from "../../../_components/ui/card";
import {
  ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig,
} from "../../../_components/ui/chart";
//@ts-ignore
import { SensorCardProp } from "../../../Interfaces/SensorCardInterface.ts";

const sensorNavItems = [
  { label: "All Sensors", href: "#all-sensors", icon: ChartBarStacked },
  { label: "TDS",         href: "#tds",         icon: ChartNoAxesCombined },
  { label: "Pressure",    href: "#pressure",    icon: WindArrowDown },
  { label: "Flow",        href: "#flow",         icon: Flower },
  { label: "PH",          href: "#ph",           icon: Atom },
];

const sensorCardsProp: SensorCardProp[] = [
  {
    id: "tds",
    title: "TDS Sensor - Unit B",
    description: "Total Dissolved Solids",
    unit: "ppm",
    currentValue: 320,
    status: "Normal",
    statusColor: "bg-yellow-400",
    trend: "+5.2%",
    chartData: [
      { time: "Jan", value: 300 }, { time: "Feb", value: 340 },
      { time: "Mar", value: 310 }, { time: "Apr", value: 360 },
      { time: "May", value: 320 }, { time: "Jun", value: 330 },
    ],
    color: "hsl(var(--chart-1))",
  },
  {
    id: "pressure",
    title: "Pressure Sensor - Outlet",
    description: "Outlet pressure reading",
    unit: "Psi",
    currentValue: 150,
    status: "Normal",
    statusColor: "bg-yellow-400",
    trend: "+2.1%",
    chartData: [
      { time: "Jan", value: 140 }, { time: "Feb", value: 160 },
      { time: "Mar", value: 148 }, { time: "Apr", value: 165 },
      { time: "May", value: 150 }, { time: "Jun", value: 158 },
    ],
    color: "hsl(var(--chart-2))",
  },
  {
    id: "flow",
    title: "Flow Sensor - Unit A",
    description: "Water flow rate",
    unit: "L/m",
    currentValue: 85,
    status: "Normal",
    statusColor: "bg-green-400",
    trend: "+3.8%",
    chartData: [
      { time: "Jan", value: 80 }, { time: "Feb", value: 90 },
      { time: "Mar", value: 85 }, { time: "Apr", value: 78 },
      { time: "May", value: 92 }, { time: "Jun", value: 85 },
    ],
    color: "hsl(var(--chart-3))",
  },
  {
    id: "ph",
    title: "PH Sensor - Unit A",
    description: "Water acidity level",
    unit: "pH",
    currentValue: 7.2,
    status: "Normal",
    statusColor: "bg-green-400",
    trend: "+0.5%",
    chartData: [
      { time: "Jan", value: 7.0 }, { time: "Feb", value: 7.4 },
      { time: "Mar", value: 7.1 }, { time: "Apr", value: 7.3 },
      { time: "May", value: 7.2 }, { time: "Jun", value: 7.2 },
    ],
    color: "hsl(var(--chart-4))",
  },
];

function SensorCard({ id, title, unit, currentValue, status, statusColor, trend, chartData, color }: SensorCardProp) {
  const chartConfig: ChartConfig = {
    value: { label: unit, color: color },
  };

  return (
    <Card className="rounded-2xl border border-blue-100 bg-white shadow-sm w-72 flex-shrink-0">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div>
          <CardTitle className="text-sm font-semibold text-[#456DAE]">{title}</CardTitle>
          <CardDescription className="text-xs">Status: {status}</CardDescription>
        </div>
        <span className={`h-3 w-3 rounded-full mt-1 flex-shrink-0 ${statusColor}`} />
      </CardHeader>

      <CardContent>
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-4xl font-bold text-[#456DAE]">{currentValue}</span>
          <span className="text-sm text-gray-400">{unit}</span>
        </div>

        <ChartContainer config={chartConfig}>
          <AreaChart data={chartData} margin={{ left: 0, right: 0 }}>
            <defs>
              <linearGradient id={`fill-${id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={color} stopOpacity={0.4} />
                <stop offset="95%" stopColor={color} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 11 }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Area
              dataKey="value"
              type="natural"
              stroke={color}
              strokeWidth={2}
              fill={`url(#fill-${id})`}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>

      <CardFooter>
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          Trending {trend} this month <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
      </CardFooter>
    </Card>
  );
}

export default function Sensors() {
  const [activeFilter, setActiveFilter] = useState("all-sensors");

  const filteredSensors = activeFilter === "all-sensors"
    ? sensorCardsProp
    : sensorCardsProp.filter((s) => s.id === activeFilter);

  return (
    <>
      <PageHeader />
      {/* header */}
      <div>
        <h1 className="text-3xl font-bold mx-20 mt-10 pb-2 text-[#456DAE]">
          Live Sensors Status
        </h1>
        <p className="text-[#456DAE] mx-20">
          Real-time over all water treatment plant sensors
        </p>
      </div>

      {/* sensors navigation bar */}
      <nav className="sticky top-0 z-50 hidden border-b border-white/20 bg-[#6f89b8]/95 backdrop-blur md:block rounded-3xl mx-80 px-2 py-2 mt-6">
        <div className="no-scrollbar flex min-w-0 flex-1 items-center justify-start gap-3 overflow-x-auto py-2 sm:justify-center sm:gap-4 lg:gap-6">
          {sensorNavItems.map((item) => {
            const Icon = item.icon;
            const itemId = item.href.replace("#", "");
            const isActive = activeFilter === itemId;
            return (
              <button
                key={item.href}
                onClick={() => setActiveFilter(itemId)}
                className={`inline-flex shrink-0 items-center gap-1 rounded-md px-3 py-1.5 text-sm font-semibold transition ${
                  isActive ? "bg-blue-900 text-white" : "text-white hover:bg-white/15"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* sensor cards */}
      <div className="flex flex-wrap gap-6 mx-20 mt-8">
        {filteredSensors.map((sensor) => (
          <SensorCard key={sensor.id} {...sensor} />
        ))}
      </div>
    </>
  );
}