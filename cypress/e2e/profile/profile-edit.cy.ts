import { getByTestId } from 'cypress/support/commands/common'

let profileId = ''

describe('Пользователь заходит на страницу профиля', () => {
  beforeEach(() => {
    cy.visit('')
    cy.login().then((data) => {
      profileId = data.id
      cy.visit(`/profile/${data.id}`)
    })
  })

  afterEach(() => {
    cy.resetProfile(profileId)
  })

  it('Профиль успешношно загрузился', () => {
    getByTestId('ProfileCard.firstname').should('have.value', 'test')
  })

  it('Редактирование профиля', () => {
    const newName = 'new'
    const newLastname = 'lastname'

    cy.updateProfile(newName, newLastname)
    cy.getByTestId('ProfileCard.firstname').should('have.value', newName)
    cy.getByTestId('ProfileCard.lastname').should('have.value', newLastname)
  })
})
