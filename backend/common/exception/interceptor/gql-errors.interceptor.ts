import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { CustomValidationError } from 'common/exception/validation/custom-validation-error';
import { STATUS } from 'common/constants/status';

@Injectable()
export class CustomErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    return next.handle().pipe(
      map((data) => {
        return data;
      }),
      catchError((err) => {
        const clientType = req.headers.client_type;
        const customErr:string = err.extensions?.response?.errors[0].message;
        if (clientType !== 'developer') {
          if (err.message === "ERR_VALIDATION" || (customErr && customErr === "ERR_VALIDATION")) {
            throw new CustomValidationError(STATUS.ERR_VALIDATION, { name: ['Your information is invalid. Please check again'] });
          }
        }
        throw err;
      }),
    );
  }
}