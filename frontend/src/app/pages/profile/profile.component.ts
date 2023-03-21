import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { JwtService } from 'src/app/core';
import { UserResponse } from 'src/app/core/interfaces/user.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: UserResponse = {} as UserResponse;
  userToUpdate: FormGroup;
  constructor(private jwtService: JwtService) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.jwtService.getUserInfo());

    this.userToUpdate = new FormGroup({
      nombres: new FormControl(this.user?.userInfo?.nombres),
      apellidos: new FormControl(this.user?.userInfo?.apellidos),
      email: new FormControl(this.user?.userInfo?.email),
      telefono: new FormControl(this.user?.userInfo?.telefono),
      currentPassword: new FormControl(''),
      newPassword: new FormControl(''),
      confirmPassword: new FormControl('')
    })
  }

  onUpdateProfile(event: any) {
    event.preventDefault();
    console.log(this.userToUpdate.value);
    
  }
}
