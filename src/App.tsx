import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { createAuthLink } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import { ApolloProvider, ApolloClient, ApolloLink } from '@apollo/client';
import ProtectedLayout from './components/ProtectedLayout/ProtectedLayout';
import Calendar from './pages/Calendar/Calendar';
import Landing from './pages/Landing/Landing';
import Login from './pages/Login/Login';
import Standings from './pages/Standings/Standings';
import MyTeam from './pages/Teams/Teams';
import Transferables from './pages/Transferables/Transferables';
import theme from './theme';
import { AppSyncConfig } from './aws-exports';
import { getCurrentSession } from './auth';
import { useAuthStore } from './store';
import { cache } from './utils/utils';

const App = () => {
  const cognitoSession = useAuthStore((state) => state.cognitoSession);
  const updateCognitoSession = useAuthStore((state) => state.updateCognitoSession);
  const updateLoadingSession = useAuthStore((state) => state.updateLoadingSession);
  const updateApolloClientFromStore = useAuthStore((state) => state.updateApolloClient);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const config: any = {
    url: AppSyncConfig.graphqlEndpoint,
    region: AppSyncConfig.region,
    auth: {
      type: AppSyncConfig.authenticationType,
      jwtToken: cognitoSession?.getIdToken().getJwtToken() ?? ''
    }
  }

  const apolloClient = new ApolloClient({
    link: ApolloLink.from([
      createAuthLink(config),
      createSubscriptionHandshakeLink(config)
    ]),
    cache,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network'
      }
    }
  });

  useEffect(() => {
    if (!cognitoSession) {
      updateLoadingSession(true);
      const cb = () => { updateLoadingSession(false); };
      const currentSession = getCurrentSession(cb, cb);
      
      updateCognitoSession(currentSession);
    }
  }, [cognitoSession]);

  useEffect(() => {
    updateApolloClientFromStore(apolloClient);
  }, [apolloClient]);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <Router>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Routes>
            <Route path='dashboard' element={<ProtectedLayout />} />
            <Route path='standings' element={<ProtectedLayout />}>
              <Route path='' element={<Standings />} />
            </Route>
            <Route path='calendar' element={<ProtectedLayout />}>
              <Route path='' element={<Calendar />} />
            </Route>
            <Route path='teams' element={<ProtectedLayout />}>
              <Route path='' element={<MyTeam />} />
            </Route>
            <Route path='market' element={<ProtectedLayout />}>
              <Route path='listings' element={<Transferables />} />
            </Route>
            <Route path='login' element={<Login />} />
            <Route path='/' element={<Landing />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
};

// var authenticationData = {
//   Username: 'marquezgon@me.com',
//   Password: 'manchi89',
// };
// var authenticationDetails = new AuthenticationDetails(
//   authenticationData
// );

// var userPool = new CognitoUserPool(awsExports);
// var userData = {
//   Username: 'marquezgon@me.com',
//   Pool: userPool,
// };


// function App() {
//   useEffect(() => {
//     let sessionUserAttributes;
//     var cognitoUser = new CognitoUser(userData);
//     cognitoUser.authenticateUser(authenticationDetails, {
//       onSuccess: function(result) {
//         var accessToken = result.getAccessToken().getJwtToken();
//         alert('success')
//         // POTENTIAL: Region needs to be set if not already set previously elsewhere.
//         AWS.config.region = 'us-east-1';

//         AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//           IdentityPoolId: '...', // your identity pool id here
//           Logins: {
//             // Change the key below according to the specific region your user pool is in.
//             'cognito-idp.us-east-1.amazonaws.com/us-east-1_o7SOcZF9p': result
//               .getIdToken()
//               .getJwtToken(),
//           },
//         });

//         // refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
//         AWS.config.credentials.refresh(error => {
//           if (error) {
//             console.error(error);
//           } else {
//             // Instantiate aws sdk service objects now that the credentials have been updated.
//             // example: var s3 = new AWS.S3();
//             console.log('Successfully logged!');
//           }
//         });
//       },

//       onFailure: function(err) {
//         console.error(err.message || JSON.stringify(err));
//       },

//       newPasswordRequired: function(userAttributes, requiredAttributes) {
//         // User was signed up by an admin and must provide new
//         // password and required attributes, if any, to complete
//         // authentication.

//         // the api doesn't accept this field back
//         delete userAttributes.email_verified;

//         // store userAttributes on global variable
//         sessionUserAttributes = userAttributes;
//         console.log(sessionUserAttributes);
//       }
//     });
//   }, []);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
