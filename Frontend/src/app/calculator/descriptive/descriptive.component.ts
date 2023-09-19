import { Component } from '@angular/core';
import { TableDataService } from '../table.service';


@Component({
  selector: 'app-descriptive',
  templateUrl: './descriptive.component.html',
  styleUrls: ['../../globalStyles.css','./descriptive.component.css']
})
export class DescriptiveComponent {
  constructor(public tableDataService: TableDataService) {}
  selectedVariables: { [key: string]: boolean } = {};
  averages: { [key: string]: number } = {};

  getAverages() {
    let sums: { [key: string]: number } = {};
    let counts: { [key: string]: number } = {};
  
    this.tableDataService.tableData.forEach(data => {
      this.tableDataService.tableHeaders.forEach((header, index) => {
        const key = header['value'];
        if(this.tableDataService.tableTypes[index]['value'] === 'metric' && this.selectedVariables[key]) {
          if(data[key] !== null && !isNaN(data[key])) {
            sums[key] = (sums[key] || 0) + data[key];
            counts[key] = (counts[key] || 0) + 1;
          }
        }
      });
    });
  
    let averages: { [key: string]: number } = {};
    Object.keys(sums).forEach(key => {
      averages[key] = sums[key] / counts[key];
    });
  
    return averages;
  }
  

  getAverageKeys(): string[] {
    this.averages = this.getAverages();
    return Object.keys(this.averages);
  }  
}
