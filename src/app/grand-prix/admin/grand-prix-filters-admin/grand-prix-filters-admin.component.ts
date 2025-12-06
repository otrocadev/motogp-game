import { Component, output, inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-grand-prix-filters-admin',
  imports: [ReactiveFormsModule],
  templateUrl: './grand-prix-filters-admin.component.html',
  styles: ``,
})
export class GrandPrixFiltersAdminComponent implements OnInit, OnDestroy {
  searchGrandPrixQuery = output<string>();
  private _formBuilder = inject(FormBuilder);
  private _destroy$ = new Subject<void>();

  form = this._formBuilder.group({
    search: this._formBuilder.control(''),
  });

  ngOnInit() {
    this.form.controls.search.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        takeUntil(this._destroy$)
      )
      .subscribe((value) => {
        this.searchGrandPrix(value || '');
      });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  searchGrandPrix(search: string) {
    this.searchGrandPrixQuery.emit(search);
  }

  onSubmit() {
    this.searchGrandPrix(this.form.value.search!);
  }
}
