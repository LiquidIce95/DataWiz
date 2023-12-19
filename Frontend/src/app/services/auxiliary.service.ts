import { Injectable, Renderer2 } from '@angular/core';

@Injectable()
export class AuxiliaryService {

  constructor() { }

  assert(condition: any, msg?: string): asserts condition {
    if (!condition) {
      throw new Error(msg);
    }
  }

  
  exportToCSV(Data : any[],object :any) {
    
    let headerRow = Data[0];
    let csvRows = Data[1];

    // Combine header and rows into a single CSV string
    const csvData = [headerRow, ...csvRows].join('\n');

    // Create a Blob with the CSV data
    const blob = new Blob([csvData], { type: 'text/csv' });

    // Create a URL for the blob
    const url = window.URL.createObjectURL(blob);

    // Create an anchor element for downloading
    const a = object.renderer.createElement('a');
    object.renderer.setAttribute(a, 'href', url);
    object.renderer.setAttribute(a, 'download', 'tableData.csv'); // Specify the file name here

    // Trigger a click event on the anchor element
    object.renderer.appendChild(document.body, a);
    a.click();

    // Clean up
    object.renderer.removeChild(document.body, a);
    window.URL.revokeObjectURL(url);
  }


}
