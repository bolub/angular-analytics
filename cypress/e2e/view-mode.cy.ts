describe('Test view mode actions', () => {
  let general: {
    apiUrl: string;
  };

  let viewMode: {
    startDateInput: string;
    endDateInput: string;
    applyFilterButton: string;
    selectedDates: string;
  };

  beforeEach(() => {
    cy.fixture('general').then((data) => {
      general = data;
    });

    cy.fixture('view-mode').then((data) => {
      viewMode = data;
    });
  });

  it('Visits the initial project page', () => {
    cy.visit('/');

    cy.url().should('include', '/view-mode');
  });

  it('Filter by date range', () => {
    const { apiUrl } = general;
    const { startDateInput, endDateInput, applyFilterButton, selectedDates } =
      viewMode;

    cy.intercept(apiUrl).as('getChartTypes');

    cy.visit('/');

    cy.wait('@getChartTypes');

    cy.get(startDateInput).click().type('2016/12/11');

    cy.get(endDateInput).click().type('2020/12/31');

    cy.get(applyFilterButton).click();

    cy.get(selectedDates).should(
      'have.text',
      ' Date range: Dec 11, 2016 to Dec 31, 2020'
    );

    cy.get(selectedDates).click().should('not.exist');
  });
});
