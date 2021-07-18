import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MaterialService} from "../shared/classes/material.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  logform : FormGroup;
 /* aSub: Subscription;*/

  constructor(private auth:AuthService,
              private router: Router,
              private route: ActivatedRoute) {
    this.logform = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:Params)=>{
      if (params['registered']){
        MaterialService.toast("Now you can log into the systems using your data")
      }else if (params['accessDenied']) {
        MaterialService.toast("First, log in to the system")
      }else if (params["sessionExpaired"]) {
        MaterialService.toast("The session has expired. Please sign in")
      }
    })
  }
  onSubmit(){
    this.logform.disable()
    this.auth.login(this.logform.value).subscribe(
      ()=> this.router.navigate(['/overview']),
      error=> {
        MaterialService.toast(error.error.message)
        this.logform.enable()
      }
    )
  }
}
