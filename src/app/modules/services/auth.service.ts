import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';

interface userInterface {
    access_token: string;
    token_type: string;
    expires_in: 3600;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService { 
    user: BehaviorSubject<any> = new BehaviorSubject(null);
    constructor(private httpClient: HttpClient) {}

    login(body: any[]): Promise<any> {
        const bodyLogin = {
            email: body[0] as string,
            password: body[1] as string,      
        }

        return this.httpClient.post('@plenary-api/auth/login', bodyLogin).toPromise();
    }

    setUser(data: userInterface): void {
        if(data != null) 
            sessionStorage.setItem('access_token', 'Bearer ' + data.access_token)
    }

    logout(): Promise<any> {
        const req = this.httpClient.post('@plenary-api/auth/logout', null).toPromise();
        sessionStorage.clear();
        
        return req;
    }
}
