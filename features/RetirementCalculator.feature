Feature: Pre-retirement calculator


  @MandatoryFields_retirementForm @preRetirementForm 
  Scenario: User should be able to submit form with only mandatory fields filled
    Given User fills out the 'mandatory_Fields' of pre retirement calculator form
    When User submits the form with 'valid data'
    Then User should be able to see my retirement savings amount

  @socialSecurityToggle_retirementForm @preRetirementForm
  Scenario Outline: Additional Social Security fields should display/hide based on Social Security benefits selection
    Given User selects the option 'yes' for social security fields
    Then User validates social security options are 'Displayed'
    When User selects the option 'no' for social security fields
    Then User validates social security options are 'not Displayed'

  @submitAllFields_retirementForm @preRetirementForm
  Scenario: User should be able to submit  form with all fields filled in
    Given User fills out the 'all_Fields' of pre retirement calculator form
    And User submits the form with 'valid data'
    Then User should be able to see my retirement savings amount

  @defaultCalculator_retirementForm @preRetirementForm
  Scenario: User should be able to update default calculator values
    Given User fills out the 'all_Fields' of pre retirement calculator form
    When User clicks adjust default values link
    Then User fills out the 'default_Values' of pre retirement calculator form
    And User submits the form with 'valid data'
    Then User should be able to see my retirement savings amount

  @invalidCurrentAge @preRetirementForm
  Scenario: User should be able to get error pop up when entered invalid age
    Given User fills out the 'invalid_currentAgeFields' of pre retirement calculator form
    When User submits the form with 'invalid data'
    Then User should be able to see an 'invalid age' error message

  @invalidRetirementAge @preRetirementForm
  Scenario: User should be able to get error pop up when entered retirement age more than current age
    Given User fills out the 'invalid_retirement_age' of pre retirement calculator form
    When User submits the form with 'invalid data'
    Then User should be able to see an 'invalid retirement age' error message
