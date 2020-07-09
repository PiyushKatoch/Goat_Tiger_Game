import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavBarComponent implements OnInit {
  route: string;

  constructor(location: Location, router: Router) {
    router.events.subscribe((val) => {
      if (location.path() !== ''){
        this.route = location.path();
      } else {
        this.route = 'Adu Puli Attam';
      }
      if (this.route === '/game'){
        this.route = 'Adu Puli Attam';
      }
      else if (this.route === '/rules'){
        this.route = 'Rules';
      }
      else if (this.route === '/about'){
        this.route = 'About';
      }
      else if (this.route === ''){
        this.route = 'Adu Puli Attam';
      }
    });
  }
  ngOnInit() {
  }
}
