Feature('Edit Profile');

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

Scenario('Member Profile Page', I => {
  login(I);
  I.amOnPage('/profile');
  I.waitForText('AUTO TEST');
  I.waitForText('ABOUT ME');
  I.waitForText('LOCKER');
  I.waitForText('ENTER LOCKER');
  I.waitForText('INVITE');
});

Scenario('Edit Profile Page', I => {
  login(I);
  I.waitForElement("[data-test-id='nav-profile']");
  I.click("[data-test-id='nav-profile']");
  I.waitForElement("[data-test-id='edit-profile']");
  I.click("[data-test-id='edit-profile']");
  I.waitForElement("[name='forename']");
  I.waitForElement("[name='surname']");
  I.waitForElement("[name='aboutMe']");
  I.waitForElement("[data-test-id='save-changes']");
  I.waitForText('250 characters left');
  I.waitForElement("[id='uploadProfileAvatar']");
});

Scenario('Edit Profile Page Upload avatar image', I => {
  login(I);
  I.amOnPage('/edit-profile');
  I.waitForElement("[id='uploadProfileAvatar']");
  I.attachFile('input[type="file"]', 'test_avatar_upload.JPG');
  I.wait(5);
  I.waitForElement("[data-test-id='save-changes']");
  I.click("[data-test-id='save-changes']");
  I.wait(3);
});

Scenario('Edit First/Last Name', I => {
  login(I);
  I.amOnPage('/edit-profile');
  I.waitForElement("[name='forename']");
  I.clearField('input[name="forename"]');
  I.clearField('input[name="surname"]');
  I.fillField('input[name="forename"]', 'changedname');
  I.fillField('input[name="surname"]', 'changedlastname');
  I.waitForElement("[data-test-id='save-changes']");
  I.click("[data-test-id='save-changes']");
  I.wait(3);
  I.seeInCurrentUrl('/profile');
  I.waitForText('CHANGEDNAME CHANGEDLASTNAME');
  I.amOnPage('/edit-profile');
  I.waitForElement("[name='forename']");
  I.clearField('input[name="forename"]');
  I.clearField('input[name="surname"]');
  I.fillField('input[name="forename"]', 'Auto');
  I.fillField('input[name="surname"]', 'Test');
  I.waitForElement("[data-test-id='save-changes']");
  I.click("[data-test-id='save-changes']");
  I.waitForText('AUTO TEST');
});

Scenario('Edit About ME', I => {
  login(I);
  I.amOnPage('/edit-profile');
  I.waitForElement("[name='aboutMe']");
  I.clearField("[name='aboutMe']");
  I.fillField('textarea', 'qwertyuasdfg ghjytnh hgtrgnjkgtui ~!@#$%^&*()_+`1234567890-=[];');
  I.waitForText('187 characters left');
  I.fillField('textarea','qwertyuio pasdfgg hjkl acvbghkklvnvy tyjgkdfkj qwtfusg dlkgjdflg jfdkg fgkfdjglkfdjg fdklgfdlkgjfd klgfdlkjg fdklgjfdklgjfdkljg dlkfjg lkfdjg fdklgj fdljgl fdjgfdjgldfj glkfdjgoireutoreituor fdlkgjfdlkgj duytrweyrtuyr itueuityer uteriutyoert oiiikwww');
  I.waitForText('0 characters left');
  I.fillField('textarea', 'qwertyuasdfg ghjytnh hgtrgnjkgtui ~!@#$%^&*()_+`1234567890-=[];');
  I.waitForElement("[data-test-id='save-changes']");
  I.click("[data-test-id='save-changes']");
  I.wait(3);
  I.seeInCurrentUrl('/profile');
  I.waitForText('qwertyuasdfg ghjytnh hgtrgnjkgtui ~!@#$%^&*()_+`1234567890-=[];');
  I.amOnPage('/edit-profile');
  I.waitForElement("[name='aboutMe']");
  I.clearField('textarea');
  I.waitForElement("[data-test-id='save-changes']");
  I.click("[data-test-id='save-changes']");
  I.wait(3);
  I.seeInCurrentUrl('/profile');
  I.dontSee('qwertyuasdfg ghjytnh hgtrgnjkgtui ~!@#$%^&*()_+`1234567890-=[];');
});

