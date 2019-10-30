import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiroSidebarComponent } from './firo-sidebar.component';

describe('FiroSidebarComponent', () => {
  let component: FiroSidebarComponent;
  let fixture: ComponentFixture<FiroSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiroSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiroSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
