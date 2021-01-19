// import { BrowserRouter as Router } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from 'components/NavBar/NavBar';
import Footer from 'components/Footer/Footer';
import Home from 'components/Home/Home';
import Train from 'components/Train/Train';
import LoginPage from 'components/LoginPage/LoginPage';
import RegisterPage from 'components/RegisterPage/RegisterPage';
import Image from 'components/Train/Image/Image';
import Domain from 'components/Train/Domain/Domain';
import Domain2 from 'components/Train/Domain/Domain2';
import DomainRenewal from 'components/Train/Domain/DomainRenewal';
// import Counter from '../components/views/Counter';
import Auth from './hoc/auth';
import 'App.css';

function App() {
    return (
        <>
            <div className="wrapper">
                <Router>
                    <NavBar />
                    {/* <div
                    style={{
                        minHeight: 'calc(100vh - 85px)',
                    }}
                > */}
                    <div className="content">
                        <Switch>
                            <Route
                                exact
                                path="/"
                                // component={Auth(LandingPage, null)}
                                // component={Auth(Grid, null)}
                                component={Auth(Home, null)}
                            />
                            <Route path="/login" component={Auth(LoginPage, false)} />
                            <Route path="/register" component={Auth(RegisterPage, false)} />
                            <Route exact path="/train" component={Auth(Train, null)} />
                            <Route path="/train/image" component={Auth(Image, null)} />
                            <Route path="/train/domain" component={Auth(Domain, null)} />
                            <Route path="/train/domain2" component={Auth(Domain2, null)} />
                            <Route path="/train/domainRenewal" component={Auth(DomainRenewal, null)} />
                        </Switch>
                    </div>
                </Router>
                <Footer />
            </div>
        </>
    );
}

export default App;
