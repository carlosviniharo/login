import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom, of} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent {
  user: any = {}; // Define the 'user' object to store the form data
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private userService: UsersService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {
    this.registerForm = this.formBuilder.group({
      persona: this.formBuilder.group({
        idtipoidentificacion: ['', Validators.required],
        identificacion: ['', Validators.required],
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        genero: ['', Validators.required],
        direccion: ['', Validators.required],
        celular: ['', Validators.required],
        telefono: ['', Validators.required],
      }),
      usuario: this.formBuilder.group({
        idrol: ['', Validators.required],
        iddepartamento: ['', Validators.required],
        idcargo: ['', Validators.required],
        sucursal:['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
      })
    });
  }

  myDictionaryStaticTables: { [key: string]: any } = {};

  ngOnInit() {
    this.get_genero();
    this.get_tipoidentificaciones();
    this.get_sucursales();
    this.get_departamentos();
    this.get_roles();
    this.get_cargos();
    this.get_sucursalesdepartamentos(1);
  }

  onSubmit() {
    if (this.registerForm.valid) {


      
      this.user = this.registerForm.value;
      
      // Convert the user object to a JSON string
      const jsonData = JSON.stringify(this.user);
      console.log(jsonData);
      

      this.userService.create_user(this.user).subscribe(
        (response) => {
          console.log('API response:', response);
          const navigationExtras: NavigationExtras = {
            state: { user: this.user }
          };
          this.router.navigate(['profile'], navigationExtras);
        },
        (error: any) => {
          if (error.status === 400 && error.error) {

            if (error.error.persona && error.error.persona.identificacion) {
              this.snackbarService.show(error.error.persona.identificacion[0]);
            }
  
            if (error.error.usuario && error.error.usuario.email) {
              this.snackbarService.show(error.error.usuario.email[0]);
            }
          } else {
            // Handle other types of errors
            console.error('API error:', error);
          }
        }
      );
    } else {
      this.snackbarService.show('Form is not valid. Please fill in all required fields.');

    }
  
    }

  cancelar() {
    this.registerForm.reset();
    this.router.navigate(['/']);
     }

  async get_cargos() {
    // TODO: In case you find error in  dealys from the servers implement promises
    try {
      // Use firstValueFrom to get the first emitted value from the Observable
      const resp = await firstValueFrom(
        this.userService.get_cargos()
      );

      // Once the server responds, the execution will continue here
      this.myDictionaryStaticTables['cargos'] = resp;

      console.log('Data received:', this.myDictionaryStaticTables['cargos']);
    } catch (error) {
      // Handle any errors that might occur during the server request
      console.error('Error fetching data:', error);
    }
  }

  async get_departamentos() {
    // TODO: In case you find error in  dealys from the servers implement promises
    try {
      // Use firstValueFrom to get the first emitted value from the Observable
      const resp = await firstValueFrom(
        this.userService.get_departamentos()
      );

      // Once the server responds, the execution will continue here
      this.myDictionaryStaticTables['departamentos'] = resp;

      console.log('Data received:', this.myDictionaryStaticTables['departamentos']);
    } catch (error) {
      // Handle any errors that might occur during the server request
      console.error('Error fetching data:', error);
    }
  }

  async get_sucursalesdepartamentos(idsucursal: number) {
    try {
      const resp =await firstValueFrom(
        this.userService.get_sucursalesdepartamentos(idsucursal));

        this.myDictionaryStaticTables['sucursalesdepartamentos'] = resp;
        console.log('Data received:', this.myDictionaryStaticTables['sucursalesdepartamentos']);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async get_genero() {
    // TODO: In case you find error in  dealys from the servers implement promises
    try {
      // Use firstValueFrom to get the first emitted value from the Observable
      const resp = await firstValueFrom(this.userService.get_generos());

      // Once the server responds, the execution will continue here
      this.myDictionaryStaticTables['generos'] = resp;

      console.log('Data received:', this.myDictionaryStaticTables['generos']);
    } catch (error) {
      // Handle any errors that might occur during the server request
      console.error('Error fetching data:', error);
    }
  }

  async get_roles() {

    try {
      const resp = await firstValueFrom(this.userService.get_roles());

      this.myDictionaryStaticTables['roles'] = resp;

      console.log('Data received:', this.myDictionaryStaticTables['roles']);
    }catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async get_sucursales() {
    // TODO: In case you find error in  dealys from the servers implement promises
    try {
      // Use firstValueFrom to get the first emitted value from the Observable
      const resp = await firstValueFrom(
        this.userService.get_sucursales()
      );

      // Once the server responds, the execution will continue here
      this.myDictionaryStaticTables['sucursales'] = resp;

      console.log('Data received:', this.myDictionaryStaticTables['sucursales']);
    } catch (error) {
      // Handle any errors that might occur during the server request
      console.error('Error fetching data:', error);
    }
  }

  async get_tipopersona() {
    // TODO: In case you find error in  dealys from the servers implement promises
    try {
      // Use firstValueFrom to get the first emitted value from the Observable
      const resp = await firstValueFrom(this.userService.get_tipopersonas());

      // Once the server responds, the execution will continue here
      this.myDictionaryStaticTables['tipopersonas'] = resp;

      console.log('Data received:', this.myDictionaryStaticTables['tipopersonas']);
    } catch (error) {
      // Handle any errors that might occur during the server request
      console.error('Error fetching data:', error);
    }
  }

  async get_tipoidentificaciones() {
    // TODO: In case you find error in  dealys from the servers implement promises
    try {
      // Use firstValueFrom to get the first emitted value from the Observable
      const resp = await firstValueFrom(
        this.userService.get_tipoidentificaciones()
      );

      // Once the server responds, the execution will continue here
      this.myDictionaryStaticTables['tipoidentificaciones'] = resp;

      console.log('Data received:', this.myDictionaryStaticTables['tipoidentificaciones']);
    } catch (error) {
      // Handle any errors that might occur during the server request
      console.error('Error fetching data:', error);
    }
    
  }
}

function showSnackBar(message: any, snackBar: MatSnackBar ){

  snackBar.open(message, 'Close', {
    duration: 5000, // Set the duration for how long the pop-up should be visible (in milliseconds)
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
    panelClass: ['snackbar-error'],

  });

  }

