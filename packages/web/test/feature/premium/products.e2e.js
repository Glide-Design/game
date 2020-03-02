Feature('Products');

const login = I => {
  // in purpose to run test scenario being logged in
  I.amOnPage('https://www.facebook.com');
  I.fillField('input[name="email"]', 'auto_feyyqcn_test@tfbnw.net');
  I.fillField('input[name="pass"]', '1!Qwerty');
  I.wait(5); //wait FB app opens
  I.waitForElement("[data-testid='royal_login_button']");
  I.click("[data-testid='royal_login_button']");
  I.amOnPage('/join');
  I.seeInCurrentUrl('/join');
  I.wait('3'); // otro app loaded
  I.click("[data-test-id='continue-with-facebook']");
  I.wait(5); // wait app page loaded, user logged in
};

const signOut = I => {
  I.amOnPage('/settings');
  I.waitForElement("[type='button']");
  I.click("[type='button']");
};

const products = I => {
  I.waitForElement("[data-test-id='sign-in-container']");
  I.click("[data-test-id='continue-with-facebook']");
  I.wait(5);
  I.waitForElement("[data-test-id='expandable-container']");
};

const payment = I => {
  I.waitForElement("[data-test-id='explore-premium']");
  I.click("[data-test-id='explore-premium']");
  I.waitForElement("[data-test-id='expandable-container']");
  I.click("[data-test-id='expandable-container']");
  I.waitForElement("[data-test-id='premium-purchase']");
  I.wait(5);
  I.click("[data-test-id='premium-purchase");
};

Scenario('Products overlay from profile', I => {
  login(I);
  I.amOnPage('/profile');
  I.waitForElement("[data-test-id='explore-premium']");
  I.click("[data-test-id='explore-premium']");
  I.waitForElement("[data-test-id='premium-purchase']");
  I.waitForElement("[data-test-id='expandable-container']");
  I.click("[data-test-id='expandable-container']");
  I.waitForElement("[data-test-id='premium-purchase");
  I.waitForElement("[data-test-id='back-button']");
  I.click("[data-test-id='back-button']");
  I.waitForElement("[data-test-id='explore-premium']");
});

Scenario('Products opens on Premium content for logged freemium user', I => {
  login(I);
  I.amOnPage('/content/ac48f238-2d15-4769-882b-932238a9a1da'); // premium
  I.waitForElement("[class='vjs-control vjs-button otro-go-premium unlock']");
  I.click("[class='vjs-control vjs-button otro-go-premium unlock']");
  I.waitForElement("[data-test-id='expandable-container']");
});

Scenario('Products opens on Premium content after login freemium user', I => {
  login(I); // to not lose session
  signOut(I);
  I.amOnPage('/content/ac48f238-2d15-4769-882b-932238a9a1da'); // premium
  I.waitForElement("[class='vjs-control vjs-button otro-go-premium unlock']");
  I.click("[class='vjs-control vjs-button otro-go-premium unlock']");
  products(I);
});

 Scenario('Products opens on Premium content after login freemium user from comment', I => {
  login(I); // to not lose session
  signOut(I);
  I.amOnPage('/content/ac48f238-2d15-4769-882b-932238a9a1da');
  I.waitForElement("[data-test-id='open-content-comments']");
  I.click("[data-test-id='open-content-comments']");
  I.waitForElement("[data-test-id='sign-in-to-comment']");
  I.click("[data-test-id='sign-in-to-comment']");
  products(I);
});

Scenario('Leave comment as precondition for next scenario', I => {
  login(I);
  I.amOnPage('/content/ac48f238-2d15-4769-882b-932238a9a1da');
  I.waitForElement("[data-test-id='open-content-comments']");
  I.click("[data-test-id='open-content-comments']");
  I.waitForElement("[data-test-id='add-comment-input']");
  I.fillField("[data-test-id='add-comment-input']", 'logintolike');
  I.click("[data-test-id='send-comment']");
  I.waitForText('logintolike');
});

 Scenario('Products opens on Premium content after login freemium user from like comment', I => {
  login(I); // to not lose session
  signOut(I);
  I.amOnPage('/content/ac48f238-2d15-4769-882b-932238a9a1da');
  I.waitForElement("[data-test-id='open-content-comments']");
  I.click("[data-test-id='open-content-comments']");
  I.waitForElement("[data-test-id='like-comment']");
  I.click("[data-test-id='like-comment']");
  products(I);
});

Scenario('Delete comment', I => {
  login(I); // to not lose session
  I.amOnPage('/content/ac48f238-2d15-4769-882b-932238a9a1da');
  I.waitForElement("[data-test-id='open-content-comments']");
  I.click("[data-test-id='open-content-comments']");
  I.waitForElement("[data-test-id='open-close-comment-swipe']");
  I.click("[data-test-id='open-close-comment-swipe']");
  I.waitForElement("[class='rc-swipeout-btn ']");
  I.click("[class='rc-swipeout-btn ']");
  I.wait('3'); // waiting till comment disappears
  I.dontSee('logintolike');
});

Scenario('Products opens on Premium content after login freemium user from like content', I => {
  login(I); // to not lose session
  signOut(I);
  I.amOnPage('/content/ac48f238-2d15-4769-882b-932238a9a1da');
  I.waitForElement("[data-test-id='like-content']");
  I.click("[data-test-id='like-content']");
  products(I);
});

Scenario('Payment page', I => {
  login(I);
  I.amOnPage('/profile');
  payment(I);
  I.waitForElement("[data-test-id='card-name']");
  I.waitForElement("[data-test-id='card-number']");
  I.waitForElement("[data-test-id='mm-yy']");
  I.waitForElement("[data-test-id='cvc']");
});

Scenario('Products page opens if payment page reloads', I => {
  login(I);
  I.amOnPage('/profile');
  payment(I);
  I.waitForElement("[data-test-id='card-name']");
  I.fillField("[data-test-id='card-name']", 'auto test');
  I.refreshPage();
  I.waitForElement("[data-test-id='expandable-container']");
});