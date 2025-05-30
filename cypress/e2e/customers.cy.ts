import { faker } from "@faker-js/faker";

describe("Customers Page", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get('input[name="email"]').type("admin@teste.com");
    cy.get('input[name="password"]').type("admin123");
    cy.get('button[type="submit"]').click();
  });

  it("should display the Customers page", () => {
    cy.wait(2000);
    cy.visit("/clientes");
    cy.get("h2").contains("Clientes");
    cy.get("table").should("exist");
    cy.get('input[type="text"]').should("exist");
  });

  it("should navigate to the create customer page", () => {
    cy.wait(2000);
    cy.visit("/clientes");
    cy.get('a[href="/clientes/criar"]').click();
    cy.url().should("include", "/clientes/criar");
  });

  it("should create a new customer", () => {
    cy.wait(2000);
    cy.visit("/clientes");
    cy.get('a[href="/clientes/criar"]').click();

    cy.get('input[name="name"]').type(faker.company.name());
    cy.get('input[name="contactPerson"]').type(faker.person.fullName());
    cy.get('input[name="document"]').type("12345678000195");
    cy.get('input[name="stateRegistration"]').type("11233434");
    cy.get('input[name="email"]').type(faker.internet.email());
    cy.get('input[name="cellphone"]').type("22999999999");
    cy.get('input[name="businessPhone"]').type("22999999999");
    cy.get('input[name="streetAddress"]').type(faker.location.streetAddress());
    cy.get('input[name="number"]').type(faker.location.buildingNumber());
    cy.get('input[name="zipCode"]').type("28951869");
    cy.get('input[name="city"]').type(faker.location.city());
    cy.get('input[name="state"]').type(faker.location.state());
    cy.get('input[name="neighborhood"]').type("Centro");

    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    cy.url().should("include", "/clientes");
    cy.get("table").should("exist");
  });
});
