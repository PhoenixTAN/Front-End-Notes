# Realtime Clock

```javascript
import { useEffect, useState } from "react";

const getRealtime = () => {
  const date = new Date();
  console.log(date);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getUTCDay();
  const hour = date.getHours();
  const minute =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const second =
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
  return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
};

export default function App() {
  const [currentTime, setCurrentTime] = useState(getRealtime());

  useEffect(() => {
    const timerId = setTimeout(() => {
      setCurrentTime(getRealtime());
    }, 1000);
    return () => clearTimeout(timerId);
  }, [currentTime]);

  console.log("render");

  return (
    <div className="App">
      <h1>Realtime clock</h1>
      <div>{currentTime}</div>
    </div>
  );
}

```
