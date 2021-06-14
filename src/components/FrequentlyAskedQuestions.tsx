import React from 'react';
import history from "../history";
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import '../static/css/FrequentlyAskedQuestions.css';


const useStyles = makeStyles({
  root: {
    margin: 20,
    overflow: 'visible',
  },
  settingsCard: {
    margin: 20,
    width: 'fit-content',
  },
  settingsCardContent: {
    display: 'flex',
    alignItems: 'center',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
  }
});

const FrequentlyAskedQuestions: React.FC = () => {

  const classes = useStyles();

  return (
    <div>
      <Card className={classes.settingsCard}>
        <CardContent className={classes.settingsCardContent}>
          <ArrowBackIcon color="primary" />
          <Link className="Faq--Link" href="#" onClick={(event: React.SyntheticEvent) => {
            event.preventDefault()
            history.push('/');
          }}>
            Back
          </Link>
        </CardContent>
      </Card>
      <Card className={classes.root}>
        <CardContent className={classes.cardContent}>
          <h2>Frequently Asked Questions</h2>
          <p className="Faq-question">How do I know my review is anonymous?</p>
          <p className="Faq-answer">
            • We do not require any type of sign up to leave a review and do not use cookies.  
              Anyone can leave a review and it will be anonymous.  
          </p>
          <p className="Faq-question">How do I know these reviews are legimate and not make by bots?</p>
          <p className="Faq-answer">• We use Google Recaptcha to ensure the reviews are left by real people and not by bots.</p>
          <p className="Faq-question">Why can't I find a business?</p>
          <p className="Faq-answer">
              • The business you're looking for may not yet be in our website.  
                If you can't find a business you can add it and then leave it a review.  
                We do not require any sort of sign up to add a business and anyone can add a business.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default FrequentlyAskedQuestions;
