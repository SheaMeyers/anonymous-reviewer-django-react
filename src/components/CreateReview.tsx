import React, { useState, useEffect, RefObject } from 'react';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import StarIcon from '@material-ui/icons/Star';


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


interface CompanyInterface {
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

interface CompanyProps {
    company: CompanyInterface;
}


const CreateReview: React.FC<CompanyProps> = (props) => {

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

    const recaptchaOnChange = (value: any) => {
        axios.post('http://localhost:8000/backend/create-review/', {
          company_id: props.company.id,
          rating: rating,
          message: review
        })
        .then(_ => setFeedbackMessage('Review successfully submitted'))
        .catch(_ => setFeedbackMessage('Review successfully submitted'))
    }

    return (
        <Card className={classes.root}>
            <CardContent className={classes.cardContent}>
                <div className='Leave-review'>
                    <form className='Leave-review' onSubmit={event => {
                        event.persist();
                        event.preventDefault();

                        // @ts-ignore
                        const elements = event.target.elements;
                        setReview(elements.review.value);

                        recaptchaRef.current!.execute();
                    }}>
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            size="invisible"
                            sitekey={recaptchaSiteKey}
                            onChange={recaptchaOnChange}
                        />
                        <h2 style={{ 'textAlign': 'center' }}>{props.company.name}</h2>
                        <span>{props.company.street_name} {props.company.street_number}</span>
                        <span>{props.company.city} {props.company.province}</span>
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
    );
}

export default CreateReview;
