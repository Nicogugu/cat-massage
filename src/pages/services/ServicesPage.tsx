import { services } from '../../data/services';
import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { PageHeader } from '../../components/ui/PageHeader';
import type { Service } from '../../data/types';

/* -------------------------------------------------------------------------- */
/*  Category ordering                                                         */
/* -------------------------------------------------------------------------- */

const CATEGORY_ORDER: Service['category'][] = [
  'Rituels Signature',
  'Wellness Experiences',
  'Express',
];

function servicesByCategory(category: Service['category']): Service[] {
  return services.filter((s) => s.category === category);
}

/* -------------------------------------------------------------------------- */
/*  Sub-components                                                            */
/* -------------------------------------------------------------------------- */

function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="group relative bg-surface-container-lowest rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_10px_40px_rgba(142,73,106,0.06)] flex flex-row">
      {/* Image — square, left side */}
      <div className="relative w-36 shrink-0 overflow-hidden">
        <img
          src={service.imageUrl}
          alt={service.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Content — right side */}
      <div className="flex flex-col flex-1 p-5">
        <h4 className="font-headline text-base font-bold text-on-surface mb-1">
          {service.name}
        </h4>
        <p className="text-on-surface-variant text-xs leading-relaxed mb-3 line-clamp-2">
          {service.description}
        </p>

        {/* Duration + Price */}
        <div className="flex items-center gap-3 mb-3 text-xs text-on-surface-variant">
          <span className="flex items-center gap-1">
            <Icon name="schedule" size="sm" className="text-primary" />
            {service.duration} min
          </span>
          <span className="font-bold text-on-surface text-sm">{service.price} €</span>
        </div>

        {/* Benefits */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {service.benefits.slice(0, 2).map((benefit) => (
            <Badge key={benefit} variant="secondary" className="text-[10px]">
              {benefit}
            </Badge>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-auto">
          <Button variant="primary" className="rounded-pill text-[10px] uppercase tracking-widest font-bold">
            Réserver
          </Button>
        </div>
      </div>
    </div>
  );
}

// @ts-expect-error Reserved for future featured layout
function FeaturedServiceCard({ service }: { service: Service }) {
  return (
    <div className="lg:col-span-2 group relative bg-surface-container-lowest rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_10px_40px_rgba(142,73,106,0.06)]">
      <div className="flex flex-col md:flex-row h-full">
        {/* Image half */}
        <div className="md:w-1/2 relative overflow-hidden">
          <img
            src={service.imageUrl}
            alt={service.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 min-h-[260px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-on-surface/10 to-transparent" />
        </div>

        {/* Content half */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <Badge variant="primary" className="mb-4 self-start">
            Signature
          </Badge>

          <h4 className="font-headline text-2xl font-bold text-on-surface mb-3">
            {service.name}
          </h4>
          <p className="text-on-surface-variant text-sm leading-relaxed mb-5">
            {service.description}
          </p>

          {/* Duration + Price */}
          <div className="flex items-center gap-4 mb-5 text-sm text-on-surface-variant">
            <span className="flex items-center gap-1.5">
              <Icon name="schedule" size="sm" className="text-primary" />
              {service.duration} min
            </span>
            <span className="font-bold text-on-surface text-lg">{service.price} €</span>
          </div>

          {/* Benefits */}
          <div className="flex flex-wrap gap-2 mb-6">
            {service.benefits.map((benefit) => (
              <Badge key={benefit} variant="secondary" className="text-[10px]">
                {benefit}
              </Badge>
            ))}
          </div>

          {/* CTA */}
          <Button variant="primary" className="self-start rounded-pill text-xs uppercase tracking-widest font-bold">
            Réserver
          </Button>
        </div>
      </div>
    </div>
  );
}

function CategorySection({
  category,
  categoryServices,
}: {
  category: Service['category'];
  categoryServices: Service[];
}) {
  return (
    <div>
      {/* Category header with decorative line */}
      <div className="flex items-center gap-4 mb-8">
        <span className="h-[1px] w-12 bg-primary/30" />
        <h3 className="font-headline text-xl font-bold text-primary tracking-wide">
          {category}
        </h3>
      </div>

      {/* Card grid — always 3 per row on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categoryServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page component                                                            */
/* -------------------------------------------------------------------------- */

export function ServicesPage() {
  return (
    <section className="space-y-16 px-10 pb-12 pt-6">
      {/* Page header */}
      <PageHeader
        title="Nos Rituels"
        subtitle="Notre sélection de soins thérapeutiques conçus pour restaurer l'équilibre et l'harmonie."
        action={
          <Button
            variant="secondary"
            icon="add_circle"
            className="rounded-pill"
          >
            Ajouter un Service
          </Button>
        }
      />

      {/* Category sections */}
      {CATEGORY_ORDER.map((category) => {
        const categoryServices = servicesByCategory(category);
        if (categoryServices.length === 0) return null;
        return (
          <CategorySection
            key={category}
            category={category}
            categoryServices={categoryServices}
          />
        );
      })}
    </section>
  );
}
