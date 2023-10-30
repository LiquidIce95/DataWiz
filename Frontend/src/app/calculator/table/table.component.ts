import { Component, Renderer2 } from '@angular/core';
import { TableDataService } from '../../services/table.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['../../globalStyles.css', './table.component.css']
})
export class TableComponent{
  

  constructor(private renderer: Renderer2,public tableDataService: TableDataService) {}  

  // DATA TRANSFORM FEATURE------------------------------------------------------------------------
  /**
   * boolean to model Transfer window state
   */
  TWindow = false;
  /**
   * toggles the window for the transform module
   */
  toggleTransData(){
    this.TWindow = ! this.TWindow;
  }


  // IMPORT EXPORT FEATURE--------------------------------------------------------------------------


  /**
   * Import Export Window
   */
  IEwindow : boolean = false;

  /**
   * delimiter for the conversion into the tableHeader data
   */
  delimiter : string = ',';

  /**
   * specifies which format the input data has
   */
  FormType : string = "0";

  /**
   * setter for this.delimiter
   * @param delimiter delimiter for input data
   */
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
      this.tableDataService.tableHeaders[header]= ['nominal',false];
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
    this.tableDataService.tableHeaders = {};

    

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
          this.tableDataService.tableHeaders = {};
  
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
