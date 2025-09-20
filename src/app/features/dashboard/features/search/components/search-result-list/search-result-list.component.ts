import { Component, input } from '@angular/core';
import { CommonItemSearch } from '../../types/search.model';
import { SearchResultItemComponent } from '../search-result-item/search-result-item.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [SearchResultItemComponent],
  templateUrl: './search-result-list.component.html',
  styleUrl: './search-result-list.component.scss',
})
export class SearchResultListComponent {
  list = input.required<CommonItemSearch[]>();
}
