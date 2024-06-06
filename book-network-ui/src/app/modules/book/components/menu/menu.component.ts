import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  firstName: string | undefined;

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.userService.currentUser.subscribe(user => {
      if (user) {
        this.firstName = user.firstname; // Set the first name when the user data is available
      }
    });

    const linkColor = document.querySelectorAll('.nav-link');
    linkColor.forEach(link => {
      if (window.location.href.endsWith(link.getAttribute('href') || '')) {
        link.classList.add('active');
      }
      link.addEventListener('click', () => {
        linkColor.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
  }

  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }
}
