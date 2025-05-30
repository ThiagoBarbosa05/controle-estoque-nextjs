describe("Dashboard Page", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get('input[name="email"]').type("admin@teste.com");
    cy.get('input[name="password"]').type("admin123");
    cy.get('button[type="submit"]').click();
  });

  it("should display the Dashboard page", () => {
    cy.wait(2000);
    cy.visit("/dashboard");
    cy.get("h2").contains("Dashboard");
    cy.get("table").should("exist");
  });
});
