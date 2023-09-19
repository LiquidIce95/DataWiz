import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CalculatorComponent } from './calculator/calculator.component'
import { PricesComponent } from './prices/prices.component';
import {DescriptiveComponent} from './calculator/descriptive/descriptive.component';
import {DiagramsComponent} from './calculator/diagrams/diagrams.component';

const routes: Routes = [
  {path: 'statisticscalculator', component: CalculatorComponent,
  children: [
    { path: 'descriptive', component: DescriptiveComponent },
    { path: 'diagrams' , component: DiagramsComponent}
  ]},
  { path: 'prices', component: PricesComponent },
  { path: '', redirectTo: '/statisticscalculator/descriptive', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
