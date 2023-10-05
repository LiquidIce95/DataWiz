import { Component, OnInit, Renderer2 } from '@angular/core';
import { TableDataService } from '../../services/table.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['../../globalStyles.css', './table.component.css']
})
export class TableComponent{
  

  constructor(private renderer: Renderer2,public tableDataService: TableDataService) {}
  
  // TABLE -----------------------------------------------------------------------------------------
  addColumn() {
    // Add a new column to the tableHeaders array
    const newColumnName = 'newColumnName'; // You can use any default name you prefer
    this.tableDataService.tableHeaders.push(newColumnName);
    this.tableDataService.tableTypes.push('nominal');
    // Initialize data entries for the new column in all rows
    for (let i = 0; i < this.tableDataService.tableData.length; i++) {
      this.tableDataService.tableData[i][newColumnName] = ''; // Set the new column to an empty string
    }

  }
  addRow() {
    const newRow: { [key: string]: string } = {}; // Define the type of newRow
  
    for (const header of this.tableDataService.tableHeaders) {
      newRow[header] = ''; // Access header.value directly
    }
  
    // Add the new row to the tableData array
    this.tableDataService.tableData.push(newRow);
  }

  delRow() {
    if (this.tableDataService.tableData.length > 0) {
      this.tableDataService.tableData.pop(); // Removes the last row
    }
  }
  
  delColumn() {
    if (this.tableDataService.tableHeaders.length > 0) {
      const lastColumnName = this.tableDataService.tableHeaders[this.tableDataService.tableHeaders.length - 1];
  
      // Remove the column from the tableHeaders
      let header : any = this.tableDataService.tableHeaders.pop();
      delete this.tableDataService.tableTypes[header];
  
      // Remove the corresponding data entries in all rows
      for (let i = 0; i < this.tableDataService.tableData.length; i++) {
        delete this.tableDataService.tableData[i][lastColumnName];
      }
    }
  }

  clearTab() {
    // Clear cell values
    for (let i = 0; i < this.tableDataService.tableData.length; i++) {
      const rowData = this.tableDataService.tableData[i];
      for (const header of this.tableDataService.tableHeaders) {
        rowData[header] = '';
      }
    }
  
  }

  // needed each time a header is modified by user
  headerCleanup(oldHeader: string, newHeader: string) {

    
    for (let i = 0; i < this.tableDataService.tableData.length; i++) {
      const rowData = this.tableDataService.tableData[i];
      
      // Check if the oldHeader exists in the row
      if (oldHeader in rowData) {
        // Copy the data from the old header to the new header
        rowData[newHeader] = rowData[oldHeader];
        
        // Delete the old header data
        delete rowData[oldHeader];
      }
    }

    // After cleanup, update the header value
    const index = this.tableDataService.tableHeaders.findIndex(header => header === oldHeader);
    if (index !== -1) {
      this.tableDataService.tableHeaders[index] = newHeader;
    }
  }


  // needs to be called if user changes types via dropdown menu
  onTypeChange(selectedType: string, index: number) {
    if (selectedType === 'auto') {
      const columnName = this.tableDataService.tableHeaders[index];
      const columnValues = this.tableDataService.getColumnValues(columnName);
      selectedType = this.tableDataService.deduceColumnType(columnValues);
    }
    this.tableDataService.tableTypes[index] = selectedType;
  }

  // DATA TRANSFORM FEATURE------------------------------------------------------------------------
  TWindow = false;
  toggleTransData(){
    this.TWindow = ! this.TWindow;
  }


  // IMPORT EXPORT FEATURE--------------------------------------------------------------------------
  IEwindow : boolean = false;
  delimiter : string = ',';
  FormType : string = "0";

  setDelimiter(delimiter: string) {
    this.delimiter = delimiter;
  }
  
  setFormType(FormType : string){
    this.FormType = FormType;
  }

