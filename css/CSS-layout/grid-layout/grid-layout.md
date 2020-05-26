# A Complete Guide to Grid

https://css-tricks.com/snippets/css/complete-guide-grid/

## Important Terminology

### Grid Container
The element on which **display: grid** is applied. 

It’s the direct parent of all the grid items. 

In this example container is the grid container.

```html
<div class="container">
  <div class="item item-1"> </div>
  <div class="item item-2"> </div>
  <div class="item item-3"> </div>
</div>
```

### Grid Item
The children (i.e. direct descendants) of the grid container. Here the item elements are grid items, but sub-item isn’t.

```html
<div class="container">
  <div class="item"> </div>
  <div class="item">
    <p class="sub-item"> </p>
  </div>
  <div class="item"> </div>
</div>
```

### Grid Line
The dividing lines that make up the structure of the grid. 

They can be either vertical (“column grid lines”) or horizontal (“row grid lines”) and reside on either side of a row or column. 

Here the yellow line is an example of a column grid line.

![alt text](./images/grid-line.png)

### Grid Cell
The space between two adjacent row and two adjacent column grid lines. It’s a single “unit” of the grid.

![alt text](./images/grid-cell.png)

### Grid Track
**The space between two adjacent grid lines**. You can think of them like the columns or rows of the grid. 

Here’s the grid track between the second and third row grid lines.

![alt text](./images/grid-track.png)

### Grid Area
The total space surrounded by four grid lines.

![alt text](./images/grid-area.png)

## The most powerful lines in Grid
![alt text](./images/powerful-grid.png)

## Grid Properties Table of Content
![alt text](./images/grid-properties-table.png)

### Properties for the Parent (Grid Container)

#### display
- grid – The element behaves like a **block element** and lays out its content according to the grid model.
- inline-grid – The element behaves like an **inline element** and lays out its content according to the grid model.

```css
.container {
  display: grid | inline-grid;
}
```

#### grid-template-columns & grid-template-rows
Defines the columns and rows of the grid with a space-separated list of values. 

The values represent the track size, and the space between them represents the grid line.


```css
.container {
  grid-template-columns: 40px 50px auto 50px 40px;
  grid-template-rows: 25% 100px auto;
}

```
When you leave an empty space between the track values, the grid lines are automatically assigned positive and negative numbers:

![alt text](./images/grid-template-col-row.png)

But you can choose to explicitly name the lines. Note the bracket syntax for the line names:

```css
.container {
  grid-template-columns: [first] 40px [line2] 50px [line3] auto [col4-start] 50px [five] 40px [end];
  grid-template-rows: [row1-start] 25% [row1-end] 100px [third-line] auto [last-line];
}
```

![alt text](./images/list-name.png)


The **fr unit** allows you to set the size of a track as a fraction of the free space of the grid container. For example, this will set each item to one third the width of the grid container:

```css
.container {
  grid-template-columns: 1fr 50px 1fr 1fr;
}
```

### grid-template-areas

he grid-template-areas CSS property specifies named grid areas.

```css
.item-a {
  grid-area: header;
}
.item-b {
  grid-area: main;
}
.item-c {
  grid-area: sidebar;
}
.item-d {
  grid-area: footer;
}

.container {
  display: grid;
  grid-template-columns: 50px 50px 50px 50px;
  grid-template-rows: auto;
  grid-template-areas: 
    "header header header header"
    "main main . sidebar"
    "footer footer footer footer";
}
```

![alt text](./images/grid-template-area2.png)


![alt text](./images/gird-template-areas.png)


### grid-template
A **shorthand** for setting grid-template-rows, grid-template-columns, and grid-template-areas in a single declaration.

### gap
- column-gap;
- row-gap;
- grid-column-gap;
- grid-row-gap


```css
.container {
  /* standard */
  column-gap: <line-size>;
  row-gap: <line-size>;

  /* old */
  grid-column-gap: <line-size>;
  grid-row-gap: <line-size>;
}
```

Example:
```css
.container {
  grid-template-columns: 100px 50px 100px;
  grid-template-rows: 80px auto 80px; 
  column-gap: 10px;
  row-gap: 15px;
}
```

![alt text](./images/gap.png)

### gap & grid-gap

A **shorthand** for row-gap and column-gap.

```css
.container {
  /* standard */
  gap: <grid-row-gap> <grid-column-gap>;

  /* old */
  grid-gap: <grid-row-gap> <grid-column-gap>;
}
```

### justify-items
The CSS justify-items property defines the **default justify-self for all items** of the box, giving them all a default way of justifying each box along the appropriate axis.

- start
- end
- center
- stretch

#### start
```css
.container {
  justify-items: start;
}
```
![alt text](./images/justify-items-start.png)

#### end
![alt text](./images/justify-items-end.png)

#### center

![alt text](./images/justify-items-center.png)

#### stretch
![alt text](./images/justify-items-stretch.png)


### align-items
Aligns grid items along the block (column) axis.

![alt text](./images/align-items.png)


### justify-content
Sometimes the total size of your grid might be less than the size of its grid container. 

- start
- end
- center
- stretch
- space-around
- space-between
- space-evenly

![alt text](./images/justify-content-start-end.png)

![alt text](./images/justify-content-space-evenly.png)

### align-content
Sometimes the total size of your grid might be less than the size of its grid container. 

This property aligns the grid along the block (column) axis (as opposed to justify-content which aligns the grid along the inline (row) axis).

- start
- end
- center
- stretch
- space-around
- space-between
- space-evenly


### grid-auto-colomns & grid-auto-rows
The grid-auto-columns CSS property specifies the size of **an implicitly-created grid column track** or pattern of tracks.
