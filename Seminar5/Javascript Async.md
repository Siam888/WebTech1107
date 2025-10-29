# JavaScript Event Loop & Asynchronous Execution

> **TL;DR**  
> JavaScript runs on a **single thread** with a **call stack**. Slow operations (timers, network, file I/O) are **offloaded** to the **host environment** — the browser’s Web APIs (which delegate to the **operating system**) or Node.js’s **libuv**/thread pool (also relying on the **OS**). The **event loop** keeps pulling completed work (callbacks) from **queues** and executing them when the **call stack** is empty.

---

## Why asynchronous execution exists
Blocking the single JS thread would freeze the UI (in browsers) or stall the process (in Node). Asynchrony lets the engine start work, return to other tasks, and handle results later.

---

## Offloading work (who does the waiting)
- **Browser environment (Web APIs):** `setTimeout`, `fetch`/XHR, DOM events, `WebSocket`, etc., are implemented by the browser and internally rely on **OS** facilities (network stack, timers, device drivers).  
- **Node.js environment (libuv):** timers, networking, DNS, and **filesystem I/O** are handled by **libuv**, which uses the **OS** and a **thread pool** to perform work without blocking the JS thread.

JavaScript itself doesn’t sit and wait; the host does. When operations finish, the host enqueues callbacks for JS to run later.

---

## Core pieces

- **Call Stack**  
  Where JavaScript executes functions **now**. Only one frame runs at a time.

- **Host APIs**  
  Browser Web APIs or Node/libuv that perform I/O and timers **outside** the JS stack.

- **Queues**  
  - **Task/Macrotask Queue:** callbacks from `setTimeout`, `setInterval`, message channel, I/O, UI events, etc.  
  - **Microtask Queue:** Promise reactions (`.then/.catch/.finally`), `queueMicrotask`, `MutationObserver` (browser).  
    - **Node.js note:** `process.nextTick` is drained **before** regular microtasks.

---

## Event loop algorithm (tick-by-tick)

1. **Check the call stack.**  
   If there’s anything on it, **execute until the stack is empty**.
2. When the stack is empty, **flush the entire microtask queue** (run all microtasks; microtasks queued while flushing are also run before moving on).
3. (Browser) Give the renderer a chance to paint.
4. **Pick the next task (macrotask)** from the task queue, **push its callback onto the call stack**, execute it, and repeat from step 1.

In other words: each tick, the loop checks whether code remains on the call stack and runs it to completion. If the stack is empty, it drains microtasks; if still idle, it takes a task from the task queue, executes it, and continues.

---

## Minimal examples

### Microtasks vs macrotasks
```js
console.log('1');
setTimeout(() => console.log('4 (task)'), 0);
Promise.resolve().then(() => console.log('3 (microtask)'));
console.log('2');
// Order: 1, 2, 3, 4
