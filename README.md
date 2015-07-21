# marionette-throttle

Throttle methods! This is commonly used to disable multiple clicks on a button. 
Each method which you want to throttle should return a promise. Every time a 
method is invoked, an event is dispatched.  

## Usage

Define a view as follows:
```js
var Marionette = require('marionette'),
    throttleBehavior = require('marionette-throttle');

return Marionette.ItemView.extend({
    behaviors: {
        throttle: {
            behaviorClass: throttleBehavior
            methods: ['save']
        }
    },
    events: {
        // Method name inside event string.
        throttle:save:enabled: 'enableSomeCssStuff',
        throttle:save:disabled: 'disableSomeCssStuff',
          
        // Method name as an argument.
        throttle:enabled: function (methodeName) {},
        throttle:disabled: function (methodeName) {}
    },
    // This function will be wrapped because its name is present in
    // the behavor `methods` config.
    save: function (e) {
        e.preventDefault();
 
        return this.view.model.save();
    }
})

```

# Changelog

## 0.0.2
- Added check to use triggerMethod only if view is not yet destroyed.
