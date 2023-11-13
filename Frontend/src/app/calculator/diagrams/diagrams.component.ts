import { Component } from '@angular/core';
import { AuxiliaryService } from 'src/app/services/auxiliary.service';

@Component({
  selector: 'app-diagrams',
  templateUrl: './diagrams.component.html',
  styleUrls: ['../../globalStyles.css','./diagrams.component.css'],
  providers:[AuxiliaryService]

})
export class DiagramsComponent {

}
