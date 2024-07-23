import { $ } from '@wdio/globals'
import {MilliSeconds} from '../../globals/milliseconds.enum';
import {WebPage} from '../../globals/web.page';
import * as faker from 'faker';
/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
class RetairementCalculatorPage extends WebPage {

    get currentAge () {
        return $(`//input[@id='current-age']`);
    }

    get retirementAge () {
        return $(`//input[@id='retirement-age']`);
    }

    get currentIncome () {
        return $(`//input[@id='current-income']`);
    }

    get spouseIncome () {
        return $(`//input[@id='spouse-income']`);
    }

    get currentRetirementSavingsBalance () {
        return $(`//input[@id='current-total-savings']`);
    }

    get eachYearSavingsPercentage () {
        return $(`//input[@id='current-annual-savings']`);
    }

    get eachYearRateOfSavingsPercentage () {
        return $(`//input[@id='savings-increase-rate']`);
    }

    get calculateButton () {
        return $(`//h2[normalize-space()='Pre-retirement calculator']/..//following-sibling::section//button[text()='Calculate']`);
    }

    get mandatoryFeildsAlert () {
        return $(`//p[@id='calculator-input-alert-desc'][text()='Please fill out all required fields']`);
    }

    get mandatoryFeildsList () {
        return $$(`//span[text()='Input required']/../..//label`);
    }

    get results () {
        return $(`//div[@id='calculator-results-container']/h3`);
    }

    get preRetirementTitle () {
        return $(`//h2[normalize-space()='Pre-retirement calculator']`);
    }

    get resultsChart () {
        return $(`//canvas[@id='results-chart']`);
    }


//****Social security income section Locators******

 private socialSecurityStatus!: string;

 private setmaritalStatus!: string;

  set socicalSecurityStatuses(statusValue:string){
    this.socialSecurityStatus = `//fieldset[@id='include-social-container']//label[@for='${statusValue}-social-benefits']`
   }

    get socicalSecurity() {
        return $(this.socialSecurityStatus);
    }

    get additionalFeildsStatus() {
        return $(`//div[@class='row social-security-field']`);
    }


    get maritalStatusLabel () {
        return $(`//legend[@id='marital-status-label']`);
    }

    get overRideAmount_socialSecurity () {
        return $(`//label[@for='social-security-override']`);
    }

    get inputOverRideAmount_socialSecurity () {
        return $(`//input[@id='social-security-override']`);
    }

    set maritalStatus_Value(maritalStatus_Value:string){
        this.setmaritalStatus = `//label[@for='${maritalStatus_Value}']`
       }

    get maritalStatus() {
        return $(this.setmaritalStatus);
    }


//-------------------------//

//****Adjust default sections******


get defaultModalTitle () {
    return $(`//h1[@id='default-values-modal-title']`);
}

get adjustDefaultValueLink () {
    return $(`//a[normalize-space()='Adjust default values']`);
}

get additionalIncone () {
    return $(`//input[@id='additional-income']`);
}

get retirementDuration () {
    return $(`//input[@id='retirement-duration']`);
}

get includeInflation () {
    return $(`//label[@for='include-inflation']`);
}

get expectedInflationRate () {
    return $(`//input[@id='expected-inflation-rate']`);
}

get RetirementAnnualIncome () {
    return $(`//input[@id='retirement-annual-income']`);
}

get preRetirementRoi () {
    return $(`//input[@id='pre-retirement-roi']`);
}

get postRetirementRoi () {
    return $(`//input[@id='post-retirement-roi']`);
}

get defaulValuesSaveButton () {
    return $(`//button[normalize-space()='Save changes']`);
}
//--------------------------------------------------------------------//

    async preRetirementForm () {

    await super.click(await this.calculateButton);

    await super.sleep(MilliSeconds.XXXS);

    if (await super.isDisplayed(await this.mandatoryFeildsAlert)){

    const mandatoryFeilds = await this.mandatoryFeildsList;

    for(let index =0; index < mandatoryFeilds.length; index++){

        let elementName = await super.getText(mandatoryFeilds[index]);

        console.log(elementName,'these are the element names');

        if(elementName === 'What is your current age?'){ await super.type(await this.currentAge,faker.datatype.number({min:30 ,max:40}));
        await super.sleep(MilliSeconds.XXS);}

        else if(elementName === 'At what age do you plan to retire?') {await super.type(await this.retirementAge,faker.datatype.number({min: 41,max:80}));
        await super.sleep(MilliSeconds.XXS);}

        else if(elementName === 'What is your current annual income?'){
            await super.click(await this.currentIncome);
            await super.type(await this.currentIncome,faker.datatype.number({min: 40000 ,max:50000}));
            await super.sleep(MilliSeconds.XXS);}
    
        else if(elementName === 'What is your current retirement savings balance?'){ 
            await super.click(await this.currentRetirementSavingsBalance);
            await browser.keys(['Escape']);
            await super.type(await this.currentRetirementSavingsBalance,faker.datatype.number({min: 10000 ,max:40000}));
            await super.sleep(MilliSeconds.XXS);}

        else if(elementName === 'How much are you currently saving each year for retirement?') {await super.type(await this.eachYearSavingsPercentage,faker.datatype.number({min: 2, max: 12}));
        await super.sleep(MilliSeconds.XXS);}
        
        else if(elementName === 'What is the rate of increase in your savings each year?'){ await super.type(await this.eachYearRateOfSavingsPercentage,faker.datatype.number({min: 2, max: 12}));
        await super.sleep(MilliSeconds.XXS);}
    }
    }
    }



    async submitForm (){
       let isFormSubmitted = false;
        await super.click(await this.calculateButton);
        await super.sleep(MilliSeconds.XS);
        const isResultsDisplayed = await super.isDisplayed(await this.results);

        console.log(isResultsDisplayed, 'this is the result displayed status')
    
        if (isResultsDisplayed === true){
            isFormSubmitted = true ;
        }

       return isFormSubmitted;
    }

    }

export default new RetairementCalculatorPage();
