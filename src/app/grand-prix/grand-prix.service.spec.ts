import { TestBed } from '@angular/core/testing';
import { GrandPrixService } from './grand-prix.service';
import { SupabaseService } from '../shared/data-access/supabase.service';

describe('GrandPrixService', () => {
  let service: GrandPrixService;
  let supabaseMock: jasmine.SpyObj<SupabaseService>;
  let currentClient: any;

  beforeEach(() => {
    const successClientMock = {
      from: () => ({
        select: () => ({
          order: () =>
            Promise.resolve({
              data: [
                {
                  id: '1',
                  name: 'Catalunya GP',
                  start_date: '2026-06-05',
                  end_date: '2026-06-07',
                  flag_img: '/flags/cat.svg',
                  location: 'Barcelona',
                  circuit: 'Montmeló',
                  longitude: 2.26,
                  latitude: 41.57,
                },
              ],
              error: null,
            }),
        }),
      }),
    };

    currentClient = successClientMock;

    // Mock of SupabaseService with a getter for supabaseClient
    supabaseMock = {
      get supabaseClient() {
        return currentClient;
      },
    } as any;

    TestBed.configureTestingModule({
      providers: [
        GrandPrixService,
        { provide: SupabaseService, useValue: supabaseMock },
      ],
    });

    service = TestBed.inject(GrandPrixService);
  });

  it('maps DB events to FullCalendar events with +1 day end', async () => {
    const events = await service.getGrandPrixCalendarEvents();

    expect(events.length).toBe(1);
    const event = events[0];

    expect(event.id).toBe('1');
    expect(event.title).toBe('Catalunya GP');
    expect(event.start).toBe('2026-06-05');
    // end_date 2026-06-07 -> +1 day -> 2026-06-08
    expect(event.end).toBe('2026-06-08');
    expect((event as any).flag_img).toBe('/flags/cat.svg');
    expect((event as any).location).toBe('Barcelona');
    expect((event as any).circuit).toBe('Montmeló');
    expect((event as any).allDay).toBeTrue();
  });

  it('returns empty array when Supabase returns error', async () => {
    const errorClientMock = {
      from: () => ({
        select: () => ({
          order: () =>
            Promise.resolve({
              data: null,
              error: { message: 'DB error' },
            }),
        }),
      }),
    };

    currentClient = errorClientMock;

    const events = await service.getGrandPrixCalendarEvents();

    expect(events).toEqual([]);
  });

  it('gets grand prix info by id', async () => {
    const clientMock = {
      from: () => ({
        select: () => ({
          eq: () => ({
            single: () =>
              Promise.resolve({
                data: {
                  id: '1',
                  name: 'Catalunya GP',
                  start_date: '2026-06-05',
                  end_date: '2026-06-07',
                  flag_img: '/flags/cat.svg',
                  location: 'Barcelona',
                  circuit: 'Montmeló',
                  longitude: 2.26,
                  latitude: 41.57,
                },
                error: null,
              }),
          }),
        }),
      }),
    };

    currentClient = clientMock;

    const gp = await service.getGrandPrixInfoById('1');

    expect(gp?.id).toBe('1');
    expect(gp?.name).toBe('Catalunya GP');
  });

  it('returns null when Supabase returns error', async () => {
    const errorClientMock = {
      from: () => ({
        select: () => ({
          eq: () => ({
            single: () =>
              Promise.resolve({
                data: null,
                error: { message: 'DB error' },
              }),
          }),
        }),
      }),
    };

    currentClient = errorClientMock;

    const gp = await service.getGrandPrixInfoById('1');

    expect(gp).toBeNull();
  });
});
