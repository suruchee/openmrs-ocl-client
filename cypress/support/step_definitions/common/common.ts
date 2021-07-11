/// <reference types="cypress" />
/// <reference types="../../" />
import { After, Before, Given } from "cypress-cucumber-preprocessor/steps";
import { customAlphabet } from "nanoid";
import {
  getDictionaryId,
  getUser,
  isLoggedIn,
  setDictionaryId,
  setVersionId,
  getVersionId,
  getReleased, setSubscriptionURL
} from "../../utils";

const apiUrl: string = Cypress.env("API_URL") || "http://localhost:8000";
const username: string = Cypress.env("USERNAME") || "admin";
const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz", 4);

const subURL = `${apiUrl}/users/${username}/collections/TD-${nanoid()}/Ver-${nanoid()}/`

Given("the user is logged in", () => cy.visit("/").login());

Given("a dictionary exists", () => {
  const dictionaryId = getDictionaryId();
  const user = getUser();
  cy.createDictionary(dictionaryId, user);
  cy.createSource(dictionaryId, user);
});

Given("a version exists", () => {
  const versionID = getVersionId();
  const released = getReleased();
  cy.createVersion(versionID, released);
});
Before({ tags: "@dictionary" }, () => {
  setDictionaryId(`TD-${nanoid()}`);
});

Before({ tags: "@version" }, () => {
  setVersionId(`Ver-${nanoid()}`);
});
Before({ tags: "@subscription" }, () => {
  setSubscriptionURL(subURL);
});

After({ tags: "@dictionary" }, () => {
  isLoggedIn().then(loggedIn => {
    if (loggedIn) {
      const dictionaryId = getDictionaryId();
      const user = getUser();
      cy.deleteDictionary(dictionaryId, user, true);
      cy.deleteSource(dictionaryId, user, true);
    }
  });
});
