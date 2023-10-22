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
  /**
   * dictonary to store the computed averages
   * key is the variable name (tableheader)
   */
  averages: { [key: string]: (number | undefined)} = {};

  /**
   * @yields deletes the variables that are selected but no present 
   * in the tableDataService.tableHeaders
   */
  cleanSelectedVariables() {
    // Loop through all the keys in selectedVariables
    for (const key in this.selectedVariables) {
      // Check if this key exists in tableDataService.tableHeaders
      if (this.tableDataService.tableHeaders.indexOf(key) === -1) {
        // Key does not exist, so delete it from selectedVariables
        delete this.selectedVariables[key];
      }
    }
  }
  // computes the averages for the selected metric variables
  /**
   * @yields computes the average for each selected metric variable (tableheader)
   * and stores them in the this.averages dict
   */
  getAverages() : void {

    this.averages = {};
    this.cleanSelectedVariables();
    
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
  
  /**
   * 
   * @returns all the keys for the dict this.averages
   */
  getAverageKeys(): string[] {
    this.getAverages();
    return Object.keys(this.averages);
  }  


  // MEDIAN COMPUTATION----------------------------------------------------------------------------------




}
