import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

type variant = 'primary' | 'secondary' | 'default';
type size = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  type = input('button');
  label = input<number | string>('');
  variant = input('button-primary', {
    transform: (value: variant) => `button-${value}`,
  });
  size = input('button-md', {
    transform: (value: size) => `button-${value}`,
  });
  styleClass = computed(() => `${this.variant()} ${this.size()}`);
  onClick = output<void>();
}
