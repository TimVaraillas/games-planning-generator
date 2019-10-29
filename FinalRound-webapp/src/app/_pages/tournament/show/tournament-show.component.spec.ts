import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentShowComponent } from './tournament-show.component';

describe('TournamentShowComponent', () => {
  let component: TournamentShowComponent;
  let fixture: ComponentFixture<TournamentShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
