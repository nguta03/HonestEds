import Nav from "../components/Nav"
import Footer from "../components/Footer"
import type { Review } from '../interfaces/Review';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



export default function ReviewPage() {

    const [review, setReview] = useState<Review | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const { id } = useParams<{ id: string }>();
        useEffect(() => {
            if (!id) return;
        const controller = new AbortController();
        setLoading(true);
        setError(null);

        getReview(Number(id), controller.signal)
        .then(setReview)
        .catch(err => {
            if (err instanceof Error && err.name !== 'AbortError') setError(err);
        })
        .finally(() => {
            if (!controller.signal.aborted) setLoading(false);
        });

        return () => controller.abort();
    }, [id]);
    
    if(loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>;
    if (!review) return <p>Review not found.</p>;
    return (
        <>
            <Nav></Nav>
            

        
            <Footer></Footer>
        </>
    );

    async function getReview( id : Number,
    signal?: AbortSignal){

        const response = await fetch('/api/review/' + id, {signal});
        if (response.status === 404) return null;
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        return await response.json();
      
    }
}