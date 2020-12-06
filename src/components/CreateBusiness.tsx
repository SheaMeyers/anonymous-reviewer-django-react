import React, { useState, RefObject } from 'react';
import axios from 'axios';
import history from "../history";
import ReCAPTCHA from "react-google-recaptcha";
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import { domainUrl, googleRecaptchaSiteKey } from '../keys';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import '../static/css/CreateBusiness.css';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
    }),
);

const CreateBusiness = () => {

    const classes = useStyles();

    const [companyName, setCompanyName] = useState<string>('');
    const [streetName, setStreetName] = useState<string>('');
    const [streetNumber, setStreetNumber] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [province, setProvince] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [postalCode, setPostalCode] = useState<string>('');
    const [feedbackMessage, setFeedbackMessage] = useState<string>('');

    const recaptchaRef: RefObject<ReCAPTCHA> = React.createRef<ReCAPTCHA>();

    const recaptchaSiteKey = googleRecaptchaSiteKey;

    const recaptchaOnChange = (value: any) => {
        axios.post(`${domainUrl}/backend/create-company/`, {
            name: companyName,
            street_name: streetName,
            street_number: streetNumber,
            city: city,
            province: province,
            country: country,
            postal_code: postalCode
        })
        .then(result => {
            history.push('/leave-review', {...result.data});
        })
        .catch(_ => setFeedbackMessage('Unable to create business.  Please try again later.'))
    }
    
    return (
        <div className='Create-business'>
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <form className='Create-business-form' onSubmit={event => {
                        event.persist();
                        event.preventDefault();

                        // @ts-ignore
                        const elements = event.target.elements;
                        setCompanyName(elements.companyName.value);
                        setStreetName(elements.streetName.value);
                        setStreetNumber(elements.streetNumber.value);
                        setCity(elements.city.value);
                        setProvince(elements.province.value);
                        setCountry(elements.country.value);
                        setPostalCode(elements.postalCode.value);

                        recaptchaRef.current!.execute();
                    }}>
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            size="invisible"
                            sitekey={recaptchaSiteKey}
                            onChange={recaptchaOnChange}
                        />
                        <TextField
                            required
                            id="outlined-company-name-input"
                            label="Company Name"
                            className={classes.textField}
                            name="companyName"
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            required
                            id="outlined-street-name-input"
                            label="Street Name"
                            className={classes.textField}
                            name="streetName"
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            required
                            id="outlined-street-number-input"
                            label="Street Number"
                            className={classes.textField}
                            name="streetNumber"
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            required
                            id="outlined-city-input"
                            label="City"
                            className={classes.textField}
                            name="city"
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-province-input"
                            label="Province"
                            className={classes.textField}
                            name="province"
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-country-input"
                            label="Country"
                            className={classes.textField}
                            name="country"
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-postal-code-input"
                            label="Zip/Postal Code"
                            className={classes.textField}
                            name="postalCode"
                            margin="normal"
                            variant="outlined"
                        />
                        {feedbackMessage && <p style={{ 'color': 'red' }}>{feedbackMessage}</p>}
                        <Button variant="contained" color="primary" type="submit">
                            Create Business
                        </Button>
                        <p>
                            You will be able to leave a review on the next screen.
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default CreateBusiness;
