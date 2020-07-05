# body scroll lock
```javascript
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

const shareContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!shareContainerRef.current) {
      return;
    }
    disableBodyScroll(shareContainerRef.current);
    return () => {
      clearAllBodyScrollLocks();
    };
  }, []);
```