import { Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

type inputType = 'text' | 'password';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputComponent)
    }
  ],
})
export class InputComponent implements ControlValueAccessor {
  type = input.required<inputType>();
  placeholder = input<string>();
  inputId = input<string>();
  name = input<string>();

  value = signal<string>('');
  disabled = signal<boolean>(false);
  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    if (typeof value === 'string') {
      this.value.set(value);
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

    onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value.set(value);
    this.onChange(value);
    this.onTouched();
  }
}
