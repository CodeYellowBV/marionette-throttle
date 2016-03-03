# marionette-throttle

Throttle methods! This is commonly used to disable multiple clicks on a button.
Each method which you want to throttle should return a promise. Every time a
method is invoked, an event is dispatched.

```
$ npm install marionette-throttle --save
```

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

Normally you will only have 1 button which triggers an action:

```
    events: {
        'click @ui.saveButton': 'save'
    },
    save: function (e) {
        // Some save action.
    }
```

If you also want to programmatically call the `save` action (e.g. `this.save()`), then it is recommended to split the save into two functions. This way you can throttle `saveByEvent` and use the `save` function programmatically without being throttled.

```
    events: {
        'click @ui.saveButton': 'saveByEvent'
    },
    saveByEvent: function () {
        this.save();
    },
    save: function () {
        // Some save action.
    }
```


# Changelog

## 0.1.2
- Fix bug in passing through arguments.

## 0.1.1
- Unify enable / disable code.

## 0.1.0
- Backbone & marionette aren't included in the dist anymore.
- Add support for form submit.
- Call preventDefault by default.

## 0.0.5
- Typo.

## 0.0.4
- Typo.

## 0.0.3
- Add option `className` which defaults to  `throttled`. You can use this for styling.
- Upgraded build tools.

## 0.0.2
- Added check to use triggerMethod only if view is not yet destroyed.
