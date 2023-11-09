import { Injectable } from '@angular/core';
//import * as lodash from 'lodash'; CANNOT USE THIS

@Injectable({
  providedIn: 'root'
})
export class TableDataService {
  /** Cell entries first dimension is row then the key correspond to a header 
  * the value returned is the value for the (row,header/col) pair 
  * the key is the name of the table headers
  */
  private tableData: { [key: string]: any }[] = [
    { name: 'John', age: 30, income: 0 },
    { name: 'Alice', age: 25, income: 100 },
  ];
  
  /**
   * key is the column / variable name, value is a list containning
   * the type and if its selected or not
   */
  private tableHeaders: {[key:string] : any[] } = {
    'name':['nominal',false],
    'age' :['metric',false],
    'income' : ['metric',false]
  };

  /**
   * we store the keys here to preserve order in the table display
   * when we delete a key and assign a key to a value it alwys is appended
   * at the end of the dicitonary so when user interacts with table the row order changes!
   */
  private tableKeys : string[] = [
    'name',
    'age',
    'income'
  ];

  constructor() { }


  /**
   * 
   * @returns a copy of headernames which are keys for tableHeaders, preserves order even when modifying 
   * the keys with changeheadername
   */
  getKeys():string[]{
    return structuredClone(this.tableKeys);
  }

  /**
   * 
   * @returns the entrie tableData 
   */
  getTableData():{ [key: string]: any }[]{
    return structuredClone(this.tableData);
  }

  /**
   * 
   * @returns the header dictionary
   */
  getTableHeaders():{[key:string] : any[] }{
    return structuredClone(this.tableHeaders);
  }

  /**
   * sets a value in the tableData
   * @param index row index of tableData
   * @param key header / variable name / column name
   * @param value value to be set at that row and for tha column
   */
  setTValue(index : number, key: string, value : any): void{
    if(index < this.tableData.length){
      if(key in this.tableData[index]){
        this.tableData[index][key] = value;
      }
      else {
        throw new Error('the key is not in the dictionary');
      }
    } 
    else {
      throw new Error('index out of bounds');
    }
  }

  /**
   * gets a value from tableData
   * @param index row index of tableData
   * @param key header / variable name / column name
   * @returns returns a copy of the value this.tableData[index][key]
   */
  getTValue(index : number, key : string ):any{
    if(index < this.tableData.length){
      if(key in this.tableData[index]){
        return this.tableData[index][key];
      }
      else{
        throw new Error('key not in dict');
      }
    }
    else{
      throw new Error('index out of bounds');
    }
  }

  /**
   * 
   * @param key headername / var name / key for tableHeader
   * @param type the type of the variable which is represented by the header
   * @param select boolean value indicated whether the variable is selected for computation
   */
  setHvalue(key:string , type:string='', select:boolean | null =null){
    if(key in this.tableHeaders){
      if ( select == null ){
        select = this.tableHeaders[key][1];
      }
      if(type == ''){
        type = this.tableHeaders[key][0];
      }
      this.tableHeaders[key] = [type,select];

    }
    else {
      throw new Error('key not in dict');
    }

    if (type == 'auto'){
      let colData = this.getColumnValues(key);
      this.deduceColumnType(colData);

    }
    

  }

  /**
     * 
     * @param key gets a value from the tableHeaders
     * @returns a copy of the header values
     * list with two elements first is type second is the value for 
     * select
     */
  getHvalue(key: string){
    return structuredClone(this.tableHeaders[key]);
  }



  /**
   * @yields adds one empty entry to each tablecolumn/header
   */
  addRow(row: {[key:string]:any}={}) {

    if(row = {}){
      const newRow: { [key: string]: string } = {}; // Define the type of newRow
  
      for (const key in this.getKeys()) {
        newRow[key] = ''; // Access header.value directly
      }
    
      // Add the new row to the tableData array
      this.tableData.push(newRow);
    } 
    else {
      this.tableData.push(row);
    }
    
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
   * @yields adds a new column to the tableHeaders array and 
   * populates it with empty strings
   */
  addColumn() {
    // Add a new column to the tableHeaders array
    const newColumnName = 'newColumnName'; // You can use any default name you prefer
    this.tableHeaders[newColumnName] = ['nominal', false];
    // Initialize data entries for the new column in all rows
    for (let i = 0; i < this.tableData.length; i++) {
      this.tableData[i][newColumnName] = ''; // Set the new column to an empty string
    }

    //now we need to add the column to 
    this.tableKeys.push(newColumnName);

  }
  

  
  
  /**
   * @yields deletes the last table header and its data in tableData
   */
  delColumn() {

    let KEYS = this.getKeys();

    if (KEYS.length > 0) {
      const lastColumnName = KEYS[KEYS.length - 1];
  
      // Remove the column from the tableHeaders
      delete this.tableHeaders[lastColumnName];
  
      // Remove the corresponding data entries in all rows
      for (let i = 0; i < this.tableData.length; i++) {
        delete this.tableData[i][lastColumnName];
      }
      this.tableKeys.pop();
    }
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
   * @returns the types of all headers in the same order as the headers themselves
   * in the tableKeys list
   */
  getHeaderTypes():string[]{
    let types = [];
    for(let key in this.tableKeys){
      types.push(this.tableHeaders[key][0]);
    }
    return types;
  }

  /**
   * 
   * @returns returns the selection state of all headers as in the same order in 
   * the tableKeys list
   */
  getHeaderSelects():boolean[]{
    let selects = [];
    for(let key in this.tableKeys){
      selects.push(this.tableHeaders[key][1]);
    }
    return selects;
  }

  /**
   * sets all tableData entries to "" string, headers and thier types remain the same
   */
  clearTable() {
    // Clear cell values
    for (let i = 0; i < this.tableData.length; i++) {
      const rowData = this.tableData[i];
      for (const header in this.tableHeaders) {
        rowData[header] = '';
      }
    }
  
  }

  delTable(){
    this.tableData = [];
    this.tableHeaders = {};
    this.tableKeys = [];
  }
  
  /**
   * needed each time a header is modified by user
   * @param oldHeader the headername pre modification, is the key for this.tableHeaders
   * @param newHeader the headername post modification
   * which is the user input
   */
  changeHeaderName(oldHeader: string, newHeader: string) {
    if(newHeader != null){
      let Headerdata = this.tableHeaders[oldHeader];
  
      this.tableHeaders[newHeader] = Headerdata;

      for(let k = 0; k < this.tableData.length; k++){
        this.tableData[k][newHeader] = this.tableData[k][oldHeader];
      }

      delete this.tableHeaders[oldHeader];

      //now the tableHeaders are up to date but not 
      //tableKeys!

      let index = this.getKeys().indexOf(oldHeader);

      this.tableKeys[index] = newHeader;

      //now tableKeys are also up to date
  
    }
    

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

  /**Detects the variable type of all columns*/   
  TypeDetect(){
    let index = 0;
    // now we detect the types
    for ( let key in this.tableKeys){
      const data : any[] = this.getColumnValues(key);
      const type : string = this.deduceColumnType(data);
      this.tableHeaders[key][0] = type;
      index += 1;
    }
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
