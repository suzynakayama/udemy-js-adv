// encapsulation of data and logic
const elf = {
	name: "Elle",
	weapon: "bow",
	attack() {
		return `attack with ${elf.weapon}`;
	},
};

// DRY - Factory Functions, so we don't need to copy and paste code above for each elf
function createElf(name, weapon) {
	return {
		name,
		weapon,
		attack() {
			return `attack with ${weapon}`;
		},
	};
}

const ella = createElf("Ella", "stones");
ella.attack();

// Even better, more DRY and better memory usage
const elfFunctionsStore = {
	attack() {
		return `attack with ${this.weapon}`;
	},
};

function createElf1(name, weapon) {
	return {
		name,
		weapon,
	};
}

const ella1 = createElf1("Ella", "stones");
ella1.attack = elfFunctionsStore.attack;
ella1.attack();

// Using Object.create() to clean this up a bit
const elfFunctionsStore = {
	attack() {
		return `attack with ${this.weapon}`;
	},
};

function createElf1(name, weapon) {
	// create link (prototype chain) between the elfFunctions and the newElf we are creating
	let newElf = Object.create(elfFunctionsStore);
	console.log(newElf.__proto__);
	newElf.name = name;
	newElf.weapon = weapon;
	return newElf;
}

const ella2 = createElf1("Ella", "stones");
ella2.attack();

// The Standard, because it is what we had from the beginning, instead of using Object.create() we used to use Constructor Functions (use 'new' keyword)
function Elf(name, weapon) {
	this.name = name;
	this.weapon = weapon;
}

//* cannot use arrow function because they have lexical scope and the function below is attaching the attack function to the global object, and the global object will not have the weapon, so it will be undefined. And that is why we use teh regular function, since it is dynamically scoped
Elf.prototype.attack = function () {
	return `attack with ${this.weapon}`;
};
Elf.prototype.build = function () {
	return `${this.name} builds a house`;
};
Elf.prototype.notWorkingBuild = function () {
	//* not going to work because 'this', in this case, is not assigned to the object anymore, but to the window and the window has no name property, so it will be undefined
	//# to solve this we can either do this:
	//# const self = this
	function building() {
		return `${this.name} builds a house`;
		//# return `${self.name} builds a house`;
	}
	return building();
	//# or this:
	//# return building.bind(this);
};

const ella3 = new Elf("Ella", "stones");
ella3.attack();
ella3.build();
ella3.notWorkingBuild(); // returns undefined

const elf1 = new Function(
	"name",
	"weapon",
	`this.name = name;
    this.weapon = weapon;`
);

const sarah = new Elf("Sarah", "fire");

//# with the constructor function the only way to add new things to the object is using the 'this' keyword.

//! Note
/*
var a = new Number(5)
typeof a        // object
var b = 5
typeof b        // number
a === b         // false
a == b          // true because of type coersion
*/

//  The Standard converted to the ES6 class declaration
class Elf1 {
	constructor(name, weapon) {
		this.name = name;
		this.weapon = weapon;
	}

	attack() {
		return `attack with ${this.weapon}`;
	}
}

// instance of the class Elf1
const bob = new Elf1("Bob", "stones");

// every time we instantiate a class the constructor function is run. But attack is shared by all instances of the class. If we were to move the attack method into the constructor, this would take up memory space.

// INHERITANCE
// let's say we have the class elf, but now we need to create an Ogre. Instead of copy and paste the elf code, let's extend the elf class.

// cloned the object, but ogre doesn't have elf as base class
const ogre = { ...bob };
console.log(ogre.__proto__); // {}
console.log(bob.__proto__); // Elf1 {}
console.log(ogre.attack); // TypeError

// So this is the wrong way to do it! This is where INHERITANCE comes in. We should do it like this:
// 1. change the class name to character, because all characters will have a name, a weapon, and attack method.
// 2. Subclassing - create the subclasses with the `extend` keyword

// superclass or base class
class Character {
	constructor(name, weapon) {
		this.name = name;
		this.weapon = weapon;
	}

	attack() {
		return `attack with ${this.weapon}`;
	}

	#privateMethod() {
		return `this is a private method!`;
	}
}

// subclass - use super() to call the superclass constructor
class Elf extends Character {
	constructor(name, weapon, type) {
		console.log(this); // ReferenceError - because we need to call super first if we are extending a superclass before using this
		super(name, weapon);
		console.log(this); // Elf {name: "Fiona", weapon: "ninja stars"}
		this.type = type;
		console.log(this); // Elf {name: "Fiona", weapon: "ninja stars", type: "ninja"}
	}
}

class Ogre extends Character {
	constructor(name, weapon, colour) {
		super(name, weapon);
		this.colour = colour;
	}
	makeFort() {
		return `strong fort created by ${this.colour} ogre called ${this.name}.`;
	}
}

// when we added makeFort method to Ogre class, underneath the hood it is the same as extending prototype
// Ogre.prototype.makeFort = ....

const fiona = new Elf("Fiona", "ninja stars", "ninja");
fiona.attack(); // attack with ninja stars

const shrek = new Ogre("Shrek", "stones", "green");
shrek.makeFort(); // strong fort created by green ogre called Shrek.

console.log(Ogre.isPrototypeOf(shrek)); // false
console.log(Ogre.prototype.isPrototypeOf(shrek)); // true
console.log(Character.prototype.isPrototypeOf(Ogre.prototype)); // true

// better way to check those connections:
console.log(fiona instanceof Elf); // true
console.log(fiona instanceof Ogre); // false
console.log(fiona instanceof Character); // true
