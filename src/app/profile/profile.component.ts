import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { ActivatedRoute, ActivationStart, Route, Router, RoutesRecognized } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    // Use observable to handle asynchronous route data changes
    this.user = history.state.usuario
    console.log('User data:', this.user);
  }
}