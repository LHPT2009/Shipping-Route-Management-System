import { ExceptionFilter, Catch } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { typeOrmExceptionFactory } from './typeorm-exception.factory';

@Catch(QueryFailedError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError) {
    console.log(exception);
    const formattedException = typeOrmExceptionFactory(exception);
    return formattedException;
  }
}
