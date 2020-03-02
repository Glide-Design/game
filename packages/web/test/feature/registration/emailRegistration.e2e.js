Feature('Email Sign up');

Scenario('Close sign up prompt', I => {
  I.amOnPage('/');
  I.waitForElement("[data-test-id='accept_cookies']");
  I.click("[data-test-id='accept_cookies']");
  I.waitForElement("[data-test-id='nav-profile']");
  I.click("[data-test-id='nav-profile']");
  I.waitForElement("[data-test-id='close']");
  I.click("[data-test-id='close']");
  I.dontSee("[alt='RegistrationImage']");
  I.click("[data-test-id='nav-profile']");
  I.waitForElement("[alt='RegistrationImage']");
});

Scenario('Sign up page', I => {
  I.amOnPage('/');
  I.waitForElement("[data-test-id='nav-profile']");
  I.click("[data-test-id='nav-profile']");
  I.waitForElement("[data-test-id='registration-signup-cta']");
  I.click("[data-test-id='registration-signup-cta']");
  I.waitForElement("[data-test-id='continue-with-facebook']");
  I.waitForElement("[id='email']");
  I.waitForElement("[data-test-id='signup-with-email']");
  I.waitForElement("[data-test-id='log-in']");
});

Scenario('Check login link works from Sign up page', I => {
  I.amOnPage('/');
  I.waitForElement("[data-test-id='nav-profile']");
  I.click("[data-test-id='nav-profile']");
  I.waitForElement("[data-test-id='registration-signup-cta']");
  I.click("[data-test-id='registration-signup-cta']");
  I.waitForElement("[data-test-id='log-in']");
  I.click("[data-test-id='log-in']");
  I.waitForText('WELCOME BACK');
});

Scenario('Send activation email from Create you account page', I => {
  I.amOnPage('/');
  I.waitForElement("[data-test-id='nav-profile']");
  I.click("[data-test-id='nav-profile']");
  I.waitForElement("[data-test-id='registration-signup-cta']");
  I.click("[data-test-id='registration-signup-cta']");
  I.waitForElement("[id='email']");
  I.fillField('email', 'oscusernamev2@gmail.com');
  I.waitForElement("[data-test-id='signup-with-email']");
  I.click("[data-test-id='signup-with-email']"); //send me link
  I.waitForText('CHECK YOUR EMAIL');
});

Scenario('Edit email address sign up', I => {
  I.amOnPage('/');
  I.waitForElement("[data-test-id='nav-profile']");
  I.click("[data-test-id='nav-profile']");
  I.waitForElement("[data-test-id='registration-signup-cta']");
  I.click("[data-test-id='registration-signup-cta']");
  I.waitForElement("[id='email']");
  I.click("[id='email']");
  I.fillField('email', 'oscusernamev2@gmail.com');
  I.waitForElement("[data-test-id='signup-with-email']");
  I.click("[data-test-id='signup-with-email']");
  I.waitForText('Edit');
  I.click('Edit');
  I.waitForElement("[value='oscusernamev2@gmail.com']");
  I.fillField('email', 'oscusernamev2+edit@gmail.com');
  I.waitForElement("[data-test-id='signup-with-email']");
  I.click("[data-test-id='signup-with-email']");
  I.waitForText('CHECK YOUR EMAIL');
});

Scenario('Send sign up again', I => {
  I.amOnPage('/');
  I.waitForElement("[data-test-id='nav-profile']");
  I.click("[data-test-id='nav-profile']");
  I.waitForElement("[data-test-id='registration-signup-cta']");
  I.click("[data-test-id='registration-signup-cta']");
  I.waitForElement("[id='email']");
  I.fillField('email', 'oscusernamev2@gmail.com');
  I.waitForElement("[data-test-id='signup-with-email']");
  I.click("[data-test-id='signup-with-email']"); //send me link
  I.waitForText('CHECK YOUR EMAIL');
  I.waitForText('Send Again');
  I.see('Send Again');
  I.click('Send Again');
  I.waitForText('SENT YOU A NEW EMAIL.');
});

Scenario('Required email sign up', I => {
  I.amOnPage('/');
  I.waitForElement("[data-test-id='nav-profile']");
  I.click("[data-test-id='nav-profile']");
  I.waitForElement("[data-test-id='registration-signup-cta']");
  I.click("[data-test-id='registration-signup-cta']");
  I.waitForElement("[id='email']");
  I.click("[id='email']");
  I.click("[data-test-id='signup-with-email']");
  I.waitForText('Please complete');
  I.see('Please complete');
});

Scenario('Invalid email address sign up', I => {
  I.amOnPage('/');
  I.waitForElement("[data-test-id='nav-profile']");
  I.click("[data-test-id='nav-profile']");
  I.waitForElement("[data-test-id='registration-signup-cta']");
  I.click("[data-test-id='registration-signup-cta']");
  I.waitForElement("[id='email']");
  I.fillField('email', 'jhdkjh@kj');
  I.click("[data-test-id='signup-with-email']");
  I.see('Please try again');
});

