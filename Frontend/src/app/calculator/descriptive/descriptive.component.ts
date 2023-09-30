import { Component } from '@angular/core';
import { TableDataService } from '../../services/table.service';
import * as simpleStats from 'simple-statistics';


@Component({
  selector: 'app-descriptive',
  templateUrl: './descriptive.component.html',
  styleUrls: ['../../globalStyles.css','./descriptive.component.css']
})
export class DescriptiveComponent {
  constructor(public tableDataService: TableDataService) {}
  selectedVariables: { [key: string]: boolean } = {};

  // TODOS: Computations must ignore empty rows

  // AVERAGE COMPUTATION------------------------------------------------------------------------------
  averages: { [key: string]: number } = {};

  // computes the averages for the selected metric variables
  getAverages() : void {

    console.log(this.tableDataService.tableData)
    // compute the Average for each header
    this.tableDataService.tableHeaders.forEach((header,index)=>{
      
      if(this.selectedVariables[header['value']] == true && this.tableDataService.tableTypes[index][header['value']]){
        let HeaderData = this.tableDataService.getColumnValues(header['value']);

        this.averages[header['value']] = simpleStats.mean(HeaderData);
      }
        

    });
}
  

  getAverageKeys(): string[] {
    this.getAverages();
    return Object.keys(this.averages);
  }  


  // MEDIAN COMPUTATION----------------------------------------------------------------------------------
  medians: {[key: string]: number} = {};




}
