import { Given, When, Then, Before, DataTable } from '@wdio/cucumber-framework';
import { expect, $ } from '@wdio/globals'
import RetairementCalculatorPage from '../../features/pageobjects/retirementCalculator.page';
import { MilliSeconds } from '../../globals/milliseconds.enum';
import * as faker from 'faker';

Before(async () => {
   await browser.url('https://www.securian.com/insights-tools/retirement-calculator.html');
   expect(await RetairementCalculatorPage.isDisplayed(await RetairementCalculatorPage.preRetirementTitle)).toBe(true);
 });

Given(`User fills out the mandatory feilds of pre retirement calculator form`, async () => {
   await RetairementCalculatorPage.preRetirementForm();

});

When(`User submits the form`, async () => {
   const isFormSubmitted= await RetairementCalculatorPage.submitForm();
   console.log(isFormSubmitted,'this is the status of form submission');
   expect(await isFormSubmitted).toBe(true);
});
 

Then(`Validate the results are produced by the calculator after submission`, async () => {
   expect(await RetairementCalculatorPage.isDisplayed(await RetairementCalculatorPage.resultsChart));
});


Given(`User validates social security toggle section with its status`, async (socialSecurityStatus: DataTable) => {
  await RetairementCalculatorPage.sleep(MilliSeconds.XXS);
    
    const statusDataDetails = socialSecurityStatus.hashes();
    await Promise.all(statusDataDetails.map(async (details) => {

 
   if(details.status === 'Yes'){

    RetairementCalculatorPage.socicalSecurityStatuses = 'yes' ;
    await RetairementCalculatorPage.click(await RetairementCalculatorPage.socicalSecurity);

    await RetairementCalculatorPage.sleep(MilliSeconds.XXS);

    expect(await RetairementCalculatorPage.isDisplayed(await RetairementCalculatorPage.maritalStatusLabel)).toBe(true);
    expect(await RetairementCalculatorPage.isDisplayed(await RetairementCalculatorPage.overRideAmount_socialSecurity)).toBe(true);

   }
   else 
   await RetairementCalculatorPage.sleep(MilliSeconds.XS);

    RetairementCalculatorPage.socicalSecurityStatuses = 'no';
    await RetairementCalculatorPage.click(await RetairementCalculatorPage.socicalSecurity);

    await RetairementCalculatorPage.sleep(MilliSeconds.XXS);
    expect(await RetairementCalculatorPage.getAttributeValue(await RetairementCalculatorPage.additionalFeildsStatus,'style')).toBe('display: none;')

   }
));
});


Given(`User fills out the all the feilds of pre retirement calculator form`, async () => {
   await RetairementCalculatorPage.click(await RetairementCalculatorPage.spouseIncome);
   await browser.keys(['Escape']);
   await RetairementCalculatorPage.type(await RetairementCalculatorPage.spouseIncome,faker.datatype.number({min: 10000 ,max:20000}));
   await RetairementCalculatorPage.sleep(MilliSeconds.XXS);
   
   RetairementCalculatorPage.socicalSecurityStatuses = 'yes' ;
   await RetairementCalculatorPage.click(await RetairementCalculatorPage.socicalSecurity);


   RetairementCalculatorPage.maritalStatus_Value = 'married' ;
   await RetairementCalculatorPage.click(await RetairementCalculatorPage.maritalStatus);

   await RetairementCalculatorPage.type(await RetairementCalculatorPage.inputOverRideAmount_socialSecurity,faker.datatype.number({min: 100 ,max:1000}));

   });

Given(`User clicks adjust default values link`, async () => {
await RetairementCalculatorPage.click(await RetairementCalculatorPage.adjustDefaultValueLink);
await RetairementCalculatorPage.waitForPresence(await RetairementCalculatorPage.defaultModalTitle);
expect((await RetairementCalculatorPage.getText(await RetairementCalculatorPage.defaultModalTitle))).toBe('Default calculator values');

});

When(`User fills the default calculator values`, async () => {

   await RetairementCalculatorPage.waitForPresence(await RetairementCalculatorPage.additionalIncone);
   await RetairementCalculatorPage.click(await RetairementCalculatorPage.additionalIncone);
   await RetairementCalculatorPage.type(await RetairementCalculatorPage.additionalIncone,faker.datatype.number({min: 10000 ,max:20000}));
   
   await RetairementCalculatorPage.waitForPresence(await RetairementCalculatorPage.retirementDuration);
   await RetairementCalculatorPage.type(await RetairementCalculatorPage.retirementDuration,faker.datatype.number({min: 20 ,max:40}));

   await RetairementCalculatorPage.waitForPresence(await RetairementCalculatorPage.includeInflation);
   await RetairementCalculatorPage.click(await RetairementCalculatorPage.includeInflation);
   
   await RetairementCalculatorPage.clickElementUsingJS(await RetairementCalculatorPage.expectedInflationRate);
   await RetairementCalculatorPage.type(await RetairementCalculatorPage.expectedInflationRate,faker.datatype.number({min: 2 ,max:14}));
   
   await RetairementCalculatorPage.waitForPresence(await RetairementCalculatorPage.RetirementAnnualIncome);
   await RetairementCalculatorPage.type(await RetairementCalculatorPage.RetirementAnnualIncome,faker.datatype.number({min: 2 ,max:15}));
   
   await RetairementCalculatorPage.waitForPresence(await RetairementCalculatorPage.preRetirementRoi);
   await RetairementCalculatorPage.type(await RetairementCalculatorPage.preRetirementRoi,faker.datatype.number({min: 2 ,max:14}));
   
   await RetairementCalculatorPage.waitForPresence(await RetairementCalculatorPage.postRetirementRoi);
   await RetairementCalculatorPage.type(await RetairementCalculatorPage.postRetirementRoi,faker.datatype.number({min: 2 ,max:14}));
   
   await RetairementCalculatorPage.waitForPresence(await RetairementCalculatorPage.defaulValuesSaveButton);
   await RetairementCalculatorPage.click(await RetairementCalculatorPage.defaulValuesSaveButton);
   
   expect((await RetairementCalculatorPage.defaultModalTitle)).toBeDisplayed();

});
