import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  
  user = {
    "userType": '',
    "docType": '',
    "identificationNumber": '',
    "firstName": '',
    "lastName": '',
    "gender": '',
    "address": '',
    "phoneNumber": '',
    "branch": '',
    "department": '',
    "position": '',
    "email": '',
    "password": ''
  }
  
  generos: any = [];
  constructor(private router: Router, private userService: UsersService){

    
  }

 ngOnInit() {
   this.get_genero();
 }

  onSubmit(){
console.log(this.user)
  }


  get_genero(){
    console.log('si estoy');
    
    this.userService.get_generos().subscribe(resp=>{
    
      this.generos = resp
      
    })
  }
  



  cancelar(){

    this.user = {
      "userType": '',
      "docType": '',
      "identificationNumber": '',
      "firstName": '',
      "lastName": '',
      "gender": '',
      "address": '',
      "phoneNumber": '',
      "branch": '',
      "department": '',
      "position": '',
      "email": '',
      "password": ''
    }

    this.router.navigate(['profile']);

  }
}
