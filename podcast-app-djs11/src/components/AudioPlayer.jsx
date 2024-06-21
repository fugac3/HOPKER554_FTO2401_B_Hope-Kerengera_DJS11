import { useState, useEffect} from 'react';

export default function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const handleBeforeUnload = (e) => {//function to handle beforeunload event if user is playing audio and wants to close the window
            if (isPlaying) {
                e.preventDefault();
                e.returnValue = 'You have an audio playing. Do you really want to close?';
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isPlaying]);

    const resetListeningHistory = () => { //function to reset the listening history
        localStorage.removeItem('listenedEpisodes');
        alert('Listening history has been reset.');
    };

    return (
            <div>
                <button onClick={resetListeningHistory}>Reset Progress</button>
            </div>
    );
}