Scenario('Field validation', I => {
  login(I);
  I.amOnPage('/edit-profile');
  I.waitForElement("[name='forename']");
  I.clearField("[name='forename']");
  I.clearField("[name='surname']");
  I.click("[name='forename']"); //click outside
  I.wait(5);
  I.waitForText('Please complete');
  I.waitForText('Please complete');
  I.fillField('textarea','qwekrtyuio pasdfgg hjkl acvbghkklvnvy tyjgkdfkj qwtfusg dlkgjdflg jfdkg fgkfdjglkfdjg fdklgfdlkgjfd klgfdlkjg fdklgjfdklgjfdkljg dlkfjg lkfdjg fdklgj fdljgl fdjgfdjgldfj glkfdjgoireutoreituor fdlkgjfdlkgj duytrweyrtuyr itueuityer uteriutyoert oiiikwww');
  I.waitForText('1 character too many');
  I.fillField('textarea','qwedkrtyuio pasdfgg hjkl acvbghkklvnvy tyjgkdfkj qwtfusg dlkgjdflg jfdkg fgkfdjglkfdjg fdklgfdlkgjfd klgfdlkjg fdklgjfdklgjfdkljg dlkfjg lkfdjg fdklgj fdljgl fdjgfdjgldfj glkfdjgoireutoreituor fdlkgjfdlkgj duytrweyrtuyr itueuityer uteriutyoert oiiikwww');
  I.waitForText('2 characters too many');
  I.fillField('textarea', 'qwertyuasdfg ghjytnh hgtrgnjkgtui ~!@#$%^&*()_+`1234567890-=[];');
  I.fillField('input[name="forename"]', 'Auto');
  I.fillField('input[name="surname"]', 'Test');
  I.dontSee('Please complete');
  I.dontSee('Please complete');
  I.dontSee('1 character too many');
  I.dontSee('2 characters too many');
});

Scenario('Settings', I => {
  login(I);
  I.amOnPage('/account');
  I.waitForText('Language');
  I.waitForText('My Account');
  I.waitForText('Notification Preferences');
  I.waitForText('Help and Information');
  I.waitForText('Sign out');
});

Scenario('Open language', I => {
  login(I);
  I.waitForElement("[data-test-id='accept_cookies']");
  I.click("[data-test-id='accept_cookies']");
  I.amOnPage('/account');
  I.waitForElement("[href='/language']");
  I.click("[href='/language']");
  I.seeInCurrentUrl('/language');
});

Scenario('Change language', I => {
  login(I);
  I.waitForElement("[data-test-id='accept_cookies']");
  I.click("[data-test-id='accept_cookies']");
  I.amOnPage('/language');
  I.waitForElement("[placeholder='Language']");
  I.click("[placeholder='Language']");
  I.waitForElement("[value='es']");
  I.click("[value='es']");
  I.waitForText('Idioma');
  I.waitForElement("[placeholder='Language']");
  I.click("[placeholder='Language']");
  I.waitForElement("[value='en']");
  I.click("[value='en']");
  I.waitForText('Language');
});

Scenario('Change language as not logged', I => {
  I.amOnPage('/language');
  I.waitForElement("[placeholder='Language']");
  I.click("[placeholder='Language']");
  I.waitForElement("[value='es']");
  I.click("[value='es']");
  I.waitForText('Idioma');
  I.waitForElement("[placeholder='Language']");
  I.click("[placeholder='Language']");
  I.waitForElement("[value='en']");
  I.click("[value='en']");
  I.waitForText('Language');
});