import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { KpiCard } from '../../components/ui/KpiCard';
import { Icon } from '../../components/ui/Icon';
import { Badge } from '../../components/ui/Badge';
import { BarChart } from '../../components/charts/BarChart';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { monthlyRevenue } from '../../data/kpis';

/* ------------------------------------------------------------------ */
/*  Local data for analytics visualizations                           */
/* ------------------------------------------------------------------ */

const dateRanges = ['7 jours', '30 jours', '3 mois', '6 mois', '1 an'] as const;
type DateRange = (typeof dateRanges)[number];

const servicePerformance = [
  { name: 'Massage Suédois Signature', sessions: 124, revenue: 11780, share: 27, trend: +4.2 },
  { name: 'Deep Tissue Therapy', sessions: 98, revenue: 12740, share: 22, trend: +8.1 },
  { name: 'Rituel Hammam Royal', sessions: 64, revenue: 11520, share: 18, trend: +2.5 },
  { name: 'Massage aux Pierres Chaudes', sessions: 53, revenue: 5830, share: 14, trend: -1.3 },
  { name: 'Réflexologie Plantaire', sessions: 47, revenue: 3290, share: 11, trend: +6.0 },
  { name: 'Aromathérapie Relaxante', sessions: 38, revenue: 2470, share: 8, trend: +3.8 },
];

const weeklyComparison = [
  { label: 'Sem. 1', current: 9200, previous: 8100 },
  { label: 'Sem. 2', current: 10800, previous: 9400 },
  { label: 'Sem. 3', current: 11400, previous: 10100 },
  { label: 'Sem. 4', current: 11450, previous: 10900 },
];

const clientSegments = [
  { label: 'Nouveaux', value: 42, color: 'bg-primary' },
  { label: 'Réguliers', value: 68, color: 'bg-primary-container' },
  { label: 'Fidèles (Gold)', value: 34, color: 'bg-tertiary' },
  { label: 'Inactifs (>90j)', value: 18, color: 'bg-outline-variant' },
];

