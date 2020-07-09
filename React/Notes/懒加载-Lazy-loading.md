# Lazy loading

## 懒加载库
```javascript
const savePhotoHandler = async () => {
    // lazy loading this node module
    try {
      const HTML2Canvas = await import('html2canvas');

      if (!savePhotoRef.current) {
        return;
      }
      HTML2Canvas.default(savePhotoRef.current).then((canvas) => {
        // get data url
        const date = new Date();
        const downloadName = `share-food-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}--${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
        const type = 'png';
        const quality = 1.0;
        const dataURL = canvas.toDataURL(type, quality);

        // save as a file
        const a = document.createElement('a');
        a.href = dataURL;
        a.download = downloadName;
        a.click();
      });

      anime({
        targets: [saveMessageRef.current],
        opacity: [0, 1, 0],
        easing: 'easeInOutSine',
        duration: 2000,
      });
    } catch (error) {
      console.error(error);
    }
  };
```

## 懒加载Component

## 懒加载Route
