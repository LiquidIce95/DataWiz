import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableDataService {
  /** Cell entries first dimension is row then the key correspond to a header 
  * the value returned is the value for the (row,header/col) pair 
  * the key is the name of the table headers
  */
  tableData: { [key: string]: any }[] = [
    { name: 'John', age: 30, income: 0 },
    { name: 'Alice', age: 25, income: 100 },
  ];
  
  /**
   * INVARIANT: length of tableheaders and types is the same
   * the headers read from left to right with respect of the 
   * html table
   */
  tableHeaders: string[] = [
    'name',
    'age',
    'income'
  ];

  /**
   * this is also read left to right so the first entry is the left most 
   * table header
   */
  tableTypes: string[] = [
    'nominal',
    'metric',
    'metric'
  ];
  
  
  /**
 * returns a list [] consisting of all entries of the header which are not '' or undefined
 * @param columnName the name of the column to get the values from (table header)
 * @returns a list consisting of the values for the specified column
 */
  getColumnValues(columnName: string): any[] {
    return this.tableData.map(row => row[columnName]).filter(val => val !== undefined && val !== '');

  }

  /**
   * 
   * @param columnValues list of all the values for the column
   * @returns the variable type 
   */
  deduceColumnType(columnValues: any[]): string {
    if (columnValues.every(value => !isNaN(value))) {
        return 'metric';
    }
    return 'nominal'; // Default type
  }

  /**Detects the variable type of all column*/   
  TypeDetect(){
    this.tableTypes = [];
    // now we detect the types
    this.tableHeaders.forEach((header,index) => {
      const data : any[] = this.getColumnValues(header);
      const type : string = this.deduceColumnType(data);
      this.tableTypes[index] = type;
    });
  }

  /**
   * gets user input from html template, converts it into a number if possible
   * @param inputValue something to check if it can be converted into a number
   * @returns returns the converted number if it was passible otherwise the inputValue
   * is returned
   * */ 
  convertToNumberIfPossible(inputValue: any): any {
    // Check if the input value can be converted to a number
    if (!isNaN(Number(inputValue)) && inputValue != '') {
      // Convert to number and return
      return Number(inputValue);
    } else {
      // If not convertible, return the original value
      return inputValue;
    }
  }

  
  

}
