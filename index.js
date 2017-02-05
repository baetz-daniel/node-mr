'use strict';

class nodeRM {
    _construct() {
        this._listener = [];
        this._modules = [];
    }

    /**
     * adds a new listener to the modules
     * @access public
     * @param {Array} required - the required modules
     * @param {Function} required - the callback function
     */
    listen(required, callback) {
        if(typeof required !== 'array'){
            required = [required];
        }
        if(typeof callback !== 'function'){
            throw 'the callback must be a function';
        }
        this._listener.push({
            required: required,
            callback: callback,
            called: false
        });
    }

    /**
     * adds a new listener to the modules
     * @access public
     * @param {String} required - the module name
     */
    add(module) {
        if(typeof this._modules[module] !== 'undefined') {
            throw 'module already exists';
        }
        this._modules[module] = true;

        for(let l in this._listener) {
            for(let rm in l.required) {
                if(typeof this._modules[rm] === 'undefined') {
                    return;
                }
            }
            l.callback();
        }
    }
}

class nodeRMManager {
    _construct() {
        this._instances = {};
    }

    /**
     * get a instance by name or create one
     * @access public
     * @param {String} required - the instance name
     * @returns {nodeRM} - returns an existing instance or creates a new one
     */
    get(name) {
        if(typeof this._instances[name] === 'undefined') {
            this._instances[name] = new nodeRM();
        }
        return this._instances[name];
    }

    /**
     * delete an existing instance
     * @access public
     * @param {String} required - the instance name
     */
    delete(name) {
        if(typeof this._instances[name] !== 'undefined') {
            delete this._instances[name];
        }
    }
}

module.exports = new nodeRMManager();
