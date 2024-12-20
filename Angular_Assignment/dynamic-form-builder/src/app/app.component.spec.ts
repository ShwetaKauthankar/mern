import { AppComponent } from "./app.component";

describe('AppComponent', () => {
  let fixture: AppComponent;

  beforeEach(() => {
    fixture = new AppComponent();
  })

  it('it should have a title dynamic-form-builder', () => {
    expect(fixture.title).toEqual('dynamic-form-builder');
  })
})