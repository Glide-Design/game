Feature('Facebook Registration');

Scenario('Facebook New User Registration', async I => {
  const facebookLoginButton = 'input[name="login"]';
  const facebookConfirmPermissionsButton = '[name="__CONFIRM__"]';
  const facebookEmailInput = 'input[name="email"]';
  const facebookPasswordInput = 'input[name="pass"]';
  const profileButton = '[data-test-id="nav-profile"]';
  const continueWithFacebookButton = '[data-test-id="continue-with-facebook"]';
  const startingNumberOfTabs = await I.grabNumberOfOpenTabs();
  const user = await I.createFacebookTestUser({ installed: false });
  const { email, password } = user;

  I.amOnPage('/');
  I.waitForElement(profileButton);
  I.click(profileButton);
  I.seeInCurrentUrl('/join');
  I.waitForElement(continueWithFacebookButton);
  I.click(continueWithFacebookButton);
  I.wait(5);
  I.switchToNextTab();
  I.fillField(facebookEmailInput, email);
  I.fillField(facebookPasswordInput, password);
  I.click(facebookLoginButton);
  I.click('Continue as');
  I.switchToPreviousTab(startingNumberOfTabs);
  I.waitForElement("[data-test-id='enter']");
  I.click("[data-test-id='enter']");
  I.waitForElement("[data-test-id='accept_cookies']");
  I.click("[data-test-id='accept_cookies']");
  I.waitForElement(profileButton);
  I.click(profileButton);
  I.seeInCurrentUrl('/profile');
  I.deleteFacebookTestUser(user);
});