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


  // AVERAGE COMPUTATION------------------------------------------------------------------------------
  averages: { [key: string]: (number | undefined)} = {};

  // computes the averages for the selected metric variables
  getAverages() : void {

    this.averages = {};
    console.log(this.tableDataService.tableData)
    // compute the Average for each header
    this.tableDataService.tableHeaders.forEach((header,index)=>{
      
      if(this.selectedVariables[header] == true && this.tableDataService.tableTypes[index] == 'metric'){
        let HeaderData = this.tableDataService.getColumnValues(header);

        if(HeaderData.length == 0){
          this.averages[header] = undefined
        }
        else{
          this.averages[header] = simpleStats.mean(HeaderData);
        }
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
