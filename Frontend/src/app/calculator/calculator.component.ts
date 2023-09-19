import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['../globalStyles.css','./calculator.component.css']
})
export class CalculatorComponent {
  constructor(private router: Router) {}
  
  onChange(event: any) {
    this.router.navigate([event.target.value]);
  }
  
}
