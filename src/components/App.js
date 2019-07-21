import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ImageDisplay from './ImageDisplay';
import Home from './Home';

class App extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/api" render={props => <ImageDisplay {...props} width={500} height={500} />}/>
                    </Switch>
                </Router>
            </React.Fragment>
        );
    }
}

export default App;