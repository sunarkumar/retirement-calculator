import { $ } from '@wdio/globals'
import { MilliSeconds } from '../../globals/milliseconds.enum';
import { WebPage } from '../../globals/web.page';
const testData = require('../../Utilities/testdata');


/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
class RetairementCalculatorPage extends WebPage {

    get currentAge() {
        return $(`//input[@id='current-age']`);
    }

    get retirementAge() {
        return $(`//input[@id='retirement-age']`);
    }

    get currentIncome() {
        return $(`//input[@id='current-income']`);
    }

    get spouseIncome() {
        return $(`//input[@id='spouse-income']`);
    }

    get currentRetirementSavingsBalance() {
        return $(`//input[@id='current-total-savings']`);
    }

    get eachYearSavingsPercentage() {
        return $(`//input[@id='current-annual-savings']`);
    }

    get eachYearRateOfSavingsPercentage() {
        return $(`//input[@id='savings-increase-rate']`);
    }

    get calculateButton() {
        return $(`//h2[normalize-space()='Pre-retirement calculator']/..//following-sibling::section//button[text()='Calculate']`);
    }

    get mandatoryFeildsAlert() {
        return $(`//p[@id='calculator-input-alert-desc'][text()='Please fill out all required fields']`);
    }

    get mandatoryFeildsList() {
        return $$(`//span[text()='Input required']/../..//label`);
    }

    get results() {
        return $(`//div[@id='calculator-results-container']/h3`);
    }

    get preRetirementTitle() {
        return $(`//h2[normalize-space()='Pre-retirement calculator']`);
    }

    get resultsChart() {
        return $(`//canvas[@id='results-chart']`);
    }


    //****Social security income section Locators******

    private socialSecurityStatus!: string;

    private setmaritalStatus!: string;

    set socicalSecurityStatuses(statusValue: string) {
        this.socialSecurityStatus = `//fieldset[@id='include-social-container']//label[@for='${statusValue}-social-benefits']`
    }

    get socicalSecurity() {
        return $(this.socialSecurityStatus);
    }

    get additionalFeildsStatus() {
        return $(`//div[@class='row social-security-field']`);
    }

    get maritalStatusLabel() {
        return $(`//legend[@id='marital-status-label']`);
    }

    get overRideAmount_socialSecurity() {
        return $(`//label[@for='social-security-override']`);
    }

    get inputOverRideAmount_socialSecurity() {
        return $(`//input[@id='social-security-override']`);
    }

    set maritalStatus_Value(maritalStatus_Value: string) {
        this.setmaritalStatus = `//label[@for='${maritalStatus_Value}']`
    }

    get maritalStatus() {
        return $(this.setmaritalStatus);
    }


    //-------------------------//

    //****Adjust default sections******


    get defaultModalTitle() {
        return $(`//h1[@id='default-values-modal-title']`);
    }

    get adjustDefaultValueLink() {
        return $(`//a[normalize-space()='Adjust default values']`);
    }

    get additionalIncome() {
        return $(`//input[@id='additional-income']`);
    }

    get retirementDuration() {
        return $(`//input[@id='retirement-duration']`);
    }

    get includeInflation() {
        return $(`//label[@for='include-inflation']`);
    }

    get expectedInflationRate() {
        return $(`//input[@id='expected-inflation-rate']`);
    }

    get RetirementAnnualIncome() {
        return $(`//input[@id='retirement-annual-income']`);
    }

    get preRetirementRoi() {
        return $(`//input[@id='pre-retirement-roi']`);
    }

    get postRetirementRoi() {
        return $(`//input[@id='post-retirement-roi']`);
    }

    get defaulValuesSaveButton() {
        return $(`//button[normalize-space()='Save changes']`);
    }

    //--------------------------------------------------------------------//

    /**
     * @description: This method is used to fill the Pre-Retirement Calculator feilds - Mandatory Feilds , All -Feilds, Default calculator feilds
     * @param {string} feildType
     * @author:SunarKumar
     **/

