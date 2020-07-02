import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentSignedComponent } from './document-signed.component';

describe('DocumentSignedComponent', () => {
  let component: DocumentSignedComponent;
  let fixture: ComponentFixture<DocumentSignedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentSignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentSignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
