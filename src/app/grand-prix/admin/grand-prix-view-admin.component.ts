import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { GrandPrixListAdminComponent } from './grand-prix-list-admin/grand-prix-list-admin.component';
import { GrandPrixCalendarAdminComponent } from './grand-prix-calendar-admin/grand-prix-calendar-admin.component';
import { GrandPrixService } from '../grand-prix.service';
import { MapboxViewComponent } from '../../shared/components/mapbox-view/mapbox-view.component';
import { MapMarker } from '../../shared/components/mapbox-view/mapbox-view.component';
import { GrandPrixViewMenuAdminComponent } from './grand-prix-view-menu-admin/grand-prix-view-menu-admin.component';
import { GrandPrixFiltersAdminComponent } from './grand-prix-filters-admin/grand-prix-filters-admin.component';
import { GrandPrixCalendarEvent } from '../types/grand-prix.types';

@Component({
  selector: 'app-grand-prix-view-admin',
  imports: [
    GrandPrixListAdminComponent,
    GrandPrixCalendarAdminComponent,
    MapboxViewComponent,
    GrandPrixViewMenuAdminComponent,
    GrandPrixFiltersAdminComponent,
  ],
  templateUrl: './grand-prix-view-admin.component.html',
  styles: ``,
})
export class GrandPrixViewAdminComponent implements OnInit {
  private grandPrixService = inject(GrandPrixService);
  grandPrixMenuOption = signal<string>('map');

  grandPrixCalendarEvents = this.grandPrixService.grandPrixCalendarEvents;
  markers = signal<MapMarker[]>([]);

  displayingEvents = signal<GrandPrixCalendarEvent[]>([]);

  async ngOnInit() {
    this.displayingEvents.set(
      (await this.grandPrixService.getGrandPrixCalendarEvents()) as GrandPrixCalendarEvent[]
    );
    await this.loadGrandPrixMarkers();
  }

  async loadGrandPrixMarkers() {
    const newMarkers: MapMarker[] = this.displayingEvents().map((event) => ({
      position: [event['longitude'], event['latitude']] as [number, number],
      label: event['title'],
      color: 'var(--theme6)',
      id: event['id'],
      flagUrl: event['flag_img'],
    }));

    this.markers.set(newMarkers);
  }

  async searchGrandPrix(query: string) {
    this.displayingEvents.set(
      this.grandPrixCalendarEvents().filter((event) =>
        event?.title?.toLowerCase().includes(query.toLowerCase())
      ) as GrandPrixCalendarEvent[]
    );
    await this.loadGrandPrixMarkers();
  }
}
