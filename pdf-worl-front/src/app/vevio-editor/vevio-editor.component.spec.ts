import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VevioEditorComponent } from './vevio-editor.component';

describe('VevioEditorComponent', () => {
  let component: VevioEditorComponent;
  let fixture: ComponentFixture<VevioEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VevioEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VevioEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
