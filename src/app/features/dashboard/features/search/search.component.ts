import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { filter, Subject, switchMap, tap, throttleTime } from 'rxjs';
import { ButtonComponent } from '../../../../core/ui/button/button.component';
import { InputComponent } from '../../../../core/ui/input/input.component';
import { SearchService } from './services/search.service';
import { SearchType } from './types/search.model';
import { ListComponent } from './ui/list/list.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ListComponent,
    ButtonComponent,
    InputComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  private readonly searchService = inject(SearchService);
  private readonly fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    types: this.fb.array([
      this.fb.group({
        type: this.fb.control('artist' as SearchType),
        checked: this.fb.control(true),
      }),
      this.fb.group({
        type: this.fb.control('album' as SearchType),
        checked: this.fb.control(true),
      }),
      this.fb.group({
        type: this.fb.control('track' as SearchType),
        checked: this.fb.control(true),
      }),
      this.fb.group({
        type: this.fb.control('playlist' as SearchType),
        checked: this.fb.control(true),
      }),
      this.fb.group({
        type: this.fb.control('show' as SearchType),
        checked: this.fb.control(true),
      }),
      this.fb.group({
        type: this.fb.control('episode' as SearchType),
        checked: this.fb.control(true),
      }),
    ]),
    search: this.fb.control('', [Validators.required, Validators.minLength(2)]),
  });

  triggerSearch = new Subject();
  searchResult = toSignal(
    this.triggerSearch.pipe(
      tap(() => {
        if (this.form.invalid) {
          this.form.markAllAsTouched();
        }
      }),
      filter(() => this.form.valid),
      // Inserindo um tempo fixo para evitar que o usuário realize muitas requisições em um curto período de tempo e receba um rate limit;
      throttleTime(1000),
      switchMap(() => {
        const { search, types } = this.form.getRawValue();
        const type = types.filter((t) => t.checked).map((t) => t.type);
        return this.searchService.search(search, type);
      })
    )
  );

  get typesFormArray() {
    return this.form.controls.types;
  }
}
