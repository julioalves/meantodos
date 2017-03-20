import { MeantodosPage } from './app.po';

describe('meantodos App', () => {
  let page: MeantodosPage;

  beforeEach(() => {
    page = new MeantodosPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
