import { useState } from 'react';
import { Icon } from '../../components/ui/Icon';
import { Card } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { appointments } from '../../data/appointments';
import { therapists } from '../../data/therapists';
import type { Appointment, Therapist } from '../../data/types';

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const HOURS = Array.from({ length: 12 }, (_, i) => i + 8); // 08 – 19
const DAY_NAMES_SHORT = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'];
const MONTH_NAMES = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];
const DAY_NAMES_LONG = [
  'Dimanche', 'Lundi', 'Mardi', 'Mercredi',
  'Jeudi', 'Vendredi', 'Samedi',
];

/** Colour map per appointment colour token coming from data */
const BLOCK_STYLES: Record<string, { bg: string; border: string; text: string }> = {
  'bg-primary':              { bg: 'bg-primary-fixed',        border: 'border-l-primary',              text: 'text-on-primary-fixed' },
  'bg-primary-container':    { bg: 'bg-primary-container',    border: 'border-l-primary',              text: 'text-on-primary-container' },
  'bg-secondary':            { bg: 'bg-secondary-container',  border: 'border-l-secondary',            text: 'text-on-secondary-container' },
  'bg-secondary-container':  { bg: 'bg-secondary-fixed',      border: 'border-l-secondary',            text: 'text-on-secondary-fixed' },
  'bg-tertiary-container':   { bg: 'bg-tertiary-fixed',       border: 'border-l-tertiary',             text: 'text-on-tertiary-fixed' },
};

const DEFAULT_BLOCK = { bg: 'bg-primary-fixed', border: 'border-l-primary', text: 'text-on-primary-fixed' };

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function pad(n: number) { return n.toString().padStart(2, '0'); }

function formatTime(t: string) { return t; } // already "HH:mm"

function endTime(start: string, duration: number) {
  const [h, m] = start.split(':').map(Number);
  const total = h * 60 + m + duration;
  return `${pad(Math.floor(total / 60))}:${pad(total % 60)}`;
}

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function firstDayOfMonth(year: number, month: number) {
  const d = new Date(year, month, 1).getDay(); // 0=Sun
  return d === 0 ? 6 : d - 1; // shift to Mon=0
}

