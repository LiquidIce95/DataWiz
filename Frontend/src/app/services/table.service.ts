import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableDataService {
  // Cell entries first dimension is row then the key correspond to a header 
  // the value returned is the value for the (header,row) pair
  tableData: { [key: string]: any }[] = [
    { name: 'John', age: 30, income: 0 },
    { name: 'Alice', age: 25, income: 100 },
  ];

  tableHeaders: { [key: string]: string }[] = [
    { value: 'name' },
    { value: 'age' },
    { value: 'income' },
  ];

  tableTypes: { [key: string]: string }[] = [
    { value: 'nominal' },
    { value: 'metric' },
    { value: 'metric' },
  ];
  
  constructor() { }


  getColumnValues(columnName: string): any[] {
    return this.tableData.map(row => row[columnName]);
  }

  deduceColumnType(columnValues: any[]): string {
    if (columnValues.every(value => !isNaN(value))) {
        return 'metric';
    }
    return 'nominal'; // Default type
  }

  TypeDetect(){
    this.tableTypes = [];
    // now we detect the types
    this.tableHeaders.forEach((header) => {
      const data : any[] = this.getColumnValues(header['value']);
      const type : string = this.deduceColumnType(data);
      this.tableTypes.push({value:type});
    });
  }



}
