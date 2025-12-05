import { Component, OnInit, input, output, effect } from '@angular/core';
import { environment } from '../../../../environments/environment';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { baseImgUrl } from '../../../config/endpoints';

export interface MapMarker {
  position: [number, number];
  color?: string;
  label?: string;
  id?: string;
  flagUrl?: string;
}

@Component({
  selector: 'app-mapbox-view',
  imports: [],
  templateUrl: './mapbox-view.component.html',
})
export class MapboxViewComponent implements OnInit {
  private static instanceCounter = 0;

  initialPosition = input<[number, number]>([0, 30]);
  initialZoom = input<number>(1);
  flyToZoom = input<number>(13);
  markers = input<MapMarker[]>([]);
  showGeocoder = input<boolean>(true);
  draggableMarker = input<boolean>(true);
  onPositionChange = output<[number, number]>();

  map!: mapboxgl.Map;
  marker!: mapboxgl.Marker;
  markerInstances: mapboxgl.Marker[] = [];

  readonly mapContainerId = `mapbox-container-${++MapboxViewComponent.instanceCounter}`;

  constructor() {
    effect(() => {
      const [lng, lat] = this.initialPosition();

      if (this.map && this.marker) {
        this.map.flyTo({
          center: [lng, lat],
          zoom: this.flyToZoom(),
          duration: 300,
          easing: (t) => t,
        });
        this.marker.setLngLat([lng, lat]);
      }
    });

    effect(() => {
      const currentMarkers = this.markers();

      if (this.map && this.map.loaded() && currentMarkers.length > 0) {
        this.createMarkersFromData(currentMarkers);
      }
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      mapboxgl.accessToken = environment.MAPBOX_KEY;

      const [lng, lat] = this.initialPosition();

      this.map = new mapboxgl.Map({
        container: this.mapContainerId,
        style: 'mapbox://styles/otrocadev/cminawj1i00rd01qwbkv979ap',
        center: [lng, lat],
        zoom: this.initialZoom(),
        projection: 'mercator',
      });

      this.map.on('load', () => {
        if (this.draggableMarker()) {
          this.createMarker(lng, lat);
        }

        const currentMarkers = this.markers();
        if (currentMarkers.length > 0) {
          this.createMarkersFromData(currentMarkers);
        }
      });

      if (this.showGeocoder()) {
        const geocoder = new MapboxGeocoder({
          accessToken: environment.MAPBOX_KEY,
          useBrowserFocus: true,
          mapboxgl: mapboxgl as any,
          marker: false,
        }) as any;

        this.map.addControl(geocoder);

        geocoder.on('result', (e: any) => {
          const [newLng, newLat] = e.result.center;
          this.map.flyTo({ center: [newLng, newLat], zoom: this.flyToZoom() });
          if (this.marker) {
            this.marker.setLngLat([newLng, newLat]);
          }
          this.onPositionChange.emit([newLng, newLat]);
        });
      }
    }, 0);
  }

  createMarker(lng: number, lat: number) {
    this.marker = new mapboxgl.Marker({
      color: 'var(--theme6)',
      draggable: this.draggableMarker(),
    })
      .setLngLat([lng, lat])
      .addTo(this.map);

    if (this.draggableMarker()) {
      this.marker.on('dragend', () => {
        const { lng, lat } = this.marker.getLngLat();
        this.onPositionChange.emit([lng, lat]);
      });
    }
  }

  createMarkersFromData(currentMarkers: MapMarker[]) {
    this.markerInstances.forEach((m) => m.remove());
    this.markerInstances = [];

    currentMarkers.forEach((markerData) => {
      let marker: mapboxgl.Marker;

      if (markerData.flagUrl) {
        const el = document.createElement('div');
        el.className = 'custom-flag-marker';
        el.style.width = '3.2rem';
        el.style.height = '2rem';
        el.style.borderRadius = '12%';
        el.style.backgroundImage = `url(${baseImgUrl + markerData.flagUrl})`;
        el.style.backgroundSize = 'cover';
        el.style.backgroundPosition = 'center';
        el.style.border = '3px solid var(--theme5)';
        el.style.cursor = 'pointer';

        marker = new mapboxgl.Marker({ element: el, draggable: false })
          .setLngLat(markerData.position)
          .addTo(this.map);
      } else {
        marker = new mapboxgl.Marker({
          color: markerData.color || 'var(--theme6)',
          draggable: false,
        })
          .setLngLat(markerData.position)
          .addTo(this.map);
      }

      if (markerData.label) {
        const popup = new mapboxgl.Popup({ offset: 25 }).setText(
          markerData.label
        );
        marker.setPopup(popup);
      }

      this.markerInstances.push(marker);
    });
  }
}
