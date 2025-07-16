import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Review from '../types/Review';
import PaginationMeta from '../types/PaginationMeta';

const HomePage = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [pagination, setPagination] = useState<PaginationMeta>({
        page: 1,
        pageSize: 10,
        pageCount: 1,
        total: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchReviews = async (page: number = 1) => {
        const response = await fetch(`http://localhost:1337/api/reviews?pagination[page]=${page}&pagination[pageSize]=10&pagination[withCount]=true&populate=*`);
        if (!response.ok) {
            throw new Error('Failed to fetch reviews');
        }
        const result = await response.json();
        setReviews(result.data);
        setPagination(result.meta.pagination);
        setLoading(false);
    };

    useEffect(() => {
        fetchReviews(pagination.page)
            .then(() => {
                console.log('Reviews loaded successfully');
            })
            .catch((err) => {
                setError(err instanceof Error ? err.message : 'An error occurred');
                setLoading(false);
            });
    }, []);

    const handlePageChange = (newPage: number) => {
        setLoading(true);
        setError(null);
        fetchReviews(newPage)
            .then(() => {
                console.log(`Page ${newPage} loaded successfully`);
            })
            .catch((err) => {
                setError(err instanceof Error ? err.message : 'An error occurred');
                setLoading(false);
            });
    };

    if (loading) {
        return (
            <div style={{padding: '20px', maxWidth: '800px', margin: '0 auto'}}>
                <h2>Reviews</h2>
                <p>Loading reviews...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{padding: '20px', maxWidth: '800px', margin: '0 auto'}}>
                <h2>Reviews</h2>
                <p style={{color: 'red'}}>Error: {error}</p>
            </div>
        );
    }

    return (
        <div>
            <div style={{padding: '20px', maxWidth: '800px', margin: '0 auto'}}>
                <h2>Reviews</h2>
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    marginTop: '20px'
                }}>
                    <thead>
                    <tr style={{backgroundColor: '#f5f5f5'}}>
                        <th style={{
                            padding: '12px',
                            textAlign: 'left',
                            borderBottom: '2px solid #ddd',
                            fontWeight: 'bold'
                        }}>Title
                        </th>
                        <th style={{
                            padding: '12px',
                            textAlign: 'left',
                            borderBottom: '2px solid #ddd',
                            fontWeight: 'bold'
                        }}>Author
                        </th>
                        <th style={{
                            padding: '12px',
                            textAlign: 'center',
                            borderBottom: '2px solid #ddd',
                            fontWeight: 'bold'
                        }}>Action
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {reviews.map(review => (
                        <tr key={review.documentId} style={{borderBottom: '1px solid #eee'}}>
                            <td style={{padding: '12px'}}>{review.title}</td>
                            <td style={{padding: '12px'}}>{review.author?.name ?? "Anonymous"}</td>
                            <td style={{padding: '12px', textAlign: 'center'}}>
                                <Link
                                    to={`/review/${review.documentId}`}
                                    style={{
                                        backgroundColor: '#007bff',
                                        color: 'white',
                                        padding: '6px 12px',
                                        textDecoration: 'none',
                                        borderRadius: '4px',
                                        fontSize: '14px'
                                    }}
                                >
                                    View Details
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                <div style={{
                    marginTop: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <button
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page <= 1}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: pagination.page <= 1 ? '#f5f5f5' : '#007bff',
                            color: pagination.page <= 1 ? '#999' : 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: pagination.page <= 1 ? 'not-allowed' : 'pointer'
                        }}
                    >
                        Previous
                    </button>

                    <span style={{ fontSize: '14px', color: '#666' }}>
                        Page {pagination.page} of {pagination.pageCount} ({pagination.total} total reviews)
                    </span>

                    <button
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page >= pagination.pageCount}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: pagination.page >= pagination.pageCount ? '#f5f5f5' : '#007bff',
                            color: pagination.page >= pagination.pageCount ? '#999' : 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: pagination.page >= pagination.pageCount ? 'not-allowed' : 'pointer'
                        }}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HomePage;