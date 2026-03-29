import { useState } from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { SearchInput } from '../../components/ui/SearchInput';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { Icon } from '../../components/ui/Icon';
import { Card } from '../../components/ui/Card';
import { clients } from '../../data/clients';
import { kpiData } from '../../data/kpis';
import type { Client } from '../../data/types';

/* ------------------------------------------------------------------ */
/*  Loyalty helpers                                                     */
/* ------------------------------------------------------------------ */

const loyaltyConfig: Record<
  Client['loyaltyStatus'],
  { label: string; variant: 'gold' | 'silver' | 'tertiary' | 'secondary'; icon: string }
> = {
  gold: { label: 'Gold', variant: 'gold', icon: 'star' },
  silver: { label: 'Silver', variant: 'silver', icon: 'workspace_premium' },
  bronze: { label: 'Bronze', variant: 'tertiary', icon: 'military_tech' },
  new: { label: 'Nouveau', variant: 'secondary', icon: 'fiber_new' },
};

function LoyaltyBadge({ status }: { status: Client['loyaltyStatus'] }) {
  const cfg = loyaltyConfig[status];
  return (
    <Badge variant={cfg.variant}>
      <span className="flex items-center gap-1">
        <Icon name={cfg.icon} size="sm" />
        {cfg.label}
      </span>
    </Badge>
  );
}

/* ------------------------------------------------------------------ */
/*  Stat card (asymmetric tonal)                                       */
/* ------------------------------------------------------------------ */

function StatCard({
  label,
  value,
  subtitle,
  className = '',
}: {
  label: string;
  value: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={`p-6 rounded-xl flex flex-col justify-between h-32 ${className}`}>
      <span className="text-on-surface-variant text-sm font-semibold uppercase tracking-widest">
        {label}
      </span>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold">{value}</span>
        {subtitle && <span className="text-sm opacity-60">{subtitle}</span>}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Date formatter                                                     */
/* ------------------------------------------------------------------ */

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
}

/* ------------------------------------------------------------------ */
/*  Client row                                                         */
/* ------------------------------------------------------------------ */

function ClientRow({ client }: { client: Client }) {
  return (
    <Card hover className="group">
      <div className="grid grid-cols-12 items-center gap-4">
        {/* -- Client & Status (col-span-4) -- */}
        <div className="col-span-12 md:col-span-4 flex items-center gap-4">
          <Avatar
            src={client.avatarUrl}
            alt={`${client.firstName} ${client.lastName}`}
            size="lg"
          />
          <div className="min-w-0">
            <p className="font-bold text-on-surface truncate">
              {client.firstName} {client.lastName}
            </p>
            <p className="text-sm text-on-surface-variant truncate">{client.email}</p>
            <div className="mt-1">
              <LoyaltyBadge status={client.loyaltyStatus} />
            </div>
          </div>
        </div>

        {/* -- Last Visit (col-span-2) -- */}
        <div className="col-span-6 md:col-span-2 text-center">
          <p className="text-sm font-semibold text-on-surface">{formatDate(client.lastVisit)}</p>
          <p className="text-xs text-on-surface-variant">{client.totalVisits} visites</p>
        </div>

        {/* -- Preferences & Rituals (col-span-4) -- */}
        <div className="col-span-6 md:col-span-4 flex flex-wrap gap-2">
          {client.preferredServices.map((service) => (
            <span
              key={service}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-primary-fixed/40 text-on-primary-fixed-variant"
            >
              <Icon name="spa" size="sm" className="text-primary/70" />
              {service}
            </span>
          ))}
        </div>

        {/* -- Actions (col-span-2) -- */}
        <div className="col-span-12 md:col-span-2 flex items-center justify-end gap-2">
          <button
            className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-all"
            title="Appeler"
          >
            <Icon name="phone" size="sm" />
          </button>
          <button
            className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-all"
            title="Envoyer un email"
          >
            <Icon name="mail" size="sm" />
          </button>
          <button
            className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-all"
            title="Modifier"
          >
            <Icon name="edit" size="sm" />
          </button>
          <button
            className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-all"
            title="Plus d'options"
          >
            <Icon name="more_vert" size="sm" />
          </button>
        </div>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page                                                          */
/* ------------------------------------------------------------------ */

export function ClientsPage() {
  const [search, setSearch] = useState('');

  const filtered = clients.filter((c) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      c.firstName.toLowerCase().includes(q) ||
      c.lastName.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.preferredServices.some((s) => s.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-12 px-10 pb-12 pt-6">
      {/* ---- Header ---- */}
      <PageHeader
        title="Gestion des Clients"
        subtitle="Gérez votre communauté de bien-être."
        action={
          <>
            <SearchInput
              placeholder="Rechercher un client..."
              value={search}
              onChange={setSearch}
              className="w-72"
            />
            <Button variant="secondary" icon="person_add" className="rounded-pill whitespace-nowrap">
              Ajouter un client
            </Button>
          </>
        }
      />

      {/* ---- Stats Row (Asymmetric Tonal Grid) ---- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          label="Total Clients"
          value={kpiData.totalClients.toLocaleString('fr-FR')}
          className="md:col-span-1 bg-surface-container-low text-primary"
        />
        <StatCard
          label="Nouveaux (Mois)"
          value={`+${kpiData.newClientsMonth}`}
          className="md:col-span-1 bg-primary-container/20 text-on-primary-container"
        />
        <StatCard
          label="Taux de Fidélité"
          value={`${kpiData.loyaltyRate}%`}
          subtitle="Croissance stable"
          className="md:col-span-2 bg-secondary-container/30 text-secondary"
        />
      </div>

      {/* ---- Client List ---- */}
      <section className="space-y-4">
        {/* Column headers */}
        <div className="hidden md:grid grid-cols-12 px-6 py-2 text-xs font-bold uppercase tracking-[0.2em] text-outline">
          <div className="col-span-4">Client & Statut</div>
          <div className="col-span-2 text-center">Dernière Visite</div>
          <div className="col-span-4">Préférences & Rituels</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* Rows */}
        {filtered.length > 0 ? (
          filtered.map((client) => <ClientRow key={client.id} client={client} />)
        ) : (
          <Card className="text-center py-12">
            <Icon name="search_off" size="lg" className="text-outline mb-2" />
            <p className="text-on-surface-variant font-medium">
              Aucun client ne correspond à votre recherche.
            </p>
          </Card>
        )}
      </section>
    </div>
  );
}
