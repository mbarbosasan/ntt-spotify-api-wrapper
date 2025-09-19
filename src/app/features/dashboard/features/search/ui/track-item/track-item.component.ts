import { NgOptimizedImage } from '@angular/common';
import { Component, input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonItemSearch } from '../../types/search.model';

@Component({
  selector: 'app-track-item',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './track-item.component.html',
  styleUrl: './track-item.component.scss',
})
export class TrackItemComponent implements OnChanges {
  track = input.required<CommonItemSearch>();

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
