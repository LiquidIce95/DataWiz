import { Component } from '@angular/core';
import { TableDataService } from '../../services/table.service';
import * as simpleStats from 'simple-statistics';
import { AuxiliaryService } from 'src/app/services/auxiliary.service';


@Component({
  selector: 'app-descriptive',
  templateUrl: './descriptive.component.html',
  styleUrls: ['../../globalStyles.css','./descriptive.component.css'],
  providers:[AuxiliaryService]

})
export class DescriptiveComponent {
  constructor(public tableDataService: TableDataService, public auxiliaryService : AuxiliaryService) {}

  // AVERAGE COMPUTATION------------------------------------------------------------------------------
  /**
   * dictonary to store the computed averages
   * key is the variable name (tableheader)
   */
  averages: { [key: string]: (number | undefined)} = {};

  
  // computes the averages for the selected metric variables
  /**
   * @yields computes the average for each selected metric variable (tableheader)
   * and stores them in the this.averages dict
   */
  getAverages() : void {

    this.averages = {};
    
    // compute the Average for each header
    this.tableDataService.getKeys().forEach((key)=>{

      let VarInfo = this.tableDataService.getHvalue(key);
      
      if(VarInfo[1] == true && VarInfo[0] == 'metric'){
        let HeaderData = this.tableDataService.getColumnValues(key);

        if(HeaderData.length == 0){
          this.averages[key] = undefined
        }
        else{
          this.averages[key] = simpleStats.mean(HeaderData);
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
    let keys : string[] = [];

    for (const key in this.averages){
       keys.push(key);
    }
    return keys;
  }  


  // MEDIAN COMPUTATION----------------------------------------------------------------------------------




}
