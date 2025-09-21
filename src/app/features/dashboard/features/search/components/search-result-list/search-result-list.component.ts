import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SearchResultItemComponent } from 'src/app/features/dashboard/features/search/components/search-result-item/search-result-item.component';
import { CommonItemSearch } from 'src/app/features/dashboard/features/search/types/search.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [SearchResultItemComponent],
  templateUrl: './search-result-list.component.html',
  styleUrl: './search-result-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultListComponent {
  list = input.required<CommonItemSearch[]>();
}
