Feature('Player Profile');

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
  I.refreshPage(); // forced to refresh page due to bug FE-1011
  I.waitForElement("[data-test-id='continue-with-facebook']");
  I.click("[data-test-id='continue-with-facebook']");
  I.wait(5);
};

Scenario('Players page', I => {
  login(I);
  I.amOnPage('/stars');
  I.waitForElement("[href='/star/neymarjr']");
  I.click("[href='/star/neymarjr']");
  I.seeInCurrentUrl('/star/neymarjr');
});

Scenario('Player tabs', I => {
  login(I);
  I.amOnPage('/star/neymarjr');
  I.waitForElement("[data-test-id='player-tab-about']");
  I.click("[data-test-id='player-tab-about']");
  I.seeInCurrentUrl('#about');
  I.waitForElement("[data-test-id='player-tab-feed']");
  I.click("[data-test-id='player-tab-feed']");
  I.dontSeeInCurrentUrl('#about');
});

Scenario('About', I => {
  login(I);
  I.amOnPage('/star/neymarjr');
  I.waitForElement("[data-test-id='player-tab-about']");
  I.click("[data-test-id='player-tab-about']");
  I.seeInCurrentUrl('#about');
  I.waitForElement("[alt='Signature']");
});

Scenario('Open player timeline', I => {
  login(I);
  I.amOnPage('/star/neymarjr');
  I.waitForElement("[data-test-id='player-tab-about']");
  I.click("[data-test-id='player-tab-about']");
  I.waitForElement("[data-test-id='open-timeline']");
  I.click("[data-test-id='open-timeline']");
  I.seeInCurrentUrl('/timeline/');
});