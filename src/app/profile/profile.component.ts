import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private userService: UsersService){ }

registrar(){
  const user ={
    nombre:'Andres Quinche',
    correo:'laqm_14@hotmail.com'
  };

  this.userService.create_user(user);

}
}
