import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DescriptiveComponent } from './descriptive.component';
import { TableDataService } from '../../services/table.service';

fdescribe('DescriptiveComponent', () => {
  let component: DescriptiveComponent;
  let fixture: ComponentFixture<DescriptiveComponent>;
  let mockTableDataService: jasmine.SpyObj<TableDataService>;

  beforeEach(() => {
    mockTableDataService = jasmine.createSpyObj('TableDataService', ['getColumnValues']);

    TestBed.configureTestingModule({
      declarations: [ DescriptiveComponent ],
      providers: [
        { provide: TableDataService, useValue: mockTableDataService }
      ]
    });
    fixture = TestBed.createComponent(DescriptiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('cleanSelectedVariables', () => {
    it('cleanSelectedVariables should do nothing', () => {
      component.selectedVariables = {'name': true, 'age': true, 'income':false};
      component.tableDataService.tableData = [{'name':'bob','age':40, 'income':100}]
      component.cleanSelectedVariables();
      expect(component.selectedVariables).toEqual({'name': true, 'age':true, 'income':false});
    });
  
    it('cleanSelected should not change tableData' , ()=>{
      component.selectedVariables = {'name':false, 'age':false, 'income':false};
      component.tableDataService.tableData = [{'name':'bob','age':40, 'income':100}];
      component.cleanSelectedVariables();
      expect(component.selectedVariables).toEqual({'name':false, 'age':false, 'income':false});
  
    });
  
    it('cleanSelected should not change tableData' , ()=>{
      component.selectedVariables = {'name':false, 'age':false, 'income':false};
      component.tableDataService.tableData = [{'name':'bob','age':40, 'income':100}];
      component.cleanSelectedVariables();
      expect(component.selectedVariables).toEqual({'name':false, 'age':false, 'income':false});
  
    });
  });
  
  describe('getAverages', ()=>{

    it('getAverages should populate averages correctly', () => {
      mockTableDataService.getColumnValues.and.returnValue([20, 30]);
      component.selectedVariables = {'age': true};
      component.getAverages();
      expect(component.averages['age']).toBe(25);
    });
  
    it('getAverages should handle empty array', () => {
      mockTableDataService.getColumnValues.and.returnValue([]);
      component.selectedVariables = {'age': true};
      component.getAverages();
      expect(component.averages['age']).toBeUndefined();
    });
  
  });

  describe('getAverageKeys',()=>{

    it('getAverageKeys should return correct keys', () => {
      mockTableDataService.getColumnValues.and.returnValue([20, 30]);
      component.selectedVariables = {'age': true};
      const keys = component.getAverageKeys();
      expect(keys).toEqual(['age']);
    });
  });
  

});
