import { Mail, User, X } from 'lucide-react';
import { FormEvent } from 'react';
import { Button } from '../../components/button';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ConfirmTripModalProps {
  toggleConfirmTripModal: () => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => void;
  setOwnerName: (name: string) => void;
  setOwnerEmail: (email: string) => void;
  destination: string;
  eventStartAndEndDates: DateRange | undefined;
}

export function ConfirmTripModal({
  createTrip,
  toggleConfirmTripModal,
  setOwnerName,
  setOwnerEmail,
  destination,
  eventStartAndEndDates,
}: ConfirmTripModalProps) {
  function formatDateRange(startDate: Date, endDate: Date) {
    const formattedStart = format(startDate, 'dd', { locale: ptBR });
    const formattedEnd = format(endDate, 'dd', { locale: ptBR });
    const formattedMonth = format(startDate, 'MMMM', { locale: ptBR });
    const formattedYear = format(startDate, 'yyyy', { locale: ptBR });

    return `${formattedStart} a ${formattedEnd} de ${formattedMonth} de ${formattedYear}`;
  }

  const dateRange =
    eventStartAndEndDates &&
    eventStartAndEndDates.from &&
    eventStartAndEndDates.to
      ? formatDateRange(eventStartAndEndDates.from, eventStartAndEndDates.to)
      : null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-zinc-300">
              Confirmar criação da viagem
            </h2>
            <button type="button" onClick={toggleConfirmTripModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Para concluir a criação da viagem para{' '}
            <span className="font-semibold text-zinc-100">{destination}</span>{' '}
            nas datas de{' '}
            <span className="font-semibold text-zinc-100">{dateRange}</span>{' '}
            preencha seus dados abaixo:
          </p>
        </div>

        <form onSubmit={createTrip} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5" />
            <input
              name="name"
              placeholder="Seu nome completo"
              className="bg-transparent text-lg placeholder:text-zinc-400 outline-none flex-1"
              onChange={(event) => setOwnerName(event.target.value)}
            />
          </div>
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Mail className="text-zinc-400 size-5" />
            <input
              type="email"
              name="email"
              placeholder="Seu email pessoal"
              className="bg-transparent text-lg placeholder:text-zinc-400 outline-none flex-1"
              onChange={(event) => setOwnerEmail(event.target.value)}
            />
          </div>

          <Button type="submit" variant="primary" size="full">
            Confirmar criação da viagem
          </Button>
        </form>
      </div>
    </div>
  );
}
