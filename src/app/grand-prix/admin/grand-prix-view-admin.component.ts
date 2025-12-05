import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { GrandPrixListAdminComponent } from './grand-prix-list-admin/grand-prix-list-admin.component';
import { GrandPrixCalendarAdminComponent } from './grand-prix-calendar-admin/grand-prix-calendar-admin.component';
import { GrandPrixService } from '../grand-prix.service';
import { MapboxViewComponent } from '../../shared/components/mapbox-view/mapbox-view.component';
import { MapMarker } from '../../shared/components/mapbox-view/mapbox-view.component';

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

  displayingEvents = signal<any[]>([]);

  async ngOnInit() {
    this.displayingEvents.set(
      await this.grandPrixService.getGrandPrixCalendarEvents()
    );
    await this.loadGrandPrix();
  }

  async loadGrandPrix() {
    const newMarkers: MapMarker[] = this.displayingEvents().map((event) => ({
      position: [event['longitude'], event['latitude']] as [number, number],
      label: event['title'],
      color: 'var(--theme6)',
      id: event['id'],
      flagUrl: event['flag_img'],
    }));

    this.markers.set(newMarkers);
  }
}
