describe("Consigned Page", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get('input[name="email"]').type("admin@teste.com");
    cy.get('input[name="password"]').type("admin123");
    cy.get('button[type="submit"]').click();
  });

  it("should display the Consigned page", () => {
    cy.wait(2000);
    cy.visit("/consignados");
    cy.get("h2").contains("Consignados");
    cy.get("table").should("exist");
    cy.get('input[type="text"]').should("exist");
  });

  it("should to navigate to the create consigned page", () => {
    cy.wait(2000);

    cy.visit("/consignados");

    cy.get('a[href="/consignados/criar"]').click();
    cy.url().should("include", "/consignados/criar");
  });
});
