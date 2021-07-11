Feature: Creating a dictionary version and copy subscription url
  Background:
    Given the user is logged in

    @dictionary
  Scenario: The user should be able to click the button to create a new dictionary version
      Given a dictionary exists
        And the user is on the view dictionary page
      When the user clicks on the create new version button
      Then the user should be on the create new dictionary version dialog box
  
  @dictionary
  @version
  Scenario: The user should be able to create a new dictionary version
    Given a dictionary exists
      And the user is on the create new dictionary version dialog box
    When the user enters the dictionary version information
      And the user submits the form
    Then the new dictionary version should be created

  @dictionary
  @version
  Scenario: The user should be able to release a dictionary version
    Given a version exists
      And the user is on the view dictionary page
    When the user clicks on the release version button
      And the user clicks on the yes button
    Then the dictionary should be released
      And the action should contain Copy Subscription Url option
  
  @dictionary
  @version
  @subscription
  Scenario: The user should be able to copy subscription url
    Given a version exists
      And the user is on the view dictionary page
    When the user clicks action button
      And the user selects  Copy Subscription Url option
    Then the subscription url should be copied
