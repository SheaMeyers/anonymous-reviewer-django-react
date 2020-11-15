import React, { useState, useEffect, RefObject } from 'react';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import { RouteComponentProps } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import StarIcon from '@material-ui/icons/Star';
import Select from '@material-ui/core/Select';
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
});


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
    const [review, setReview] = useState<string>();
    const recaptchaRef: RefObject<ReCAPTCHA> = React.createRef<ReCAPTCHA>();
    const [feedbackMessage, setFeedbackMessage] = useState<string>('');

    // localhost -> 6Le6pKcZAAAAAACMEoQ4yHOK_kNyYNiONeFkCqIN
    // prod -> 6LdIo6cZAAAAAAgiLRMwiKNYUmSv4oFR7oMXvlkb
    // const recaptchaSiteKey = process.env.RECAPTCHA_SITE_KEY || "6Le6pKcZAAAAAACMEoQ4yHOK_kNyYNiONeFkCqIN";

    // Prod
    // const recaptchaSiteKey = "6LdIo6cZAAAAAAgiLRMwiKNYUmSv4oFR7oMXvlkb";

    // Localhost
    const recaptchaSiteKey = "6Le6pKcZAAAAAACMEoQ4yHOK_kNyYNiONeFkCqIN";

    const handleRatingChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setRating(event.target.value as number);
    };

    //   const recaptchaOnChange = (value: any) => {
    //     axios.post(`node/create-review/${companyId}`, {
    //       rating: rating,
    //       message: review
    //     })
    //     .then(_ => setFeedbackMessage('Review successfully submitted'))
    //     .catch(_ => setFeedbackMessage('Review successfully submitted'))
    //   }

    return (
        <div className='Leave-review'>
            <Card className={classes.root}>
                <CardContent className={classes.cardContent}>
                    <div className='Leave-review'>
                        <form className='Leave-review' onSubmit={event => {
                            event.persist();
                            event.preventDefault();

                            // @ts-ignore
                            const elements = event.target.elements;
                            setReview(elements.review.value);

                            //   recaptchaRef.current.execute();
                        }}>
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                size="invisible"
                                sitekey={recaptchaSiteKey}
                            // onChange={recaptchaOnChange}
                            />
                            <h2 style={{ 'textAlign': 'center' }}>{props.location.state.name}</h2>
                            <span>{props.location.state.street_name} {props.location.state.street_number}</span>
                            <span>{props.location.state.city} {props.location.state.province}</span>
                            <br />
                            <div>
                                <StarIcon
                                    className={rating >= 1 ? classes.star : classes.starOutline}
                                    onClick={_ => setRating(1)}
                                />
                                <StarIcon
                                    className={rating >= 2 ? classes.star : classes.starOutline}
                                    onClick={_ => setRating(2)}
                                />
                                <StarIcon
                                    className={rating >= 3 ? classes.star : classes.starOutline}
                                    onClick={_ => setRating(3)}
                                />
                                <StarIcon
                                    className={rating >= 4 ? classes.star : classes.starOutline}
                                    onClick={_ => setRating(4)}
                                />
                                <StarIcon
                                    className={rating >= 5 ? classes.star : classes.starOutline}
                                    onClick={_ => setRating(5)}
                                />
                            </div>
                            <TextField
                                className={classes.textField}
                                id="review-input"
                                label="Review"
                                variant="outlined"
                                name="review"
                                multiline
                                rows={4}
                            />
                            {feedbackMessage && <p style={{ 'color': 'green' }}>{feedbackMessage}</p>}
                            <Button variant="contained" color="primary" type="submit">
                                Submit review
                  </Button>
                            <p>
                                Your review will be anonymous.
                                We do not track or save any of your information.
                  </p>
                        </form>
                    </div>
                </CardContent>
            </Card>
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
            <ReviewList id={props.location.state.id} rating={rating} />
        </div>
    );
}

export default LeaveReview;
