import { Component, input, output } from '@angular/core';

type variant = 'primary' | 'secondary';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  type = input('button');
  label = input('');
  variant = input('button-primary', {
    transform: (value: variant) => `button-${value}`
  });
  onClick = output<void>();
}