import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, of, tap } from 'rxjs';
import { LoadingService } from '../ui/loading/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  return next(req).pipe(
    catchError((e) => {
      loadingService.setLoading(false)
      return of(e);
    }),
    tap(() => {
        loadingService.setLoading(true);
    }),
    finalize(() => {
      loadingService.setLoading(false);
    })
  );
};
