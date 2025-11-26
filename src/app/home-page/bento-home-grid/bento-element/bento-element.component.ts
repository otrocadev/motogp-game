import { Component, computed, inject, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bento-element',
  imports: [],
  templateUrl: './bento-element.component.html',
  styles: ``,
})
export class BentoElementComponent {
  private _router = inject(Router);

  title = input<string>();
  backgroundImage = input<string>();
  url = input<string>();

  backgroundImageURL = computed(() => `url(${this.backgroundImage()})`);

  navigateTo() {
    this._router.navigate([this.url()]);
  }
}
