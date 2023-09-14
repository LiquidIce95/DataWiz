import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CalculatorComponent } from './calculator/calculator.component'
import { PricesComponent } from './prices/prices.component';

const routes: Routes = [
  {path: 'statisticscalculator', component: CalculatorComponent},
  { path: 'prices', component: PricesComponent },
  { path: '', redirectTo: '/statisticscalculator', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
