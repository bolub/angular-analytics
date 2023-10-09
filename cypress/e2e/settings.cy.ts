describe(
  'Test chart actions',
  {
    retries: 3,
  },
  () => {
    let general: {
      apiUrl: string;
    };

    let settings: {
      newChartTypeButton: string;
      chartInputTitle: string;
      chartInputType: string;
      chartInputOption: string;
      addChartActionButton: string;
      deleteChartActionButton: string;
      editChartActionButton: string;
      updateChartActionButton: string;
    };

    beforeEach(() => {
      cy.fixture('general').then((data) => {
        general = data;
      });

      cy.fixture('settings').then((data) => {
        settings = data;
      });
    });

    const addChartType = ({
      newChartTypeTitle,
    }: {
      newChartTypeTitle: string;
    }) => {
      const { apiUrl } = general;
      const {
        newChartTypeButton,
        chartInputTitle,
        chartInputType,
        chartInputOption,
        addChartActionButton,
      } = settings;

      cy.intercept(apiUrl).as('chartTypesApi');

      cy.visit('/settings');

      cy.wait('@chartTypesApi');

      cy.get(newChartTypeButton).click();

      cy.get(chartInputTitle)
        .should('be.visible')
        .click()
        .type(newChartTypeTitle, { delay: 100 })
        .should('have.value', newChartTypeTitle);

      cy.get(chartInputType).should('be.visible').click();
      cy.get(chartInputOption.replace('*', 'bar')).click();

      cy.get(addChartActionButton).click();

      cy.wait('@chartTypesApi');

      cy.contains(newChartTypeTitle);

      cy.visit('/');

      cy.contains(newChartTypeTitle);
    };

    it('Visits the initial project page', () => {
      cy.visit('/settings');
      cy.url().should('include', '/settings');
    });

    it('should create a new chart', () => {
      const { deleteChartActionButton } = settings;
      const newChartTypeTitle = 'Cy';

      addChartType({
        newChartTypeTitle,
      });

      cy.visit('/settings');

      cy.get(deleteChartActionButton.replace('*', newChartTypeTitle)).click();

      cy.contains(newChartTypeTitle).should('not.exist');
    });

    it('should edit existing chart', () => {
      const {
        chartInputTitle,
        chartInputType,
        chartInputOption,
        deleteChartActionButton,
        editChartActionButton,
        updateChartActionButton,
      } = settings;
      const newChartTypeTitle = 'Cy';
      const updatedChartTypeTile = 'updated-cy';

      addChartType({
        newChartTypeTitle,
      });

      cy.visit('/settings');

      cy.get(editChartActionButton.replace('*', newChartTypeTitle)).click();

      cy.get(chartInputTitle)
        .should('be.visible')
        .click()
        .clear()
        .type(updatedChartTypeTile, { delay: 100 });

      cy.get(chartInputType).should('be.visible').click();
      cy.get(chartInputOption.replace('*', 'pie')).click();

      cy.get(updateChartActionButton).click();

      cy.wait('@chartTypesApi');

      cy.contains(updatedChartTypeTile);

      cy.visit('/');

      cy.contains(updatedChartTypeTile);

      cy.visit('/settings');

      cy.get(
        deleteChartActionButton.replace('*', updatedChartTypeTile)
      ).click();

      cy.contains(updatedChartTypeTile).should('not.exist');
    });
  }
);
