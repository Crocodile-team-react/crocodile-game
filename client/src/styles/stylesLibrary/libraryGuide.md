#Style guide

###Description:

This library was written in `scss` using `emmet`-similar syntax.
Has a precompiled form in the `./css/...` directory,
and source code in the `./scss/...` directory.

It is recommended to use the ***precompiled*** version for faster execution.

###How to use:

You just need to write any class from library in `HTML`.

For example:

```html
<div className="df fw-w jc-sa">
    <div className="element"></div>
    <div className="element fg-2"></div>
    <div className="element"></div>
    <div className="element"></div>
    <div className="element"></div>
</div>
```

There is a parent block `div` with 5 children blocks `div`.
Parent block has some classes from library that represents next `css` code:
* df - `display: flex`
* fw-w - `flex-wrap: wrap`
* jc-sa - `justify-content: space-around`

Second children block `div` has `css` property `flex-grow` with value `2`.