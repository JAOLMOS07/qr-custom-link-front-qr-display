import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FtxPaginatorComponent } from './ftx-paginator.component';

describe('FtxPaginatorComponent', () => {
  let component: FtxPaginatorComponent;
  let fixture: ComponentFixture<FtxPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FtxPaginatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FtxPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
