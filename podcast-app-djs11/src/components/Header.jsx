import {Link} from 'react-router-dom' 
import microphone from '../images/microphone.png' 

export default function Header() {

        return (
            <header>
                <div className='header-left'>
                    <img src={microphone} alt='App Logo' className='logo' />
                    <span className='app-name'>Podpal</span>
                </div>
                <nav>
                    <ul className='navbar nav'>
                        <li>
                            <Link to='/favourites'>Favourites</Link>
                        </li>
                        <li>
                            <Link to='/genres'>Genres</Link>
                        </li>
                        <li>
                            <Link to='/about'>About</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
