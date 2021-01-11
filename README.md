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