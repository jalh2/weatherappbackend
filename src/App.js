import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Student from './pages/Student'
import Tutor from './pages/Tutor'
import Status from './pages/Status'
import Admin from './pages/Admin'
import ControlPanel from './pages/ControlPanel'
import TutorManagement from './pages/TutorManagement'
import FundsManagement from './pages/FundsManagement'
import ManualDisbursement from './pages/ManualDisbursement'
import PopupLoading from './components/Popuploading'
import ResultsPage from './pages/ResultsPage'
import Layout from './components/Layout'
import Layout2 from './components/Layout2'
import PrivacyPolicy from './pages/privacypolicy'
import DeleteAccount from './pages/deleteaccount'

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      
      <div className="pages">
        <Routes>
        <Route element={<Layout />}>
        <Route 
            path="/Admin" 
            element={<Admin />} 
          />
          <Route 
            path="/" 
            element={<Home />} 
          />
           <Route 
            path="/Status" 
            element={<Status />} 
          />
           <Route 
            path="/privacypolicy" 
            element={<PrivacyPolicy />} 
          />
           <Route 
            path="/deleteaccount" 
            element={<DeleteAccount />} 
          />
          </Route>
          <Route element={<Layout2 />}>
          <Route 
            path="/Student" 
            element={<Student />} 
          />
          <Route 
            path="/Tutor" 
            element={<Tutor />} 
          />
           <Route 
            path="/ControlPanel" 
            element={<ControlPanel />} 
          />
           <Route 
            path="/TutorManagement" 
            element={<TutorManagement />} 
          />
           <Route 
            path="/FundsManagement" 
            element={<FundsManagement />} 
          />
           <Route 
            path="/ManualDisbursement" 
            element={<ManualDisbursement />} 
          />
           <Route 
            path="/popup" 
            element={<PopupLoading />} 
          />
           <Route 
              path="/ResultsPage/:expertise" 
              element={<ResultsPage />} 
            />
          </Route>
          
        </Routes>
      </div>

    </BrowserRouter>
  </div>
  );
}

export default App;
