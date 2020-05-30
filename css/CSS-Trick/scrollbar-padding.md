```css

.top-right-popup-content {
    width: 340px;
    height: 468px;  
    overflow-y: scroll;
}
.top-right-popup-content::-webkit-scrollbar {
    width: 14px;
}   

.top-right-popup-content::-webkit-scrollbar-thumb {
    border: 4px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
    border-radius: 7px;
    background-color: rgba(0, 0, 0, 0.15);
    /*
    For anyone wondering, 
    the magic here is background-clip: padding-box 
    which causes the border of the element to be cut off 
    (along with the background color under it), 
    so by setting the border to a fully transparent color 
    it will cause a padding effect matching the border's width. 
    Without that rule the background color would be visible through the border.
    */
}
```