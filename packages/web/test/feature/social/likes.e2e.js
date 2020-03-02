Feature('Likes');

const onPage = I => {
  I.amOnPage('/content/toni-duggan-step-five');
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

Scenario('Precondition post comment', I => {
  login(I);
  onPage(I);
  I.waitForElement("[data-test-id='open-content-comments']");
  I.click("[data-test-id='open-content-comments']");
  I.waitForElement("[data-test-id='add-comment-input']");
  I.fillField("[data-test-id='add-comment-input']", 'like my test comment');
  I.click("[data-test-id='send-comment']");
  I.waitForText('like my test comment');
});

Scenario('Cannot Like comment not logged', I => {
  onPage(I);
  I.waitForElement("[data-test-id='open-content-comments']");
  I.click("[data-test-id='open-content-comments']");
  I.waitForElement("[data-test-id='like-comment']");
  I.click("[data-test-id='like-comment']");
  I.waitForElement("[alt='RegistrationImage']");
});

Scenario('Like comment', I => {
  login(I);
  onPage(I);
  I.waitForElement("[data-test-id='open-content-comments']");
  I.click("[data-test-id='open-content-comments']");
  I.waitForElement("[data-test-id='like-comment']");
  I.click("[data-test-id='like-comment']");
  I.waitForText('1 LIKE');
  I.click("[data-test-id='like-comment']"); // remove like
  I.dontSee('1 LIKE');
});

Scenario('Delete comment', I => {
  login(I);
  onPage(I);
  I.waitForElement("[data-test-id='open-content-comments']");
  I.click("[data-test-id='open-content-comments']");
  I.waitForElement("[data-test-id='open-close-comment-swipe']");
  I.click("[data-test-id='open-close-comment-swipe']");
  I.waitForElement("[class='rc-swipeout-btn-text']");
  I.click("[class='rc-swipeout-btn-text']");
  I.wait(3); // waiting till comment disappears
  I.dontSee('like my test comment');
});

Scenario('Cannot like content not logged', I => {
  onPage(I);
  I.waitForElement("[data-test-id='like-content']");
  I.click("[data-test-id='like-content']");
  I.waitForElement("[alt='RegistrationImage']");
});

Scenario('Like content', I => {
  login(I);
  onPage(I);
  I.waitForElement("[data-test-id='like-content']");
  I.click("[data-test-id='like-content']");
  I.waitForElement("[fill='#7aff00']");
  I.waitForElement("[data-test-id='like-content']");
  I.click("[data-test-id='like-content']");
  I.dontSee("[fill='#7aff00']");
});