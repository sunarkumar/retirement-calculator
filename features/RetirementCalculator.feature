Feature: Pre-retirement calculator

  @MandatoryFeilds_retirementForm @preRetirementForm 
  Scenario: User should be able to submit form with all required fields filled in
    Given User fills out the 'mandatory_Fields' of pre retirement calculator form
    When User submits the form
    Then User should be able to see my retirement savings amount

  @socialSecurityToggle_retirementForm @preRetirementForm
  Scenario Outline: Additional Social Security fields should display/hide based on Social Security benefits selection
    Given User selects the option 'yes' for social security fields
    Then User validates social security options are 'Displayed'
    When User selects the option 'no' for social security fields
    Then User validates social security options are 'not Displayed'

  @submitAllFeilds_retirementForm @preRetirementForm
  Scenario: User should be able to submit  form with all fields filled in
    Given User fills out the 'all_Fields' of pre retirement calculator form
    And User submits the form
    Then User should be able to see my retirement savings amount

  @defaultCalculator_retirementForm @preRetirementForm
  Scenario: User should be able to update default calculator values
    Given User clicks adjust default values link
    Then User fills out the 'default_Values' of pre retirement calculator form