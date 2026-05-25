import type  { ReactNode } from "react";

export type Role = "Plant Manager" | "Machine Operator";

export type MachineStatus = "Running" | "Idle" | "Maintenance" | "Down";

export type AlertSeverity = "High" | "Medium" | "Low";

export interface Machine {
  id: string;
  name: string;
  status: MachineStatus;
  location: string;
  productionCount: number;
  temperature: number;
  assignedToOperator: boolean;
}

export interface Alert {
  id: string;
  machineId: string;
  machineName: string;
  message: string;
  severity: AlertSeverity;
  time: string;
}

export interface ChartData {
  name: string;
  value?: number;
  production?: number;
  temperature?: number;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
}

export interface BaseChartCardProps {
  title: string;
  children: ReactNode;
}