'use client';

import { useState } from 'react';
import {
  RiskScoreCard,
  CriticalHighCard,
  SlaBreachCard,
  DiscoveryRateCard,
  AssetCoverageCard,
  AssetsAtRiskCard,
  ActionsTile,
  TeamPerformanceCard,
  HeatmapCard,
  DiscoveryTrendsCard,
  RecurrenceCard,
  AgingCard,
  TestTypeCard,
  ExposureCard,
  CustomChartCard,
  ChartBuilderModal,
  ChatPanel,
} from './Components';
import type { CustomChartConfig } from './dashboard-data';

const HEADER_HEIGHT_PX = 64;
const CHROME_PX = HEADER_HEIGHT_PX + 32; // header + page padding + gaps
const USABLE_VH = `(100vh - ${CHROME_PX}px)`;
const ROW1_H = `calc(${USABLE_VH} * 0.24)`;
const ROW2_H = `calc(${USABLE_VH} * 0.40)`;
const ROW3_MIN_H = `calc(${USABLE_VH} * 0.36)`;

export default function DashboardPage() {
  const [builderOpen, setBuilderOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [customCharts, setCustomCharts] = useState<CustomChartConfig[]>([]);

  const handleCreate = (cfg: CustomChartConfig) =>
    setCustomCharts((prev) => [...prev, cfg]);

  const handleRemove = (id: string) =>
    setCustomCharts((prev) => prev.filter((c) => c.id !== id));

  const hasCustom = customCharts.length > 0;

  return (
    <div className="bg-grey5/30 dark:bg-[#060B28]" style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT_PX}px)` }}>
      <main
        className="grid gap-2 p-2"
        style={{
          gridTemplateRows: `${ROW1_H} ${ROW2_H} minmax(${ROW3_MIN_H}, auto)`,
          minHeight: `calc(100vh - ${HEADER_HEIGHT_PX}px)`,
        }}
      >
        {/* Row 1 — slot 7 holds the actions tile (Add Chart + Ask AI) */}
        <div className="grid grid-cols-7 gap-2 min-h-0">
          <RiskScoreCard />
          <CriticalHighCard />
          <SlaBreachCard />
          <DiscoveryRateCard />
          <AssetCoverageCard />
          <AssetsAtRiskCard />
          <ActionsTile
            onAddChart={() => setBuilderOpen(true)}
            onAskAI={() => setChatOpen(true)}
          />
        </div>

        {/* Row 2 */}
        <div
          className="grid gap-2 min-h-0"
          style={{ gridTemplateColumns: '2fr 1.5fr 1.5fr' }}
        >
          <TeamPerformanceCard />
          <HeatmapCard />
          <DiscoveryTrendsCard />
        </div>

        {/* Row 3 — existing 4 charts + custom charts inline */}
        <div
          className="grid grid-cols-4 gap-2"
          style={{
            gridAutoRows: hasCustom ? '240px' : 'minmax(0, 1fr)',
            minHeight: 0,
          }}
        >
          <RecurrenceCard />
          <AgingCard />
          <TestTypeCard />
          <ExposureCard />
          {customCharts.map((c) => (
            <CustomChartCard
              key={c.id}
              config={c}
              onRemove={() => handleRemove(c.id)}
            />
          ))}
        </div>
      </main>

      <ChartBuilderModal
        open={builderOpen}
        onClose={() => setBuilderOpen(false)}
        onCreate={handleCreate}
      />

      <ChatPanel
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        onAddChart={handleCreate}
      />
    </div>
  );
}
