import type { StatCardProps } from "../types";

const StatCard = ({ title, value, subtitle }: StatCardProps) => {
  return (
    <div className="stat-card">
      <p>{title}</p>
      <h2>{value}</h2>
      {subtitle && <span>{subtitle}</span>}
    </div>
  );
};

export default StatCard;