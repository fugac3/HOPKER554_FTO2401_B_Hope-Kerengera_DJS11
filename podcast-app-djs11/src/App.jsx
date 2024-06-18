import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';



export default function App() {

    return (
        <BrowserRouter>
            <Header />
            <main className='contentAreaApp'>
            <Routes>
                <Route path='/' element={<HomePage />} />

            </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    )
}

