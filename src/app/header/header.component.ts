import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  toggleMenu = false;

  onToggleMenu() {
    this.toggleMenu = !this.toggleMenu;
  }

  closeMenu() {
    if (this.toggleMenu = true) {
      this.toggleMenu = false;
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
