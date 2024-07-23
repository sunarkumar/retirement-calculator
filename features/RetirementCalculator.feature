Feature: Pre-retirement calculator

  @MandatoryFeilds_retirementForm @preRetirementForm
  Scenario: User should be able to submit form with all required fields filled in
    Given User fills out the mandatory feilds of pre retirement calculator form
    When User submits the form
    Then Validate the results are produced by the calculator after submission

  @socialSecurityToggle_retirementForm @preRetirementForm
  Scenario Outline: Additional Social Security fields should display/hide based on Social Security benefits toggle
    Given User validates social security toggle section with its status
      | status |
      | Yes    |
      | No     |

  @submitAllFeilds_retirementForm @preRetirementForm
  Scenario: User should be able to submit form with all fields filled in
    Given User fills out the mandatory feilds of pre retirement calculator form
    When User fills out the all the feilds of pre retirement calculator form
    And User submits the form
    Then Validate the results are produced by the calculator after submission

  @defaultCalculator_retirementForm @preRetirementForm
  Scenario: User should be able to update default calculator values
    Given User clicks adjust default values link
    When User fills the default calculator values
