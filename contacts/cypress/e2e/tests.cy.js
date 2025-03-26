describe("Додаток контактів - тести", () => {
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

  it("Додає контакт і відображає його у списку", () => {
    cy.get('input[placeholder="Ім\'я"]').type("Максим");
    cy.get('input[placeholder="Телефон"]').type("999888777");
    cy.contains("button", "Додати").click();
    cy.contains("li", "Максим - 999888777").should("be.visible");
  });

  it("Редагує контакт і зберігає зміни", () => {
    cy.get('input[placeholder="Ім\'я"]').type("Олена");
    cy.get('input[placeholder="Телефон"]').type("555666777");
    cy.contains("button", "Додати").click();

    cy.contains("li", "Олена - 555666777").within(() => {
      cy.contains("button", "Редагувати").click();
    });

    cy.get('input[placeholder="Ім\'я"]').clear().type("Олена Іванівна");
    cy.get('input[placeholder="Телефон"]').clear().type("111222333");
    cy.contains("button", "Редагувати").click();

    cy.contains("li", "Олена Іванівна - 111222333").should("be.visible");
  });

  it("Видаляє контакт зі списку", () => {
    cy.get('input[placeholder="Ім\'я"]').type("Сергій");
    cy.get('input[placeholder="Телефон"]').type("123123123");
    cy.contains("button", "Додати").click();

    cy.contains("li", "Сергій - 123123123").within(() => {
      cy.contains("button", "Видалити").click();
    });

    cy.contains("li", "Сергій - 123123123").should("not.exist");
  });

  it("Сортує контакти за іменем", () => {
    const names = ["Ярослав", "Анна", "Богдан"];
    names.forEach((name, index) => {
      cy.get('input[placeholder="Ім\'я"]').type(name);
      cy.get('input[placeholder="Телефон"]').type(`00000000${index}`);
      cy.contains("button", "Додати").click();
    });

    cy.contains("button", "Сортувати за іменем").click();
    cy.get(".contacts-list li").first().should("contain", "Анна");
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
