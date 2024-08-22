// src/interceptors/logging.interceptor.ts
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger,
  } from '@nestjs/common';
  import { Observable, tap } from 'rxjs';
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger(LoggingInterceptor.name);
  
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
      const request = context.switchToHttp().getRequest();
      const { method, url } = request;
      const now = Date.now();
  
      this.logger.log(`Incoming request: ${method} ${url}`);
  
      return next.handle().pipe(
        tap(() => {
          const responseTime = Date.now() - now;
          this.logger.log(`Response sent: ${method} ${url} (${responseTime}ms)`);
        }),
      );
    }
  }
  