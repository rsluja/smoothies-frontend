import { Component, OnInit  } from '@angular/core';
import { TokenStorageService } from './shared/service/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'smoothies-frontend';

  private roles: string[] = [];
  isLoggedIn: boolean = false;
  showAdminBoard: boolean = false;
  showUserBoard: boolean = false;
  username: string = "";
  
  constructor(private tokenStorageService: TokenStorageService) {

  }

ngOnInit(): void {
  this.isLoggedIn = !!this.tokenStorageService.getToken();
  if (this.isLoggedIn) {
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;

    this.showAdminBoard = this.roles.includes('PRODUCT_OWNER');
    this.showUserBoard = this.roles.includes('USER');
    
    this.username = user.username;
  }
}

logout(): void {
  this.tokenStorageService.signOut();
  window.location.reload();
}

}
