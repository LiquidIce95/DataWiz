import { Component,Renderer2 } from '@angular/core';
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
  constructor(private renderer: Renderer2,public tableDataService: TableDataService, public auxiliaryService : AuxiliaryService) {}

  resultTable: { [key: string]: any }[] = [];
  computations : string[] = ['variable','average','median','variance','geometricMean','mode','stdDev'];
  /**
   * delimiter for the conversion into the tableHeader data
   */
  delimiter : string = ',';

  /**
   * specifies which format the input data has
   */
  FormType : string = "0";

  /**
   * setter for this.delimiter
   * @param delimiter delimiter for input data
   */
  setDelimiter(delimiter: string) {
    this.delimiter = delimiter;
  }
  

  prepareExportData(){

    let csvRows = [];


    for( let comp of this.resultTable){
      let row = [];
      for(let key in comp){
        row.push(comp[key]);
      }
      csvRows.push(row.join(','));
    }

    console.log(this.computations);
    console.log(csvRows);

    return [this.computations.join(','),csvRows];
  }
  
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

/**
   * dictonary to store the computed averages
   * key is the variable name (tableheader)
   */
medians: { [key: string]: (number | undefined)} = {};

  
// computes the averages for the selected metric variables
/**
 * @yields computes the average for each selected metric variable (tableheader)
 * and stores them in the this.averages dict
 */
getMedian() : void {

  this.medians = {};
  
  // compute the Average for each header
  this.tableDataService.getKeys().forEach((key)=>{

    let VarInfo = this.tableDataService.getHvalue(key);
    
    if(VarInfo[1] == true && VarInfo[0] == 'metric'){
      let HeaderData = this.tableDataService.getColumnValues(key);

      if(HeaderData.length == 0){
        this.medians[key] = undefined
      }
      else{
        this.medians[key] = simpleStats.median(HeaderData);
      }
    }
      

  });
}

/**
 * 
 * @returns all the keys for the dict this.medians
 */
getMedianKeys(): string[] {
  this.getMedian();
  let keys : string[] = [];

  for (const key in this.medians){
     keys.push(key);
  }
  return keys;
}  

// Variance COMPUTATION----------------------------------------------------------------------------------

/**
   * dictonary to store the computed averages
   * key is the variable name (tableheader)
   */
Variances: { [key: string]: (number | undefined)} = {};

  
// computes the averages for the selected metric variables
/**
 * @yields computes the average for each selected metric variable (tableheader)
 * and stores them in the this.averages dict
 */
getVariance() : void {

  this.Variances = {};
  
  // compute the Average for each header
  this.tableDataService.getKeys().forEach((key)=>{

    let VarInfo = this.tableDataService.getHvalue(key);
    
    if(VarInfo[1] == true && VarInfo[0] == 'metric'){
      let HeaderData = this.tableDataService.getColumnValues(key);

      if(HeaderData.length == 0){
        this.Variances[key] = undefined
      }
      else{
        this.Variances[key] = simpleStats.variance(HeaderData);
      }
    }
      

  });
}

/**
 * 
 * @returns all the keys for the dict this.medians
 */
getVarianceKeys(): string[] {
  this.getVariance();
  let keys : string[] = [];

  for (const key in this.Variances){
     keys.push(key);
  }
  return keys;
}  


// geoMean COMPUTATION----------------------------------------------------------------------------------

/**
   * dictonary to store the computed averages
   * key is the variable name (tableheader)
   */
geoMeans: { [key: string]: (number | undefined)} = {};

  
// computes the averages for the selected metric variables
/**
 * @yields computes the average for each selected metric variable (tableheader)
 * and stores them in the this.averages dict
 */
getgeoMean() : void {

  this.geoMeans = {};
  
  // compute the Average for each header
  this.tableDataService.getKeys().forEach((key)=>{

    let VarInfo = this.tableDataService.getHvalue(key);
    
    if(VarInfo[1] == true && VarInfo[0] == 'metric'){
      let HeaderData = this.tableDataService.getColumnValues(key);

      if(HeaderData.length == 0){
        this.geoMeans[key] = undefined
      }
      else{
        this.geoMeans[key] = simpleStats.geometricMean(HeaderData);
      }
    }
      

  });
}

