// Async in JS

//! example 1: - SetTimeout is a webapi
setTimeout(function () {
	console.log("1", "is the loneliest number");
}, 0);
setTimeout(function () {
	console.log("2", "can be as bad as one");
}, 10);
Promise.resolve("hi").then(data => console.log("3", data));
console.log("4", "is a crowd");

/* All this will print in this order:
4 is a crowd
3 hi
undefined
1 is the loneliest number
2 can be as bad as one
*/

//! Promises
const promise = new Promise((resolved, rejected) => {
	if (true) resolved("worked");
	rejected("error");
});

const promise2 = new Promise((resolved, rejected) => {
	setTimeout(resolved, 100, "Hi");
});

const promise3 = new Promise((resolved, rejected) => {
	setTimeout(resolved, 1000, "Oh");
});

const promise4 = new Promise((resolved, rejected) => {
	setTimeout(resolved, 5000, "Ok");
});

promise
	.then(result => result + "!")
	.then(result2 => result2 + "?")
	.catch(() => console.log("erroooor"))
	.then(result3 => console.log(result2 + "@")); // worked!?@

// to resolve all promises
Promise.all([promise, promise2, promise3, promise4]).then(values =>
	console.log(values)
); // waits for the 5 seconds to resolve all the promises and returns an array with the values - ['worked', 'hi', 'oh', 'ok']

// ! Note. In order for the Promise.all test to work, you need to copy all and paste together in the console, otherwise, from the time you paste only the promises and then copy and paste the Promise.all, all the promises will be resolved already, so it won't take the 5 secs.

const urls = [
	"https://jsonplaceholder.typicode.com/users",
	"https://jsonplaceholder.typicode.com/posts",
	"https://jsonplaceholder.typicode.com/albums",
];

Promise.all(urls.map(url => fetch(url).then(resp => resp.json())))
	.then(results => {
		console.log(results[0]);
		console.log(results[1]);
		console.log(results[2]);
	})
	.catch(() => console.log("error"));

// If, by any mistake, there is an error in one of the urls, it will return the error for all. With Promise.all, if one has an error, all will error out.

//! Async and Await
const getUsers = async url => {
	const response = await fetch(url);
	const data = await response.json();
	console.log(data);
};

const getAll = async urls => {
	try {
		const [users, posts, albums] = await Promise.all(
			urls.map(url => fetch(url).then(resp => resp.json()))
		);
		console.log(users);
		console.log(posts);
		console.log(albums);
	} catch (err) {
		console.log("error: ", err);
	}
};

getUsers(urls[0]);
getAll(urls);

// for await of
const getData = async urls => {
	try {
		const arrayOfPromises = urls.map(url => fetch(url));
		for await (let request of arrayOfPromises) {
			const data = await request.json();
			console.log(data);
		}
	} catch (err) {
		console.log(err);
	}
};

//! Parallel, Sequence, Race
const promisify = (item, delay) =>
	new Promise(resolve => setTimeout(() => resolve(item), delay));

const a = () => promisify("a", 100);
const b = () => promisify("a", 1000);
const c = () => promisify("a", 5000);

// Parallel
const parallel = async () => {
	const promises = [a(), b(), c()];
	const [res1, res2, res3] = await Promise.all(promises);
	return `parallel is done: ${res1} ${res2} ${res3}`;
};
parallel();

// Sequence
const sequence = async () => {
	const res1 = await a();
	const res2 = await b();
	const res3 = await c();
	return `sequence is done ${res1} ${res2} ${res3}`;
};
sequence();

// Race
const race = async () => {
	const promises = [a(), b(), c()];
	const res1 = await Promise.race(promises);
	return `race is done: ${res1}`;
};
race();

//! Promise.allSettled
const promise2 = new Promise((resolved, rejected) => {
	setTimeout(resolved, 100, "Hi");
});

const promise3 = new Promise((resolved, rejected) => {
	setTimeout(rejected, 1000, "Oh something is wrong");
});

Promise.allSettled([promise2, promise3]).then(data => console.log(data));

//! Promise.any
const p1 = new Promise((resolve, reject) => {
	setTimeout(() => resolve("A"), 1000);
});
const p2 = new Promise((resolve, reject) => {
	setTimeout(() => resolve("B"), 500);
});
const p3 = new Promise((resolve, reject) => {
	setTimeout(() => resolve("C"), 9000);
});

const any = async () => await Promise.any([p1, p2, p3]);
any();

//! Web Worker
var worker = new Worker("worker.js");
worker.postMessage("hello world");
