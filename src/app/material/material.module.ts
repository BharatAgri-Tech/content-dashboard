import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatMenuModule} from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatBadgeModule} from '@angular/material/badge';


const material  = [
  MatToolbarModule,
  MatIconModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatButtonModule,
  MatNativeDateModule,
  MatInputModule,
  MatAutocompleteModule,
  MatRadioModule,
  MatCardModule,
  MatGridListModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatMenuModule,
  MatCheckboxModule,
  MatBadgeModule
];

@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
