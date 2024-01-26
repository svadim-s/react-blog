let currentArticleId = ''

describe('Пользователь заходи на страницу статьи', () => {
  beforeEach(() => {
    cy.login()
    cy.createArticle().then((article) => {
      currentArticleId = article.id
      cy.visit(`articles/${currentArticleId}`)
    })
  })

  afterEach(() => {
    cy.removeArticle(currentArticleId)
  })

  it('Статья успешно подгрузилась', () => {
    cy.getByTestId('ArticleDetails.Info').should('exist')
  })

  it('Рекоммендации успешно подгрузились', () => {
    cy.getByTestId('ArticleRecommendationsList').should('exist')
  })

  it('Отправка комментария', () => {
    cy.getByTestId('ArticleDetails.Info')
    cy.getByTestId('AddCommentForm').scrollIntoView()
    cy.addComment('text')
    cy.getByTestId('CommentCard.Content').should('have.length', 1)
  })

  it('Поставить оценку', () => {
    cy.getByTestId('ArticleDetails.Info')
    cy.getByTestId('RatingCard').scrollIntoView()
    cy.setRate(4, 'feedback')
    cy.get('[data-selected=true]').should('have.length', 4)
  })
})
