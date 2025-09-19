import { Component, input } from '@angular/core';
import { CommonItemSearch } from '../../types/search.model';
import { TrackItemComponent } from '../track-item/track-item.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [TrackItemComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  list = input.required<CommonItemSearch[]>();
}
