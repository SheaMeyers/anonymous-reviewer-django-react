import React from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core";
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
    
    return (
        <div className='Create-business'>
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <form className='Create-business-form' onSubmit={event => {
                        event.persist();
                        event.preventDefault();

                        // @ts-ignore
                    }}>
                        <TextField
                            id="outlined-company-name-input"
                            label="Company Name"
                            className={classes.textField}
                            name="companyName"
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-street-name-input"
                            label="Street Name"
                            className={classes.textField}
                            name="streetName"
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-street-number-input"
                            label="Street Number"
                            className={classes.textField}
                            name="streetNumber"
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
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
