import type { Alert, ChartData, Machine } from "../types";

export const machines: Machine[] = [
  {
    id: "M-101",
    name: "CNC Machine 1",
    status: "Running",
    location: "Line A",
    productionCount: 1240,
    temperature: 72,
    assignedToOperator: true,
  },
  {
    id: "M-102",
    name: "Packaging Unit",
    status: "Idle",
    location: "Line B",
    productionCount: 860,
    temperature: 65,
    assignedToOperator: true,
  },
  {
    id: "M-103",
    name: "Assembly Robot",
    status: "Maintenance",
    location: "Line C",
    productionCount: 530,
    temperature: 80,
    assignedToOperator: false,
  },
  {
    id: "M-105",
    name: "Hydraulic Press",
    status: "Down",
    location: "Line D",
    productionCount: 320,
    temperature: 91,
    assignedToOperator: true,
  },
];

export const alerts: Alert[] = [
  {
    id: "A-001",
    machineId: "M-105",
    machineName: "Hydraulic Press",
    message: "Machine stopped due to pressure overload",
    severity: "High",
    time: "10:15 AM",
  },
  {
    id: "A-002",
    machineId: "M-103",
    machineName: "Assembly Robot",
    message: "Scheduled maintenance pending",
    severity: "Medium",
    time: "09:45 AM",
  },
  {
    id: "A-003",
    machineId: "M-102",
    machineName: "Packaging Unit",
    message: "Low material input detected",
    severity: "Low",
    time: "09:10 AM",
  },
];

export const productionChartData: ChartData[] = [
  { name: "CNC 1", production: 1240 },
  { name: "Packaging", production: 860 },
  { name: "Robot", production: 530 },
  { name: "Drilling", production: 1100 },
  { name: "Press", production: 320 },
];

export const temperatureTrendData: ChartData[] = [
  { name: "8 AM", temperature: 64 },
  { name: "9 AM", temperature: 68 },
  { name: "10 AM", temperature: 72 },
  { name: "11 AM", temperature: 75 },
  { name: "12 PM", temperature: 79 },
  { name: "1 PM", temperature: 76 },
];

export const machineStatusSummary: ChartData[] = [
  { name: "Running", value: 2 },
  { name: "Idle", value: 1 },
  { name: "Maintenance", value: 1 },
  { name: "Down", value: 1 },
];