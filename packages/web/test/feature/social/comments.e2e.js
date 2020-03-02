Feature('Comments');

const onPage = I => {
  I.amOnPage('/content/toni-duggan-step-five');
};

const signOut = I => {
  I.amOnPage('/account');
  I.waitForElement("[data-test-id='sign-out']");
  I.click("[data-test-id='sign-out']");
};

const postComment = I => {
  I.waitForElement("[data-test-id='open-content-comments']");
  I.click("[data-test-id='open-content-comments']");
  I.waitForElement("[data-test-id='add-comment-input']");
  I.fillField("[data-test-id='add-comment-input']", 'my auto test comment');
  I.click("[data-test-id='send-comment']");
  I.waitForText('my auto test comment');
};

const deleteComment = I => {
  I.waitForElement("[data-test-id='open-close-comment-swipe']");
  I.click("[data-test-id='open-close-comment-swipe']");
  I.waitForElement("[class='rc-swipeout-btn-text']");
  I.click("[class='rc-swipeout-btn-text']");
  I.wait('3'); // waiting till comment disappears
  I.dontSee('my auto test comment');
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

Scenario('Cannot post comment not logged', I => {
  onPage(I);
  I.waitForElement("[data-test-id='open-content-comments']");
  I.click("[data-test-id='open-content-comments']");
  I.waitForElement("[data-test-id='sign-in-to-comment']");
  I.click("[data-test-id='sign-in-to-comment']");
  I.waitForElement("[alt='RegistrationImage']");
});

Scenario('Comment page', I => {
  login(I);
  onPage(I);
  I.waitForElement("[data-test-id='open-content-comments']");
  I.click("[data-test-id='open-content-comments']");
  I.waitForElement("[placeholder='Add a comment']");
  I.waitForElement("[data-test-id='add-comment-input']");
  I.click("[data-test-id='add-comment-input']");
  I.waitForElement("[data-test-id='send-comment']");
});

Scenario('Comment CRD', I => {
  login(I);
  onPage(I);
  postComment(I);
  deleteComment(I);
});

Scenario('Cancel Reply', I => {
  login(I);
  onPage(I);
  postComment(I);
  I.waitForElement("[data-test-id='reply']");
  I.click("[data-test-id='reply']");
  I.waitForElement("[data-test-id='cancel-comment-reply']");
  I.click("[data-test-id='cancel-comment-reply']");
  deleteComment(I);
});