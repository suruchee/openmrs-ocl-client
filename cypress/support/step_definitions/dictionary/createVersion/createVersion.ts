import {
  Given,
  Then,
  When
} from "cypress-cucumber-preprocessor/steps";
import {getDictionaryId, getReleased, getSubscriptionURL, getUser, getVersionId} from "../../../utils";


Given("the user is on the view dictionary page", () =>
  cy.visit(`/users/${getUser()}/collections/${getDictionaryId()}/`)
);

Given("the user is on the create new dictionary version dialog box", () =>{
      cy.visit(`/users/${getUser()}/collections/${getDictionaryId()}/`);
      cy.findByLabelText("Create new version").should("exist");
});

When("the user clicks on the create new version button", () =>
  cy.findByLabelText(/Create new version/i).click()
);

When("the user enters the dictionary version information", () => {
  cy.findByLabelText(/ID/i).type(getVersionId());
  cy.findByLabelText(/Release?/i).type(getReleased());
  cy.findByLabelText(/Description/i).type("{enter}");
});

When("the user submits the form", () => {
  cy.get("form").submit();
  cy.url().should("contain", `/users/${getUser()}/collections/${getDictionaryId()}/`);
});

When("the user clicks on the release version button", () => {
  cy.findByRole('switch', {name: /checkReleaseStatus/i}).click()
});

When("the user clicks on the yes button", () => {
  cy.on('window:confirm', () => true);
});

When("the user clicks action button", () => {
  cy.findByTestId("more-actions").click()
});

When("the user selects  Copy Subscription Url option", () => {
  cy.findByTitle(/Copy Subscription URL/i).click()
});

Then("the user should be on the create new dictionary version dialog box", () =>
    cy.findByTitle("Create new version").should("exist")
);

Then("the new dictionary version should be created", () =>
  cy.getVersion(getVersionId()).should("exist")
);

Then("the dictionary should be released", () =>
    cy.getVersion(getReleased()).should("exist")
);

Then("the action should contain Copy Subscription Url option", () =>
    cy.findByTitle(/Copy Subscription URL/i).should("exist")
);

Then("the subscription url should be copied", () =>
  cy.getVersion(getSubscriptionURL()).should("exist")
);