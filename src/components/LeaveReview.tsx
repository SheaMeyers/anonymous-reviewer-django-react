import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import StarIcon from '@material-ui/icons/Star';
import CreateReview from './CreateReview';
import ReviewList from './ReviewList';
import '../static/css/LeaveReview.css';


const useStyles = makeStyles({
    root: {
        margin: 20,
        overflow: 'visible',
    },
    card: {
        margin: 20,
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
    cardContentLeft: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
    },
    formControl: {
        margin: 20,
        minWidth: 120,
    },
    textField: {
        width: '100%',
        margin: 5
    },
    star: {
        color: '#ffff00',
        fontSize: '50px',
        cursor: 'pointer',
        stroke: 'black',
        '&:hover': {
            color: '#ffff99',
        },
    },
    starOutline: {
        color: '#ffffff',
        fontSize: '50px',
        cursor: 'pointer',
        stroke: 'black',
        '&:hover': {
            color: '#ffff99',
        },
    },
    miniStar: {
        color: '#ffff00',
        fontSize: '20px',
        cursor: 'pointer',
        stroke: 'black',
    },
});


interface RatingStats {
    average_rating: string;
    number_five_star_ratings: string;
    number_four_star_ratings: string;
    number_three_star_ratings: string;
    number_two_star_ratings: string;
    number_one_star_ratings: string;
}

interface CompanyState {
    id: string;
    created_datetime: string;
    modified_datetime: string;
    name: string;
    street_name: string;
    street_number: string;
    city: string;
    province: string;
    country: string;
    postal_code: string;
    rating_stats: RatingStats;
}


interface CompanyLocation extends Location {
    state: CompanyState;
}


interface CompanyRouteComponentProps extends RouteComponentProps {
    location: CompanyLocation;
}


const LeaveReview: React.FC<CompanyRouteComponentProps> = (props) => {

    const classes = useStyles();
    const [rating, setRating] = useState<number>(0);

    const handleRatingChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setRating(event.target.value as number);
    };

    return (
        <div className='Leave-review'>
            <div className='Leave-review--header-div'>
                <CreateReview company={props.location.state} />
                <div>
                    <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            <div className="Rating-selector">
                                <p>Display Reviews with Rating: </p>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-outlined-label">Rating</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={rating}
                                        onChange={handleRatingChange}
                                        label="Rating"
                                    >
                                        <MenuItem value={0}><em>All</em></MenuItem>
                                        <MenuItem value={1}>One</MenuItem>
                                        <MenuItem value={2}>Two</MenuItem>
                                        <MenuItem value={3}>Three</MenuItem>
                                        <MenuItem value={4}>Four</MenuItem>
                                        <MenuItem value={5}>Five</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className={classes.card}>
                        <CardContent className={classes.cardContentLeft}>
                            <p>Average Rating:&nbsp;&nbsp;<b>{parseFloat(props.location.state.rating_stats.average_rating).toFixed(2)}</b></p>
                            <span className="roboto-font">5 <StarIcon className={classes.miniStar} />:&nbsp;&nbsp;<b>{props.location.state.rating_stats.number_five_star_ratings}</b></span>
                            <span className="roboto-font">4 <StarIcon className={classes.miniStar} />:&nbsp;&nbsp;<b>{props.location.state.rating_stats.number_four_star_ratings}</b></span>
                            <span className="roboto-font">3 <StarIcon className={classes.miniStar} />:&nbsp;&nbsp;<b>{props.location.state.rating_stats.number_three_star_ratings}</b></span>
                            <span className="roboto-font">2 <StarIcon className={classes.miniStar} />:&nbsp;&nbsp;<b>{props.location.state.rating_stats.number_two_star_ratings}</b></span>
                            <span className="roboto-font">1 <StarIcon className={classes.miniStar} />:&nbsp;&nbsp;<b>{props.location.state.rating_stats.number_one_star_ratings}</b></span>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <ReviewList id={props.location.state.id} rating={rating} />
        </div>
    );
}

export default LeaveReview;
