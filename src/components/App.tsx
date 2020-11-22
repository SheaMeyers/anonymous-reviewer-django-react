import React from 'react';
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
import CreateBusiness from './CreateBusiness';
import FrequentlyAskedQuestions from './FrequentlyAskedQuestions';
import LandingPage from './LandingPage';
import LeaveReview from './LeaveReview';
import NotFoundPage from './NotFoundPage';


const App: React.FC = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/" exact component={LandingPage} />
                <Route path="/create-business" exact component={CreateBusiness} />
                <Route path="/leave-review" exact component={LeaveReview} />
                <Route path="/faq" exact component={FrequentlyAskedQuestions} />
                <Route component={NotFoundPage}/>
            </Switch>
        </Router>
    )
}

export default App;
