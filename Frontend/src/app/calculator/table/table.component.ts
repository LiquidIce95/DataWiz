import { Component } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['../../globalStyles.css', './table.component.css']
})
export class TableComponent {
  tableData: { [key: string]: any }[] = [
    { name: 'John', age: 30 },
    { name: 'Alice', age: 25 },
    // Add more rows as needed
  ];
  tableHeaders :{[key: string]: string }[] =[
    { value: 'name' },
    { value: 'age' },
  ];

  addColumn() {
    // Add a new column to the tableHeaders array
    const newColumnName = 'newColumnName'; // You can use any default name you prefer
    this.tableHeaders.push({ value: newColumnName });

    // Initialize data entries for the new column in all rows
    for (let i = 0; i < this.tableData.length; i++) {
      this.tableData[i][newColumnName] = ''; // Set the new column to an empty string
    }

  }
  addRow() {
    const newRow: { [key: string]: string } = {}; // Define the type of newRow
  
    for (const header of this.tableHeaders) {
      newRow[header['value']] = ''; // Access header.value directly
    }
  
    // Add the new row to the tableData array
    this.tableData.push(newRow);
  }

  delRow() {
    if (this.tableData.length > 0) {
      this.tableData.pop(); // Removes the last row
    }
  }
  
  delColumn() {
    if (this.tableHeaders.length > 0) {
      const lastColumnName = this.tableHeaders[this.tableHeaders.length - 1]['value'];
  
      // Remove the column from the tableHeaders
      this.tableHeaders.pop();
  
      // Remove the corresponding data entries in all rows
      for (let i = 0; i < this.tableData.length; i++) {
        delete this.tableData[i][lastColumnName];
      }
    }
  }
}
