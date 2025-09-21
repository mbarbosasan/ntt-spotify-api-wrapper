import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, first, Subject, switchMap, tap, throttleTime } from 'rxjs';
import { ButtonComponent } from 'src/app/shared/ui/button/button.component';
import { InputComponent } from 'src/app/shared/ui/input/input.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { SearchService } from './services/search.service';
import { SearchType } from './types/search.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ButtonComponent,
    InputComponent,
    SearchResultComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  private readonly searchService = inject(SearchService);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

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

  triggerSearch = new Subject<void>();
  limit = signal(10);
  offset = signal(0);
  searchResult = toSignal(
    this.triggerSearch.pipe(
      tap(() => {
        if (this.form.invalid) {
          this.form.markAllAsTouched();
        }
      }),
      filter(() => this.form.valid),
      // Inserindo um tempo fixo para evitar que o usuário realize muitas requisições em um curto período de tempo e receba um rate limit;
      throttleTime(1_000),
      switchMap(() => {
        const { search, types } = this.form.getRawValue();
        const type = types.filter((t) => t.checked).map((t) => t.type);
        return this.searchService.search(
          search,
          type,
          this.limit(),
          this.offset()
        );
      }),
      tap(() => {
        const { search, types } = this.form.getRawValue();
        const typesSelected = types.filter((t) => t.checked).map((t) => t.type);
        this.router.navigate([], {
          queryParams: {
            search,
            types: typesSelected.join(','),
            limit: this.limit(),
            offset: this.offset(),
          },
        });
      })
    )
  );

  ngOnInit(): void {
    this.activatedRoute.queryParamMap
      .pipe(
        tap(console.log),
        first(),
        tap((queryParams) => {
          this.form.patchValue({
            ...this.form,
            search: queryParams.get('search') || '',
            types: this.form.controls['types'].value.map((value) => ({
              ...value,
              checked:
                queryParams.get('types')?.includes(value.type) || value.checked,
            })),
          });
          this.limit.set(queryParams.get('limit') || 10);
          this.offset.set(queryParams.get('offset') || 0);
        })
      )
      .subscribe(() => {
        this.triggerSearch.next();
        this.form.markAsPristine();
        this.form.markAsUntouched();
      });
  }

  pageChanged({ limit, offset }: { limit: number; offset: number }) {
    this.limit.set(limit);
    this.offset.set(offset);
    this.triggerSearch.next();
  }

  get typesFormArray() {
    return this.form.controls.types;
  }
}
