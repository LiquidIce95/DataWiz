import { Component, OnInit, Renderer2 } from '@angular/core';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['../../globalStyles.css', './table.component.css']
})
export class TableComponent implements OnInit{
  tableData: { [key: string]: any }[] = [
    { name: 'John', age: 30, income: 0 },
    { name: 'Alice', age: 25 , income: 100},
    // Add more rows as needed
  ];
  tableHeaders :{[key: string]: string }[] =[
    { value: 'name' },
    { value: 'age' },
    { value: 'income'},
  ];

  tableTypes :{[key: string]: string }[] =[
    { value: 'nominal' },
    { value: 'metric' },
    { value: 'metric'},
  ];  
  
  IEwindow : boolean = false;

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
    this.tableTypes.push({value: 'nominal'})
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
  
  exportToCSV() {
    // Prepare the CSV data
    const headerRow = this.tableHeaders.map(header => header['value']).join(',');
    const csvRows = this.tableData.map(row => {
      return this.tableHeaders.map(header => row[header['value']]).join(',');
    });

    // Combine header and rows into a single CSV string
    const csvData = [headerRow, ...csvRows].join('\n');

    // Create a Blob with the CSV data
    const blob = new Blob([csvData], { type: 'text/csv' });

    // Create a URL for the blob
    const url = window.URL.createObjectURL(blob);

    // Create an anchor element for downloading
    const a = this.renderer.createElement('a');
    this.renderer.setAttribute(a, 'href', url);
    this.renderer.setAttribute(a, 'download', 'tableData.csv'); // Specify the file name here

    // Trigger a click event on the anchor element
    this.renderer.appendChild(document.body, a);
    a.click();

    // Clean up
    this.renderer.removeChild(document.body, a);
    window.URL.revokeObjectURL(url);
  }

  toggleImportExportWin(){
    this.IEwindow = !this.IEwindow;
  }

  // assuming input data has same format as table, first row is header
  importFile(event: any) {
    const fileInput = event.target;

    if (fileInput.files && fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0];

      if (selectedFile.type === 'application/vnd.ms-excel' || selectedFile.type === 'text/csv') {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          // Parse the CSV data here and update tableData and tableHeaders
          const csvData = e.target.result;
          const rows = csvData.split('\n');
          const headers : string[] = rows[0].split(',');

          // Clear tableData and tableHeaders
          this.tableData = [];
          this.tableHeaders = [];

          // Initialize an array to store the parsed data
          const parsedData: { [key: string]: any }[] = [];

          // Loop through the rows, starting from the second row (index 1)
          for (let i = 1; i < rows.length; i++) {
            const row = rows[i].split(',');
            const rowData: { [key: string]: any } = {};

            // Loop through the headers and assign values to the corresponding keys
            for (let j = 0; j < headers.length; j++) {
              const headerValue = headers[j];
              rowData[headerValue] = row[j];
            }

            parsedData.push(rowData);
          }

          // Update tableData with the parsed data
          parsedData.forEach((data) => {
            this.tableData.push(data);
          });

          // Update tableHeaders with the headers
          headers.forEach((header) => {
            this.tableHeaders.push({ value: header });
          });
          for (const header of this.tableHeaders) {
            header['editingValue'] = header['value'];
          }

          
          
        };

        reader.readAsText(selectedFile);
        this.IEwindow = false;

        this.tableTypes = [];
        // now we detect the types
        this.tableHeaders.forEach((header) => {
          const data : any[] = this.getColumnValues(header['value']);
          const type : string = this.deduceColumnType(data);
          this.tableTypes.push({value:type});
        });
        
      } else {
        console.error('Invalid file format. Please select a CSV file.');
      }
    }
  }

  getColumnValues(columnName: string): any[] {
      return this.tableData.map(row => row[columnName]);
  }

  deduceColumnType(columnValues: any[]): string {
    if (columnValues.every(value => !isNaN(value))) {
        return 'metric';
    }
    return 'nominal'; // Default type
  }

  onTypeChange(selectedType: string, index: number) {
    if (selectedType === 'auto') {
      const columnName = this.tableHeaders[index]['value'];
      const columnValues = this.getColumnValues(columnName);
      selectedType = this.deduceColumnType(columnValues);
    }
    this.tableTypes[index]['value'] = selectedType;
  }
  
  

}
