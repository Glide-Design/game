Feature('Discovery');

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

Scenario('Accept cookies', I => {
  I.amOnPage('/');
  I.waitForElement("[data-test-id='accept_cookies']");
  I.click("[data-test-id='accept_cookies']");
  I.dontSee("[data-test-id='accept_cookies']");
});

Scenario('Hero slot navigates to content page', I => {
  I.amOnPage('/');
  I.waitForElement("[data-test-id='hero-link']");
  I.click("[data-test-id='hero-link']");
  I.seeInCurrentUrl('/content/');
});

Scenario('Player avatar navigates to player profile', I => {
  I.amOnPage('/');
  onPage(I);
  I.waitForElement("[data-test-id='player-avatar']");
  I.click("[data-test-id='player-avatar']");
  I.seeInCurrentUrl('/star/');
});

Scenario('Navbar players navigates to player index', I => {
  I.amOnPage('/');
  I.waitForElement("[data-test-id='nav-players']");
  I.click("[data-test-id='nav-players']");
  I.seeInCurrentUrl('/stars');
});

Scenario('Navigate to search', I => {
  I.amOnPage('/');
  I.waitForElement("[id='searchTerm']");
  I.click("[id='searchTerm']");
  I.seeInCurrentUrl('/search');
});

Scenario('Navigate to join as not logged', I => {
  I.amOnPage('/join');
  I.waitForElement("[alt='RegistrationImage']");
});

Scenario('Navigate to join as logged', I => {
  login(I);
  I.amOnPage('/join');
  I.waitForElement("[data-test-id='hero-link']");
});

Scenario('My Profile navigates to join', I => {
  I.amOnPage('/profile');
  I.waitForElement("[alt='RegistrationImage']");
});

Scenario('Navbar Discovery navigates to home', I => {
  login(I);
  I.waitForElement("[data-test-id='nav-profile']");
  I.click("[data-test-id='nav-profile']");
  I.waitForElement("[data-test-id='nav-discovery']");
  I.click("[data-test-id='nav-discovery']");
  I.seeInCurrentUrl('/');
});

Scenario('Interaction footer icons', I => {
  I.amOnPage('/');
  I.waitForElement("[data-test-id='bookmark-content']");
  I.waitForElement("[data-test-id='share-content']");
});

Scenario('Cannot play video not logged', I => {
  onPage(I);
  I.waitForElement("[class='vjs-big-play-button']");
  I.click("[class='vjs-big-play-button']");
  I.waitForElement("[alt='RegistrationImage']");
});

Scenario('Registration flow appears again', I => {
  onPage(I);
  I.waitForElement("[class='vjs-big-play-button']");
  I.click("[class='vjs-big-play-button']");
  I.waitForElement("[alt='RegistrationImage']");
  I.waitForElement("[data-test-id='close']");
  I.click("[data-test-id='close']");
  I.waitForElement("[class='vjs-big-play-button']");
  I.click("[class='vjs-big-play-button']");
  I.waitForElement("[alt='RegistrationImage']");
});