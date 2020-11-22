import React from 'react';
import history from "../history";
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';


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

const LandingPage: React.FC = () => {

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
          <h2>Not Found</h2>
          <p>
              We couldn't find what you were looking for.  
              Click the back button above to go back to the home page.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default LandingPage;
