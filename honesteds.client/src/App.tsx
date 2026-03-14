import { useEffect } from 'react';
import './App.css';
import Nav from "./components/Nav"
import Featured from "./components/Featured"
import Grid from "./components/Grid"
import Footer from "./components/Footer"

function App() {

    useEffect(() => {
    }, []);

    // const header = (

    // );


    //https://github.com/reactjs/react.dev/blob/main/src/components/Layout/TopNav/TopNav.tsx
    return (
        <>
            <Nav></Nav>
            <Featured></Featured>
            <Grid></Grid>
            <Footer></Footer>
        </>
        
    );
}

export default App;