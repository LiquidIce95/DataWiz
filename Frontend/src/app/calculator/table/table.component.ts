import { Component, OnInit, Renderer2 } from '@angular/core';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['../../globalStyles.css', './table.component.css']
})
export class TableComponent implements OnInit{
  tableData: { [key: string]: any }[] = [
    { name: 'John', age: 30 },
    { name: 'Alice', age: 25 },
    // Add more rows as needed
  ];
  tableHeaders :{[key: string]: string }[] =[
    { value: 'name' },
    { value: 'age' },
  ];


  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    // Initialize editingValue for headers with the same value as the actual header
    for (const header of this.tableHeaders) {
      header['editingValue'] = header['value'];
    }
  }
  

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

  headerCleanup(oldHeader: string, newHeader: string) {

    console.log('Old Header:', oldHeader);
    console.log('New Header:', newHeader);    // Iterate through each row in tableData
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
    const index = this.tableHeaders.findIndex(header => header['value'] === oldHeader);
    if (index !== -1) {
      this.tableHeaders[index]['value'] = newHeader;
    }


  }


  clearTab() {
    // Clear cell values
    for (let i = 0; i < this.tableData.length; i++) {
      const rowData = this.tableData[i];
      for (const header of this.tableHeaders) {
        rowData[header['value']] = '';
      }
    }
  
    // Clear header editing values
    for (const header of this.tableHeaders) {
      header['editingValue'] = '';
    }
  }
  
  exportToExcel() {
    // Convert tableData to worksheet
    
  }


}
