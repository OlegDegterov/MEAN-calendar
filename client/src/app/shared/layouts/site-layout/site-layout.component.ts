import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit {

  links = [
    {url:"/calendar", name:"Calendar", class:"bx bx-home" },
    {url:"/music", name:"Music", class:"bx bx-music"},
    {url:"/drink", name:"Drink", class:"bx bx-drink"},
    {url:"/shopping", name:"Shopping", class:"bx bx-shopping-bag"},
    {url:"/chat", name:"Chat", class:"bx bx-chat"},
    {url:"/profile", name:"Profile", class:"bx bx-user"},

  ]

  constructor(private auth: AuthService,
  private router: Router) {

  }

  ngOnInit(): void {
  }
  logout(event:Event){
    event.preventDefault()
    this.auth.logOut()
    this.router.navigate(["/login"])
  }

}
