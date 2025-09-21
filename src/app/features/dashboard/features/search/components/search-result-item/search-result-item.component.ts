import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from 'src/app/core/ui/button/button.component';
import { CommonItemSearch } from 'src/app/features/dashboard/features/search/types/search.model';

@Component({
  selector: 'app-search-result-item',
  standalone: true,
  imports: [NgOptimizedImage, ButtonComponent],
  templateUrl: './search-result-item.component.html',
  styleUrl: './search-result-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultItemComponent {
  private readonly router = inject(Router);
  searchResult = input.required<CommonItemSearch>();

  navigateTo(item: CommonItemSearch) {
    this.router.navigate([`dashboard/${item.type}/${item.id}`]);
  }
}
