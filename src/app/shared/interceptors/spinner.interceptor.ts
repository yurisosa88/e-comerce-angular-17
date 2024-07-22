import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { SpinnerService } from "@shared/services/spinner.service";
import { finalize } from "rxjs";

export const SpinnerInterceptor:HttpInterceptorFn = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
    ) => {
        const spinnerSvc = inject(SpinnerService);
        spinnerSvc.show();
        return next(req).pipe(finalize( () => spinnerSvc.hide() ));
    } 