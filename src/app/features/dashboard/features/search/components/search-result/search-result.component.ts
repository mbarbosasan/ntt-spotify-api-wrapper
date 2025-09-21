import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { SearchResultListComponent } from 'src/app/features/dashboard/features/search/components/search-result-list/search-result-list.component';
import { CommonItemSearchResult } from 'src/app/features/dashboard/features/search/types/search.model';
import { PaginatorComponent } from 'src/app/shared/ui/paginator/paginator.component';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [SearchResultListComponent, PaginatorComponent],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultComponent {
  searchResult = input.required<CommonItemSearchResult>();
  pageChanged = output<{ limit: number; offset: number }>();
}