    async preRetirementForm(feildType: string) {
        try {
        const data = testData[feildType];

        if (feildType === 'mandatory_Fields' || feildType === 'all_Fields') {

            await super.click(await this.calculateButton);
            await super.waitForPresence(await this.mandatoryFeildsAlert);

            const mandatoryFields = await this.mandatoryFeildsList;

            for (let index = 0; index < mandatoryFields.length; index++) {
                let elementName = await mandatoryFields[index].getText();

                console.log(elementName, 'these are the element names');

                switch (elementName) {
                    case 'What is your current age?':
                        await super.slowTypeFlex(await this.currentAge, data.currentAge.toString());
                        break;
                    case 'At what age do you plan to retire?':
                        await super.slowTypeFlex(await this.retirementAge, data.retirementAge.toString());
                        break;
                    case 'What is your current annual income?':
                        await super.click(await this.currentIncome);
                        await browser.keys(['Escape']);
                        await super.slowTypeFlex(await this.currentIncome, data.currentIncome.toString());
                        break;
                    case 'What is your current retirement savings balance?':
                        await super.click(await this.currentRetirementSavingsBalance);
                        await browser.keys(['Escape']);
                        await super.slowTypeFlex(await this.currentRetirementSavingsBalance, data.currentRetirementSavingsBalance.toString());
                        break;
                    case 'How much are you currently saving each year for retirement?':
                        await super.slowTypeFlex(await this.eachYearSavingsPercentage, data.eachYearSavingsPercentage.toString());
                        break;
                    case 'What is the rate of increase in your savings each year?':
                        await super.slowTypeFlex(await this.eachYearRateOfSavingsPercentage, data.eachYearRateOfSavingsPercentage.toString());
                        break;

                }
            }
        }
        if (feildType === 'all_Fields') {
            await super.click(await this.spouseIncome);
            await super.slowTypeFlex(await this.spouseIncome, data.spouseIncome.toString());

            this.socicalSecurityStatuses = data.socialSecurityStatuses;
            await super.click(await this.socicalSecurity);

            this.maritalStatus_Value = data.maritalStatus_Value;
            await super.click(await this.maritalStatus);

            await super.click(await this.inputOverRideAmount_socialSecurity);
            await super.slowTypeFlex(await this.inputOverRideAmount_socialSecurity, data.inputOverRideAmount_socialSecurity.toString());
        }
        else if (feildType === 'default_Values') {

            await super.waitForPresence(await this.additionalIncome);
            await super.click(await this.additionalIncome);
            await super.type(await this.additionalIncome, data.additionalIncome.toString());

            await super.waitForPresence(await this.retirementDuration);
            await super.type(await this.retirementDuration, data.retirementDuration.toString());

            await super.waitForPresence(await this.includeInflation);
            await super.click(await this.includeInflation);

            await super.clickElementUsingJS(await this.expectedInflationRate);
            await super.type(await this.expectedInflationRate, data.expectedInflationRate.toString());

            await super.waitForPresence(await this.RetirementAnnualIncome);
            await super.type(await this.RetirementAnnualIncome, data.RetirementAnnualIncome.toString());

            await super.waitForPresence(await this.preRetirementRoi);
            await super.type(await this.preRetirementRoi, data.preRetirementRoi.toString());

            await super.waitForPresence(await this.postRetirementRoi);
            await super.type(await this.postRetirementRoi, data.postRetirementRoi.toString());

            await super.waitForPresence(await this.defaulValuesSaveButton);
            await super.click(await this.defaulValuesSaveButton);

        }
    } catch (error: any) {
        console.error(`Error in preRetirementForm(${feildType}): ${error.message}`);
        throw error; // Re-throw the error to propagate it further if needed
    }
    }

    async submitForm() {
    try {
        let isFormSubmitted = false;
        await super.click(await this.calculateButton);
        await super.sleep(MilliSeconds.XS);
        const isResultsDisplayed = await super.isDisplayed(await this.results);

        console.log(isResultsDisplayed, 'this is the result displayed status')

        if (isResultsDisplayed === true) {
            isFormSubmitted = true;
        }

        return isFormSubmitted;
    } catch (error: any) {
    console.error(`Error in submitForm(): ${error.message}`);
    throw error;
    }
}
}

export default new RetairementCalculatorPage();
