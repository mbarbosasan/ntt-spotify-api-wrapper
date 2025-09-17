import { AsyncPipe, CommonModule, KeyValuePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { filter, Subject, switchMap, throttleTime } from 'rxjs';
import { SearchService } from './services/search.service';
import { SearchType } from './types/search.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, CommonModule, KeyValuePipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  private readonly searchService = inject(SearchService);
  private readonly fb = inject(NonNullableFormBuilder);

  triggerSearch = new Subject();

  form = this.fb.group({
    types: this.fb.array<FormControl<SearchType>>([
      this.fb.control<SearchType>('artist'),
      this.fb.control<SearchType>('album'),
      this.fb.control<SearchType>('track'),
      this.fb.control<SearchType>('playlist'),
      this.fb.control<SearchType>('show'),
      this.fb.control<SearchType>('episode'),
    ]),
    search: this.fb.control('', [Validators.minLength(2)]),
  });

  results$ = this.triggerSearch.pipe(
    filter(() => this.form.valid),
    // Inserindo um tempo fixo para evitar que o usuário realize muitas requisições em um curto período de tempo e receba um rate limit;
    throttleTime(1000),
    switchMap(() => {
      const { search, types } = this.form.getRawValue();
      return this.searchService.search(search, types);
    })
  );

  ngOnInit(): void {
    console.log(this.form.getRawValue());
  }

  get typesFormArray() {
    return this.form.controls.types;
  }
}
