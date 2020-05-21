# Beginner's guide to media queries

https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Media_queries

## Introduction: why media query?
The CSS Media Query **gives you a way to apply CSS only when the browser and device environment matches a rule that you specify**, for example **"viewport is wider than 480 pixels"**. Media queries are a key part of responsive web design, as they allow you to create different layouts depending on the size of the viewport, but they can also be used to detect other things about the environment your site is running on, for example **whether the user is using a touchscreen rather than a mouse**.

## Basics

```css
@media media-type and (media-feature-rule) {
    /* CSS rules go here */
}
```

It consists of:

- A media type, which tells the browser what kind of media this code is for **(e.g. print, or screen)**.
- A media expression, which is a **rule**, or test that must be passed for the contained CSS to be applied.
- A set of CSS rules that will be applied if the test passes and the media type is correct.

### Media types
- all
- print
- screen
- speech

The following media query will only set the body to 12pt if the page is printed. It will not apply when the page is loaded in a browser.

```css
@media print {
    body {
        font-size: 12pt;
    }
}
```

### Media feature rules
After specifying the type, you can then target a media feature with a rule.

#### Width and height
we can apply CSS if the viewport is above or below a certain width — or an exact width — using the min-width, max-width, and width media features.

For example, to change the body text color to red if the viewport is **exactly 600 pixels**, you would use the following media query.

```css
@media screen and (width: 600px) {
    body {
        color: red;
    }
}
```

For example, to make the color blue if the viewport is **narrower than 400 pixels**, use max-width:

```css
@media screen and (max-width: 400px) {
    body {
        color: blue;
    }
}
```

