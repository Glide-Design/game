Feature('Sharing');

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

const share = I => {
  I.waitForElement("[class='SocialMediaShareButton SocialMediaShareButton--email']");
  I.waitForElement("[class='SocialMediaShareButton SocialMediaShareButton--facebook']");
  I.waitForElement("[class='SocialMediaShareButton SocialMediaShareButton--twitter']");
  I.waitForElement("[class='SocialMediaShareButton SocialMediaShareButton--whatsapp']");
  I.waitForElement("[data-test-id='close-share-modal']");
  I.click("[data-test-id='close-share-modal']");
  I.wait('3');
  I.dontSee("[data-test-id='close-share-modal']");
};

Scenario('Share as not logged in', I => {
  I.amOnPage('/');
  I.waitForElement("[data-test-id='share-content']");
  I.click("[data-test-id='share-content']");
  share(I);
});

Scenario('Share', I => {
  login(I);
  I.waitForElement("[data-test-id='share-content']");
  I.click("[data-test-id='share-content']");
  share(I);
});

Scenario('Invite', I => {
  login(I);
  I.amOnPage('/profile');
  I.waitForElement("[data-test-id='invite-friends']");
  I.click("[data-test-id='invite-friends']");
  share(I);
});