describe('Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/')
    cy.contains('Welcome to VisionStudio')
  })
})

