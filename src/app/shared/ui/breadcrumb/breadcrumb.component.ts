import { Component, input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { BreadcrumbItem } from './types/breadcrumb.model';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
  breadcrumb = input.required<BreadcrumbItem[]>();
}
