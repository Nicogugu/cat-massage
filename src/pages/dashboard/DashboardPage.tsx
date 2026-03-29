import { PageHeader } from '../../components/ui/PageHeader';
import { KpiCard } from '../../components/ui/KpiCard';
import { Card } from '../../components/ui/Card';
import { Icon } from '../../components/ui/Icon';
import { Badge } from '../../components/ui/Badge';

import { BarChart } from '../../components/charts/BarChart';
import { appointments } from '../../data/appointments';
import { kpiData, monthlyRevenue } from '../../data/kpis';

/* ------------------------------------------------------------------ */
/*  Local sub-components                                               */
/* ------------------------------------------------------------------ */

function DatePill() {
  const now = new Date();
  const formatted = now.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
  // Capitalize first letter
  const label = formatted.charAt(0).toUpperCase() + formatted.slice(1);

  return (
    <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-surface-container-high rounded-lg text-sm font-semibold text-on-surface">
      <Icon name="calendar_today" size="sm" />
      <span>{label}</span>
    </div>
  );
}

/** Small KPI card used in the mobile bento grid (Confirmés / Occupation) */
function MiniKpiCard({
  label,
  value,
  unit,
  fillPercent,
  barColor = 'bg-primary',
}: {
  label: string;
  value: string;
  unit: string;
  fillPercent: number;
  barColor?: string;
}) {
  return (
    <div className="bg-surface-container-low p-5 rounded-xl space-y-2">
      <p className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-widest">
        {label}
      </p>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-medium text-on-surface">{value}</span>
        <span className="text-on-surface-variant text-xs">{unit}</span>
      </div>
      <div className="w-full bg-outline-variant/20 h-1.5 rounded-full overflow-hidden">
        <div
          className={`${barColor} h-full rounded-full transition-all duration-500`}
          style={{ width: `${fillPercent}%` }}
        />
      </div>
    </div>
  );
}

