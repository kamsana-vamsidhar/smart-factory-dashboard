import { useEffect, useMemo, useState } from "react";
import "./App.css";
import StatCard from "./components/StatCard";
import BarChartComponent from "./components/charts/BarChartComponent";
import LineChartComponent from "./components/charts/LineChartComponent";
import PieChartComponent from "./components/charts/PieChartComponent";
import {
  alerts,
  machineStatusSummary,
  machines,
  productionChartData,
  temperatureTrendData,
} from "./data/mockData";
import type { MachineStatus, Role } from "./types";

const App = () => {
  const [selectedRole, setSelectedRole] = useState<Role>("Plant Manager");
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<MachineStatus | "All">("All");
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setLastUpdated(new Date());
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  const isPlantManager = selectedRole === "Plant Manager";

  const visibleMachines = useMemo(() => {
    const roleBasedMachines = isPlantManager
      ? machines
      : machines.filter((machine) => machine.assignedToOperator);

    if (statusFilter === "All") {
      return roleBasedMachines;
    }

    return roleBasedMachines.filter((machine) => machine.status === statusFilter);
  }, [isPlantManager, statusFilter]);

  const visibleAlerts = useMemo(() => {
    const assignedMachineIds = machines
      .filter((machine) => machine.assignedToOperator)
      .map((machine) => machine.id);

    const roleBasedAlerts = isPlantManager
      ? alerts
      : alerts.filter((alert) => assignedMachineIds.includes(alert.machineId));

    return roleBasedAlerts.filter((alert) => {
      const searchValue = searchText.toLowerCase();

      return (
        alert.machineName.toLowerCase().includes(searchValue) ||
        alert.message.toLowerCase().includes(searchValue)
      );
    });
  }, [isPlantManager, searchText]);

  const totalProduction = machines.reduce(
    (total, machine) => total + machine.productionCount,
    0
  );

  const activeMachines = machines.filter(
    (machine) => machine.status === "Running"
  ).length;

  const assignedMachines = machines.filter(
    (machine) => machine.assignedToOperator
  );

  const currentShiftProduction = assignedMachines.reduce(
    (total, machine) => total + machine.productionCount,
    0
  );

  if (isLoading) {
    return (
      <div className="loading-screen">
        <h2>Loading Smart Factory Dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h2>Smart Factory</h2>
        <p>Industrial IoT Dashboard</p>

        <nav>
          <a className="active">Dashboard</a>

        </nav>
      </aside>

      <main className="main-content">
        <header className="header">
          <div>
            <h1>Smart Factory Dashboard</h1>
            <p>Last updated: {lastUpdated.toLocaleTimeString()}</p>
          </div>
          <div style={{ display: "flex", alignItems: "left", marginRight: "60px" }}> 
            <select
            value={selectedRole}
            onChange={(event) => setSelectedRole(event.target.value as Role)}
          >
            <option value="Plant Manager">Plant Manager</option>
            <option value="Machine Operator">Machine Operator</option>
          </select> </div>
        </header>

        <section className="stats-grid">
          {isPlantManager ? (
            <>
              <StatCard title="Total Machines" value={machines.length} />
              <StatCard title="Active Machines" value={activeMachines} />
              <StatCard title="Total Production" value={totalProduction} />
              <StatCard title="Downtime Minutes" value="145" />
            </>
          ) : (
            <>
              <StatCard title="Assigned Machines" value={assignedMachines.length} />
              <StatCard title="Active Alerts" value={visibleAlerts.length} />
              <StatCard
                title="Current Shift Production"
                value={currentShiftProduction}
              />
            </>
          )}
        </section>

        <section className="charts-grid">
          {isPlantManager && (
            <BarChartComponent
              title="Production by Machine"
              data={productionChartData}
              dataKey="production"
              xAxisKey="name"
            />
          )}

          <PieChartComponent
            title="Machine Status Summary"
            data={machineStatusSummary}
            dataKey="value"
            nameKey="name"
          />

          <LineChartComponent
            title="Temperature Trend"
            data={temperatureTrendData}
            dataKey="temperature"
            xAxisKey="name"
          />
        </section>

        <section className="table-card">
          <div className="table-header">
            <h3>Alerts</h3>

            <input
              type="text"
              placeholder="Search alerts..."
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
          </div>

          {visibleAlerts.length === 0 ? (
            <p className="empty-state">No alerts found.</p>
          ) : (
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Machine</th>
                    <th>Message</th>
                    <th>Severity</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleAlerts.map((alert) => (
                    <tr key={alert.id}>
                      <td>{alert.machineName}</td>
                      <td>{alert.message}</td>
                      <td>
                        <span>
                          {alert.severity}
                        </span>
                      </td>
                      <td>{alert.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {isPlantManager && (
          <section className="table-card">
            <div className="table-header">
              <h3>Machine Monitoring</h3>

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value as MachineStatus | "All")
                }
              >
                <option value="All">All Status</option>
                <option value="Running">Running</option>
                <option value="Idle">Idle</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Down">Down</option>
              </select>
            </div>

            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Machine</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Production</th>
                    <th>Temperature</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleMachines.map((machine) => (
                    <tr key={machine.id}>
                      <td>{machine.name}</td>
                      <td>{machine.location}</td>
                      <td>
                        <span>
                          {machine.status}
                        </span>
                      </td>
                      <td>{machine.productionCount}</td>
                      <td>{machine.temperature}°C</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default App;