  exportToCSV() {
    // Prepare the CSV data
    const headerRow = this.tableDataService.tableHeaders.map(header => header).join(',');
    const csvRows = this.tableDataService.tableData.map(row => {
      return this.tableDataService.tableHeaders.map(header => row[header]).join(',');
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

  // closes or opens the exportwindow
  toggleImportExportWin(){
    this.IEwindow = !this.IEwindow;
  }

  // updates tableDataService.tableData and .tableHeaders with the arguments
  UpdateTable(parsedData:{ [key: string]: any }[],headers:string[]){
    // Update tableData with the parsed data
    parsedData.forEach((data) => {
    for (const key in data) {
      if ((data[key] !== undefined)) {
        data[key] = this.tableDataService.convertToNumberIfPossible(data[key]);
      }
    }
    this.tableDataService.tableData.push(data);
    });

    // Update tableHeaders with the headers
    headers.forEach((header) => {
      this.tableDataService.tableHeaders.push(header);
    });
  }

  // imports the csv file and stores it parsedData and headers
  OnLoadImport(e:any){
    // Initialize an array to store the parsed data
    const parsedData: { [key: string]: any }[] = [];
    // Parse the CSV data here and update tableData and tableHeaders
    const csvData = e.target.result;
    const rows = csvData.split('\n');
    const headers : string[] = rows[0].split(this.delimiter);

    // Clear tableData and tableHeaders
    this.tableDataService.tableData = [];
    this.tableDataService.tableHeaders = [];

    

    // Loop through the rows, starting from the second row (index 1)
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].split(this.delimiter);
      const rowData: { [key: string]: any } = {};

      // Loop through the headers and assign values to the corresponding keys
      for (let j = 0; j < headers.length; j++) {
        const headerValue = headers[j];
        rowData[headerValue] = row[j];
      }

      parsedData.push(rowData);
    }

    this.UpdateTable(parsedData,headers);

  }

  // assuming input data has same format as table, first row is header, types are auto-detected
  importFile1(event: any) {
    const fileInput = event.target;

    if (fileInput.files && fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0];

      if (selectedFile.type === 'application/vnd.ms-excel' || selectedFile.type === 'text/csv') {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          
          this.OnLoadImport(e);
          this.IEwindow = false;
          this.tableDataService.TypeDetect();

        };

        reader.readAsText(selectedFile);

        
      } else {
        console.error('Invalid file format. Please select a CSV file.');
      }
    }
  }


  importFile2(event: any) {
    const fileInput = event.target;
  
    if (fileInput.files && fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0];
  
      if (selectedFile.type === 'application/vnd.ms-excel' || selectedFile.type === 'text/csv') {
        const reader = new FileReader();
  
        reader.onload = (e: any) => {
          const parsedData: { [key: string]: any }[] = [];
          const headers: string[] = [];
  
          const csvData = e.target.result;
          const rows = csvData.split('\n');
          
          this.tableDataService.tableData = [];
          this.tableDataService.tableHeaders = [];
  
          // Initialize parsedData objects
          const initialRow = rows[0].split(this.delimiter);
          headers.push(initialRow[0]);
          for (let j = 1; j < initialRow.length; j++) {
            const obj: { [key: string]: any } = {};
            obj[initialRow[0]] = initialRow[j];
            parsedData.push(obj);
          }
  
          // Populate parsedData objects
          for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].split(this.delimiter);
            headers.push(cells[0]);
            for (let j = 1; j < cells.length; j++) {
              parsedData[j - 1][cells[0]] = cells[j];
            }
          }
  
          this.UpdateTable(parsedData, headers);
          this.IEwindow = false;
          this.tableDataService.TypeDetect();
        };
  
        reader.readAsText(selectedFile);
      } else {
        console.error('Invalid file format. Please select a CSV file.');
      }
    }
  }
  
  importFile(event:any){
    if(this.FormType == "1"){
      this.importFile1(event);
    }
    else{
      this.importFile2(event);
    }
  }



  

}
