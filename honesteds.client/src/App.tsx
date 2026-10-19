import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import Reviews from './pages/Reviews';

function App() {

    useEffect(() => {
    }, []);


    //https://github.com/reactjs/react.dev/blob/main/src/components/Layout/TopNav/TopNav.tsx
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/reviews" element={<Reviews />} />
            </Routes>
        </BrowserRouter>
        
    );
}

export default App;