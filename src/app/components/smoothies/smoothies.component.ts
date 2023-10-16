import { Component, OnDestroy, OnInit } from '@angular/core';
import { Smoothie } from '../../shared/model/smoothie';
import { SmoothieServiceService } from '../../shared/service/smoothie-service.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DetailsComponent } from '../details/details.component';
import { DialogResult } from '../../shared/model/dialog-result';
import { TokenStorageService } from '../../shared/service/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-smoothies',
  templateUrl: './smoothies.component.html',
  styleUrls: ['./smoothies.component.scss']
})
export class SmoothiesComponent implements OnInit, OnDestroy {

  smoothiesList: Smoothie[];
  subscription: Subscription = new Subscription();
  isLoggedIn = false;
  user: any;

  constructor(private smoothieService: SmoothieServiceService, 
              private token: TokenStorageService,
              public dialog: MatDialog,
              private router:Router) {
    this.smoothiesList = [];
  }

  ngOnInit(): void {
    this.isLoggedIn = true;
    this.user = this.token.getUser();
  
    this.subscription = this.smoothieService.getAllSmoothies().subscribe(
      res => {
        this.smoothiesList = res as any;
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    window.location.reload();
  }

 getSmoothiesList(): Smoothie[] {
    this.smoothieService.getAllSmoothies().subscribe(
      res => {
        this.smoothiesList = res as any;
      });

    return this.smoothiesList;
  }

  public clickMe() {
    return this.getSmoothiesList();
  }

  showDetails(data:Smoothie) {
    let dialogRef = this.dialog.open(DetailsComponent, {data});
    dialogRef.afterClosed().subscribe(result => {
      if(result !== DialogResult.CANCELLED) {
        this.ngOnInit();
      }
    });
  }

  logout(): void {
    this.token.signOut();    
    this.router.navigate(['/login']);
  }
}