/** A single appointment row */
function AppointmentRow({
  clientName,
  service,
  startTime,
  duration,
  color,
  status,
  isNow = false,
}: {
  clientName: string;
  service: string;
  startTime: string;
  duration: number;
  color: string;
  status: string;
  isNow?: boolean;
}) {
  const borderColor = color.replace('bg-', 'border-');

  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-xl transition-all custom-shadow ${
        isNow
          ? 'bg-primary text-on-primary ring-2 ring-primary/20'
          : 'bg-surface-container-lowest hover:bg-surface-container'
      } border-l-[5px] ${isNow ? 'border-accent-gold' : borderColor}`}
    >
      {/* Time block — dark background */}
      <div className={`flex flex-col items-center justify-center w-16 h-16 rounded-xl shrink-0 ${
        isNow
          ? 'bg-white/15'
          : 'bg-sidebar text-white'
      }`}>
        <span className={`font-bold text-sm ${isNow ? 'text-white' : 'text-accent-gold'}`}>{startTime}</span>
        <span className={`text-[10px] font-medium ${isNow ? 'text-white/70' : 'text-sidebar-muted'}`}>
          {duration} MIN
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className={`font-bold truncate ${isNow ? '' : 'text-on-surface'}`}>{clientName}</p>
          {isNow && (
            <span className="px-2 py-0.5 bg-accent-gold text-white text-[9px] font-bold uppercase tracking-wider rounded-full">
              En cours
            </span>
          )}
        </div>
        <p className={`text-sm truncate ${isNow ? 'text-white/70' : 'text-on-surface-variant'}`}>{service}</p>
      </div>

      {/* Status badge on desktop */}
      {!isNow && (
        <div className="hidden lg:block">
          {status === 'confirmed' && <Badge variant="primary">Confirmé</Badge>}
          {status === 'pending' && <Badge variant="gold">En attente</Badge>}
          {status === 'completed' && <Badge variant="silver">Terminé</Badge>}
        </div>
      )}

      {/* Chevron */}
      <Icon name="chevron_right" size="md" className={`shrink-0 ${isNow ? 'text-white/50' : 'text-outline-variant'}`} />
    </div>
  );
}

/** Quick action card */
function QuickActionCard({
  icon,
  label,
  description,
}: {
  icon: string;
  label: string;
  description: string;
}) {
  return (
    <Card hover className="flex items-start gap-4 cursor-pointer">
      <div className="bg-primary-container p-3 rounded-full shrink-0">
        <Icon name={icon} size="md" className="text-on-primary-container" />
      </div>
      <div className="min-w-0">
        <p className="font-bold text-on-surface">{label}</p>
        <p className="text-sm text-on-surface-variant leading-relaxed">
          {description}
        </p>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page                                                          */
/* ------------------------------------------------------------------ */

export function DashboardPage() {
  // Revenue formatted for display
  const revenueFormatted = kpiData.dailyRevenue.toLocaleString('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + ' \u20AC';

  // Only show upcoming / confirmed / pending appointments, sorted by time
  const upcomingAppointments = appointments
    .filter((a) => a.status === 'confirmed' || a.status === 'pending')
    .sort((a, b) => a.startTime.localeCompare(b.startTime))
    .slice(0, 5);

  // Prepare chart data from monthly revenue
  const chartData = monthlyRevenue.map((m) => ({
    label: m.month,
    value: m.revenue,
    highlight: m.month === 'Oct', // highlight current month
  }));

  const occupancyPercent = kpiData.occupancyRate;
  const confirmedPercent = Math.round(
    (kpiData.confirmedAppointments / kpiData.totalSlots) * 100
  );

  return (
    <div className="space-y-8 lg:space-y-10 px-10 pb-12 pt-6">
      {/* ---- Welcome / Header ---- */}
      <PageHeader
        eyebrow="Bienvenue, Cattaliya"
        title="Tableau de bord"
        action={<DatePill />}
      />

      {/* ---- KPI Section ---- */}
      {/* Desktop: 3 equal KpiCards in a row */}
      <section className="hidden lg:grid grid-cols-3 gap-6">
        <KpiCard
          label="Revenus du jour"
          value={revenueFormatted}
          change={`+${kpiData.revenueChange}% par rapport à hier`}
          changeDirection="up"
          icon="payments"
        />
        <KpiCard
          label="RDV Confirmés"
          value={String(kpiData.confirmedAppointments)}
          change={`${kpiData.confirmedAppointments} / ${kpiData.totalSlots} créneaux`}
          changeDirection="up"
          icon="event_available"
        />
        <KpiCard
          label="Taux d'Occupation"
          value={`${occupancyPercent}%`}
          change={`${kpiData.totalSlots} créneaux aujourd'hui`}
          changeDirection="up"
          icon="trending_up"
        />
      </section>

      {/* Mobile: Bento grid (revenue full-width, then 2-col) */}
      <section className="lg:hidden grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <KpiCard
            label="Revenus du jour"
            value={revenueFormatted}
            change={`+${kpiData.revenueChange}% par rapport à hier`}
            changeDirection="up"
            icon="payments"
          />
        </div>
        <MiniKpiCard
          label="Confirmés"
          value={String(kpiData.confirmedAppointments)}
          unit="RDV"
          fillPercent={confirmedPercent}
          barColor="bg-primary"
        />
        <MiniKpiCard
          label="Occupation"
          value={String(occupancyPercent)}
          unit="%"
          fillPercent={occupancyPercent}
          barColor="bg-primary-container"
        />
      </section>

      {/* ---- Main Content: Appointments + Chart ---- */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
        {/* Upcoming appointments (3 cols on desktop) */}
        <section className="lg:col-span-3 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-headline text-lg font-semibold text-on-surface">
              Prochains rendez-vous
            </h3>
            <button className="text-primary text-sm font-semibold hover:underline">
              Voir tout
            </button>
          </div>
          <div className="space-y-3">
            {upcomingAppointments.map((apt, idx) => (
              <AppointmentRow
                key={apt.id}
                clientName={apt.clientName}
                service={apt.service}
                startTime={apt.startTime}
                duration={apt.duration}
                color={apt.color}
                status={apt.status}
                isNow={idx === 0}
              />
            ))}
          </div>
        </section>

        {/* Revenue chart (2 cols on desktop) */}
        <section className="lg:col-span-2 space-y-4">
          <Card className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-headline text-lg font-semibold text-on-surface">
                Revenus mensuels
              </h3>
              <Badge variant="secondary">2024</Badge>
            </div>
            <BarChart data={chartData} />
            <div className="flex items-center justify-between text-xs text-on-surface-variant pt-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-primary inline-block" />
                <span>Mois en cours</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-primary-container/40 inline-block" />
                <span>Autres mois</span>
              </div>
            </div>
          </Card>
        </section>
      </div>

      {/* ---- Quick Actions ---- */}
      <section className="space-y-4">
        <h3 className="font-headline text-lg font-semibold text-on-surface">
          Actions rapides
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <QuickActionCard
            icon="add_circle"
            label="Nouveau rendez-vous"
            description="Planifier un soin pour un client existant ou nouveau."
          />
          <QuickActionCard
            icon="person_add"
            label="Ajouter un client"
            description="Enregistrer un nouveau client dans la base."
          />
          <QuickActionCard
            icon="spa"
            label="G\u00e9rer les soins"
            description="Modifier les prestations, tarifs et dur\u00e9es."
          />
        </div>
      </section>

      {/* ---- End-of-day note (mobile-style zen insight, shown on all sizes) ---- */}
      <section className="bg-secondary-fixed/30 p-6 rounded-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <h4 className="text-on-secondary-fixed-variant font-bold">
            Note de fin de journ\u00e9e
          </h4>
          <p className="text-sm text-on-secondary-fixed-variant/80 leading-relaxed">
            N'oubliez pas de r\u00e9approvisionner l'huile essentielle de Lavande
            pour les soins de demain matin.
          </p>
        </div>
        <div className="absolute -right-4 -bottom-4 opacity-10">
          <Icon name="spa" filled size="lg" className="text-8xl" />
        </div>
      </section>
    </div>
  );
}
