import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from 'styled-components'
import {COLORS} from "./Assets/Variables/colorsVariables";
import ChatBoxContainer from "./Containers/ChatBoxContainer";

function App() {
    const theme = {
        colors: COLORS
    }
  return (
      <ThemeProvider theme={theme}>
    <div className="App">
      <ChatBoxContainer />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
      </ThemeProvider>
  );
}

export default App;
