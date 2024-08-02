import { Given, When, Then, Before, DataTable } from '@wdio/cucumber-framework';
import { expect, $ } from '@wdio/globals'
import RetirementCalculatorPage from '../../features/pageobjects/retirementCalculator.page';


Given(`User fills out the {string} of pre retirement calculator form`, async (fieldsType: string) => {
   await RetirementCalculatorPage.preRetirementForm(fieldsType);
   if (fieldsType == 'default_Values') expect((await RetirementCalculatorPage.defaultModalTitle)).toBeDisplayed();
});

When(`User submits the form with {string}`, async (dataType:string) => {
   const isFormSubmitted = await RetirementCalculatorPage.submitForm(dataType);

   if (dataType== 'valid data') expect(await isFormSubmitted).toBe(true);

   else expect(await isFormSubmitted).toBe(false);
});


Then(`User should be able to see my retirement savings amount`, async () => {
   expect(await RetirementCalculatorPage.isDisplayed(await RetirementCalculatorPage.resultsChart));
});


Then(`User selects the option {string} for social security fields`, async (socialSecurityStatus: string) => {

   if (socialSecurityStatus === 'yes') {
      RetirementCalculatorPage.socicalSecurityStatuses = 'yes';
      await RetirementCalculatorPage.click(await RetirementCalculatorPage.socicalSecurity);
   } else {
      RetirementCalculatorPage.socicalSecurityStatuses = 'no';
      await RetirementCalculatorPage.click(await RetirementCalculatorPage.socicalSecurity)
   }
});


Then(`User validates social security options are {string}`, async (visibility: string) => {
   if (visibility === 'Displayed') {
      await RetirementCalculatorPage.waitForPresence(await RetirementCalculatorPage.maritalStatusLabel);
      expect(await RetirementCalculatorPage.isDisplayed(await RetirementCalculatorPage.maritalStatusLabel)).toBe(true);
      expect(await RetirementCalculatorPage.isDisplayed(await RetirementCalculatorPage.overRideAmount_socialSecurity)).toBe(true);
   } else if (visibility === 'not Displayed') {
      await RetirementCalculatorPage.waitForAbsence(await RetirementCalculatorPage.maritalStatusLabel);
      expect(await RetirementCalculatorPage.getAttributeValue(await RetirementCalculatorPage.additionalFieldsStatus, 'style')).toBe('display: none;');
   }
});

Given(`User clicks adjust default values link`, async () => {
   await RetirementCalculatorPage.click(await RetirementCalculatorPage.adjustDefaultValueLink);
   await RetirementCalculatorPage.waitForPresence(await RetirementCalculatorPage.defaultModalTitle);
   expect((await RetirementCalculatorPage.getText(await RetirementCalculatorPage.defaultModalTitle))).toBe('Default calculator values');

});

Given(`User should be able to see an {string} error message`, async (errorType: string) => {

   if (errorType === 'invalid age') {
      RetirementCalculatorPage.invalidError = 'invalid-current-age-error';
      expect((await RetirementCalculatorPage.getText(await RetirementCalculatorPage.invalidRetirementAge))).toBe('Age cannot be 0');

   }

   else {
      RetirementCalculatorPage.invalidError = 'invalid-retirement-age-error';
      expect((await RetirementCalculatorPage.getText(await RetirementCalculatorPage.invalidRetirementAge))).toBe('Planned retirement age must be greater than current age');
   }

});

