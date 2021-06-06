// encapsulation of data and logic
const elf = {
    name: 'Elle',
    weapon: 'bow',
    attack() {
        return `attack with ${elf.weapon}`
    }
}

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

const ella = createElf('Ella', 'stones');
ella.attack();

// Even better, more DRY and better memory usage
const elfFunctionsStore = {
	attack() {
		return `attack with ${this.weapon}`;
	}
};

function createElf1(name, weapon) {
	return {
		name,
		weapon,
	};
}

const ella1 = createElf1("Ella", "stones");
ella1.attack = elfFunctionsStore.attack
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
}
Elf.prototype.build = function () {
    return `${this.name} builds a house`;
}
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
}

const ella3 = new Elf('Ella', 'stones');
ella3.attack()
ella3.build()
ella3.notWorkingBuild();    // returns undefined

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

//  The Standard converted to the class declaration
class Elf1 {
	constructor(name, weapon) {
		this.name = name;
		this.weapon = weapon;
	}
}