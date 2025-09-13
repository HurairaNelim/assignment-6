1. What is the difference between var, let, and const?
 -> var – Function-scoped, can be changed and redeclared.
     let – Block-scoped, can be changed, cannot be redeclared in the same scope.
     
     const – Block-scoped, cannot be changed or redeclared but objects/arrays can be modified.
2. What is the difference between map(), forEach(), and filter()?
 -> forEach() = Loops through array, doesn’t return anything.
        map() = Loops through array, returns a new array with transformed values.
     filter() = Loops through array, returns a new array with only elements that pass a condition.
     
3. What are arrow functions in ES6?
 -> Arrow functions in ES6 are a shorter way to write functions in JavaScript.

4. How does destructuring assignment work in ES6?
-> Destructuring in ES6 is a shortcut to extract values from arrays or objects into variables. 
  such as, // Array
  const [a, b] = [1, 2];
  console.log(a, b); // 1 2

  // Object
  const {name, age} = {name: "Alice", age: 25};
  console.log(name, age); // Alice 25
5. Explain template literals in ES6. How are they different from string concatenation?
  -> Template literals in ES6 are an easier way to create strings. They use backticks ` instead of quotes and allow embedding variables and expressions directly.
