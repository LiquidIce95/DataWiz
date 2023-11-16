import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DescriptiveComponent } from './descriptive.component';
import { TableDataService } from '../../services/table.service';
import { FormsModule } from '@angular/forms';

fdescribe('DescriptiveComponent', () => {
  let component: DescriptiveComponent;
  let fixture: ComponentFixture<DescriptiveComponent>;
  let service: TableDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DescriptiveComponent],
      providers: [TableDataService],
      imports: [FormsModule],

    });
  
    fixture = TestBed.createComponent(DescriptiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.tableDataService['tableData']=[
      { 'name': 'John', 'age': 30, 'income': 0 },
      { 'name': 'Alice', 'age': 25, 'income': 100 }
    ]

    component.tableDataService['tableHeaders'] = {
      'name':['nominal',false],
      'age' :['metric',false],
      'income' : ['metric',false]
    };

    component.tableDataService['tableKeys'] = [
      'name',
      'age',
      'income'
    ];

    component.averages = {};
    
  });
  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getAverages()',()=>{
    it('compute average of income',()=>{
      component.tableDataService['tableHeaders']['income'][1] = true;

      component.getAverages();

      let result = component.averages;

      expect(result['income']).toEqual(50);
    });

    it('check if none is computed',()=>{
      
      component.getAverages();

      let result = component.averages;

      expect(result).toEqual({});
    });
    

    it('check if non metric are not computed'),()=>{
      component.tableDataService['tableData']=[
        { 'name': 'John', 'age': 30, 'income': 0 },
        { 'name': 'Alice', 'age': 25, 'income': 100 }
      ]
  
      component.tableDataService['tableHeaders'] = {
        'name':['nominal',false],
        'age' :['nominal',true],
        'income' : ['nominal',true]
      };
  
      component.tableDataService['tableKeys'] = [
        'name',
        'age',
        'income'
      ];

      component.getAverages();

      let result = component.averages;

      expect(result).toEqual({});
    }
  });

  describe('getAverageKeys()',()=>{

    it('two keys with averages',()=>{
      component.averages = {'age' : 15, 'income':50};

      component.tableDataService['tableData']=[
        { 'name': 'John', 'age': 30, 'income': 0 },
        { 'name': 'Alice', 'age': 0, 'income': 100 }
      ]
  
      component.tableDataService['tableHeaders'] = {
        'name':['nominal',false],
        'age' :['metric',true],
        'income' : ['metric',true]
      };
  
      component.tableDataService['tableKeys'] = [
        'name',
        'age',
        'income'
      ];

      let result = component.getAverageKeys();
  
      expect(result).toEqual(['age','income']);
    });
    
  });
  
  

});
