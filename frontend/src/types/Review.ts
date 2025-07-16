import Author from './Author';

export default interface Review {
    id: number;
    documentId: string;
    title: string;
    rating: number;
    body: any[];
    author?: Author;
}