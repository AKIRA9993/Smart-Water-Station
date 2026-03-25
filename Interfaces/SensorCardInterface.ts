interface SensorCardProps {
  id: string;
  title: string;
  unit: string;
  currentValue: number;
  status: string;
  statusColor: string;
  trend: string;
  chartData: { time: string; value: number }[];
  color: string;
}