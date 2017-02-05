'use strict';

class nodeRM {
    _construct() {
        this._listener = [];
        this._modules = {};
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
            callback: callback
        });
    }

    /**
     * adds a new listener to the modules
     * @access public
     * @param {String} required - the module name
     * @param {Object} required - the module exports
     */
    add(name, exports) {
        if(typeof this._modules[name] !== 'undefined') {
            throw 'module already exists';
        }
        this._modules[name] = exports;

        let index = this._listener.length;
        while(index--)
        {
            let modules = {};
            let rs = true;
            for(let rm in this._listener[index].required) {
                let mn = this._listener[index].required[rm];
                if(typeof this._modules[mn] === 'undefined') {
                    rs = false;
                    break;
                }
                modules[mn] = this._modules[mn];
            }
            if(rs) {
                let l = this._listener[index];
                this._listener.splice(i, 1);
                l.callback(modules);
            }
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