Scenario('Sign in page', I => {
  I.amOnPage('/');
  I.waitForElement("[data-test-id='nav-profile']");
  I.click("[data-test-id='nav-profile']");
  I.waitForElement("[data-test-id='registration-login-cta']");
  I.click("[data-test-id='registration-login-cta']");
  I.refreshPage(); //due to bug FE-1011
  I.waitForElement("[id='email']");
  I.waitForElement("[data-test-id='continue-with-facebook']");
  I.waitForElement("[data-test-id='sign-in-email-send-magic-link']");
  I.waitForElement("[data-test-id='join-otro']");
});

Scenario('Check join link works from Sign in page', I => {
  I.amOnPage('/');
  I.waitForElement("[data-test-id='nav-profile']");
  I.click("[data-test-id='nav-profile']");
  I.waitForElement("[data-test-id='registration-login-cta']");
  I.click("[data-test-id='registration-login-cta']");
  I.waitForElement("[data-test-id='join-otro']");
  I.click("[data-test-id='join-otro']");
  I.waitForText('CREATE YOUR ACCOUNT');
});

Scenario('Sign in page send code', I => {
  I.amOnPage('/');
  I.waitForElement("[data-test-id='nav-profile']");
  I.click("[data-test-id='nav-profile']");
  I.waitForElement("[data-test-id='registration-login-cta']");
  I.click("[data-test-id='registration-login-cta']");
  I.waitForElement("[id='email']");
  I.click("[id='email']");
  I.fillField('email', 'oscusernamev2@gmail.com');
  I.click("[data-test-id='sign-in-email-send-magic-link']");
  I.waitForElement("[placeholder='Enter code']");
});

Scenario('Send code again', I => {
  I.amOnPage('/');
  I.waitForElement("[data-test-id='nav-profile']");
  I.click("[data-test-id='nav-profile']");
  I.waitForElement("[data-test-id='registration-login-cta']");
  I.click("[data-test-id='registration-login-cta']");
  I.waitForElement("[id='email']");
  I.click("[id='email']");
  I.fillField('email', 'oscusernamev2@gmail.com');
  I.click("[data-test-id='sign-in-email-send-magic-link']");
  I.waitForText('Send Again');
  I.see('Send Again');
  I.click('Send Again');
});

Scenario('Edit email address sign in', I => {
  I.amOnPage('/');
  I.waitForElement("[data-test-id='nav-profile']");
  I.click("[data-test-id='nav-profile']");
  I.waitForElement("[data-test-id='registration-login-cta']");
  I.click("[data-test-id='registration-login-cta']");
  I.waitForElement("[id='email']");
  I.click("[id='email']");
  I.fillField('email', 'oscusernamev2@gmail.com');
  I.waitForElement("[data-test-id='sign-in-email-send-magic-link']");
  I.click("[data-test-id='sign-in-email-send-magic-link']");
  I.waitForText('Edit');
  I.click('Edit');
  I.waitForElement("[value='oscusernamev2@gmail.com']");
  I.fillField('email', 'oscusernamev2+edit@gmail.com');
  I.waitForElement("[data-test-id='sign-in-email-send-magic-link']");
  I.click("[data-test-id='sign-in-email-send-magic-link']");
  I.waitForElement("[placeholder='Enter code']");
});

Scenario('Required email sign in', I => {
  I.amOnPage('/');
  I.waitForElement("[data-test-id='nav-profile']");
  I.click("[data-test-id='nav-profile']");
  I.waitForElement("[data-test-id='registration-login-cta']");
  I.click("[data-test-id='registration-login-cta']");
  I.waitForElement("[id='email']");
  I.click("[id='email']");
  I.waitForElement("[y='17']");
  I.click("[y='17']");
  I.waitForText('Please complete');
  I.see('Please complete');
});

Scenario('Invalid email address sign in', I => {
  I.amOnPage('/');
  I.waitForElement("[data-test-id='nav-profile']");
  I.click("[data-test-id='nav-profile']");
  I.waitForElement("[data-test-id='registration-login-cta']");
  I.click("[data-test-id='registration-login-cta']");
  I.waitForElement("[id='email']");
  I.click("[id='email']");
  I.fillField('email', 'jhdkjh@kj');
  I.waitForElement("[y='17']");
  I.click("[y='17']");
  I.see('Please try again');
});

Scenario('Invalid code', I => {
  I.amOnPage('/');
  I.waitForElement("[data-test-id='nav-profile']");
  I.click("[data-test-id='nav-profile']");
  I.waitForElement("[data-test-id='registration-login-cta']");
  I.click("[data-test-id='registration-login-cta']");
  I.waitForElement("[id='email']");
  I.click("[id='email']");
  I.fillField('email', 'oscusernamev2@gmail.com');
  I.click("[data-test-id='sign-in-email-send-magic-link']");
  I.waitForElement("[placeholder='Enter code']");
  I.fillField("[type='text']", '111111');
  I.wait(5);
  I.waitForText('Login code is invalid.');
  I.see('Login code is invalid.');
});
