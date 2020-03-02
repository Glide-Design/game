Feature('Bookmarks');

const onPage = I => {
  I.amOnPage('/content/dybala-fan-gets-a-prize-to-treasure');
};

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

Scenario('Cannot Bookmarked content not logged', I => {
  I.amOnPage('/');
  I.waitForElement("[data-test-id='bookmark-content']");
  I.click("[data-test-id='bookmark-content']");
  I.waitForElement("[alt='RegistrationImage']");
});

Scenario('Bookmarked content', I => {
  login(I);
  onPage(I);
  I.waitForElement("[data-test-id='bookmark-content']");
  I.click("[data-test-id='bookmark-content']");
  I.wait(3);
  I.waitForElement("[fill='#7aff00']");
  I.click("[data-test-id='bookmark-content']");
  I.waitForElement("[fill='currentColor']");
});

Scenario('Bookmarked content appears in locker', I => {
  login(I);
  onPage(I);
  I.waitForElement("[data-test-id='bookmark-content']");
  I.click("[data-test-id='bookmark-content']");
  I.waitForElement("[data-test-id='nav-profile']");
  I.click("[data-test-id='nav-profile']");
  I.waitForElement("[data-test-id='enter-locker']");
  I.click("[data-test-id='enter-locker']");
  I.seeInCurrentUrl('/locker');
  I.waitForElement("[data-test-id='content-thumbnail']");
  onPage(I);
  I.waitForElement("[data-test-id='bookmark-content']");
  I.click("[data-test-id='bookmark-content']");
  I.waitForElement("[data-test-id='nav-profile']");
  I.click("[data-test-id='nav-profile']");
  I.amOnPage('/locker');
  I.dontSee("[data-test-id='content-thumbnail']");
});

Scenario('Edit Bookmarked content', I => {
  login(I);
  onPage(I);
  I.waitForElement("[data-test-id='bookmark-content']");
  I.click("[data-test-id='bookmark-content']");
  I.waitForElement("[data-test-id='nav-profile']");
  I.click("[data-test-id='nav-profile']");
  I.waitForElement("[data-test-id='enter-locker']");
  I.click("[data-test-id='enter-locker']");
  I.seeInCurrentUrl('/locker');
  I.waitForElement("[data-test-id='content-thumbnail']");
  I.waitForElement("[data-test-id='edit-bookmark']");
  I.click("[data-test-id='edit-bookmark']");
  I.waitForElement("[data-test-id='cancel-edit-bookmark']");
  I.click("[data-test-id='cancel-edit-bookmark']");
  I.waitForElement("[data-test-id='edit-bookmark']");
  I.click("[data-test-id='edit-bookmark']");
  I.waitForElement("[data-test-id='select-bookmark']");
  I.click("[data-test-id='select-bookmark']");
  I.click("[data-test-id='delete-bookmark']");
  I.dontSee("[data-test-id='content-thumbnail']");
});

Scenario('Use Bookmarked content', I => {
  login(I);
  onPage(I);
  I.waitForElement("[data-test-id='bookmark-content']");
  I.click("[data-test-id='bookmark-content']");
  I.amOnPage('/locker');
  I.waitForElement("[data-test-id='content-thumbnail']");
  I.click("[data-test-id='content-thumbnail']");
  I.seeInCurrentUrl('/content');
  I.amOnPage('/locker');
  I.waitForElement("[data-test-id='edit-bookmark']");
  I.click("[data-test-id='edit-bookmark']");
  I.waitForElement("[data-test-id='select-bookmark']");
  I.click("[data-test-id='select-bookmark']");
  I.click("[data-test-id='delete-bookmark']");
  I.dontSee("[data-test-id='content-thumbnail']");
});