import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {environment} from '../environments/environment';
@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private router: Router) {
        console.log(document.referrer);
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('AuthenticationToken') == null) {
            if (document.referrer === environment.internalAppsUrl + 'Authentication/') {
                return true;
            } else {
                window.location.href = environment.internalAppsUrl + 'Authentication/#/';
                return false;
            }
        }
        /* for production */
        // if (localStorage.getItem('AuthenticationToken') == null) {
        //     if (document.referrer === 'http://172.16.10.61:1004/Authentication/') {
        //         return true;
        //     } else {
        //         window.location.href = 'http://172.16.10.61:1004/Authentication/#/';
        //         return false;
        //     }
        // }
        /* for production */
         /* for test */
        // if (localStorage.getItem('AuthenticationToken') == null) {
        //     if (document.referrer === 'http://172.16.10.51:8088/Authentication/') {
        //         return true;
        //     } else {
        //         window.location.href = 'http://172.16.10.51:8088/Authentication/#/';
        //         return false;
        //     }
        // }
        /* for production */
        else {
            return true;
        }
    }
}
