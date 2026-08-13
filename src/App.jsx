import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import GridView from './pages/GridView.jsx'
import ListView from './pages/ListView.jsx'
import OfferDetail from './pages/OfferDetail.jsx'
import Form from './pages/Form.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offres" element={<GridView />} />
        <Route path="/offres/liste" element={<ListView />} />
        <Route path="/offre/:id" element={<OfferDetail />} />
        <Route path="/formulaire" element={<Form />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
