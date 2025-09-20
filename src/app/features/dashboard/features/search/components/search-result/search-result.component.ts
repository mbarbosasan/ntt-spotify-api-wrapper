import { Component, input, output } from '@angular/core';
import { CommonItemSearchResult } from '../../types/search.model';
import { PaginatorComponent } from "../paginator/paginator.component";
import { SearchResultListComponent } from "../search-result-list/search-result-list.component";

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
