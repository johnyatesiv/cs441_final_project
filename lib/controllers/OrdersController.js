const Model = require("../models/Orders");
const OrderItemModel = require("../models/OrderItems");
const Util = require("./Util");
const Q = require("q");

/** Globals **/
const PENDING_STATE = "pending";
const FULFILLED_STATE = "fulfilled";

/**
 *
 * @type {{Model: *}}
 */
const OrdersController = {
    Model: Model
};

/**
 * createOrder
 * @param order
 */
OrdersController.createOrder = function(order) {
    const deferred = Q.defer();

    order.state = PENDING_STATE;

    Util.create(this.Model, order).then(result => {
        for(var item in order.items) {
            for(var i=0; i < order.items[item].quantity; i++) {
                Util.create(OrderItemModel, {orderId: result.id, itemId: order.items[item].id});
            }
        }

        deferred.resolve(order);
    }).catch(err => {
        deferred.reject(err);
    });

    return deferred.promise;
};

/**
 * updateOrder
 * @param id
 * @param update
 */
OrdersController.updateOrder = function(id, update) {
    return Util.update(this.Model, id, update)
};

/**
 * deleteUser
 * @param id
 * @returns {*}
 */
OrdersController.deleteorder = function(id) {
    return Util.delete(this.Model, id);
};

/**
 * getUser
 * @param id
 * @returns {*}
 */
OrdersController.getOrder = function(id) {
    return Util.findById(this.Model, id);
};

/**
 * getOrders
 * @param query
 * @returns {*}
 */
OrdersController.getOrders = function(query) {
    return Util.find(this.Model, query, [['createdAt', 'DESC']]);
};

/**
 * getPendingOrders
 * @param id
 * @returns {*}
 */
OrdersController.getPendingOrders = function(id) {
    return this.getOrders(id, {state: "pending"});
};

/**
 * getFulfilledOrders
 * @param id
 * @returns {*}
 */
OrdersController.getFulfilledOrders = function(id) {
    return this.getOrders(id, {state: "fulfilled"});
};

module.exports = OrdersController;