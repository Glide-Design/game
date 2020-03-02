Feature('Articles');

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

Scenario('Open article from search no logged', I => {
  I.amOnPage('/');
  I.waitForElement("[id='searchTerm']");
  I.fillField('searchTerm', 'duggantwo lucky'); // put key word from existing article on desired env
  I.wait('3'); //wait results loaded
  I.waitForText('READ MORE');
  I.see('READ MORE');
});

Scenario('Open article from search', I => {
  login(I);
  I.waitForElement("[id='searchTerm']");
  I.fillField('searchTerm', 'duggantwo lucky');
  I.wait('3'); //wait results loaded
  I.waitForText('READ MORE');
  I.see('READ MORE');
});