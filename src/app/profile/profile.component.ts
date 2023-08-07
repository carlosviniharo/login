import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

interface RouteData {
  user: any; // Replace 'any' with the actual type of your user data
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Use observable to handle asynchronous route data changes
    this.user = this.route.snapshot.data as RouteData;
    console.log('User data:', this.user);
  }
}