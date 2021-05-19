# useContext

https://codesandbox.io/s/crazy-easley-2nutm?file=/src/App.tsx:0-1503

```ts
import React, { useContext, useState } from "react";
import "./styles.css";

type themeType = {
  foreground: string;
  background: string;
};

type themesType = { [key: string]: themeType };

const themes: themesType = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.dark);

const ThemeButton = () => {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme Context.Provider!
    </button>
  );
};

const App = () => {
  const [theme, setTheme] = useState<themeType>(themes.light);

  const handleChangeTheme = () => {
    if (theme === themes.light) {
      setTheme(themes.dark);
    } else {
      setTheme(themes.light);
    }
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <ThemeContext.Provider value={theme}>
        <ThemeButton />
      </ThemeContext.Provider>
      <button onClick={handleChangeTheme}>change theme</button>

      <ThemeContext.Consumer>
        {(value) => {
          console.log(value);
          return (
            <button
              style={{ background: value.background, color: value.foreground }}
            >
              I am styled by theme Context.Consumer!
            </button>
          );
        }}
      </ThemeContext.Consumer>
    </div>
  );
};

export default App;

```
