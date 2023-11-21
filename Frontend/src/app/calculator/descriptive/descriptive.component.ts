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


}
