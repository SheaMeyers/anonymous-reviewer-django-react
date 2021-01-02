import React, { useState, useEffect } from 'react';
import axios from 'axios';
import history from "../history";
import { makeStyles } from '@material-ui/core/styles';
import Fuse from 'fuse.js';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import '../static/css/LandingPage.css';
import { domainUrl } from '../keys';


const useStyles = makeStyles({
  addBusinessLink: {
    marginTop: 15,
    fontWeight: 'bold'
  },
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
  },
  cardPointer: {
    margin: '5px 20px 5px 20px',
    width: '100%',
    cursor: 'pointer',
  },
  textField: {
    width: '100%',
  }
});

const fuseOptions = {
  isCaseSensitive: false,
  findAllMatches: false,
  includeMatches: false,
  includeScore: false,
  useExtendedSearch: false,
  minMatchCharLength: 1,
  shouldSort: true,
  threshold:0.6,
  location: 0,
  distance: 100,
  keys: [
      "name",
  ]
};

interface FuseResultsInterface { 
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

const LandingPage: React.FC = () => {

  const classes = useStyles();
  const [searchResults, setSearchResults] = useState<Fuse.FuseResult<Fuse.FuseResult<FuseResultsInterface>>[]>();
  const [searchList, setSearchList] = useState<Fuse.FuseResult<FuseResultsInterface>[]>([]);
  const fuse = new Fuse(searchList, fuseOptions);

  useEffect(() => {
    axios.get(`${domainUrl}/backend/get-companies/`)
        .then(response => setSearchList(response.data['companies']))
        .catch(error => console.log('error' + error));
  }, []);

  return (
    <div className="LandingPage">
      <div className="Header--div">
        <Card style={{'margin': 10}} className={classes.headerCard}>
          <CardContent className={classes.cardContent}>
          <TextField 
              className={classes.textField} 
              id="find-business" 
              label="Find business" 
              variant="outlined" 
              onChange={event => {
                  const results = fuse.search(event.target.value);
                  setSearchResults(results);
              }}
          />
          {
              searchResults && searchResults.map((result: any, index: number) => {
                  return (
                      <Card key={result.item.uri} className={classes.cardPointer} onClick={_ => history.push('/leave-review', {...result.item})}>
                          <CardContent className={classes.cardContent}>
                              <p>{result.item.name}</p>
                              <span>{result.item.street_name} {result.item.street_number}</span>
                              <span>{result.item.city} {result.item.province}</span>
                          </CardContent>
                      </Card>
                  )
              })
          }
          <Link className={classes.addBusinessLink} href="#" onClick={(event: React.SyntheticEvent) => {
              event.preventDefault()
              history.push('create-business');
          }}>
              Can't find a business?  Add it and leave a review.
          </Link>
          </CardContent>
        </Card>
      </div>
      <Card className={classes.root}>
        <CardContent className={classes.businessCardContent}>
          <h1 className="Business-card--header">Anonymous Reviewer</h1>
          <h2>What we do?</h2>
          <p className="Business-card--text">
            We allow you to stay anonymous and review businesses.
            Your review will not be linked back to you and we do not do anything to track you.
          </p>
          <h2>Why anonymous?</h2>
          <p className="Business-card--text">
            Many people do not leave reviews because they do not want their review linked back to them.  
            This hurts the businesses because they do not receive valuable feedback
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
        <CardContent className={classes.businessCardContent}>
          <h2 style={{'textAlign': 'center'}}>Still have questions?</h2>
          <ul>
            <li>
              <p className="Faq-text">Check out our <Link className="Faq-link" onClick={() => history.push('/faq')}> Frequently Asked Questions</Link> </p>
            </li>
            <li>
              <p className="Faq-text">Go to our 
                <a
                    className="Faq-link" 
                    href="https://www.facebook.com/anonReviewer" 
                    target="_blank" rel="noopener noreferrer">
                    Facebook Page
                </a>
                 or 
                <a
                    className="Faq-link" 
                    href="https://twitter.com/AnonRevWebsite" 
                    target="_blank" rel="noopener noreferrer">
                    Twitter Page
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
