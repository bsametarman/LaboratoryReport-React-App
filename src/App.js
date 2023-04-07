import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ReportList from './pages/ReportList';
import Layout from './layouts/Layout';
import Navi from './layouts/Navi';

function App() {
  return (
    <BrowserRouter>
    <Navi />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route exact path='/home' element={<Home />} />
            <Route exact path='/reports' element={<ReportList />} />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
