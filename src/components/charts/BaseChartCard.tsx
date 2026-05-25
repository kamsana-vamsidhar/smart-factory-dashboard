import type { BaseChartCardProps } from "../../types";


const BaseChartCard = ({ title, children }: BaseChartCardProps) => {
  return (
    <div className="chart-card">
      <h3>{title}</h3>
      <div className="chart-wrapper">{children}</div>
    </div>
  );
};

export default BaseChartCard;