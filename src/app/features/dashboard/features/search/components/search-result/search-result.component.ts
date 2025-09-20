import { Component, input, output } from '@angular/core';
import { PaginatorComponent } from 'src/app/features/dashboard/features/search/components/paginator/paginator.component';
import { SearchResultListComponent } from 'src/app/features/dashboard/features/search/components/search-result-list/search-result-list.component';
import { CommonItemSearchResult } from 'src/app/features/dashboard/features/search/types/search.model';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [SearchResultListComponent, PaginatorComponent],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss'
})
export class SearchResultComponent {
  searchResult = input.required<CommonItemSearchResult>();
  pageChanged = output<{limit: number, offset: number}>();
}
