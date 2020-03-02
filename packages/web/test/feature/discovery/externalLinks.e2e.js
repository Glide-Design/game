Feature('External links');
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

Scenario('Visit Support', I => {
  I.amOnPage('/');
  I.waitForElement("[data-test-id='nav-profile']");
  I.click("[data-test-id='nav-profile']");
  I.waitForElement("[data-test-id='registration-signup-cta']");
  I.click("[data-test-id='registration-signup-cta']");
  I.waitForElement("[id='email']");
  I.click("[id='email']");
  I.fillField('email', 'oscusernamev2@gmail.com');
  I.click("[type='submit']");
  I.waitForElement("[href='https://help.otro.com']");
  I.click("[href='https://help.otro.com']");
  I.seeInCurrentUrl('https://help.otro.com/');
});

Scenario('Visit Support from send again', I => {
  I.amOnPage('/');
  I.waitForElement("[data-test-id='nav-profile']");
  I.click("[data-test-id='nav-profile']");
  I.waitForElement("[data-test-id='registration-signup-cta']");
  I.click("[data-test-id='registration-signup-cta']");
  I.waitForElement("[id='email']");
  I.click("[id='email']");
  I.fillField('email', 'oscusernamev2@gmail.com');
  I.click("[type='submit']");
  I.waitForText('Send Again');
  I.see('Send Again');
  I.click('Send Again');
  I.waitForElement("[href='https://help.otro.com/hc/en-gb/articles/360015821512-Signing-up-to-OTRO-']");
  I.click("[href='https://help.otro.com/hc/en-gb/articles/360015821512-Signing-up-to-OTRO-']");
});

Scenario('Terms of Use', I => {
  login(I);
  I.amOnPage('/help');
  I.waitForElement("[href='http://otro.com/terms-of-use']");
  I.click("[href='http://otro.com/terms-of-use']");
});

Scenario('Privacy Policy', I => {
  login(I);
  I.amOnPage('/help');
  I.waitForElement("[href='http://otro.com/privacy-policy']");
  I.click("[href='http://otro.com/privacy-policy']");
});

Scenario('Privacy Policy on Accept cookies pop-up', I => {
  login(I);
  I.waitForElement("[data-test-id='accept_cookies']");
  I.waitForElement("[href='http://otro.com/privacy-policy']");
  I.click("[href='http://otro.com/privacy-policy']");
});