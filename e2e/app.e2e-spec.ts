import { OBEPage } from './app.po';

describe('obe App', () => {
  let page: OBEPage;

  beforeEach(() => {
    page = new OBEPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
