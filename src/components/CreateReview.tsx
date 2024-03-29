import React, { useState, RefObject } from 'react';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import { makeStyles } from '@material-ui/core/styles';
import { domainUrl, googleRecaptchaSiteKey } from '../keys';
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
        ['@media (max-width: 550px)']: { // eslint-disable-line no-useless-computed-key
            fontSize: '40px',
        }
    },
    starOutline: {
        color: '#ffffff',
        fontSize: '50px',
        cursor: 'pointer',
        stroke: 'black',
        '&:hover': {
            color: '#ffff99',
        },
        ['@media (max-width: 550px)']: { // eslint-disable-line no-useless-computed-key
            fontSize: '40px',
        }
    },
    initialReportedText: {
        color: 'red',
        cursor: 'pointer',
        width: '100%',
        fontSize: 14,
        textAlign: 'right'
    },
    reportedText: {
        color: 'green',
        width: '100%',
        fontSize: 14,
        textAlign: 'right'
    }
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

    const initialReportText = 'Something incorrect?  Report it by clicking here.';

    const classes = useStyles();
    const [rating, setRating] = useState<number>(0);
    const [review, setReview] = useState<string>();
    const [reportText, setReportText] = useState<string>(initialReportText);
    const recaptchaRef: RefObject<ReCAPTCHA> = React.createRef<ReCAPTCHA>();
    const [feedbackMessage, setFeedbackMessage] = useState<string>('');

    const recaptchaOnChange = (value: any) => {
        axios.post(`${domainUrl}/backend/create-review/`, {
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
                            sitekey={googleRecaptchaSiteKey}
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
                        {
                            reportText === initialReportText 
                            ? 
                            <span className={classes.initialReportedText} onClick={_ => {
                                axios.get(`${domainUrl}/backend/flag-company/${props.company.id}/`, {
                                    headers: {
                                    'Content-Type': 'application/json'
                                    }
                                }).then(_ => setReportText('Reported!'))
                                .catch(_ => setReportText('Reported!'))
                            }}>
                                {reportText}
                            </span> 
                            :
                            <span className={classes.reportedText}>{reportText}</span>
                        }
                    </form>
                </div>
            </CardContent>
        </Card>
    );
}

export default CreateReview;
