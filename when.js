var when = (function () {
    var callbacks = [],
        whenObjects = [];
    
    return function (object, callback) {
        //if the variable already exists then we should just run the function
        if (window[object] !== undefined) {
            callback();
        } else {
            callbacks[object] = callbacks[object] || [];
            callbacks[object].push(callback);

            if (!window.hasOwnProperty(object)) {
                //put a getter and setter on the window object
                Object.defineProperty(window, object, {
                    get: function () {
                        return whenObjects[object];
                    },
                    set: function (variable) {
                        whenObjects[object] = variable;
                        //call all functions 
                        var numCallbacks = callbacks[object].length;
                        for (var i = 0; i < numCallbacks; i++) {
                            callbacks[object][i].call(this);
                        }
                        //after all of the callbacks have been run it will remove all of the callbacks so that
                        //we can free up some memory
                        callbacks[object] = null;
                    }
                });
            }
        }
    }
})();