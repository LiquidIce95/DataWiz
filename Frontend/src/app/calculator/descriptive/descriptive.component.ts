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

  // TODOS: Computations must ignore empty rows

  // AVERAGE COMPUTATION------------------------------------------------------------------------------
  averages: { [key: string]: number } = {};

  // computes the sum of the entries of a header and counts how many entries it had
  calcSumsCounts(data : { [key: string]: any } ,key : string, index : number, 
    sums :{ [key: string]: number }, counts : { [key: string]: number }) : void{

    // check if user selected the variable for computation and if its type is metric
    if(this.tableDataService.tableTypes[index]['value'] === 'metric' && this.selectedVariables[key]) {
      if(data[key] !== null && !isNaN(data[key])) {
        sums[key] = (sums[key] || 0) + data[key];
        counts[key] = (counts[key] || 0) + 1;
      }
    }
  }

  // computes the acutal average for a given header with the index referring to the header
  // stores data directly into the averages parameter
  calcAvg(header : { [key: string]: any },index : number ,averages : { [key:string] : number},
    sums:{ [key: string]: number },counts: { [key: string]: number }) : void{
    const key = header['value'];
    this.tableDataService.tableData.forEach(data => {
      this.calcSumsCounts(data,key,index,sums,counts);
    });

    // adjusting 
    averages[key] = sums[key] / counts[key]

  }

  // TODO: TESTING
  // computes the averages for the selected metric variables
  getAverages() : { [key: string]: number } {
    let sums: { [key: string]: number } = {};
    let counts: { [key: string]: number } = {};
    let averages: { [key: string]: number } = {};

    console.log(this.tableDataService.tableData)
    // compute the Average for each header
    this.tableDataService.tableHeaders.forEach((header,index)=>{
      // iterate through all data rows
      this.calcAvg(header,index,averages,sums,counts);

    })
  
    return averages;
  }
  

  getAverageKeys(): string[] {
    this.averages = {};
    this.averages = this.getAverages();
    return Object.keys(this.averages);
  }  


  // MEDIAN COMPUTATION----------------------------------------------------------------------------------
  medians: {[key: string]: number} = {};




}
