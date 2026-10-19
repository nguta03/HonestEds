import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import Restaurants from './pages/Restaurants';
import GolfCourses from './pages/GolfCourses';

function App() {

    useEffect(() => {
    }, []);


    //https://github.com/reactjs/react.dev/blob/main/src/components/Layout/TopNav/TopNav.tsx
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/restaurants" element={<Restaurants />} />
                <Route path="/golf-courses" element={<GolfCourses />} />
            </Routes>
        </BrowserRouter>
        
    );
}

export default App;