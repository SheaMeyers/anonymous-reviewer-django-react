import React from 'react';
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
// import FrequentlyAskedQuestions from './FrequentlyAskedQuestions';
import CreateBusiness from './CreateBusiness';
import LandingPage from './LandingPage';
import LeaveReview from './LeaveReview';
// import Privacy from './Privacy';


const App: React.FC = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/" exact component={LandingPage} />
                <Route path="/create-business" exact component={CreateBusiness} />
                <Route path="/leave-review" exact component={LeaveReview} />
                {/* 
                <Route path="/faq" exact component={FrequentlyAskedQuestions} />
                <Route path="/privacy" exact component={Privacy} />
                <Route path="/:companyUri" exact component={LeaveReview} /> 
                */}
            </Switch>
        </Router>
    )
}

export default App;
