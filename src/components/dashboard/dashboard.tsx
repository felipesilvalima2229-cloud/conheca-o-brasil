"use client";

import React from "react";
import {
  povertyRate,
  extremePovertyRate,
  giniIndex,
  incomeByRegion,
  povertyByRegion,
  palmaRatio,
  povertyByState,
  literacyRate,
  waterSupplyAccess,
  sewageAccess,
  internetAccessAtHome,
  incomeByRace,
  incomeBySex,
  employmentRate,
  populationEstimates,
  hdiByRegion,
  incomeDistributionByQuintile,
  childPovertyRate,
  elderlyPovertyRate,
  informalEmploymentRate,
  socialProgramBeneficiaries,
  foodInsecurity,
  housingConditions,
  schoolEnrollmentRate,

} from "@/lib/ibge-data";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Chart color palette
const COLORS = [
  "#059669", "#10B981", "#34D399", "#6EE7B7", "#A7F3D0",
  "#D97706", "#F59E0B", "#FBBF24", "#FDE68A",
  "#DC2626", "#EF4444", "#F87171",
  "#7C3AED", "#8B5CF6", "#A78BFA",
  "#2563EB", "#3B82F6", "#60A5FA",
];

const formatPercent = (v: number) => `${v.toFixed(1)}%`;
const formatCurrency = (v: number) => `R$ ${v.toLocaleString("pt-BR")}`;
const formatMillions = (v: number) => `${v.toFixed(1)} mi`;

