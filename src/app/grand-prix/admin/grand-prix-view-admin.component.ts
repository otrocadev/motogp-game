import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { GrandPrixListAdminComponent } from './grand-prix-list-admin/grand-prix-list-admin.component';
import { GrandPrixCalendarAdminComponent } from './grand-prix-calendar-admin/grand-prix-calendar-admin.component';
import { GrandPrixService } from '../grand-prix.service';
import { MapboxViewComponent } from '../../shared/components/mapbox-view/mapbox-view.component';
import { GrandPrixEvent } from '../../shared/types/race.types';

@Component({
  selector: 'app-grand-prix-view-admin',
  imports: [
    GrandPrixListAdminComponent,
    GrandPrixCalendarAdminComponent,
    MapboxViewComponent,
  ],
  templateUrl: './grand-prix-view-admin.component.html',
  styles: ``,
})
export class GrandPrixViewAdminComponent implements OnInit {
  private grandPrixService = inject(GrandPrixService);
  grandPrixMenuOption = signal<string>('map');

  grandPrixCalendarEvents = this.grandPrixService.grandPrixCalendarEvents;

  markers = signal<MapMarker[]>([]);

  async ngOnInit() {
    await this.loadGrandPrix();
  }

  async loadGrandPrix() {
    const data = await this.grandPrixService.getGrandPrixCalendarEvents();

    const newMarkers: MapMarker[] = data.map((event) => ({
      position: [event['longitude'], event['latitude']] as [number, number],
      label: event['title'],
      color: 'var(--theme6)',
      id: event['id'],
    }));

    this.markers.set(newMarkers);
  }
}

export interface MapMarker {
  position: [number, number];
  color?: string;
  label?: string;
  id?: string;
}
