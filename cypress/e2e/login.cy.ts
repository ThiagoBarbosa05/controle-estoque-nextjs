describe("Login Page", () => {
  it("should display the login form", () => {
    cy.visit("/login");
    cy.get("form").should("exist");
  });

  it("should allow a user to log in with valid credentials", () => {
    cy.visit("/login");
    cy.get('input[name="email"]').type("admin@teste.com");
    cy.get('input[name="password"]').type("admin123");

    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/dashboard");
    cy.getCookie("access_token").should("exist");
  });

  it("should show an error message for invalid credentials", () => {
    cy.visit("/login");
    cy.get('input[name="email"]').type("admin@teste.com");
    cy.get('input[name="password"]').type("wrongpassword");

    cy.get('button[type="submit"]').click();
    cy.get('div[role="alert"]').should("exist");
  });
});
