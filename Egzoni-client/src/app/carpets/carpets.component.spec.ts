import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpetsComponent } from './carpets.component';

describe('CarpetsComponent', () => {
  let component: CarpetsComponent;
  let fixture: ComponentFixture<CarpetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarpetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarpetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
