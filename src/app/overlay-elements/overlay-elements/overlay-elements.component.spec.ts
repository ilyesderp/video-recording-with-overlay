import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayElementsComponent } from './overlay-elements.component';

describe('OverlayElementsComponent', () => {
  let component: OverlayElementsComponent;
  let fixture: ComponentFixture<OverlayElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverlayElementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverlayElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
