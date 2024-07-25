import { Given, When, Then, Before, DataTable } from '@wdio/cucumber-framework';
import { expect, $ } from '@wdio/globals'
import RetairementCalculatorPage from '../../features/pageobjects/retirementCalculator.page';


Given(`User fills out the {string} of pre retirement calculator form`, async (feildsType: string) => {
   await RetairementCalculatorPage.preRetirementForm(feildsType);
   if (feildsType == 'default_Values') expect((await RetairementCalculatorPage.defaultModalTitle)).toBeDisplayed();
});

When(`User submits the form`, async () => {
   const isFormSubmitted = await RetairementCalculatorPage.submitForm();
   console.log(isFormSubmitted, 'this is the status of form submission');
   expect(await isFormSubmitted).toBe(true);
});


Then(`User should be able to see my retirement savings amount`, async () => {
   expect(await RetairementCalculatorPage.isDisplayed(await RetairementCalculatorPage.resultsChart));
});


Then(`User selects the option {string} for social security fields`, async (socialSecurityStatus: string) => {

   if (socialSecurityStatus === 'yes') {
      RetairementCalculatorPage.socicalSecurityStatuses = 'yes';
      await RetairementCalculatorPage.click(await RetairementCalculatorPage.socicalSecurity);
   } else {
      RetairementCalculatorPage.socicalSecurityStatuses = 'no';
      await RetairementCalculatorPage.click(await RetairementCalculatorPage.socicalSecurity)
   }
});


Then(`User validates social security options are {string}`, async (visibility: string) => {
   if (visibility === 'Displayed') {
      await RetairementCalculatorPage.waitForPresence(await RetairementCalculatorPage.maritalStatusLabel);
      expect(await RetairementCalculatorPage.isDisplayed(await RetairementCalculatorPage.maritalStatusLabel)).toBe(true);
      expect(await RetairementCalculatorPage.isDisplayed(await RetairementCalculatorPage.overRideAmount_socialSecurity)).toBe(true);
   } else if(visibility === 'not Displayed'){
      await RetairementCalculatorPage.waitForAbsence(await RetairementCalculatorPage.maritalStatusLabel);
      expect(await RetairementCalculatorPage.getAttributeValue(await RetairementCalculatorPage.additionalFeildsStatus, 'style')).toBe('display: none;');
   }
});

Given(`User clicks adjust default values link`, async () => {
   await RetairementCalculatorPage.click(await RetairementCalculatorPage.adjustDefaultValueLink);
   await RetairementCalculatorPage.waitForPresence(await RetairementCalculatorPage.defaultModalTitle);
   expect((await RetairementCalculatorPage.getText(await RetairementCalculatorPage.defaultModalTitle))).toBe('Default calculator values');

});