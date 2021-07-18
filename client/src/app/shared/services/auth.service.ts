import {Injectable} from "@angular/core";
import {User} from "../interface";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private token:string|null = null

  constructor(private http: HttpClient) {

  }

  register(user: User): Observable<User>{
    return this.http.post<User>('/api/auth/register',user)
  }

  login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/auth/login', user)
      .pipe(
        tap(
          ({token}) => {
            localStorage.setItem('auth-token', token)
            this.setToken(token)

          }
        )
      )

  }

  setToken(token:string|null) {
    this.token = token
  }

  getToken():string|null {
    return this.token
  }

  isAuthtenticated():boolean {
    return !!this.token
  }

  logOut(){
    this.setToken(null)
    localStorage.clear()
  }
}
