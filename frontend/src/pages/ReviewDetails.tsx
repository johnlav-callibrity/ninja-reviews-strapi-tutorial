import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Review from '../types/Review';

const ReviewDetails = () => {
    const {documentId} = useParams<{ documentId: string }>();
    const [review, setReview] = useState<Review | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReview = async () => {
            const response = await fetch(`http://localhost:1337/api/reviews/${documentId}?populate=author`);
            if (!response.ok) {
                throw new Error('Failed to fetch review');
            }
            const json = await response.json();
            setReview(json.data);
            setLoading(false);
        };

        if (documentId) {
            fetchReview()
                .then(() => {
                    console.log('Review loaded successfully');
                })
                .catch((err) => {
                    setError(err instanceof Error ? err.message : 'An error occurred');
                    setLoading(false);
                });
        }
    }, [documentId]);

    if (loading) {
        return (
            <div style={{padding: '20px', maxWidth: '800px', margin: '0 auto'}}>
                <p>Loading review...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{padding: '20px', maxWidth: '800px', margin: '0 auto'}}>
                <p style={{color: 'red'}}>Error: {error}</p>
            </div>
        );
    }

    if (!review) {
        return (
            <div style={{padding: '20px', maxWidth: '800px', margin: '0 auto'}}>
                <p>Review not found</p>
            </div>
        );
    }

    const renderStars = (rating: number) => {
        return '★'.repeat(rating) + '☆'.repeat(10 - rating);
    };

    const renderBody = (body: any[]) => {
        return body.map((block, index) => {
            switch (block.type) {
                case 'paragraph':
                    return (
                        <p key={index} style={{marginBottom: '16px', lineHeight: '1.6'}}>
                            {block.children.map((child: any, _childIndex: number) => child.text).join('')}
                        </p>
                    );
                case 'heading':
                    return (
                        <h3 key={index} style={{marginBottom: '12px', marginTop: '24px'}}>
                            {block.children.map((child: any, _childIndex: number) => child.text).join('')}
                        </h3>
                    );
                default:
                    return (
                        <div key={index} style={{marginBottom: '16px'}}>
                            {JSON.stringify(block)}
                        </div>
                    );
            }
        });
    };

    return (
        <div style={{padding: '20px', maxWidth: '800px', margin: '0 auto'}}>
            <h1 style={{marginBottom: '16px'}}>{review.title}</h1>
            <div style={{
                marginBottom: '24px',
                padding: '12px',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
            }}>
                <span style={{fontSize: '18px', fontWeight: 'bold'}}>Rating:</span>
                <span style={{fontSize: '20px', color: '#ffc107'}}>{renderStars(review.rating)}</span>
                <span style={{fontSize: '16px', color: '#666'}}>({review.rating}/10)</span>
            </div>
            <div style={{lineHeight: '1.6'}}>
                {renderBody(review.body)}
            </div>
        </div>
    );
}

export default ReviewDetails;