/**
 * 
 * @returns all the keys for the dict this.medians
 */
getgeoMeanKeys(): string[] {
  this.getgeoMean();
  let keys : string[] = [];

  for (const key in this.geoMeans){
     keys.push(key);
  }
  return keys;
}  



// mode / highest occurences COMPUTATION----------------------------------------------------------------------------------
/**
   * dictonary to store the computed averages
   * key is the variable name (tableheader)
   */
modes: { [key: string]: (number | undefined)} = {};

  
// computes the averages for the selected metric variables
/**
 * @yields computes the average for each selected metric variable (tableheader)
 * and stores them in the this.averages dict
 */
getMode() : void {

  this.modes = {};
  
  // compute the Average for each header
  this.tableDataService.getKeys().forEach((key)=>{

    let VarInfo = this.tableDataService.getHvalue(key);
    
    if(VarInfo[1] == true && VarInfo[0] == 'metric'){
      let HeaderData = this.tableDataService.getColumnValues(key);

      if(HeaderData.length == 0){
        this.modes[key] = undefined
      }
      else{
        this.modes[key] = simpleStats.mode(HeaderData);
      }
    }
      

  });
}

/**
 * 
 * @returns all the keys for the dict this.medians
 */
getModeKeys(): string[] {
  this.getMode();
  let keys : string[] = [];

  for (const key in this.modes){
     keys.push(key);
  }
  return keys;
}  



// standarddeviation / highest occurences COMPUTATION----------------------------------------------------------------------------------
/**
   * dictonary to store the computed averages
   * key is the variable name (tableheader)
  */

stddevs: { [key: string]: (number | undefined)} = {};

  
// computes the averages for the selected metric variables
/**
 * @yields computes the average for each selected metric variable (tableheader)
 * and stores them in the this.averages dict
 */
getStd() : void {

  this.stddevs = {};
  
  // compute the Average for each header
  this.tableDataService.getKeys().forEach((key)=>{

    let VarInfo = this.tableDataService.getHvalue(key);
    
    if(VarInfo[1] == true && VarInfo[0] == 'metric'){
      let HeaderData = this.tableDataService.getColumnValues(key);

      if(HeaderData.length == 0){
        this.stddevs[key] = undefined
      }
      else{
        this.stddevs[key] = simpleStats.standardDeviation(HeaderData);
      }
    }
      

  });
}

/**
 * 
 * @returns all the keys for the dict this.medians
 */
getStdKeys(): string[] {
  this.getStd();
  let keys : string[] = [];

  for (const key in this.stddevs){
     keys.push(key);
  }
  return keys;
}  



/**
 * 
 * @returns calls all functions and then reuturns the computations
 */
createResultTable(): { [key: string]: any }[] {
    this.resultTable = [];
    // Call all computation functions to update their respective dictionaries
    this.getAverages();
    this.getMedian();
    this.getVariance();
    this.getgeoMean();
    this.getMode();
    this.getStd();
  
    // Initialize the result table array
    // Iterate over each key in the averages (assuming all dicts have the same keys)
    for (const key of this.tableDataService.getKeys()) {  // or use any other *Keys() function
      // Construct the result object for each key
      let VarInfo = this.tableDataService.getHvalue(key);

      if(VarInfo[1] == true && VarInfo[0] == 'metric'){
        const result = {
          'variable': key,
          'average': this.averages[key],
          'median': this.medians[key],
          'variance': this.Variances[key],
          'geometricMean': this.geoMeans[key],
          'mode': this.modes[key],
          'stdDev': this.stddevs[key]
        };
    
        // Add the result object to the result table array
        this.resultTable.push(result);
      }
    }

      
  
    return this.resultTable;
  }

  getResKeys(){
    return [
      'variable',
      'average',
      'median',
      'variance',
      'geometricMean',
      'mode',
      'stdDev'
    ]
  }
  

}



