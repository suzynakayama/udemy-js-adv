// Async in JS

// example 1:
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

// Promises
const promise = new Promise((resolved, rejected) => {
	if (true) resolved("worked");
	rejected("error");
});

const promise2 = new Promise((resolved, rejected) => {
	setTimeout(resolve, 100, "Hi");
});

const promise3 = new Promise((resolved, rejected) => {
	setTimeout(resolve, 1000, "Oh");
});

const promise4 = new Promise((resolved, rejected) => {
	setTimeout(resolve, 5000, "Ok");
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

// Async and Await
