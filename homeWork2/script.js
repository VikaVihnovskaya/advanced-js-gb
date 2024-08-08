//Задание 1
// Представьте, что у вас есть класс для управления библиотекой. В этом классе будет приватное свойство для хранения
// списка книг, а также методы для добавления книги, удаления книги и получения информации о наличии книги.
//
// Класс должен содержать приватное свойство #books, которое инициализируется пустым массивом и представляет собой
// список книг в библиотеке.
//
// Реализуйте геттер allBooks, который возвращает текущий список книг.
//
// Реализуйте метод addBook(title), который позволяет добавлять книгу в список. Если книга с таким названием уже
// существует в списке, выбросьте ошибку с соответствующим сообщением.
//
// Реализуйте метод removeBook(title), который позволит удалять книгу из списка по названию. Если книги с таким
// названием нет в списке, выбросьте ошибку с соответствующим сообщением.
//
// Реализуйте метод hasBook(title), который будет проверять наличие книги в библиотеке и возвращать true или false в
// зависимости от того, есть ли такая книга в списке или нет.
//
// Реализуйте конструктор, который принимает начальный список книг (массив) в качестве аргумента. Убедитесь, что
// предоставленный массив не содержит дубликатов; в противном случае выбрасывайте ошибку.


class Library {
  #books = [];
  constructor(books) {
    try {
      if (books.length === new Set(books).size) {
        this.#books = books;
      } else {
        throw new Error('У вас есть дубликаты!');
      }
    } catch (error) {
      console.error(error);
    }
  }

  get allBooks() {
    return this.#books
  }

  addBook(title) {
    try {
      if (this.#books.includes(title)) {
        throw new Error('Такая книга уже есть в списке');
      } else {
        this.#books.push(title);
      }
    } catch (error) {
      console.error(error);
    }
  }

  removeBook(title) {
    try {
      if (!this.#books.includes(title)) {
        throw new Error('Книги с таким названием нет в списке')
      } else {
        const bookIndex = this.#books.indexOf(title);
        return this.#books.splice(bookIndex, 1);
      }
    } catch (error) {
      console.error(error);
    }
  }

  hasBook(title) {
    return this.#books.includes(title);
  }

}
// Проверка

const library = new Library(['Гарри Поттер и философский камень ', 'Гарри Поттер и Тайная комната',
  'Гарри Поттер и узник Азкабана', 'Гарри Поттер и Кубок огня', 'Гарри Поттер и Орден Феникса']);

console.log(library.allBooks);
library.addBook('Гарри Поттер и Принц-полукровка');
console.log(library.allBooks);
console.log(library.hasBook('Гарри Поттер и Тайная комната'));
library.removeBook('Гарри Поттер и Орден Феникса');
console.log(library.allBooks);
library.removeBook('Гарри Поттер и Тайная комната');
console.log(library.allBooks);
console.log(library.hasBook('Гарри Поттер и Тайная комната'));
library.addBook('Гарри Поттер и Принц-полукровка');
library.removeBook('Гарри Поттер и Тайная комната');

const doubleLib = new Library(['Гарри Поттер и философский камень ', 'Гарри Поттер и Тайная комната',
  'Гарри Поттер и Тайная комната']);


