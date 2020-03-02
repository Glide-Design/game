Feature('Search');

const login = I => {
  // in purpose to run test scenario being logged in
  I.amOnPage('https://www.facebook.com');
  I.fillField('input[name="email"]', 'auto_feyyqcn_test@tfbnw.net');
  I.fillField('input[name="pass"]', '1!Qwerty');
  I.waitForElement("[data-testid='royal_login_button']");
  I.click("[data-testid='royal_login_button']");
  I.amOnPage('/');
  I.waitForElement("[data-test-id='nav-profile']");
  I.click("[data-test-id='nav-profile']");
  I.waitForElement("[data-test-id='registration-signup-cta']");
  I.click("[data-test-id='registration-signup-cta']");
  I.waitForElement("[data-test-id='continue-with-facebook']");
  I.click("[data-test-id='continue-with-facebook']");
  I.wait(5);
};

Scenario('Search for content that isnt available', I => {
  I.amOnPage('/');
  I.waitForElement("[data-test-id='nav-search']");
  I.waitForElement("[id='searchTerm']");
  I.fillField('searchTerm', 'qwerty');
  I.wait('5');
  I.see('No results found for "qwerty"');
});

Scenario('Search for some content', I => {
  I.amOnPage('/');
  I.waitForElement("[id='searchTerm']");
  I.fillField('searchTerm', 'David');
  I.wait('5');
  I.see('David');
});

Scenario('Search with accented chars', I => {
  I.amOnPage('/');
  I.waitForElement("[id='searchTerm']");
  I.fillField('searchTerm', 'Suárez');
  I.wait('5');
  I.waitForElement("[data-test-id='player-result-luissuarez']");
});

Scenario('Search without accented chars for names with accented', I => {
  I.amOnPage('/');
  I.waitForElement("[id='searchTerm']");
  I.fillField('searchTerm', 'Jerome');
  I.wait('5');
  I.waitForElement("[data-test-id='player-result-jeromeboateng']");
});

Scenario('Navigate from search to player profile', I => {
  I.amOnPage('/');
  I.waitForElement("[id='searchTerm']");
  I.fillField('searchTerm', 'David Beckham');
  I.waitForElement("[data-test-id='player-result-davidbeckham']");
  I.click("[data-test-id='player-result-davidbeckham']");
  I.seeInCurrentUrl('/star/');
});

Scenario('Navigate from search to content detail', I => {
  I.amOnPage('/');
  I.waitForElement("[id='searchTerm']");
  I.fillField('searchTerm', 'David Beckham');
  I.waitForElement("[data-test-id='content-thumbnail']");
  I.click("[data-test-id='content-thumbnail']");
  I.seeInCurrentUrl('/content/');
});

Scenario('Show recent searches', I => {
  I.amOnPage('/');
  I.waitForElement("[id='searchTerm']");
  I.fillField('searchTerm', 'Dav');
  I.wait('3');
  I.waitForElement("[data-test-id='content-thumbnail']");
  I.click("[data-test-id='content-thumbnail']");
  I.refreshPage();
  I.waitForElement("[id='searchTerm']");
  I.click("[id='searchTerm']");
  I.waitForText('RECENT SEARCHES');
});

Scenario('Clear all recent searches', I => {
  I.amOnPage('/');
  I.waitForElement("[id='searchTerm']");
  I.fillField('searchTerm', 'David');
  I.waitForElement("[data-test-id='content-thumbnail']");
  I.click("[data-test-id='content-thumbnail']");
  I.refreshPage();
  I.waitForElement("[id='searchTerm']");
  I.click("[id='searchTerm']");
  I.waitForElement("[data-test-id='clear-recent']");
  I.click("[data-test-id='clear-recent']");
  I.dontSee("[data-test-id='content-thumbnail']");
});

Scenario('Remove recent search', I => {
  I.amOnPage('/');
  I.waitForElement("[id='searchTerm']");
  I.fillField('searchTerm', 'David');
  I.waitForElement("[data-test-id='content-thumbnail']");
  I.click("[data-test-id='content-thumbnail']");
  I.refreshPage();
  I.waitForElement("[id='searchTerm']");
  I.click("[id='searchTerm']");
  I.wait(3);
  I.waitForElement("[data-test-id='remove-recent-search']");
  I.click("[data-test-id='remove-recent-search']");
  I.dontSee("[data-test-id='content-thumbnail']");
});

Scenario('Search as logged also works', I => {
  login(I);
  I.amOnPage('/');
  I.waitForElement("[id='searchTerm']");
  I.fillField('searchTerm', 'David');
  I.wait('5');
  I.see('David');
});