// Custom tooltip
const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg p-3 text-sm">
        <p className="font-semibold text-gray-700 mb-1">{label}</p>
        {payload.map((entry, i) => (
          <p key={i} style={{ color: entry.color }} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            {entry.name}: {typeof entry.value === "number" ? entry.value.toLocaleString("pt-BR", { maximumFractionDigits: 1 }) : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Stat card component
function StatCard({ title, value, description, trend }: { title: string; value: string; description: string; trend?: "up" | "down" | "neutral" }) {
  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        <div className="flex items-center gap-1 mt-1">
          {trend === "down" && <span className="text-emerald-500 text-xs font-medium">↓</span>}
          {trend === "up" && <span className="text-red-500 text-xs font-medium">↑</span>}
          <p className="text-xs text-gray-400">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

// Section wrapper
function ChartSection({ title, description, children, badge }: { title: string; description?: string; children: React.ReactNode; badge?: string }) {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
          {badge && <Badge variant="secondary" className="text-[10px] bg-emerald-50 text-emerald-700 border-0">{badge}</Badge>}
        </div>
        {description && <CardDescription className="text-xs">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pt-0">{children}</CardContent>
    </Card>
  );
}

export function Dashboard() {
  // Combine poverty data for overlay chart
  const povertyCombined = povertyRate.map((p, i) => ({
    year: p.year,
    pobreza: p.value,
    extremaPobreza: extremePovertyRate[i]?.value || 0,
  }));

  // Gini + Palma combined
  const inequalityCombined = giniIndex.map((g, i) => ({
    year: g.year,
    gini: g.value,
    palma: palmaRatio[i]?.value || 0,
  }));

  // Social indicators combined
  const socialIndicators = literacyRate.map((l, i) => ({
    year: l.year,
    alfabetizacao: l.value,
    agua: waterSupplyAccess[i]?.value || 0,
    esgoto: sewageAccess[i]?.value || 0,
    internet: internetAccessAtHome[i]?.value || 0,
  }));

  // Employment + population combined
  const employmentPop = employmentRate.map((e, i) => ({
    year: e.year,
    emprego: e.value,
  }));

  // Child + elderly poverty
  const vulnerablePoverty = childPovertyRate.map((c) => {
    const elder = elderlyPovertyRate.find((e) => e.year === c.year);
    return {
      year: c.year,
      infantil: c.value,
      idoso: elder?.value || 0,
    };
  });

  // Income by race data for radar
  const raceRadarData = incomeByRace.map((r) => ({
    race: r.race,
    income: r.income,
  }));

  const latestPoverty = povertyRate[povertyRate.length - 1];
  const latestGini = giniIndex[giniIndex.length - 1];
  const latestExtremePoverty = extremePovertyRate[extremePovertyRate.length - 1];
  const latestEmployment = employmentRate[employmentRate.length - 1];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard IBGE</h2>
        <p className="text-gray-500 text-sm mt-1">
          Condições de vida, desigualdade e pobreza no Brasil — Dados PNAD Contínua / Síntese de Indicadores Sociais
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          title="Taxa de Pobreza"
          value={`${latestPoverty.value}%`}
          description={`${latestPoverty.year} • US$ 6,85/dia`}
          trend="down"
        />
        <StatCard
          title="Extrema Pobreza"
          value={`${latestExtremePoverty.value}%`}
          description={`${latestExtremePoverty.year} • US$ 2,15/dia`}
          trend="down"
        />
        <StatCard
          title="Índice de Gini"
          value={latestGini.value.toFixed(3)}
          description={`${latestGini.year} • 0 = igual, 1 = desigual`}
          trend="down"
        />
        <StatCard
          title="Emprego"
          value={`${latestEmployment.value}%`}
          description={`${latestEmployment.year} • Taxa de ocupação`}
          trend="up"
        />
      </div>

      {/* Row 1: Poverty evolution + Regional poverty */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartSection
          title="Evolução da Pobreza e Extrema Pobreza"
          description="Proporção da população abaixo das linhas de pobreza (2012-2024)"
          badge="Série Histórica"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={povertyCombined} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <defs>
                  <linearGradient id="gradPobreza" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D97706" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#D97706" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradExtrema" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#DC2626" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#DC2626" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="pobreza" name="Pobreza" stroke="#D97706" fill="url(#gradPobreza)" strokeWidth={2} />
                <Area type="monotone" dataKey="extremaPobreza" name="Extrema Pobreza" stroke="#DC2626" fill="url(#gradExtrema)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartSection>

        <ChartSection
          title="Pobreza por Região (2024)"
          description="Proporção da população na pobreza por Grande Região"
          badge="Regional"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={povertyByRegion} margin={{ top: 5, right: 5, bottom: 5, left: 5 }} barSize={40}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="region" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" name="Taxa de Pobreza" radius={[6, 6, 0, 0]}>
                  {povertyByRegion.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartSection>
      </div>

      {/* Row 2: Gini + Income by Region */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartSection
          title="Evolução do Índice de Gini"
          description="Medida de desigualdade de renda (0 = igualdade total, 1 = desigualdade total)"
          badge="Desigualdade"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={giniIndex} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <YAxis domain={[0.48, 0.55]} tick={{ fontSize: 11 }} stroke="#9ca3af" tickFormatter={(v) => v.toFixed(2)} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="value" name="Gini" stroke="#059669" strokeWidth={2.5} dot={{ r: 4, fill: "#059669" }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartSection>

        <ChartSection
          title="Rendimento Médio por Região"
          description="Rendimento médio mensal domiciliar per capita (R$)"
          badge="Renda"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incomeByRegion} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 80 }} barSize={24}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11 }} stroke="#9ca3af" tickFormatter={(v) => `R$${v}`} />
                <YAxis dataKey="region" type="category" tick={{ fontSize: 11 }} stroke="#9ca3af" width={75} />
                <Tooltip content={<CustomTooltip />} formatter={(v: number) => formatCurrency(v)} />
                <Bar dataKey="income" name="Rendimento" radius={[0, 6, 6, 0]}>
                  {incomeByRegion.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartSection>
      </div>

      {/* Row 3: Inequality (Palma + Gini combined) + Poverty by State */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartSection
          title="Desigualdade: Gini e Razão de Palma"
          description="Razão entre rendimentos dos 10% mais ricos e 40% mais pobres"
          badge="Desigualdade"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={inequalityCombined} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <YAxis yAxisId="left" tick={{ fontSize: 11 }} stroke="#9ca3af" domain={[0.48, 0.55]} tickFormatter={(v) => v.toFixed(2)} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                <Line yAxisId="left" type="monotone" dataKey="gini" name="Índice de Gini" stroke="#059669" strokeWidth={2.5} dot={{ r: 3 }} />
                <Bar yAxisId="right" dataKey="palma" name="Razão de Palma" fill="#F59E0B" radius={[4, 4, 0, 0]} barSize={20} opacity={0.7} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </ChartSection>

        <ChartSection
          title="Top 10 Estados com Maior Taxa de Pobreza"
          description="Proporção da população na pobreza por UF (2024)"
          badge="Estados"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={povertyByState} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 70 }} barSize={18}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11 }} stroke="#9ca3af" tickFormatter={(v) => `${v}%`} />
                <YAxis dataKey="state" type="category" tick={{ fontSize: 11 }} stroke="#9ca3af" width={65} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="rate" name="Taxa de Pobreza" radius={[0, 4, 4, 0]}>
                  {povertyByState.map((_, i) => (
                    <Cell key={i} fill={i < 3 ? "#DC2626" : i < 6 ? "#F59E0B" : "#059669"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartSection>
      </div>

      {/* Row 4: Income by Race + Income by Sex */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartSection
          title="Rendimento Médio por Cor/Raça"
          description="Rendimento médio mensal por cor ou raça (2024)"
          badge="Racial"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incomeByRace} margin={{ top: 5, right: 5, bottom: 5, left: 5 }} barSize={40}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="race" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" tickFormatter={(v) => `R$${v}`} />
                <Tooltip content={<CustomTooltip />} formatter={(v: number) => formatCurrency(v)} />
                <Bar dataKey="income" name="Rendimento" radius={[6, 6, 0, 0]}>
                  {incomeByRace.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartSection>

        <ChartSection
          title="Rendimento Médio por Sexo"
          description="Rendimento médio mensal por sexo (2024)"
          badge="Gênero"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incomeBySex} margin={{ top: 5, right: 5, bottom: 5, left: 5 }} barSize={60}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="sex" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" tickFormatter={(v) => `R$${v}`} />
                <Tooltip content={<CustomTooltip />} formatter={(v: number) => formatCurrency(v)} />
                <Bar dataKey="income" name="Rendimento" radius={[6, 6, 0, 0]}>
                  <Cell fill="#2563EB" />
                  <Cell fill="#E11D8D" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartSection>
      </div>

      {/* Row 5: Social Indicators + Income Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartSection
          title="Indicadores Sociais"
          description="Evolução dos indicadores de infraestrutura e educação (%)"
          badge="Social"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={socialIndicators} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="alfabetizacao" name="Alfabetização" stroke="#059669" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="agua" name="Água" stroke="#2563EB" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="esgoto" name="Esgoto" stroke="#D97706" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="internet" name="Internet" stroke="#7C3AED" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartSection>

        <ChartSection
          title="Distribuição de Renda por Quintil"
          description="Participação na renda total por faixa (2024)"
          badge="Distribuição"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={incomeDistributionByQuintile}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={50}
                  dataKey="percentage"
                  nameKey="label"
                  label={({ label, percentage }) => `${label}: ${percentage}%`}
                  labelLine={{ stroke: "#9ca3af" }}
                  paddingAngle={2}
                >
                  {incomeDistributionByQuintile.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartSection>
      </div>

      {/* Row 6: Employment + Population */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartSection
          title="Taxa de Emprego"
          description="Proporção da população ocupada (2012-2024)"
          badge="Trabalho"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={employmentPop} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <defs>
                  <linearGradient id="gradEmprego" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="emprego" name="Taxa de Emprego" stroke="#059669" fill="url(#gradEmprego)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartSection>

        <ChartSection
          title="População Brasileira"
          description="Estimativa populacional em milhões (2012-2024)"
          badge="Demografia"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={populationEstimates} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <YAxis domain={[195, 220]} tick={{ fontSize: 11 }} stroke="#9ca3af" tickFormatter={(v) => `${v} mi`} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="value" name="População (mi)" stroke="#7C3AED" strokeWidth={2.5} dot={{ r: 4, fill: "#7C3AED" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartSection>
      </div>

      {/* Row 7: Child + Elderly Poverty + HDI by Region */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartSection
          title="Pobreza Infantil e de Idosos"
          description="Taxa de pobreza por faixa etária (%)"
          badge="Vulneráveis"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={vulnerablePoverty} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="infantil" name="Crianças (0-14)" stroke="#F59E0B" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="idoso" name="Idosos (65+)" stroke="#059669" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartSection>

        <ChartSection
          title="IDH por Região"
          description="Índice de Desenvolvimento Humano por Grande Região"
          badge="Desenvolvimento"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={hdiByRegion} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="region" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis angle={90} domain={[0.6, 0.8]} tick={{ fontSize: 10 }} />
                <Radar name="IDH" dataKey="value" stroke="#059669" fill="#059669" fillOpacity={0.25} strokeWidth={2} />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </ChartSection>
      </div>

      {/* Row 8: Informal Employment + Food Insecurity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartSection
          title="Emprego Informal"
          description="Taxa de informalidade no mercado de trabalho (%)"
          badge="Trabalho"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={informalEmploymentRate} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <defs>
                  <linearGradient id="gradInformal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#DC2626" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#DC2626" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" name="Taxa Informal" stroke="#DC2626" fill="url(#gradInformal)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartSection>

        <ChartSection
          title="Insegurança Alimentar"
          description="População com insegurança alimentar moderada ou grave (%)"
          badge="Alimentação"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={foodInsecurity} margin={{ top: 5, right: 5, bottom: 5, left: 5 }} barSize={35}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" name="Insegurança Alimentar" radius={[6, 6, 0, 0]}>
                  {foodInsecurity.map((d, i) => (
                    <Cell key={i} fill={d.value > 28 ? "#DC2626" : d.value > 24 ? "#F59E0B" : "#059669"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartSection>
      </div>

      {/* Row 9: Social Programs + Housing + School Enrollment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartSection
          title="Beneficiários de Programas Sociais"
          description="Bolsa Família / Auxílio Brasil (milhões)"
          badge="Política Social"
        >
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={socialProgramBeneficiaries} margin={{ top: 5, right: 5, bottom: 5, left: 5 }} barSize={25}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" tick={{ fontSize: 10 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 10 }} stroke="#9ca3af" tickFormatter={(v) => `${v} mi`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" name="Beneficiários" radius={[4, 4, 0, 0]}>
                  {socialProgramBeneficiaries.map((_, i) => (
                    <Cell key={i} fill="#059669" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartSection>

        <ChartSection
          title="Habitação Adequada"
          description="Domicílios com condições adequadas (%)"
          badge="Habitação"
        >
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={housingConditions} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <defs>
                  <linearGradient id="gradHab" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" tick={{ fontSize: 10 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 10 }} stroke="#9ca3af" tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" name="Habitação Adequada" stroke="#059669" fill="url(#gradHab)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartSection>

        <ChartSection
          title="Matrícula Escolar (6-14 anos)"
          description="Taxa de frequência escolar (%)"
          badge="Educação"
        >
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={schoolEnrollmentRate} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" tick={{ fontSize: 10 }} stroke="#9ca3af" />
                <YAxis domain={[96, 100]} tick={{ fontSize: 10 }} stroke="#9ca3af" tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="value" name="Matrícula" stroke="#7C3AED" strokeWidth={2.5} dot={{ r: 4, fill: "#7C3AED" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartSection>
      </div>

      {/* Row 10: Income by Race Radar + Summary Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartSection
          title="Renda por Cor/Raça (Radar)"
          description="Comparação do rendimento médio por grupo racial"
          badge="Racial"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={raceRadarData} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="race" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `R$${v}`} />
                <Radar name="Rendimento" dataKey="income" stroke="#D97706" fill="#D97706" fillOpacity={0.25} strokeWidth={2} />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </ChartSection>

        <ChartSection
          title="Resumo: Indicadores-Chave (2024)"
          description="Comparação dos principais indicadores socioeconômicos"
          badge="Resumo"
        >
          <div className="space-y-4 p-2">
            {[
              { label: "Taxa de Pobreza", value: "23,1%", trend: "down", color: "emerald" },
              { label: "Extrema Pobreza", value: "3,5%", trend: "down", color: "emerald" },
              { label: "Índice de Gini", value: "0,504", trend: "down", color: "emerald" },
              { label: "Razão de Palma", value: "13,4", trend: "down", color: "emerald" },
              { label: "Taxa de Emprego", value: "58,5%", trend: "up", color: "emerald" },
              { label: "Alfabetização", value: "95,2%", trend: "up", color: "emerald" },
              { label: "Internet em Casa", value: "87,5%", trend: "up", color: "emerald" },
              { label: "Pobreza Infantil", value: "23,8%", trend: "down", color: "amber" },
              { label: "Habitação Adequada", value: "77,5%", trend: "up", color: "emerald" },
              { label: "Insegurança Alimentar", value: "23,1%", trend: "down", color: "amber" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                <span className="text-sm text-gray-600">{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">{item.value}</span>
                  <span className={`text-xs ${item.color === "emerald" ? "text-emerald-500" : "text-amber-500"}`}>
                    {item.trend === "down" ? "↓" : "↑"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ChartSection>
      </div>

      {/* Source */}
      <p className="text-center text-xs text-gray-400 pt-4">
        Fonte: IBGE — Síntese de Indicadores Sociais 2024 / PNAD Contínua / Censo Demográfico 2022
      </p>
    </div>
  );
}
