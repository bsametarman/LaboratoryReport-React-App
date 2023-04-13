import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ReportList from './pages/ReportList';
import Layout from './layouts/Layout';
import Navi from './layouts/Navi';
import ReportDetails from './pages/ReportDetails';
import UpdateReport from './pages/UpdateReport';
import AddReport from './pages/AddReport';
import LaborantList from './pages/LaborantList';
import LaborantDetails from './pages/LaborantDetails';

function App() {
  return (
    <BrowserRouter>
    <Navi />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route exact path='/home' element={<Home />} />
            <Route exact path='/reports' element={<ReportList />} />
            <Route exact path='/reportdetails/:reportId' element={<ReportDetails />} />
            <Route exact path='/updatereport/:reportId' element={<UpdateReport />} />
            <Route exact path='/addreport' element={<AddReport />} />
            <Route exact path='/laborants' element={<LaborantList />} />
            <Route exact path='/laborantdetails/:laborantId' element={<LaborantDetails />} />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
