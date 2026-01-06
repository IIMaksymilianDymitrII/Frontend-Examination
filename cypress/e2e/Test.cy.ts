describe('Driving School Examination App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('Load Homepage successfully', () => {
    cy.get('[data-testid="next-lesson"]').should('exist')
    cy.get('[data-testid="weather-forcast"]').should('exist')
    cy.get('[data-testid="driving-quote"]').should('exist')
  })

  it('Signs in and Logs in successfully', () => {
    cy.visit('http://localhost:5173/signin')

    cy.get('input[name="name"]').type('Max')
    cy.get('input[name="lastname"]').type('Hamburger')
    cy.get('input[name="email"]').type('max@burgare.com')
    cy.get('input[name="password"]').type('123')
    cy.get('button').contains('Create Account').click()

    cy.url().should('include', '/')

    cy.contains('Login').click()
    cy.get('input[type="text"]').type('max@burgare.com')
    cy.get('input[type="password"]').type('123')
    cy.get('button').contains('Log In').click()

    cy.window().its('localStorage.token').should('exist')
  })

  it('Sign in Error Validation', () => {
    cy.visit('http://localhost:5173/signin')
    
    cy.get('button').contains('Create Account').click()
    cy.contains('Please Fill in all Required Fields').should('be.visible')

    cy.get('input[name="name"]').type('Max')
    cy.get('input[name="lastname"]').type('Hamburger')
    cy.get('input[name="password"]').type('123')
    cy.get('button').contains('Create Account').click()
    cy.contains('Please Fill in all Required Fields').should('be.visible')

    cy.get('input[name="email"]').type('invalid-email')
    cy.get('button').contains('Create Account').click()
    cy.contains('Please Give a Valid Email').should('be.visible')
  })

  it('Log in Error Validation', () => {
    cy.visit('http://localhost:5173/signin')

    cy.get('input[name="name"]').type('MC')
    cy.get('input[name="lastname"]').type('Donken')
    cy.get('input[name="email"]').type('mc@donken.com')
    cy.get('input[name="password"]').type('1234')
    cy.get('button').contains('Create Account').click()

    cy.url().should('include', '/')

    cy.contains('Login').click()
    cy.get('input[type="text"]').type('wrong@example.com')
    cy.get('input[type="password"]').type('wrongpassword')

    cy.get('button').contains('Log In').click()

    // if nothing happens, stay on the same page
    cy.url().should('include', '/login')
  })

  it('Checks Forgot Password Functionality', () => {
    cy.visit('http://localhost:5173/signin')

    cy.get('input[name="name"]').type('Forgot')
    cy.get('input[name="lastname"]').type('Test')
    cy.get('input[name="email"]').type('forgot@test.com')
    cy.get('input[name="password"]').type('password123')
    cy.get('button').contains('Create Account').click()

    cy.url().should('include', '/')

    cy.contains('Login').click()
    cy.contains('Forgot Password?').click()

    cy.url().should('include', '/forgotpassword')

    cy.get('input[type="text"]').type('forgot@test.com')
    cy.get('button').contains('Verify Email').click()

    cy.contains('Check your email for reset link').should('be.visible')

    cy.contains('Token:').should('be.visible')
  })

  it('Checks upcoming events', () => {

    cy.contains('Schedules').click()
    cy.contains('All Classes This Month').should('be.visible')

    // Verify at least one event is displayed *
    cy.get("[data-testid='event-item']").should('have.length.greaterThan', 0)
  })

  it('Theme Switching', () => {
    
    cy.get("[data-testid='theme-toggle']").should('contain', 'Dark Mode')
    cy.get("[data-testid='theme-toggle']").click()

    cy.get("[data-testid='theme-toggle']").should('contain', 'Light Mode')
    cy.get("[data-testid='theme-toggle']").click()

    cy.get("[data-testid='theme-toggle']").should('contain', 'Dark Mode')
  })

  it('Add Lesson to cart (jan 7 & 8)', () => {

    cy.contains('Schedules').click()

    cy.get('[data-testid="calendar-day"]').contains('7').click()
    // Navigates to first event on that day
    cy.get('[data-testid="event-item"]').first().click()
    cy.get('button').contains('Add to Cart').click({force: true})
    cy.get('button').contains('Close').click()
    // Verify item was added to cart (should show count)
    cy.get('[data-testid="cart-count"]').should('contain', '1')

    cy.get('[data-testid="calendar-day"]').contains('8').click()
    cy.get('[data-testid="event-item"]').first().click()
    cy.get('button').contains('Add to Cart').click({force: true})
    cy.get('button').contains('Close').click()
    cy.get('[data-testid="cart-count"]').should('contain', '2')

    // Navigate to cart to verify the items are there
    cy.contains('Cart').click()

    // Checks if 2 items in cart
    cy.get('[data-testid="cart-item"]').should('have.length', 2)
  })

  it('Displays forecast correctly', () => {
    cy.get("[data-testid='weather-forcast']").should('exist')
    cy.contains('Weather & Driving Tip').should('be.visible')
  })

  it('Entire checkout process with authentication', () => {

    cy.contains('Sign up here').click()

    cy.get('input[name="email"]').type('burger@king.com')
    cy.get('input[name="password"]').type('213')
    cy.get('input[name="name"]').type('BurgerKing')
    cy.get('button').contains('Create Account').click()

    cy.contains('Login').click()
    cy.get('input[type="text"]').type('burger@king.com')
    cy.get('input[type="password"]').type('213')
    cy.get('button').contains('Log In').click()

    // Verify we're signed in and on home page
    cy.url().should('include', '/')

    cy.contains('Schedules').click()
    cy.get('[data-testid="calendar-day"]').contains('7').click()
    cy.get('[data-testid="event-item"]').first().click()
    cy.get('button').contains('Add to Cart').click({force: true})
    cy.get('button').contains('Close').click()

    cy.contains('Cart').click()
    cy.url().should('include', '/cart')
    cy.contains('Checkout').click()

    cy.get('input[placeholder="Discount code"]').type('STUDENT10')
    cy.get('button').contains('Apply').click()

    cy.contains('Discount:').should('be.visible')

    cy.get('button').contains('Proceed to Checkout').click()

    cy.get('input[name="email"]').clear().type('burger@king.com')
    cy.get('input[name="firstName"]').clear().type('Burger')
    cy.get('input[name="lastName"]').type('King')
    cy.get('button').contains('Next').click()

    cy.get('input[name="cardNumber"]').type('1234567890123456')
    cy.get('input[name="cvv"]').type('123')
    cy.get('input[name="validUntil"]').type('2027-12') 

    cy.get('button').contains('Complete Purchase').click()

    cy.contains('Thank You for your Purchase').should('be.visible')
    cy.contains('Your Receipt will be sent via Email').should('be.visible')
  })

  it('Entire checkout process without authentication', () => {

    cy.contains('Schedules').click()

    cy.get('[data-testid="calendar-day"]').contains('8').click()
    cy.get('[data-testid="event-item"]').first().click()
    cy.get('button').contains('Add to Cart').click({force: true})
    cy.get('button').contains('Close').click()

    cy.contains('Cart').click()
    cy.contains('Checkout').click()

    cy.get('input[placeholder="Discount code"]').type('WINTER20')
    cy.get('button').contains('Apply').click()

    cy.contains('Discount:').should('be.visible')

    cy.get('button').contains('Proceed to Checkout').click()

    cy.get('input[name="email"]').type('sub@way.com')
    cy.get('input[name="firstName"]').type('Sub')
    cy.get('input[name="lastName"]').type('Way')
    cy.get('button').contains('Next').click()

    cy.get('input[name="cardNumber"]').type('9876543210987654')
    cy.get('input[name="cvv"]').type('456')
    cy.get('input[name="validUntil"]').type('2028-06') 

    cy.get('button').contains('Complete Purchase').click()

    cy.contains('Thank You for your Purchase').should('be.visible')
    cy.contains('Your Receipt will be sent via Email').should('be.visible')
  })
})
