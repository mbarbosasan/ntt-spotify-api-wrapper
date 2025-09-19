import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthToken } from '../../core/domain/auth/auth-token.';
import { AuthService } from '../../core/services/auth.service';
import { ButtonComponent } from '../../core/ui/button/button.component';
import { InputComponent } from '../../core/ui/input/input.component';
import { LoginService } from './services/login.service';
import { LoginForm } from './types/login.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly loginService = inject(LoginService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  form = this.fb.group<LoginForm>({
    clientId: this.fb.control('', Validators.required),
    clientSecret: this.fb.control('', Validators.required),
  });

  login(form: FormGroup<LoginForm>) {
    this.loginService.login(form.getRawValue()).subscribe({
      next: (token) => {
        this.authService.updateToken(new AuthToken(token));
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
