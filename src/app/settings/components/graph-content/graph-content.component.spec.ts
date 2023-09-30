import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphContentComponent } from './graph-content.component';

describe('GraphContentComponent', () => {
  let component: GraphContentComponent;
  let fixture: ComponentFixture<GraphContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraphContentComponent]
    });
    fixture = TestBed.createComponent(GraphContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
