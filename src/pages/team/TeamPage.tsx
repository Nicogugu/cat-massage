import { therapists } from '../../data/therapists';
import type { Therapist } from '../../data/types';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import { Icon } from '../../components/ui/Icon';
import { Badge } from '../../components/ui/Badge';

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

const availabilityConfig: Record<
  Therapist['availability'],
  { label: string; dotClass: string; bgClass: string; textClass: string }
> = {
  available: {
    label: 'Disponible',
    dotClass: 'bg-green-500',
    bgClass: 'bg-green-50',
    textClass: 'text-green-700',
  },
  busy: {
    label: 'En soin',
    dotClass: 'bg-amber-500',
    bgClass: 'bg-amber-50',
    textClass: 'text-amber-700',
  },
  off: {
    label: 'En congé',
    dotClass: 'bg-on-surface-variant/40',
    bgClass: 'bg-surface-container-high',
    textClass: 'text-on-surface-variant',
  },
};

function StarRating({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Icon key={`full-${i}`} name="star" filled size="sm" className="text-amber-400" />
        ))}
        {hasHalfStar && (
          <Icon name="star_half" filled size="sm" className="text-amber-400" />
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Icon key={`empty-${i}`} name="star" size="sm" className="text-outline-variant/50" />
        ))}
      </div>
      <span className="text-sm font-semibold text-on-surface">{rating}</span>
      <span className="text-xs text-on-surface-variant">({reviewCount} avis)</span>
    </div>
  );
}

function TherapistCard({ therapist }: { therapist: Therapist }) {
  const availability = availabilityConfig[therapist.availability];

  return (
    <div className="bg-surface-container-lowest rounded-3xl p-6 flex flex-col gap-5 shadow-sm border border-outline-variant/5 hover:shadow-lg transition-shadow duration-500 group">
      {/* Top row: avatar + availability badge */}
      <div className="flex items-start justify-between">
        <div className="relative">
          <img
            src={therapist.avatarUrl}
            alt={therapist.name}
            className="w-24 h-24 rounded-2xl object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
          />
        </div>

        {/* Availability pill */}
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${availability.bgClass} ${availability.textClass}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${availability.dotClass}`} />
          {availability.label}
        </span>
      </div>

      {/* Name & title */}
      <div>
        <h3 className="text-lg font-headline font-semibold text-on-surface tracking-tight">
          {therapist.name}
        </h3>
        <p className="text-sm text-on-surface-variant">{therapist.title}</p>
      </div>

      {/* Star rating */}
      <StarRating rating={therapist.rating} reviewCount={therapist.reviewCount} />

      {/* Specialization tags */}
      <div className="flex flex-wrap gap-2">
        {therapist.specializations.map((spec) => (
          <Badge key={spec} variant="secondary" className="text-[11px] normal-case tracking-normal font-semibold">
            {spec}
          </Badge>
        ))}
      </div>

      {/* Certifications */}
      <div className="flex flex-col gap-1.5">
        <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
          Certifications
        </p>
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {therapist.certifications.map((cert) => (
            <span key={cert} className="flex items-center gap-1 text-xs text-on-surface-variant">
              <Icon name="verified" filled size="sm" className="text-primary text-sm" />
              {cert}
            </span>
          ))}
        </div>
      </div>

      {/* Bio */}
      <p className="text-sm text-on-surface-variant/80 leading-relaxed line-clamp-3">
        {therapist.bio}
      </p>

      {/* Action buttons */}
      <div className="flex gap-3 mt-auto pt-2">
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-primary-fixed text-on-primary-fixed-variant hover:brightness-95 active:scale-95 transition-all duration-200">
          <Icon name="visibility" size="sm" className="text-base" />
          Voir profil
        </button>
        <button className="flex items-center justify-center p-2.5 rounded-xl text-on-surface-variant bg-surface-container-high hover:bg-surface-container-highest active:scale-95 transition-all duration-200">
          <Icon name="edit" size="sm" className="text-base" />
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export function TeamPage() {
  return (
    <div className="pb-12 px-10 max-w-7xl mx-auto">
      {/* Header */}
      <PageHeader
        eyebrow="Aperçu du personnel"
        title="Vos Thérapeutes d'Exception"
        action={
          <Button variant="secondary" icon="person_add">
            Ajouter un membre
          </Button>
        }
        className="mb-12"
      />

      {/* 3-column card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {therapists.map((therapist) => (
          <TherapistCard key={therapist.id} therapist={therapist} />
        ))}
      </div>
    </div>
  );
}
