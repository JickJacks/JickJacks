import { useMemo, useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import type { PriceHistoryPoint } from "../types/game";

const ranges = [
  { label: "7 Days", points: 2 },
  { label: "30 Days", points: 5 },
  { label: "90 Days", points: 12 },
  { label: "All Time", points: 100 },
];

const colors = ["#6366f1", "#10b981", "#f59e0b", "#8b5cf6", "#06b6d4"];

export default function PriceHistoryChart({ data }: { data: PriceHistoryPoint[] }) {
  const [range, setRange] = useState(ranges[2]);

  const trimmedData = useMemo(() => {
    if (range.label === "All Time") {
      return data;
    }
    return data.slice(Math.max(data.length - range.points, 0));
  }, [data, range]);

  const storeKeys = Object.keys(data[0] ?? {}).filter((key) => key !== "date");

  return (
    <div className="mt-8 rounded-lg border border-border-color bg-bg-surface/70 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-text-primary">Price History</h2>
        <div className="flex flex-wrap gap-2">
          {ranges.map((item) => (
            <button
              key={item.label}
              onClick={() => setRange(item)}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                item.label === range.label
                  ? "bg-accent-primary text-white"
                  : "border border-border-color text-text-secondary"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trimmedData}>
            <XAxis dataKey="date" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#13131f",
                borderColor: "#2d2d44",
                borderRadius: "8px",
              }}
            />
            <Legend />
            {storeKeys.map((store, index) => (
              <Line
                key={store}
                type="monotone"
                dataKey={store}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
