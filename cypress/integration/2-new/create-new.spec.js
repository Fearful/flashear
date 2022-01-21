describe('Creates new Flash', () => {
  it('User goes to create a new flash and then to see it on its my page', () => {
    cy.signup('TestUser1');
    cy.visit('http://localhost:3000/');
    cy.get('.new-flash').click();
    const textInput = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in diam commodo, vulputate velit hendrerit, gravida ante. Pellentesque elementum ex in neque maximus scelerisque. Etiam elit ligula, blandit vitae justo ac, rutrum imperdiet massa. Integer laoreet dui ac maximus faucibus. Phasellus viverra lacinia orci ut rutrum. Aliquam viverra velit sed semper eleifend. Ut molestie nibh id enim vehicula faucibus. Quisque mi orci, eleifend in magna nec, bibendum eleifend lorem. Etiam eu elit felis. In hac habitasse platea dictumst. Donec porta, ex malesuada gravida varius, mi diam viverra orci, at placerat felis ipsum a ex. Donec consequat a elit nec placerat./n Donec pharetra sem at gravida dignissim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec vitae condimentum elit, sit amet tincidunt tortor. Nullam mauris nulla, imperdiet eget lectus placerat, ultricies semper lectus. Quisque at lacus ex. In hac habitasse platea dictumst. Vestibulum arcu metus, interdum eget est eget, hendrerit pulvinar dui. Sed scelerisque tortor quis eros scelerisque euismod. Cras quis facilisis leo, ut vestibulum arcu. Etiam fermentum mauris vel enim facilisis, ac ornare magna fermentum. In aliquam ex vel nisl molestie, vel sagittis arcu mattis. Mauris convallis placerat felis vel efficitur. Morbi ac tempor odio./n Aenean id urna at nibh sagittis pulvinar. Integer pretium dui at rhoncus dignissim. Cras ligula neque, tincidunt a lacus quis, eleifend volutpat metus. Vestibulum lacinia tincidunt eros, non varius orci elementum nec. Cras id tincidunt odio, tristique tincidunt metus. Ut fringilla nibh eros, a consectetur urna convallis faucibus. Suspendisse quis rutrum ante. Suspendisse placerat arcu et nunc accumsan dictum. Curabitur vitae posuere urna, in facilisis massa. Phasellus diam justo, cursus id lobortis nec, blandit a lorem./n In mattis risus dui, sit amet luctus massa convallis sit amet. Mauris consectetur lorem sit amet porta gravida. Aenean porta tortor nec ligula rhoncus.'
    cy.get('form')
      .find('textarea').type(textInput);
    cy.get('form')
      .find('button').click();

    cy.get('.nav-my').click();

    cy.get(".p-4 .shadow-md")
      .contains(textInput)
      .should('have.length', 1);

  })
})