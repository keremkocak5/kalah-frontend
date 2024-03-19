import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeGamePageComponent } from './resume-game-page.component';

describe('ResumeGamePageComponent', () => {
  let component: ResumeGamePageComponent;
  let fixture: ComponentFixture<ResumeGamePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeGamePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResumeGamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
