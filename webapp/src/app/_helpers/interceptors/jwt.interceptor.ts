import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(
      private authenticationService: AuthenticationService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Ajout du token JWT dans le header de la requête
        let loggedUser = this.authenticationService.loggedUserValue;
        if (loggedUser && loggedUser.token) { // TODO: expiresAt
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${loggedUser.token}`
                }
            });
        }

        return next.handle(request);
    }
}