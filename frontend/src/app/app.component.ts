import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { UserService } from "./core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  private _isAuthenticated:boolean = false;
  constructor(private userService: UserService) {}

  get isAuthenticated():boolean{
    // this.userService.isAuthenticated.subscribe(res => {
    //   this._isAuthenticated = res
    // });
    return this._isAuthenticated;
  }

  ngOnInit() {
    this.userService.populate();
  }
}