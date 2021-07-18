import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";
import {MaterialService} from "../shared/classes/material.service";


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  logform : FormGroup;

  constructor(private auth:AuthService,
              private router: Router) {
    this.logform = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  ngOnInit(): void {

  }
  onSubmit(){
    this.logform.disable()
    this.auth.register(this.logform.value).subscribe(
      ()=>{
        this.router.navigate(['/login'], {
          queryParams:{
            registered:true
          }
        })
      },
      error=>{
        MaterialService.toast(error.error.message)
        this.logform.enable()
      }
    )
  }

}
