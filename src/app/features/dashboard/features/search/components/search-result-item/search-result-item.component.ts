import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { CommonItemSearch } from 'src/app/features/dashboard/features/search/types/search.model';

@Component({
  selector: 'app-track-item',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './search-result-item.component.html',
  styleUrl: './search-result-item.component.scss',
})
export class SearchResultItemComponent {
  track = input.required<CommonItemSearch>();
}
