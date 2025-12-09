// -----------------------------------------------------------------------------
// 4) ERRORS — throw, custom errors, try/catch/finally
// -----------------------------------------------------------------------------
/**
 * DEFINITIONS :
 * - Errors signal exceptional events.  Engine- or user-thrown (with throw).
 * - They can be thrown by the engine when a bad piece of code is executed
 * - They can be thrown manully using the throw keyword
 * - Custom errors extend Error.
 * - Use try/catch/finally; branch on error type with instanceof.
 *  try : marks a block that contains code which might throw error
 *  catch : marks a block that contains code which will be executed when an error is triggered
 *  finally: marks a block that contains code which will be executed regardless if an error was triggered or not
 */


// 4.1 Throwing built-in errors (new examples)
function parsePort(maybe) {
  const n = Number(maybe);
  if (!Number.isInteger(n) || n < 0 || n > 65535) {
    throw new RangeError("Port must be an integer in [0, 65535]");
  }
  console.log("Valid port:", n);
}
try {
  parsePort("8080");
  parsePort("99999"); // will throw
} catch (e) {
  console.log("Caught:", e.name, "-", e.message);
}

// function greetUser(name) {
//   if (typeof name !== "string") throw new TypeError("name must be a string");
//   console.log(`Hello, ${name}`);
// }
// try {
//   greetUser(42);
// } catch (e) {
//   console.log("Caught:", e.name, "-", e.message);
// }

// 4.2 Custom error (new example: InventoryError)
class InventoryError extends Error {
  constructor(message) {
    super(message);
    this.name = "InventoryError"; // is used by the Error.prototype.toString() method to create a string representation of the error.
  }
}
function sellItem(stock, qty) {
  if (qty > stock) throw new InventoryError("Not enough stock to fulfill the order");
  console.log("Sold:", qty, "Remaining:", stock - qty);
}
try {
  sellItem(5, 2);
  sellItem(3, 6); // will throw InventoryError
} catch (e) {
  if (e instanceof InventoryError) {
    console.log("InventoryError handled:", e.message);
  } else {
    console.log("Other error:", e.name);
  }
} finally {
  console.log("Inventory check complete (finally always runs)");
}


// "Task: Implement safeJSON(str) that returns null on SyntaxError but rethrows any other error."


// function safeJSON(str) {
//   try { return JSON.parse(str); }
//   catch (e) { if (e instanceof SyntaxError) { console.log("Bad JSON"); return null; } throw e; }
// }
// console.log("safeJSON good ->", safeJSON('{"a":1}'));    // { a: 1 }
// console.log("safeJSON bad  ->", safeJSON('{oops}'));     // null