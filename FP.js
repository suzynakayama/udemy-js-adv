// Functional Programming

//# Amazon Shopping Exercise - implement a shopping feature
//Implement a cart feature:
// 1. Add items to cart.
// 2. Add 3% tax to item in cart
// 3. Buy item: cart --> purchases
// 4. Empty cart

//Bonus:
// accept refunds.
// Track user history.

//! My answer - WRONG!

const user1 = {
	name: "Kim",
	active: true,
	cart: [],
	purchases: [],
	history: {},
	total: 0,
};

const user2 = {
	name: "Kano",
	active: true,
	cart: [],
	purchases: [],
	history: {},
	total: 0,
};

const item1 = {
	name: "pen",
	price: 5.0,
};

const item2 = {
	name: "book",
	price: 10.0,
};

const item3 = {
	name: "shoes",
	price: 50.0,
};

let date = new Date().toDateString();
date = date.slice(4, date.length);

const addToCart = (user, item) => {
	const cart = user.cart;
	cart.push(item);
	if (!user.history[date].AddToCart) user.history[date].AddToCart = [];
	user.history[date].AddToCart.push(
		`user ${user.name} added ${item.name} to the cart.`
	);
	return;
};

const addTax = user => {
	cart = user.cart;
	totalPrice = 0;
	cart.forEach(item => (totalPrice += item.price));
	user.total += totalPrice * 1.03;
	user.history[date].AddTax = `tax added to cart itens. Total ${user.total}.`;
};

const buyItem = user => {
	user.purchases = [...user.cart];
	user.history[date].BuyItem = `changing items from cart to purchases.`;
	emptyCart(user);
};

const emptyCart = user => {
	user.cart = [];
	user.total = 0;
	user.history[date].EmptyCart = `emptying cart.`;
};

const purchaseItem = (user, item) => {
	if (!user.history[date]) user.history[date] = {};
	addToCart(user, item);
	addTax(user);
	if (!user.history[date].PurchaseItem) user.history[date].PurchaseItem = [];
	user.history[date].PurchaseItem.push(`purchasing ${item.name}.`);
	return `${user.name}, congrats on purchasing ${item.name}!`;
};

const refunds = (user, item) => {
	let idx;
	for (let i = 0; i < user.purchases.length; i++) {
		if (user.purchases[i].name == item.name) idx = i;
	}
	if (idx) {
		user.purchases.splice(idx, 1);
		user.history[date].Refunds = `refunding ${item.name}.`;
	} else
		console.log(
			`Hello ${user.name}, there was a mistake, you haven't bought ${item.name}.`
		);
};

const getHistory = user => user.history;

purchaseItem(user1, item1);
purchaseItem(user1, item2);
buyItem(user1);

purchaseItem(user2, item1);
purchaseItem(user2, item3);
buyItem(user2);

refunds(user1, item2);
getHistory(user1);

refunds(user2, item1);
getHistory(user2);

//! Right way to do the Amazon shopping
const user1 = {
	name: "Kim",
	active: true,
	cart: [],
	purchases: [],
};

const item1 = {
	name: "pen",
	price: 5.0,
};

const history = [];

const compose =
	(f, g) =>
	(...args) =>
		f(g(...args));

const purchaseItem = (...funcs) => funcs.reduce(compose);

const addItemToCart = (user, item) => {
	const updatedCart = user.cart.concat([item]);
	history.push(user);
	return Object.assign({}, user, { cart: updatedCart });
};

const applyTaxToItems = user => {
	const { cart } = user;
	const taxRate = 1.03;
	const updatedCart = cart.map(item => {
		return { name: item.name, price: item.price * taxRate };
	});
	history.push(user);
	return Object.assign({}, user, { cart: updatedCart });
};

const buyItem = user => {
	history.push(user);
	return Object.assign({}, user, { purchases: user.cart });
};

const emptyCart = user => {
	history.push(user);
	return Object.assign({}, user, { cart: [] });
};

purchaseItem(emptyCart, buyItem, applyTaxToItems, addItemToCart)(user1, item1);

// ! Pure Function
// no side effects
// same input --> same output
const arr = [1, 2, 3];
function a(arr) {
	// copy the outside array and modify this new inside one
	const newArr = [].concat(arr);
	return newArr.pop();
}
