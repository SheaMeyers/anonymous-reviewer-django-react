import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import StarIcon from '@material-ui/icons/Star';
import '../static/css/ReviewList.css';


const useStyles = makeStyles({
    card: {
        margin: 20,
        width: 500,
        overflow: 'visible',
        ['@media (max-width: 550px)']: { // eslint-disable-line no-useless-computed-key
            minWidth: '90%'
        }
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    innerCard: {
        margin: 0,
        width: '100%',
    },
    star: {
        color: '#ffff00',
        fontSize: '50px',
        cursor: 'pointer',
        stroke: 'black',
    },
    starOutline: {
        color: '#ffffff',
        fontSize: '50px',
        cursor: 'pointer',
        stroke: 'black',
    },
});


interface ReviewListProps {
    id: string;
    rating: number;
}


const ReviewList = (props: ReviewListProps) => {

    const classes = useStyles();
    const [page, setPage] = useState<number>(1);
    const [listItems, setListItems] = useState<any[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(false);

    const handleScroll = () => {
        if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
            setIsFetching(true);
        }
    }

    const fetchMoreListItems = () => {
        axios.get(`http://localhost:8000/backend/get-reviews/${props.id}/?page=${page}`, {
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(result => {
            setListItems(listItems.concat(result.data['reviews']));
            setPage(page+1);
            setIsFetching(false);
          }).catch(error => console.log('error'));
    }

    useEffect(() => {
        fetchMoreListItems();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!isFetching) return;
        fetchMoreListItems();
    }, [isFetching]);

    return (
        <div className="Review-List">
            {
                listItems.filter(review => review.rating === props.rating || props.rating === 0).map(review => {
                    return (
                        <Card key={review.id} className={classes.card}>
                            <CardContent className={classes.cardContent}>
                                <div className="Review-List--top-portion">
                                    <div>
                                        <p className="Review-List--Title-Header">Date of Review</p>
                                        <p style={{'marginTop': 40}}>{new Date(review.created_datetime).toLocaleString()}</p>
                                    </div>
                                    <div className="Review-List--Star-Portion">
                                        <p className="Review-List--Title-Header">Star Rating</p>
                                        <div>
                                            <StarIcon className={review.rating >= 1 ? classes.star : classes.starOutline} />
                                            <StarIcon className={review.rating >= 2 ? classes.star : classes.starOutline} />
                                            <StarIcon className={review.rating >= 3 ? classes.star : classes.starOutline} />
                                            <StarIcon className={review.rating >= 4 ? classes.star : classes.starOutline} />
                                            <StarIcon className={review.rating >= 5 ? classes.star : classes.starOutline} />
                                        </div>
                                    </div>
                                </div>
                                <p className="Review-List--Title-Header">Review</p>
                                <p>{review.message}</p>
                            </CardContent>
                        </Card>
                    )
                })
            }
            {isFetching && <p>Fetching more list items...</p>}
        </div>
    );
};

export default ReviewList;
