import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Smoothie } from '../../shared/model/smoothie';
import { SmoothieServiceService } from '../../shared/service/smoothie-service.service';
import { DialogResult } from '../../shared/model/dialog-result';
import { TokenStorageService } from 'src/app/shared/service/token-storage.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailsComponent implements OnInit {
  detailsForm: FormGroup | any;
  roles: string[] = []
  isDisabled = false;

  constructor(public formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<DetailsComponent>,
              private smoothieService: SmoothieServiceService,
              private token: TokenStorageService,
              @Inject(MAT_DIALOG_DATA) public data: Smoothie) {
  
  }

  ngOnInit(): void {
    this.isDisabled = false;
    console.log(this.data)
   
    this.detailsForm = this.formBuilder.group({
      name: [this.data.name],
      description: [this.data.description],
      nutritions: this.formBuilder.group({
        kcal: [this.data.nutritions?.kcal],
        fat: [this.data.nutritions?.fat],
        saturates: [this.data.nutritions?.saturates],
        carbs: [this.data.nutritions?.carbs],
        sugars: [this.data.nutritions?.sugars],
        fibre: [this.data.nutritions?.fibre],
        protein: [this.data.nutritions?.protein],
        salt: [this.data.nutritions?.salt]
      })
    });

    this.disableButtons();
  }
  
  onSubmit(data: any,detailsForm: FormGroup, id: number) {
    detailsForm.value.id = id;
    this.smoothieService.updateSmoothieDetails(data, id);
    this.dialogRef.close(DialogResult.SUBMITTED);
  }
  
  delete(id: number) {
    this.smoothieService.deleteSmoothieDetails(id);
    this.dialogRef.close(DialogResult.DELETED);
  }

  cancel() {
    this.dialogRef.close(DialogResult.CANCELLED);
  }
  
  disableButtons() {
    this.roles = this.token.getUser().roles;
    if (this.roles[0] === "USER") {
      this.isDisabled = true;
    }
  }
}
