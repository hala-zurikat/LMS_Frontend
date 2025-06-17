// src/components/common/Chart.jsx
import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function Chart({ data, dataKey, title, barColor }) {
  return (
    <div style={{ width: "100%", height: 300, marginTop: 20 }}>
      <h3 style={{ textAlign: "center", marginBottom: 10 }}>{title}</h3>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey={dataKey} fill={barColor || "#00adb5"} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
