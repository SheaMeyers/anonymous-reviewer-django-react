import React from 'react';
import history from "../history";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import '../static/css/LandingPage.css';


const useStyles = makeStyles({
  root: {
    margin: 20,
    overflow: 'visible',
    width: '100%',
  },
  headerCard: {
    overflow: 'visible',
    flexGrow: 1,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
  },
  businessButton: {
    flexGrow: 1,
    margin: '10px',
  },
  businessCardContent: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  }
});

const LandingPage: React.FC = () => {

  const classes = useStyles();

  return (
    <div className="LandingPage">
      <div className="Header--div">
        <Card style={{'margin': 10}} className={classes.headerCard}>
          <CardContent className={classes.cardContent}>
            <Button variant="contained" color="primary" onClick={_ => history.push('/find-company')}>
              find a business and leave a review
            </Button>
          </CardContent>
        </Card>
      </div>
      <Card className={classes.root}>
        <CardContent className={classes.businessCardContent}>
          <h1 className="Business-card--header">Anonymous Reviewer</h1>
          <h2>What we do?</h2>
          <p className="Business-card--text">
            We allow you to stay anonymous and review businesses.
            Your review will not be public, will not be linked back to you,
             and will only be seen by the business's owners and managers.
          </p>
          <h2>Why anonymous?</h2>
          <p className="Business-card--text">
            Many businesses have trouble getting worthwhile reviews because people do not want their review
            linked back to them.  This hurts the businesses because they do not receive valuable feedback
            and hurts consumers because the businesses in their area do not improve.
          </p>
          <p className="Business-card--text">
            By allowing the consumer to remain anonymous when giving a review, they are more likely to give a review.
            This way the business will get valuable feedback about how to improve and the quality of businesses
            in the consumer's area will increase.
          </p>
        </CardContent>
      </Card>
      <Card className={classes.root}>
        <CardContent className={classes.cardContent}>
        <h2>Watch our demo video</h2>
        <iframe className="Youtube-video" src="https://www.youtube.com/embed/HXAGpcTFVwo" title="youtube-video"
                frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
        </iframe>
        </CardContent>
      </Card>
      <Card className={classes.root}>
        <CardContent className={classes.businessCardContent}>
          <h2 style={{'textAlign': 'center'}}>Still have questions?</h2>
          <ul>
            <li>
              <p className="Faq-text">Check out our <Link className="Faq-link" onClick={() => history.push('/faq')}> Frequently Asked Questions</Link> </p>
            </li>
            <li>
              <p className="Faq-text">Go to our <a
                    className="Faq-link" 
                    href="https://www.facebook.com/anonReviewer" 
                    target="_blank" rel="noopener noreferrer">
                    Facebook Page
                </a>
              </p>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default LandingPage;
