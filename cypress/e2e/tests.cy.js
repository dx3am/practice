describe("Додаток контактів - розширені тести", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("Не дозволяє додати контакт без імені", () => {
    cy.get('input[placeholder="Телефон"]').type("123456789");
    cy.contains("button", "Додати").click();
    cy.contains("li", "123456789").should("not.exist");
  });

  it("Не дозволяє додати контакт без телефону", () => {
    cy.get('input[placeholder="Ім\'я"]').type("Андрій");
    cy.contains("button", "Додати").click();
    cy.contains("li", "Андрій").should("not.exist");
  });

  it("Додає 10 контактів і правильно їх сортує", () => {
    const contacts = [
      { name: "Юрій", phone: "900900900" },
      { name: "Богдан", phone: "111222333" },
      { name: "Олексій", phone: "444555666" },
      { name: "Зоряна", phone: "777888999" },
      { name: "Василь", phone: "123123123" },
      { name: "Ганна", phone: "456456456" },
      { name: "Тарас", phone: "789789789" },
      { name: "Дмитро", phone: "321321321" },
      { name: "Євген", phone: "654654654" },
      { name: "Костянтин", phone: "987987987" }
    ];

    contacts.forEach((contact) => {
      cy.get('input[placeholder="Ім\'я"]').type(contact.name);
      cy.get('input[placeholder="Телефон"]').type(contact.phone);
      cy.contains("button", "Додати").click();
    });

    cy.contains("button", "Сортувати за іменем").click();
    cy.get(".contacts-list li").first().should("contain", "Богдан");
  });

  it("Перевіряє, що список контактів не порожній після додавання", () => {
    cy.get(".contacts-list").children().should("have.length", 0);

    cy.get('input[placeholder="Ім\'я"]').type("Марина");
    cy.get('input[placeholder="Телефон"]').type("888555444");
    cy.contains("button", "Додати").click();

    cy.get(".contacts-list").children().should("have.length.above", 0);
  });
});