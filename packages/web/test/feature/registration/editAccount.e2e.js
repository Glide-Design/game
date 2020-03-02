Feature('Edit Account');

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

const editAccount = I => {
  I.amOnPage('/account');
  I.waitForElement("[data-test-id='edit']");
  I.click("[data-test-id='edit']");
};

Scenario('Account page', I => {
  login(I);
  I.amOnPage('/account');
  I.waitForText('Personal information');
  I.waitForText('First Name');
  I.waitForText('Last Name');
  I.waitForText('Email');
  I.waitForText('Edit');
});

Scenario('Cancel changes', I => {
  login(I);
  editAccount(I);
  I.clearField('input[data-test-id="first-name"]');
  I.clearField('input[data-test-id="last-name"]');
  I.fillField('input[data-test-id="first-name"]', 'changedname');
  I.fillField('input[data-test-id="last-name"]', 'changedlastname');
  I.waitForElement("[data-test-id='cancel']");
  I.click("[data-test-id='cancel']");
  I.seeInCurrentUrl('/account');
  I.waitForText('Auto');
  I.waitForText('Test');
});

Scenario('Edit First/Last Name', I => {
  login(I);
  editAccount(I);
  I.clearField('input[data-test-id="first-name"]');
  I.clearField('input[data-test-id="last-name"]');
  I.fillField('input[data-test-id="first-name"]', 'changedname');
  I.fillField('input[data-test-id="last-name"]', 'changedlastname');
  I.click("[data-test-id='save']");
  I.seeInCurrentUrl('/account');
  I.waitForText('changedname');
  I.waitForText('changedlastname');
  I.refreshPage();
  I.waitForText('changedname');
  I.waitForText('changedlastname');
  I.click("[data-test-id='edit']");
  I.clearField('input[data-test-id="first-name"]');
  I.clearField('input[data-test-id="last-name"]');
  I.fillField('input[data-test-id="first-name"]', 'Auto');
  I.fillField('input[data-test-id="last-name"]', 'Test');
  I.click("[data-test-id='save']");
  I.waitForText('Auto');
  I.waitForText('Test');
});

Scenario('Field validation', I => {
  login(I);
  editAccount(I);
  I.clearField('input[data-test-id="first-name"]');
  I.clearField('input[data-test-id="last-name"]');
  I.click("[name='forename']"); //click outside
  I.waitForText('Please complete');
  I.waitForText('Please complete');
  I.fillField('input[data-test-id="first-name"]', 'Auto');
  I.fillField('input[data-test-id="last-name"]', 'Test');
  I.dontSee('Please complete');
  I.dontSee('Please complete');
});