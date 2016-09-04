import { QuoteDayPage } from './app.po';

describe('quote-day App', function() {
  let page: QuoteDayPage;

  beforeEach(() => {
    page = new QuoteDayPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
