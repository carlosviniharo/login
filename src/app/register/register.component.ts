import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user = {
    userType: '',
    docType: '',
    identificationNumber: '',
    firstName: '',
    lastName: '',
    gender: '',
    address: '',
    phoneNumber: '',
    branch: '',
    department: '',
    position: '',
    email: '',
    password: '',
  };

  generos: any = [];
  tipopersonas: any = [];
  constructor(private router: Router, private userService: UsersService) {}

  ngOnInit() {
    this.get_genero();
  }

  onSubmit() {
    console.log(this.user);
  }

  async get_genero() {
    // TODO: In case you find error in  dealys from the servers implement promises
    try {
      // Use firstValueFrom to get the first emitted value from the Observable
      const resp = await firstValueFrom(this.userService.get_generos());

      // Once the server responds, the execution will continue here
      this.generos = resp;

      console.log('Data received:', this.generos);
    } catch (error) {
      // Handle any errors that might occur during the server request
      console.error('Error fetching data:', error);
    }
  }

  async get_tipopersona() {
    // TODO: In case you find error in  dealys from the servers implement promises
    try {
      // Use firstValueFrom to get the first emitted value from the Observable
      const resp = await firstValueFrom(this.userService.get_idtipopersonas());

      // Once the server responds, the execution will continue here
      this.tipopersonas = resp;

      console.log('Data received:', this.generos);
    } catch (error) {
      // Handle any errors that might occur during the server request
      console.error('Error fetching data:', error);
    }
  }

  cancelar() {
    this.user = {
      userType: '',
      docType: '',
      identificationNumber: '',
      firstName: '',
      lastName: '',
      gender: '',
      address: '',
      phoneNumber: '',
      branch: '',
      department: '',
      position: '',
      email: '',
      password: '',
    };

    this.router.navigate(['profile']);
  }
}
