import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ChartData } from "../../types";
import BaseChartCard from "./BaseChartCard";

interface LineChartComponentProps {
  data: ChartData[];
  dataKey: keyof ChartData;
  xAxisKey: keyof ChartData;
  title: string;
}

const LineChartComponent = ({
  data,
  dataKey,
  xAxisKey,
  title,
}: LineChartComponentProps) => {
  return (
    <BaseChartCard title={title}>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisKey as string} />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey={dataKey as string}
            stroke="#dc2626"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </BaseChartCard>
  );
};

export default LineChartComponent;