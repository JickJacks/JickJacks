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
import { useTranslation } from "../hooks/useTranslation";

const ranges = [
  { key: "7_days", points: 2 },
  { key: "30_days", points: 5 },
  { key: "90_days", points: 12 },
  { key: "all_time", points: 100 },
] as const;

const colors = ["#6366f1", "#10b981", "#f59e0b", "#8b5cf6", "#06b6d4"];

export default function PriceHistoryChart({ data }: { data: PriceHistoryPoint[] }) {
  type RangeOption = (typeof ranges)[number];
  const [range, setRange] = useState<RangeOption>(ranges[2]);
  const { t } = useTranslation();

  const trimmedData = useMemo(() => {
    if (range.key === "all_time") {
      return data;
    }
    return data.slice(Math.max(data.length - range.points, 0));
  }, [data, range]);

  const storeKeys = Object.keys(data[0] ?? {}).filter((key) => key !== "date");

  return (
    <div className="mt-8 rounded-lg border border-border-color bg-bg-surface/70 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-text-primary">{t("price_history_title")}</h2>
        <div className="flex flex-wrap gap-2">
          {ranges.map((item) => (
            <button
              key={item.key}
              onClick={() => setRange(item)}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                item.key === range.key
                  ? "bg-accent-primary text-white"
                  : "border border-border-color text-text-secondary"
              }`}
            >
              {item.key === "7_days"
                ? t("price_history_7_days")
                : item.key === "30_days"
                  ? t("price_history_30_days")
                  : item.key === "90_days"
                    ? t("price_history_90_days")
                    : t("price_history_all_time")}
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
