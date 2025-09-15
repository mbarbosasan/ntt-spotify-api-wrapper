import { FormControl } from "@angular/forms";

export type LoginForm = {
  clientId: FormControl<string>;
  clientSecret: FormControl<string>;
}

export type LoginCommand = {
  clientId: string;
  clientSecret: string;
}