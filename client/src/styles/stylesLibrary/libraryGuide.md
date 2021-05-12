# Style guide

### Description:

This library was written in `scss` using `emmet`-similar syntax.
This library has 2 files:
* main-styles.css - most commonly used element styles  (buttons, inputs)
* reset.css - file for resetting styles

### How to use:

First you need to import styles.
For example:

```javascript
    import '../stylesLibrary/css/main-styles.css';
```

Next you need to write any class from library in `HTML`.

For example creating an `input` with button `ok`:

```html
<form className="form-ok">
    <input className="inp-all inp-ok"/>
    <button className="all but-ok">Ок</button>
</form>
```
### Contain elements

* connected font
* buttons
* inputs
* containers