const satisfactionData = [
  { label: '5 stars', value: 64 },
  { label: '4 stars', value: 24 },
  { label: '3 stars', value: 8 },
  { label: '2 stars', value: 3 },
  { label: '1 star', value: 1 },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function DateChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
        active
          ? 'bg-primary text-on-primary scale-[1.02] shadow-sm'
          : 'bg-secondary-fixed text-on-secondary-fixed-variant hover:brightness-95'
      }`}
    >
      {label}
    </button>
  );
}

function RevenueChart() {
  return (
    <Card className="col-span-12 lg:col-span-8 p-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">
            Chiffre d'Affaires Mensuel
          </p>
          <h4 className="text-2xl font-semibold text-primary">
            42 850,00 €{' '}
            <span className="text-sm font-normal text-primary-container ml-2">
              +12.4% vs mois dernier
            </span>
          </h4>
        </div>
        <div className="flex gap-3 items-center">
          <span className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant">
            <span className="w-3 h-3 rounded-sm bg-primary inline-block" />
            2024
          </span>
          <span className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant">
            <span className="w-3 h-3 rounded-sm bg-secondary-container inline-block" />
            2023
          </span>
        </div>
      </div>

      {/* Chart area */}
      <div className="h-64 w-full flex items-end justify-between gap-2 px-2 pb-2">
        {monthlyRevenue.map((m) => {
          const maxRev = Math.max(...monthlyRevenue.map((r) => Math.max(r.revenue, r.forecast ?? 0)));
          const revHeight = (m.revenue / maxRev) * 100;
          const prevHeight = m.forecast ? (m.forecast / maxRev) * 100 : 0;

          return (
            <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex items-end justify-center gap-[2px] h-52">
                {/* N-1 bar */}
                {m.forecast && (
                  <div
                    className="w-1/2 rounded-t-lg bg-secondary-container hover:bg-secondary-container/80 transition-all duration-500 cursor-pointer relative group"
                    style={{ height: `${prevHeight}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      {m.forecast.toLocaleString('fr-FR')} €
                    </div>
                  </div>
                )}
                {/* Current year bar */}
                <div
                  className="w-1/2 rounded-t-lg bg-primary hover:bg-primary/80 transition-all duration-500 cursor-pointer relative group"
                  style={{ height: `${revHeight}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {m.revenue.toLocaleString('fr-FR')} €
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-bold text-outline uppercase tracking-tighter">
                {m.month}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function ClientMetricsCard() {
  const totalClients = clientSegments.reduce((sum, s) => sum + s.value, 0);

  return (
    <Card className="col-span-12 lg:col-span-4 p-6 space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
          Répartition Clients
        </p>
        <Icon name="group" size="md" className="text-primary-container" />
      </div>

      <div className="space-y-4">
        {clientSegments.map((seg) => {
          const pct = Math.round((seg.value / totalClients) * 100);
          return (
            <div key={seg.label} className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-on-surface">{seg.label}</span>
                <span className="font-semibold text-on-surface-variant">
                  {seg.value}{' '}
                  <span className="text-xs text-outline">({pct}%)</span>
                </span>
              </div>
              <div className="w-full bg-outline-variant/20 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`${seg.color} h-full rounded-full transition-all duration-700`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-2 border-t border-outline-variant/15">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-on-surface-variant">Total actifs</span>
          <span className="text-lg font-semibold text-primary">
            {totalClients - clientSegments[3].value}
          </span>
        </div>
      </div>
    </Card>
  );
}

function ServicePerformanceCard() {
  return (
    <Card className="col-span-12 lg:col-span-8 p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">
            Performance des Services
          </p>
          <p className="text-sm text-on-surface-variant">
            Top prestations par nombre de séances et chiffre d'affaires
          </p>
        </div>
        <Icon name="spa" size="md" className="text-primary-container" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
              <th className="text-left pb-3 pr-4">Service</th>
              <th className="text-right pb-3 px-4">Séances</th>
              <th className="text-right pb-3 px-4">Revenus</th>
              <th className="text-right pb-3 px-4">Part</th>
              <th className="text-right pb-3 pl-4">Tendance</th>
            </tr>
          </thead>
          <tbody className="divide-y-0">
            {servicePerformance.map((svc, idx) => (
              <tr key={svc.name} className="group">
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-outline w-5">{idx + 1}</span>
                    <span className="font-medium text-on-surface">{svc.name}</span>
                  </div>
                </td>
                <td className="text-right py-3 px-4 text-on-surface-variant font-medium">
                  {svc.sessions}
                </td>
                <td className="text-right py-3 px-4 font-semibold text-on-surface">
                  {svc.revenue.toLocaleString('fr-FR')} €
                </td>
                <td className="text-right py-3 px-4">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-16 bg-outline-variant/20 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full"
                        style={{ width: `${svc.share}%` }}
                      />
                    </div>
                    <span className="text-xs text-on-surface-variant font-medium w-8 text-right">
                      {svc.share}%
                    </span>
                  </div>
                </td>
                <td className="text-right py-3 pl-4">
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-semibold ${
                      svc.trend >= 0 ? 'text-primary' : 'text-error'
                    }`}
                  >
                    <Icon
                      name={svc.trend >= 0 ? 'trending_up' : 'trending_down'}
                      size="sm"
                    />
                    {svc.trend >= 0 ? '+' : ''}
                    {svc.trend}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function SatisfactionCard() {
  const total = satisfactionData.reduce((s, d) => s + d.value, 0);
  const avg = (
    satisfactionData.reduce((s, d, i) => s + d.value * (5 - i), 0) / total
  ).toFixed(1);

  return (
    <Card className="col-span-12 lg:col-span-4 p-6 space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
          Satisfaction Client
        </p>
        <Icon name="sentiment_satisfied" size="md" className="text-primary-container" />
      </div>

      <div className="text-center py-2">
        <p className="text-4xl font-light text-primary">{avg}</p>
        <div className="flex justify-center gap-0.5 mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Icon
              key={star}
              name="star"
              size="sm"
              filled={star <= Math.round(Number(avg))}
              className={
                star <= Math.round(Number(avg))
                  ? 'text-tertiary'
                  : 'text-outline-variant/40'
              }
            />
          ))}
        </div>
        <p className="text-xs text-on-surface-variant mt-1">
          Basé sur {total} avis
        </p>
      </div>

      <div className="space-y-2">
        {satisfactionData.map((row, i) => {
          const pct = Math.round((row.value / total) * 100);
          return (
            <div key={row.label} className="flex items-center gap-3">
              <span className="text-xs font-semibold text-on-surface-variant w-3 text-right">
                {5 - i}
              </span>
              <Icon name="star" size="sm" className="text-tertiary" filled />
              <div className="flex-1 bg-outline-variant/20 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-tertiary/70 h-full rounded-full transition-all duration-700"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-xs font-medium text-on-surface-variant w-8 text-right">
                {pct}%
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function ComparativeAnalysisCard() {
  const maxVal = Math.max(
    ...weeklyComparison.flatMap((w) => [w.current, w.previous])
  );

  return (
    <Card className="col-span-12 lg:col-span-6 p-6 space-y-5">
      <div>
        <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">
          Analyse Comparative
        </p>
        <p className="text-sm text-on-surface-variant">
          Ce mois vs mois précédent, par semaine
        </p>
      </div>

      <div className="flex gap-3 mb-2">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-primary" />
          <span className="text-xs font-medium text-on-surface-variant">Ce mois</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-primary/20" />
          <span className="text-xs font-medium text-on-surface-variant">Mois précédent</span>
        </div>
      </div>

      <div className="flex items-end gap-4 h-40">
        {weeklyComparison.map((w) => (
          <div key={w.label} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full flex items-end justify-center gap-1 h-32">
              <div
                className="w-2/5 bg-primary rounded-t-lg transition-all duration-500"
                style={{ height: `${(w.current / maxVal) * 100}%` }}
              />
              <div
                className="w-2/5 bg-primary/20 rounded-t-lg transition-all duration-500"
                style={{ height: `${(w.previous / maxVal) * 100}%` }}
              />
            </div>
            <span className="text-[10px] font-bold text-outline uppercase tracking-tighter">
              {w.label}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-outline-variant/15">
        <div>
          <p className="text-xs text-on-surface-variant">Total ce mois</p>
          <p className="text-lg font-semibold text-primary">
            {weeklyComparison
              .reduce((s, w) => s + w.current, 0)
              .toLocaleString('fr-FR')}{' '}
            €
          </p>
        </div>
        <div>
          <p className="text-xs text-on-surface-variant">Variation</p>
          <p className="text-lg font-semibold text-primary flex items-center gap-1">
            <Icon name="trending_up" size="sm" />
            +10.8%
          </p>
        </div>
      </div>
    </Card>
  );
}

function OccupancyCard() {
  const days = [
    { label: 'Lun', rate: 72 },
    { label: 'Mar', rate: 85 },
    { label: 'Mer', rate: 92 },
    { label: 'Jeu', rate: 78 },
    { label: 'Ven', rate: 96 },
    { label: 'Sam', rate: 100 },
    { label: 'Dim', rate: 45 },
  ];

  return (
    <Card className="col-span-12 lg:col-span-6 p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">
            Taux d'Occupation
          </p>
          <p className="text-sm text-on-surface-variant">
            Moyenne hebdomadaire par jour
          </p>
        </div>
        <div className="bg-secondary-container p-3 rounded-full">
          <Icon name="event_available" size="md" className="text-on-secondary-container" />
        </div>
      </div>

      <div className="text-center py-1">
        <p className="text-4xl font-light text-primary">88%</p>
        <p className="text-xs text-on-surface-variant mt-1">Taux moyen ce mois</p>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((d) => {
          const intensity =
            d.rate >= 90
              ? 'bg-primary text-on-primary'
              : d.rate >= 70
                ? 'bg-primary/40 text-on-surface'
                : 'bg-primary/15 text-on-surface-variant';
          return (
            <div key={d.label} className="flex flex-col items-center gap-1.5">
              <div
                className={`w-full aspect-square rounded-lg flex items-center justify-center text-xs font-bold ${intensity}`}
              >
                {d.rate}%
              </div>
              <span className="text-[10px] font-bold text-outline uppercase">
                {d.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between items-center pt-2 border-t border-outline-variant/15">
        <div className="flex gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-primary" />
            <span className="text-[10px] text-on-surface-variant">≥90%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-primary/40" />
            <span className="text-[10px] text-on-surface-variant">70-89%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-primary/15" />
            <span className="text-[10px] text-on-surface-variant">{'<'}70%</span>
          </div>
        </div>
        <span className="text-xs font-semibold text-primary flex items-center gap-1">
          <Icon name="trending_up" size="sm" />
          +3.2% vs sem. dern.
        </span>
      </div>
    </Card>
  );
}

function TopCategoriesCard() {
  const categories = [
    { name: 'Rituels Signature', revenue: 36040, sessions: 286, pct: 52 },
    { name: 'Wellness Experiences', revenue: 14950, sessions: 160, pct: 33 },
    { name: 'Express', revenue: 7710, sessions: 114, pct: 15 },
  ];

  return (
    <Card className="col-span-12 lg:col-span-4 p-6 space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
          Catégories de Services
        </p>
        <Icon name="category" size="md" className="text-primary-container" />
      </div>

      <div className="space-y-4">
        {categories.map((cat, idx) => (
          <div key={cat.name} className="space-y-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <Badge
                  variant={idx === 0 ? 'gold' : idx === 1 ? 'silver' : 'tertiary'}
                >
                  #{idx + 1}
                </Badge>
                <span className="font-medium text-sm text-on-surface">{cat.name}</span>
              </div>
              <span className="text-sm font-semibold text-primary">
                {cat.revenue.toLocaleString('fr-FR')} €
              </span>
            </div>
            <div className="flex items-center gap-3">
              <ProgressBar value={cat.pct} className="flex-1" />
              <span className="text-xs text-on-surface-variant font-medium">{cat.pct}%</span>
            </div>
            <p className="text-xs text-outline">{cat.sessions} séances ce mois</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page component                                                */
/* ------------------------------------------------------------------ */

export function AnalyticsPage() {
  const [activeRange, setActiveRange] = useState<DateRange>('30 jours');

  return (
    <div className="px-10 pb-12 pt-6 space-y-10">
      {/* Hero header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h3 className="font-headline text-3xl font-light text-on-surface tracking-tight">
            Performance du Sanctuaire
          </h3>
          <p className="text-on-surface-variant font-medium">
            Aperçu consolidé des activités de bien-être pour la période actuelle.
          </p>
        </div>
        <Button variant="primary" icon="file_download">
          Exporter le Rapport
        </Button>
      </div>

      {/* Date range chips */}
      <div className="flex flex-wrap gap-2">
        {dateRanges.map((range) => (
          <DateChip
            key={range}
            label={range}
            active={activeRange === range}
            onClick={() => setActiveRange(range)}
          />
        ))}
      </div>

      {/* KPI summary row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          label="Chiffre d'Affaires"
          value="42 850 €"
          change="+12.4% vs mois dernier"
          changeDirection="up"
          icon="payments"
        />
        <KpiCard
          label="Séances Réalisées"
          value="562"
          change="+8.2% vs mois dernier"
          changeDirection="up"
          icon="event_available"
        />
        <KpiCard
          label="Nouveaux Clients"
          value="42"
          change="+15.3% vs mois dernier"
          changeDirection="up"
          icon="person_add"
        />
        <KpiCard
          label="Taux de Fidélisation"
          value="88%"
          change="+2.1% vs mois dernier"
          changeDirection="up"
          icon="loyalty"
        />
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Row 1: Main revenue chart + client segments */}
        <RevenueChart />
        <ClientMetricsCard />

        {/* Row 2: Service performance table + satisfaction */}
        <ServicePerformanceCard />
        <SatisfactionCard />

        {/* Row 3: Comparative + Occupancy */}
        <ComparativeAnalysisCard />
        <OccupancyCard />

        {/* Row 4: Category breakdown (full width would be 12, using partial) */}
        <TopCategoriesCard />

        {/* Trend summary card */}
        <Card className="col-span-12 lg:col-span-8 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">
                Tendance Annuelle des Revenus
              </p>
              <p className="text-sm text-on-surface-variant">
                Évolution sur les 12 derniers mois
              </p>
            </div>
            <Badge variant="primary">2023</Badge>
          </div>

          <BarChart
            data={monthlyRevenue.map((m) => ({
              label: m.month,
              value: m.revenue,
              highlight: m.month === 'Dec' || m.month === 'Jul',
            }))}
            className="h-44"
          />

          <div className="flex flex-wrap gap-6 pt-2 border-t border-outline-variant/15">
            <div>
              <p className="text-xs text-on-surface-variant">Revenu annuel total</p>
              <p className="text-lg font-semibold text-primary">
                {monthlyRevenue
                  .reduce((s, m) => s + m.revenue, 0)
                  .toLocaleString('fr-FR')}{' '}
                €
              </p>
            </div>
            <div>
              <p className="text-xs text-on-surface-variant">Moyenne mensuelle</p>
              <p className="text-lg font-semibold text-on-surface">
                {Math.round(
                  monthlyRevenue.reduce((s, m) => s + m.revenue, 0) / 12
                ).toLocaleString('fr-FR')}{' '}
                €
              </p>
            </div>
            <div>
              <p className="text-xs text-on-surface-variant">Meilleur mois</p>
              <p className="text-lg font-semibold text-on-surface flex items-center gap-1">
                <Icon name="emoji_events" size="sm" className="text-tertiary" />
                Décembre —{' '}
                {Math.max(...monthlyRevenue.map((m) => m.revenue)).toLocaleString(
                  'fr-FR'
                )}{' '}
                €
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