function formatLongDate(date: Date) {
  return `${DAY_NAMES_LONG[date.getDay()]}, ${date.getDate()} ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
}

function toDateString(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function MiniCalendar({
  year,
  month,
  selectedDay,
  onPrevMonth,
  onNextMonth,
  onSelectDay,
}: {
  year: number;
  month: number;
  selectedDay: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onSelectDay: (d: number) => void;
}) {
  const total = daysInMonth(year, month);
  const offset = firstDayOfMonth(year, month);
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  return (
    <Card className="shadow-[0_10px_40px_rgba(142,73,106,0.06)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-on-surface font-headline">
          {MONTH_NAMES[month]} {year}
        </h3>
        <div className="flex gap-2">
          <button onClick={onPrevMonth} className="hover:text-primary transition-colors">
            <Icon name="chevron_left" size="sm" />
          </button>
          <button onClick={onNextMonth} className="hover:text-primary transition-colors">
            <Icon name="chevron_right" size="sm" />
          </button>
        </div>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 gap-y-3 text-center">
        {DAY_NAMES_SHORT.map((d) => (
          <span key={d} className="text-[10px] font-bold text-outline uppercase tracking-tighter">
            {d}
          </span>
        ))}

        {/* Blank offset cells */}
        {Array.from({ length: offset }).map((_, i) => (
          <span key={`blank-${i}`} />
        ))}

        {/* Day cells */}
        {Array.from({ length: total }, (_, i) => i + 1).map((day) => {
          const isSelected = day === selectedDay;
          const isToday = isCurrentMonth && day === today.getDate();
          return (
            <button
              key={day}
              onClick={() => onSelectDay(day)}
              className={`
                w-8 h-8 mx-auto rounded-full text-xs font-semibold flex items-center justify-center transition-all
                ${isSelected
                  ? 'bg-primary text-on-primary shadow-sm'
                  : isToday
                    ? 'bg-primary-fixed text-primary font-bold'
                    : 'text-on-surface hover:bg-surface-container-high'
                }
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */

function TherapistFilter({
  therapistList,
  selectedId,
  onSelect,
}: {
  therapistList: Therapist[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}) {
  return (
    <Card className="shadow-[0_10px_40px_rgba(142,73,106,0.06)]">
      <h3 className="text-sm font-bold text-on-surface font-headline mb-4">Thérapeutes</h3>
      <div className="flex flex-col gap-2">
        {/* "All" option */}
        <button
          onClick={() => onSelect(null)}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
            selectedId === null
              ? 'bg-primary-fixed text-primary'
              : 'text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center shrink-0">
            <Icon name="groups" size="sm" className="text-on-surface-variant" />
          </div>
          <span>Tous</span>
        </button>
        {therapistList.map((t) => {
          const isActive = selectedId === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onSelect(t.id)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-primary-fixed text-primary'
                  : 'text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <Avatar src={t.avatarUrl} alt={t.name} size="sm" />
              <span className="truncate">{t.name}</span>
              {t.availability === 'available' && (
                <span className="ml-auto w-2 h-2 rounded-full bg-primary shrink-0" />
              )}
              {t.availability === 'busy' && (
                <span className="ml-auto w-2 h-2 rounded-full bg-tertiary shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */

function DaySummary({ dayAppointments }: { dayAppointments: Appointment[] }) {
  const totalMinutes = dayAppointments.reduce((sum, a) => sum + a.duration, 0);
  const confirmed = dayAppointments.filter((a) => a.status === 'confirmed').length;
  const pending = dayAppointments.filter((a) => a.status === 'pending').length;

  const stats = [
    { label: 'Rendez-vous', value: dayAppointments.length, icon: 'event' },
    { label: 'Confirmés', value: confirmed, icon: 'check_circle' },
    { label: 'En attente', value: pending, icon: 'schedule' },
    { label: 'Heures planifiées', value: `${(totalMinutes / 60).toFixed(1)}h`, icon: 'timer' },
  ];

  return (
    <Card className="shadow-[0_10px_40px_rgba(142,73,106,0.06)]">
      <h3 className="text-sm font-bold text-on-surface font-headline mb-4">Résumé du jour</h3>
      <div className="flex flex-col gap-4">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center">
              <Icon name={s.icon} size="sm" className="text-primary" />
            </div>
            <div>
              <p className="text-lg font-bold text-on-surface leading-tight">{s.value}</p>
              <p className="text-xs text-on-surface-variant font-medium">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */

function AppointmentBlock({ appointment }: { appointment: Appointment }) {
  const style = BLOCK_STYLES[appointment.color] ?? DEFAULT_BLOCK;
  const heightMinutes = appointment.duration;
  // 1 hour = 80px in the grid (each row is 80px)
  const heightPx = (heightMinutes / 60) * 80;

  return (
    <div
      className={`
        absolute left-16 right-4 rounded-lg border-l-4 px-3 py-2 overflow-hidden cursor-pointer
        transition-all hover:shadow-md hover:scale-[1.01]
        ${style.bg} ${style.border}
      `}
      style={{ height: `${heightPx}px` }}
    >
      <p className={`text-[11px] font-bold ${style.text} leading-tight`}>
        {formatTime(appointment.startTime)} - {endTime(appointment.startTime, appointment.duration)}
      </p>
      <p className={`text-sm font-bold ${style.text} leading-tight mt-0.5 truncate`}>
        {appointment.clientName}
      </p>
      <p className={`text-xs ${style.text} opacity-80 truncate`}>
        {appointment.service}
      </p>
      {heightPx >= 60 && (
        <p className={`text-[10px] ${style.text} opacity-60 mt-1`}>
          {appointment.duration} min — {appointment.therapistName}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */

function TimeGrid({ dayAppointments }: { dayAppointments: Appointment[] }) {
  return (
    <div className="relative">
      {HOURS.map((hour) => {
        const timeLabel = `${pad(hour)}:00`;
        // Find appointments starting in this hour slot
        const slotAppointments = dayAppointments.filter((a) => {
          const [h] = a.startTime.split(':').map(Number);
          return h === hour;
        });

        return (
          <div key={hour} className="relative" style={{ height: '80px' }}>
            {/* Horizontal grid line */}
            <div className="absolute inset-x-0 top-0 border-t border-outline-variant/20" />
            {/* Time label */}
            <span className="absolute left-0 -top-2.5 text-xs font-semibold text-outline w-14 text-right pr-2">
              {timeLabel}
            </span>
            {/* Appointment blocks positioned by minute offset */}
            {slotAppointments.map((apt) => {
              const [, m] = apt.startTime.split(':').map(Number);
              const topOffset = (m / 60) * 80;
              return (
                <div key={apt.id} className="absolute inset-x-0" style={{ top: `${topOffset}px` }}>
                  <AppointmentBlock appointment={apt} />
                </div>
              );
            })}
          </div>
        );
      })}
      {/* Final bottom line */}
      <div className="relative" style={{ height: '0px' }}>
        <div className="absolute inset-x-0 top-0 border-t border-outline-variant/20" />
        <span className="absolute left-0 -top-2.5 text-xs font-semibold text-outline w-14 text-right pr-2">
          19:00
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 9, 24)); // Oct 24 2024 — matches appointment data
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');
  const [selectedTherapist, setSelectedTherapist] = useState<string | null>(null);
  const [miniYear, setMiniYear] = useState(currentDate.getFullYear());
  const [miniMonth, setMiniMonth] = useState(currentDate.getMonth());

  /* Derived data */
  const dateStr = toDateString(currentDate);
  const dayAppointments = appointments
    .filter((a) => a.date === dateStr)
    .filter((a) => (selectedTherapist ? therapists.find((t) => t.id === selectedTherapist)?.name === a.therapistName : true))
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  /* Navigation */
  function goToPrevDay() {
    setCurrentDate((d) => { const n = new Date(d); n.setDate(n.getDate() - 1); return n; });
  }
  function goToNextDay() {
    setCurrentDate((d) => { const n = new Date(d); n.setDate(n.getDate() + 1); return n; });
  }
  function goToToday() {
    const today = new Date(2024, 9, 24); // matches data set date
    setCurrentDate(today);
    setMiniYear(today.getFullYear());
    setMiniMonth(today.getMonth());
  }
  function onMiniSelectDay(day: number) {
    setCurrentDate(new Date(miniYear, miniMonth, day));
  }
  function onPrevMonth() {
    setMiniMonth((m) => {
      if (m === 0) { setMiniYear((y) => y - 1); return 11; }
      return m - 1;
    });
  }
  function onNextMonth() {
    setMiniMonth((m) => {
      if (m === 11) { setMiniYear((y) => y + 1); return 0; }
      return m + 1;
    });
  }

  return (
    <div className="min-h-screen flex flex-col gap-8 p-10">
      {/* ---- Header ---- */}
      <header className="flex justify-between items-end">
        <div>
          <nav className="flex gap-2 text-xs font-bold uppercase tracking-widest mb-2">
            <span className="text-primary/60">Gestion</span>
            <span className="text-primary/60">/</span>
            <span className="text-primary">Calendrier</span>
          </nav>
          <h2 className="text-4xl font-extrabold text-on-surface tracking-tight font-headline">
            Calendrier des Réservations
          </h2>
        </div>

        <div className="flex items-center gap-4">
          {/* Day / Week toggle */}
          <div className="flex bg-surface-container-high rounded-full p-1">
            <button
              onClick={() => setViewMode('day')}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                viewMode === 'day'
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-outline hover:text-on-surface'
              }`}
            >
              Journée
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                viewMode === 'week'
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-outline hover:text-on-surface'
              }`}
            >
              Semaine
            </button>
          </div>

          {/* Therapist avatar selector (top bar) */}
          <div className="flex -space-x-2">
            {therapists.slice(0, 4).map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTherapist(selectedTherapist === t.id ? null : t.id)}
                className={`rounded-full transition-all ${
                  selectedTherapist === t.id
                    ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-110 z-10'
                    : 'hover:scale-105'
                }`}
              >
                <Avatar src={t.avatarUrl} alt={t.name} size="md" />
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ---- Main layout ---- */}
      <div className="flex gap-8 flex-1">
        {/* ---- Left sidebar (w-80) ---- */}
        <aside className="w-80 flex flex-col gap-6 shrink-0">
          <MiniCalendar
            year={miniYear}
            month={miniMonth}
            selectedDay={currentDate.getDate()}
            onPrevMonth={onPrevMonth}
            onNextMonth={onNextMonth}
            onSelectDay={onMiniSelectDay}
          />

          <TherapistFilter
            therapistList={therapists}
            selectedId={selectedTherapist}
            onSelect={setSelectedTherapist}
          />

          <DaySummary dayAppointments={dayAppointments} />
        </aside>

        {/* ---- Main calendar area ---- */}
        <section className="flex-1 flex flex-col min-w-0">
          {/* Date navigation bar */}
          <Card className="shadow-[0_10px_40px_rgba(142,73,106,0.06)] mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={goToPrevDay}
                  className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-surface-container-highest transition-colors"
                >
                  <Icon name="chevron_left" size="sm" />
                </button>
                <button
                  onClick={goToNextDay}
                  className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-surface-container-highest transition-colors"
                >
                  <Icon name="chevron_right" size="sm" />
                </button>
                <h3 className="text-xl font-bold text-on-surface font-headline">
                  {formatLongDate(currentDate)}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={goToToday}
                  className="px-5 py-2 rounded-full bg-surface-container-high text-sm font-bold text-on-surface-variant hover:bg-surface-container-highest transition-colors"
                >
                  Aujourd'hui
                </button>
                <span className="text-xs font-semibold text-outline">
                  {dayAppointments.length} rendez-vous
                </span>
              </div>
            </div>
          </Card>

          {/* Time grid */}
          <Card className="flex-1 shadow-[0_10px_40px_rgba(142,73,106,0.06)] overflow-y-auto">
            <div className="pb-6">
              <TimeGrid dayAppointments={dayAppointments} />
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
