import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from 'src/app/shared/ui/toast/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  return next(req).pipe(
    catchError((error) => {
      toastService.show({title: 'Erro!', message: error.error?.error?.message|| error.error || 'Erro desconhecido'})
      return throwError(() => error);
    })
  );
};
