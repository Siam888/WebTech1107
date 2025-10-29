/* Callbacks
 - A callback is function passed as an argument to another function and is executed after the completion of that function
*/

function fetchData(callback) {
    setTimeout(() => {
        console.log("Data fetched")
        callback()
    })
}

function processData() {
    console.log("Data processed")
}

fetchData(processData);


// Drawbacks of callbacks
// Callback Hell - when the callbacks are nested the code can become difficult to read and maintain
// Error Handling - Error handling is fragile: exceptions thrown inside async callbacks don’t propagate to your surrounding try/catch; you must manually route errors through callback parameters.

// --- Fake async APIs (error-first callbacks) ---
function getUser(id, cb) {
    setTimeout(() => {
        console.log('[getUser] fetched user');
        cb(null, { id, name: 'Ana' });
    }, 200);
}

function getOrders(userId, cb) {
    setTimeout(() => {
        console.log('[getOrders] fetched orders');
        cb(null, [{ id: 'o1' }, { id: 'o2' }]);
    }, 150);
}

function getInvoice(order, cb) {
    setTimeout(() => {
        console.log('[getInvoice] fetched invoice');
        cb(null, { orderId: order.id, total: 42.5, currency: 'EUR' });
    }, 100);
}
const id = 123;

getUser(id, (err, user) => {
    if (err) return finalCb(err);
    console.log('User:', user);

    getOrders(user.id, (err, orders) => {
        if (err) return finalCb(err);
        console.log('Orders:', orders);

        getInvoice(orders[0], (err, invoice) => {
            if (err) return finalCb(err);
            console.log('Invoice:', invoice);

            finalCb(null, { user, invoice });
        });
    });
});

function finalCb(err, result) {
    if (err) {
        console.error('Failed:', err);
    } else {
        console.log('OK:', result);
    }
}

