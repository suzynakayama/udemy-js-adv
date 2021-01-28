# Javascript Advanced - Udemy

## By [Andrei Neagoie](https://www.udemy.com/course/advanced-javascript-concepts/)

<h3 id='summary'>Summary</h3>

- [Javascript Advanced - Udemy](#javascript-advanced---udemy)
  - [By Andrei Neagoie](#by-andrei-neagoie)
    - [Javascript Engine](#javascript-engine)
        - [Interpreters X Compilers](#interpreters-x-compilers)
        - [Writing Optimized Code](#writing-optimized-code)
        - [Call Stack and Memory Heap](#call-stack-and-memory-heap)
        - [Garbage Collection](#garbage-collection)
        - [Single Threaded language](#single-threaded-language)
    - [Execution context](#execution-context)
        - [Lexical Environment](#lexical-environment)
        - [Hoisting](#hoisting)
    - [Function Call](#function-call)
        - [Variable/Local Environment](#variablelocal-environment)
    - [Function vs Block Scope](#function-vs-block-scope)
    - [IIFE (Immediately Invoked Function Expression)](#iife-immediately-invoked-function-expression)
    - [This](#this)
          - [Bind, Apply, Call](#bind-apply-call)
          - [Currying and Bind](#currying-and-bind)
        - [Scope vs Context](#scope-vs-context)
    - [JS Types](#js-types)
        - [Pass By Value vs Pass By Reference](#pass-by-value-vs-pass-by-reference)
        - [Type Coercion](#type-coercion)
        - [Dynamic vs Static and Strong vs Weak Languages](#dynamic-vs-static-and-strong-vs-weak-languages)

### Javascript Engine

[Summary](#summary)

The JS Engine translate the javascript to computer language.

There are tons of [ECMAScript engines](https://en.wikipedia.org/wiki/List_of_ECMAScript_engines). Ex. V8, Chakra, Tamarin.

The very first JS Engine was created by Brendan Eich (spider monkey JS engine - still used by firefox). He is also the creator of JavaScript.

![js engine](images/js-engine.png)

ECMAScript is the governing body of JS, and decides how the language should be standardized.

##### Interpreters X Compilers

[Summary](#summary)

Within the **Interpreter** we read and translate the file line by line on the fly.

**Compilers** work ahead of time to create a translation of the code and it compiles down into a language that can be read by the machine.

You can run JS using any of the two.
Interpreters are quick to get on and running. It runs right away. It's best for JS because we don't want the user to wait. The problem with interpreter is that if you are within a loop, it can get really slow.
On these cases, the compiler is best, it takes longer to start, but simplify the code replacing it with an optimized one.

JIT Compiler (Just in Time Compiler) is the mix of interpreters and compilers. That is exactly what V8 does. If you look at the image above, that's how V8 works:
1. Parse the code (*lexical analysis* of the code, breaking it into *tokens* to identify what the code is trying to do)
2. AST - separate the code (tokens are formed into an *abstract syntax tree*)
   [AST Explorer](https://astexplorer.net/)
3. Runs the Interpreter and returns *Bytecode*
4. The Profiler (aka Monitor) will monitor our code and when it finds code that can be optimized will send it to the Compiler
5. The Compiler will compile and optimize the code

```
Note: Babel is a Javascript compiler that takes your modern JS code and returns  browser compatible JS (older JS code).
Typescript is a superset of Javascript that compiles down to Javascript.
Both of these do exactly what compilers do: Take one language and convert into a different one!
```

**Is JS an interpreted language?** Initially yes, but nowadays we also have compilers and it depends on which engine you are using, in other words, on the implementation of the JS code. We can have JS code that uses only a compiler, so in this case, the code is not and interpreted language. This is also truth with Python, since Python can use an Interpreter or a Compiler.

##### Writing Optimized Code

[Summary](#summary)

In order to help the JS Engine we should be careful with:
- eval()
- arguments
- for in loop
- with
- delete
- Hidden Classes
- Inline Caching - 

```javascript
const userData = {
    firstName: 'John',
    lastName: 'Doe'
}

function findUser(user) {
    return `found ${user.firstName} ${user.lastName}`
}

findUser(userData)

// Inline Caching - will cache findUser to be the string `found John Doe`, so it will not have to run over and over again

function Animal(x,y) {
    this.x = x
    this.y = y
}

const obj1 = new Animal(1,2)
const obj2 = new Animal(3,4)

obj1.a = 30
obj1.b = 100
obj2.b = 30
obj2.a = 100

// Hidden Classes - the above code will make the compiler run slower. So to avoid this issue, make sure you add things in the same order or you add the things in the constructor. And that's why the delete is also problematic.
```

WebAssembly (Standard Binary Executable Format) is an executable format that all major browsers agrees on. So it runs really fast on the browser instead of having to go through that entire JS engine process.

##### Call Stack and Memory Heap

[Summary](#summary)

We need the Memory Heap as a place to store information. Where the memory allocation happens.
We use the call stack as a way to keep track where we are on the code, so we can run the code in order. Where the engine keeps track of where your code is in its execution.

Stack Overflow happens when the call stack size is exceeded.

##### Garbage Collection

[Summary](#summary)

JS is a garbage collected language. In other words, when JS realize we are not using the data, the garbage collector will free up the memory.

Memory Leaks happen when we forget to clean up the code and the garbage collector don't reach that specific code in order to free it up. The most common ways this happens:
- Global Variables
- Event Listeners - you add new ones and never clean up when you don't need anymore
- SetTimeout and SetInterval - the objects inside them are never going to get collected

##### Single Threaded language

[Summary](#summary)

JS is a single thread language, so the code runs line by line. And because of that JS is synchronous. 

[The JS Runtime](https://www.youtube.com/watch?v=8aGhZQkoFbQ&feature=emb_title)

[JS Runtime Playground](http://latentflip.com/loupe/?code=ZnVuY3Rpb24gcHJpbnRIZWxsbygpIHsNCiAgICBjb25zb2xlLmxvZygnSGVsbG8gZnJvbSBiYXonKTsNCn0NCg0KZnVuY3Rpb24gYmF6KCkgew0KICAgIHNldFRpbWVvdXQocHJpbnRIZWxsbywgMzAwMCk7DQp9DQoNCmZ1bmN0aW9uIGJhcigpIHsNCiAgICBiYXooKTsNCn0NCg0KZnVuY3Rpb24gZm9vKCkgew0KICAgIGJhcigpOw0KfQ0KDQpmb28oKTs%3D!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)

NodeJs is a JS runtime built on V8 JS Engine. It was created to run JS in the computer, so you don't need to run in the browser. It makes JS non-blocking because it sends the code to the event loop that is running on the background.

### Execution context

[Summary](#summary)

Every time we run JS code it is run inside and Execution Context.

On the first phase, the Global Execution Context give us a`Global Object` and the `this`. And they are equal to one another initially. In this phase, we also have `hoisting`.

On the second phase, a new Execution Context is created to run our code.

##### Lexical Environment

[Summary](#summary)

It means where is the code written? Ex.

```javascript
function hi(){
    return 'Hi'
}

function sayHi() {
    function inside() {
        return 'I am inside!'
    }
    return hi()
}

function bePolite() {
    return sayHi()
}

bePolite()

// In this example we can see that functions: hi, sayHi, and bePolite, were written in the global environment. While function inside was written within the sayHi environment.
```

Think about little worlds (each function), where each world is a lexical environment.

![Lexical Environment](lexical-env.png)

In JS, our lexical scope/environment (available data + variables where the function was defined) determines our available variables. Not where the function is called (dynamic scope).

The very first lexical environment that we have is the global environment.

##### Hoisting

[Summary](#summary)

Is the behavior of moving the functions declarations/variables to the top of their respective environments during compilation phase. Variables are partially hoisted (we hoist the variables defined with **var** * but assign undefined) and function declarations are hoisted.

*\* variables and functions defined with **let** or **const** are not hoisted.*

Interesting Example:
```javascript
// hoisted:
// var favoriteFood = undefined;
// var foodThoughts = undefined;

var favoriteFood = 'grapes';

var foodThoughts = function () {
    //hoisted:
    // var favoriteFood = undefined

    console.log('Original favorite food: ' + favoriteFood);

    var favoriteFood = 'sushi';

    console.log('New favorite food: ' + favoriteFood);
}

// logs:
// Original favorite food: undefined
// New favorite food: sushi
// undefined            * because the function doesn't have a return statement
```

### Function Call

[Summary](#summary)

Function declaration: `function x() {...}`
Function Expression: `const x = () => {}`

Function Invocation/Call/Execution - just run the function and creates an execution context with:
- `this`
- `arguments`

The `arguments` keyword is a special keyword in JS.

```javascript
const marry = (p1, p2) => {
    console.log('arguments: ' + arguments)
    return `${p1} married ${p2}!`
}

marry('John', 'Jane')
// arguments: {0: 'John', 1: 'Jane'}
// John married Jane!
```

Within the Function Execution Context, we also have the Variable/Local Environment.

##### Variable/Local Environment

[Summary](#summary)

Is the local environment within an execution context. For example, the local environment within a function.

### Function vs Block Scope

[Summary](#summary)

Function scope is the lexical environment inside the function.

Block scope, on the other hand, is the lexical environment within a block of code with `{}`.

In JS, you can create the block scope using `const` and `let` for variable declaration.

### IIFE (Immediately Invoked Function Expression)

[Summary](#summary)

An IIFE is a anonymous function expression that is immediately invoked after being created.

```javascript
(function() {
    // do something
})()
```

So, why use IIFE? It will create a new execution environment, so you won't have a problem with scope and will minimize the amount of data that we add to the global environment.

### This

[Summary](#summary)

`this` is the object that the function is a property of.

In the global object, `this` is the global object. Ex. in the browser it is the `window`.

If we have a function in the global object, `this` will still be the global object. Ex. `function a() {console.log(this)}`

If you use `use strict` the `this` inside the function will be undefined.

`this` within an object, will be the object.

`this` is what is left to the dot.

```javascript
const myObj = {
    name: 'Suzy',
    sing() { 
        return 'alalala ' + this.name
    }
    singAgain() { 
        return this.sing() = '!'
    }
}

myObj.sing()    // alalala Suzy
```

So, `this` has 2 main benefits:
- gives methods access to their object (example above)
- execute same code for multiple objects (example below)

```javascript
const importantPerson = () => {
    console.log(this.name + '!')
}

importantPerson()   // == window.importantPerson() ==> this is window

const name = 'Sunny';
const obj1 = {
    name: 'Suzy',
    importantPerson: importantPerson
}

const obj2 = {
    name: 'Pedro',
    importantPerson: importantPerson
}

importantPerson()           // Sunny!
obj1.importantPerson()      // Suzy!
obj2.importantPerson()      // Pedro!



// Another example
const a = () => {
    console.log('a', this);
    const b = () => {
        console.log('b', this);
        const c = {
            hi: () => console.log('c', this),
        }
        c.hi()
    }
    b()
}

a()
// a window     ==> window.a()
// b window     ==> window.a(b())
// c {hi: f}    ==> c.hi()
```

Within an object, always use arrow function to bind this to the object. On the old days, we used to use `.bind(this)` to do this biding. We could also create a variable (self) and define it as `this`. Then use the self variable, instead of `this`.

###### Bind, Apply, Call

[Summary](#summary)

`call` and `apply` do the same thing, it just calls the function. The only difference it that, when passing parameters, `apply` takes an array, instead of just parameters.

`bind` binds the this keyword to the object and allows us to store the function for a later use.

```javascript
const wizard = {
    name: 'Merlin',
    health: 50,
    heal(num1 = 50, num2 = 50) {
        return this.health = num1 + num2;
    }
}

const archer = {
    name: 'Robin Hood',
    health: 30
}

console.log('1', archer.health)     //1 30
wizard.heal()       // 100
wizard.heal.call(archer)
console.log('2', archer.health)     //2 100
wizard.heal.call(archer, 45, 35)
console.log('3', archer.health)     //3 80

wizard.heal.apply(archer, [45, 35])

const healArcher = wizard.heal.bind(archer, 45, 35)
healArcher()        // 80
```

###### Currying and Bind

[Summary](#summary)

Refers to only partially getting a parameter to a function and save it to use later.

```javascript
const multiply = (a,b) => a * b;

let multiplyBy2 = multiply.bind(this, 2)

console.log(multiplyBy2(4))     // 8
```

##### Scope vs Context

[Summary](#summary)

Scope is a function base thing, what is the variable access when it is invoked. Where is the variable environment. It's about the visibility of variables.
Context is about the object. What is the value of the `this` keyword. Usually determined by how is the function invoked with the value of `this`.

### JS Types

[Summary](#summary)

1. Number
2. Boolean
3. String
4. Undefined
5. Null
6. Symbol('just me')
7. Object
   1. Array - to check if variable is an array use: `Array.isArray(variable)`
   2. Function

##### Pass By Value vs Pass By Reference

[Summary](#summary)

Primitive types are immutable. Ex. `let a = 10`

Objects are pass by reference. They pass the reference in memory from that object.

To create copies of objects without using the reference:
```javascript
let obj = {a:'a', b:'b'};
let clone = Object.assign({}, obj);
let clone2 = {...obj}

obj.b = 5
console.log(obj)        // {a:'a', b:5}
console.log(clone)      // {a:'a', b:'b'}
console.log(clone2)     // {a:'a', b:'b'}
``` 

NOTE: these options above are only shallow clones. If you have ??, you should do a deep clone, you can do that using JSON or a library. Be careful with deep cloning because it can take a long time.

```javascript
let obj = {a:'a', b:'b', c: {deep: 'hahaha'}};
let clone = Object.assign({}, obj);
let clone2 = {...obj}
clone.c.deep = 'different'

let superClone = JSON.parse(JSON.stringify(obj))

obj.b = 5
console.log(obj)        // {a:'a', b:5, c: {deep: 'different'}}
console.log(clone)      // {a:'a', b:'b', c: {deep: 'different'}}
console.log(clone2)     // {a:'a', b:'b', c: {deep: 'different'}}
```

Exercise: How would you compare two objects if they are pointing to a different location in memory but still have the same properties?

```javascript
var user1 = {name : "nerd", org: "dev"};
var user2 = {name : "nerd", org: "dev"};

var eq = user1 == user2;
console.log(eq); // gives false

// the below only works if the properties are in order
var eq1 = JSON.stringify(obj1) === JSON.stringify(obj2) 
console.log(eq1); // gives true
```

##### Type Coercion

[Summary](#summary)

Means the language converting the variable from one type to another.

[JS Equality Table](https://dorey.github.io/JavaScript-Equality-Table/)
[mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)

##### Dynamic vs Static and Strong vs Weak Languages

[Summary](#summary)

![typed languages](images/typed-lang.png)

**Dynamic** typed language allows us not to declare the type of variable. Ex. `let a = 100;`

**Static** languages forces us to declare the type of the variable. `let a: number = 100;`

**Weak** language is a language that has type coercion. So, for example, if we are using JS and try to add a string to a number, it will transform the number into a string and add to the end of the original string.

**Strong** languages don't allow coercion. So in python, for example, if you try the same as the example above, it will return a error.

