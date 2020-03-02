Feature('Following');

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

Scenario('Cannot Follow not logged', I => {
  I.amOnPage('/stars');
  I.waitForElement("[data-test-id='follow-player']");
  I.click("[data-test-id='follow-player']");
  I.waitForElement("[alt='RegistrationImage']");
});

Scenario('Follow/Unfollow', I => {
  login(I);
  I.amOnPage('/stars');
  I.seeInCurrentUrl('/stars');
  I.waitForElement("[data-test-id='follow-player']");
  I.click("[data-test-id='follow-player']");
  I.wait(5);
  I.waitForElement("[data-test-id='unfollow-player']");
  I.seeElement("[data-test-id='unfollow-player']");
  I.amOnPage('/account');
  I.waitForText('Sign out');
  I.click('Sign out');
  I.waitForElement("[data-test-id='sign-in-help']");
  I.click("[data-test-id='sign-in-help']");
  I.waitForElement("[data-test-id='registration-signup-cta']");
  I.click("[data-test-id='registration-signup-cta']");
  I.waitForElement("[data-test-id='continue-with-facebook']");
  I.click("[data-test-id='continue-with-facebook']");
  I.wait(5); // wait app loaded
  I.amOnPage('/stars');
  I.waitForElement("[data-test-id='unfollow-player']");
  I.seeElement("[data-test-id='unfollow-player']");
  I.click("[data-test-id='unfollow-player']");
  I.dontSeeElement("[data-test-id='unfollow-player']");
});