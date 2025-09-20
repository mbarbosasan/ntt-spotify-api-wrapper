import { Component, computed, input, output } from '@angular/core';
import { ButtonComponent } from 'src/app/core/ui/button/button.component';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent {
  limit = input.required<number>();
  offset = input.required<number>();
  total = input.required<number>();
  maxPages = input(5);
  pageChanged = output<{ limit: number; offset: number }>();

  actualPage = computed(() => Math.floor(this.offset() / this.limit()) + 1);
  noOfPages = computed(() => Math.ceil(this.total() / this.limit()));
  pages = computed(() => {
    const current = this.actualPage();
    const total = this.noOfPages();

    const start = Math.max(1, current - 2);
    const end = Math.min(total, current + 2);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  });

  onPageChange(noOfPage: number) {
    const offset = (noOfPage - 1) * this.limit();
    this.pageChanged.emit({ limit: this.limit(), offset });
  }
}
