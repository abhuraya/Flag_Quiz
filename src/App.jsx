import { Outlet } from 'react-router-dom';
import AccountMenu from './components/Nav';
import "./App.css";

function App() {

  return (
    <>
    <AccountMenu />
    <Outlet />
    </>
  )
}

export default App
