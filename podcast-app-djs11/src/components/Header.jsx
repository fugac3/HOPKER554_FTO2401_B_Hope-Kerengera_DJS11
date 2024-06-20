import {Link} from 'react-router-dom' 
import microphone from '../images/microphone.png' 

export default function Header() {

        return (
            <header>
                <div className='header-left'>
                <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}> {/* Link to the home page */}
                    <img src={microphone} alt='App Logo' className='logo' />
                    <span className='app-name'>Podpal</span>
                </Link>
                </div>
                <nav>
                    <ul className='navbar nav fw-bold'>
                        <li>
                            <Link to='/favourites'>Favourites</Link>
                        </li>
                        <li>
                            <Link to='/genres'>Genres</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
