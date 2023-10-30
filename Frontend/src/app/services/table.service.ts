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


  selce
  
  constructor() { }

  /**
   * 
   * @param index row index of tableData
   * @param key header / variable name / column name
   * @param value value to be set at that row and for tha column
   */
  setTValue(index : number, key: string, value : any): void{
    this.tableData[index][key] = value;
  }

  /**
   * 
   * @param index row index of tableData
   * @param key header / variable name / column name
   * @returns value to be set at that row and for tha column
   */
  getTValue(index : number, key : string ):void{
    return this.tableData[index][key];
  }

  

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
   * @param index index of the row to be returned
   * @returns the row with index of tableData
   */
  getRowValues(index : number): { [key: string]: any }{
    return this.tableData[index];
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

  /**
   * @yields adds a new column to the tableHeaders array and 
   * populates it with empty strings
   */
  addColumn() {
    // Add a new column to the tableHeaders array
    const newColumnName = 'newColumnName'; // You can use any default name you prefer
    this.tableHeaders.push(newColumnName);
    this.tableTypes.push('nominal');
    // Initialize data entries for the new column in all rows
    for (let i = 0; i < this.tableData.length; i++) {
      this.tableData[i][newColumnName] = ''; // Set the new column to an empty string
    }

  }
  /**
   * @yields adds one empty entry to each tablecolumn/header
   */
  addRow() {
    const newRow: { [key: string]: string } = {}; // Define the type of newRow
  
    for (const header of this.tableHeaders) {
      newRow[header] = ''; // Access header.value directly
    }
  
    // Add the new row to the tableData array
    this.tableData.push(newRow);
  }

  /**
   * @yields deltes one the last row in tableData
   */
  delRow() {
    if (this.tableData.length > 0) {
      this.tableData.pop(); // Removes the last row
    }
  }
  
  /**
   * @yields deletes the last table header and its data in tableData
   */
  delColumn() {
    if (this.tableHeaders.length > 0) {
      const lastColumnName = this.tableHeaders[this.tableHeaders.length - 1];
  
      // Remove the column from the tableHeaders
      let header : any = this.tableHeaders.pop();
      delete this.tableTypes[header];
  
      // Remove the corresponding data entries in all rows
      for (let i = 0; i < this.tableData.length; i++) {
        delete this.tableData[i][lastColumnName];
      }
    }
  }

  /**
   * sets all tableData entries to "" string, headers and thier types remain the same
   */
  clearTable() {
    // Clear cell values
    for (let i = 0; i < this.tableData.length; i++) {
      const rowData = this.tableData[i];
      for (const header of this.tableHeaders) {
        rowData[header] = '';
      }
    }
  
  }

  /**
   * needed each time a header is modified by user
   * @param oldHeader the headername pre modification
   * @param newHeader the headername post modification
   * which is the user input
   */
  headerCleanup(oldHeader: string, newHeader: string) {
    
    for (let i = 0; i < this.tableData.length; i++) {
      const rowData = this.tableData[i];
      
      // Check if the oldHeader exists in the row
      if (oldHeader in rowData) {
        // Copy the data from the old header to the new header
        rowData[newHeader] = rowData[oldHeader];
        
        // Delete the old header data
        delete rowData[oldHeader];
      }
    }

    // After cleanup, update the header value
    const index = this.tableHeaders.findIndex(header => header === oldHeader);
    if (index !== -1) {
      this.tableHeaders[index] = newHeader;
    }
  }

  

}
