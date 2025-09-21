import { Component, inject } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
  private readonly loadingService = inject(LoadingService);

  show = this.loadingService.show;
}
