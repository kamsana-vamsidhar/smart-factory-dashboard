import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ChartData } from "../../types";
import BaseChartCard from "./BaseChartCard";

interface BarChartComponentProps {
  data: ChartData[];
  dataKey: keyof ChartData;
  xAxisKey: keyof ChartData;
  title: string;
}

const BarChartComponent = ({
  data,
  dataKey,
  xAxisKey,
  title,
}: BarChartComponentProps) => {
  return (
    <BaseChartCard title={title}>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisKey as string} />
          <YAxis />
          <Tooltip />
          <Bar dataKey={dataKey as string} fill="#2563eb" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </BaseChartCard>
  );
};

export default BarChartComponent;