import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { PricesComponent } from './prices/prices.component';
import { TableComponent } from './calculator/table/table.component';
import { FormsModule } from '@angular/forms';
import { DescriptiveComponent } from './calculator/descriptive/descriptive.component';
import { DiagramsComponent } from './calculator/diagrams/diagrams.component';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    PricesComponent,
    TableComponent,
    DescriptiveComponent,
    DiagramsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
