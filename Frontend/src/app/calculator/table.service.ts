import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableDataService {
  tableData: { [key: string]: any }[] = [
    { name: 'John', age: 30, income: 0 },
    { name: 'Alice', age: 25, income: 100 },
    // Add more rows as needed
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
}
