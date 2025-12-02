import { Component, OnInit, input, output, effect } from '@angular/core';
import { environment } from '../../../../environments/environment';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

@Component({
  selector: 'app-mapbox-view',
  imports: [],
  templateUrl: './mapbox-view.component.html',
})
export class MapboxViewComponent implements OnInit {
  initialPosition = input<[number, number]>([2.26, 41.57]);
  onPositionChange = output<[number, number]>();

  map!: mapboxgl.Map;
  marker!: mapboxgl.Marker;

  constructor() {
    effect(() => {
      const [lng, lat] = this.initialPosition();

      if (this.map && this.marker) {
        this.map.flyTo({
          center: [lng, lat],
          zoom: 13,
          duration: 5000,
          easing: (t) => t,
        });
        this.marker.setLngLat([lng, lat]);
      }
    });
  }

  ngOnInit(): void {
    mapboxgl.accessToken = environment.MAPBOX_KEY;

    const [lng, lat] = this.initialPosition();

    this.map = new mapboxgl.Map({
      container: 'mapbox-container',
      style: 'mapbox://styles/otrocadev/cminawj1i00rd01qwbkv979ap',
      center: [lng, lat],
      zoom: 2,
    });

    this.createMarker(lng, lat);

    const geocoder = new MapboxGeocoder({
      accessToken: environment.MAPBOX_KEY,
      useBrowserFocus: true,
      mapboxgl: mapboxgl as any,
      marker: false,
    }) as any;

    this.map.addControl(geocoder);

    geocoder.on('result', (e: any) => {
      const [newLng, newLat] = e.result.center;
      this.map.flyTo({ center: [newLng, newLat], zoom: 13 });
      this.marker.setLngLat([newLng, newLat]);
      this.onPositionChange.emit([newLng, newLat]);
    });
  }

  createMarker(lng: number, lat: number) {
    this.marker = new mapboxgl.Marker({
      color: 'var(--theme6)',
      draggable: true,
    })
      .setLngLat([lng, lat])
      .addTo(this.map);

    this.marker.on('dragend', () => {
      const { lng, lat } = this.marker.getLngLat();
      this.onPositionChange.emit([lng, lat]);
    });
  }
}
