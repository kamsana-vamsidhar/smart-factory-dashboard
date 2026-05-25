import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { ChartData } from "../../types";
import BaseChartCard from "./BaseChartCard";

interface PieChartComponentProps {
  data: ChartData[];
  dataKey: keyof ChartData;
  nameKey: keyof ChartData;
  title: string;
}

const COLORS = ["#16a34a", "#f59e0b", "#6366f1", "#dc2626"];

const PieChartComponent = ({
  data,
  dataKey,
  nameKey,
  title,
}: PieChartComponentProps) => {
  return (
    <BaseChartCard title={title}>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey={dataKey as string}
            nameKey={nameKey as string}
            cx="50%"
            cy="50%"
            outerRadius={85}
            label
          >
            {data.map((item, index) => (
              <Cell key={item.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </BaseChartCard>
  );
};

export default PieChartComponent;