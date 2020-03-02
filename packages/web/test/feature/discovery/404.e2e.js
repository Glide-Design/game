Feature('Handle error messages');

Scenario('404 logged in', I => {
  I.amOnPage('/badlink');
  I.waitForText('ERROR 404 - PAGE NOT FOUND');
  I.see('ERROR 404 - PAGE NOT FOUND');
  I.amOnPage('/star/badlink');
  I.waitForText('ERROR 404 - PAGE NOT FOUND');
  I.see('ERROR 404 - PAGE NOT FOUND');
  I.amOnPage('/content/badlink');
  I.waitForText('ERROR 404 - PAGE NOT FOUND');
  I.see('ERROR 404 - PAGE NOT FOUND');
});