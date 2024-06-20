import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ShowPage from './pages/ShowPage';



export default function App() {

    return (
        <BrowserRouter>
            <Header />
            <main className='contentAreaApp'>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/show/:id' element={<ShowPage />} />
                 {/*path to different shows. write /show/ then id is the id of the show*/}
            </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    )
}

