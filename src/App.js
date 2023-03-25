import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Add from './pages/Add';
import Edit from './pages/Edit';
import Home from './pages/Home';

function App() {
  return (
    <div>
      <Router>
        <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<Add />} />
              <Route path="/edit/:id" element={<Edit />} />
            </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
