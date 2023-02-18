import { Component, OnInit } from "@angular/core";
import {  } from "rxjs/operators";

import { JwtService, UserService } from "./core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  isAutheticate: boolean = this.jwtService.getAuthenticated()  ?? false;
  constructor(private userService: UserService, private jwtService: JwtService) {}

  isAuthenticated():void{
    this.userService.isAuthenticated.subscribe({
      next: authenticate => this.isAutheticate = authenticate
    })
  }

  ngOnInit() {
    this.userService.populate();
    this.isAuthenticated();
  }
}