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

  it("Дозволяє змінювати контакт без втрати даних", () => {
    cy.get('input[placeholder="Ім\'я"]').type("Ірина");
    cy.get('input[placeholder="Телефон"]').type("123321123");
    cy.contains("button", "Додати").click();

    cy.contains("li", "Ірина - 123321123").within(() => {
      cy.contains("button", "Редагувати").click();
    });

    cy.get('input[placeholder="Ім\'я"]').clear().type("Ірина Петрова");
    cy.contains("button", "Редагувати").click();

    cy.contains("li", "Ірина Петрова - 123321123").should("be.visible");
  });

  it("Очищає поля після додавання контакту", () => {
    cy.get('input[placeholder="Ім\'я"]').type("Михайло");
    cy.get('input[placeholder="Телефон"]').type("789456123");
    cy.contains("button", "Додати").click();

    cy.get('input[placeholder="Ім\'я"]').should("have.value", "");
    cy.get('input[placeholder="Телефон"]').should("have.value", "");
  });

  it("Перевіряє зміну кнопки під час редагування", () => {
    cy.get('input[placeholder="Ім\'я"]').type("Юля");
    cy.get('input[placeholder="Телефон"]').type("777999555");
    cy.contains("button", "Додати").click();

    cy.contains("li", "Юля - 777999555").within(() => {
      cy.contains("button", "Редагувати").click();
    });

    cy.contains("button", "Редагувати").should("exist");
    cy.contains("button", "Додати").should("not.exist");
  });
});