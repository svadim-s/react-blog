export const updateProfile = (firstname: string, lastname: string) => {
  cy.getByTestId('EditableProfileCardHeader.EditButton').click()
  cy.getByTestId('ProfileCard.firstname').clear().type(firstname)
  cy.getByTestId('ProfileCard.lastname').clear().type(lastname)
  cy.getByTestId('EditableProfileCardHeader.SaveButton').click()
}

export const resetProfile = (profileId: string) => {
  return cy.request({
    method: 'PUT',
    url: `http://localhost:8000/profile/${profileId}`,
    headers: { Authorization: 'asasf' },
    body: {
      id: '4',
      first: 'test',
      lastname: 'user',
      age: 23,
      currency: 'RUB',
      country: 'Russia',
      city: 'Moscow',
      username: 'testuser',
      avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png'
    }
  })
}

declare global {
  namespace Cypress {
    interface Chainable {
      updateProfile: (firstname: string, lastname: string) => Chainable<void>
      resetProfile: (profileId: string) => Chainable<void>
    }
  }
}
