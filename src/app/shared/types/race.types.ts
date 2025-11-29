import { DateSelectArg } from '@fullcalendar/core/index.js';
import { FormControl } from '@angular/forms';

export type EventMode = 'create' | 'edit';

export interface GrandPrixEvent {
  id?: string;
  name: string;
  location: string;
  circuit: string;
  start_date: string;
  end_date: string;
}

export interface CreateRaceDialogData {
  mode: EventMode;
  dateInfo?: DateSelectArg;
  eventId?: string;
}

export interface CreateRaceForm {
  name: FormControl<string | null>;
  location: FormControl<string | null>;
  circuit: FormControl<string | null>;
  start_date: FormControl<string | null>;
  end_date: FormControl<string | null>;
}
