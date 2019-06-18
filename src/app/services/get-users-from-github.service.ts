import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Users } from '../models/users.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetUsersFromGithubService {

  constructor(private _http: HttpClient) { }
  getGithubUsers = (searchString: string): Observable<Users>  =>  {
    const url = 'https://api.github.com/search/users';
    return this._http.get<Users>(url, {
      params: new HttpParams().set('q', searchString)
    });
  }
}
