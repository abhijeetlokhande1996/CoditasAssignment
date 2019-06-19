import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoLoaderComponent } from './repo-loader.component';

describe('RepoLoaderComponent', () => {
  let component: RepoLoaderComponent;
  let fixture: ComponentFixture<RepoLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepoLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
