import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import React from 'react';
import { firestore } from '../Firebase/firebase';
import AuthUserContext from './context';
class WithAuthentication extends React.Component {
  constructor(props) {
    super(props);
    this.auth = getAuth();
    const authUser = localStorage.getItem('authUser');
    this.state = {
      authUser: authUser !== undefined ? authUser : null,
    };
  }

  componentDidMount() {
    onAuthStateChanged(
      this.auth,
      (authUser) => {
        if (authUser !== null) {
          const authJson = JSON.parse(localStorage.getItem('authUser'));
          if (authJson !== null) {
            const user = {
              ...authUser,
              displayName: authJson.displayName,
            };
            localStorage.setItem('authUser', JSON.stringify(user));
            const auth = localStorage.getItem('authUser');
            this.setState({ authUser: auth !== undefined ? auth : null });
          } else {
            const q = query(
              collection(firestore, 'users'),
              limit(1),
              where('uid', '==', authUser.uid)
            );
            getDocs(q)
              .then(({ docs }) => {
                const user = {
                  ...authUser,
                  displayName: docs[0].data().name,
                };
                console.log(docs[0].data().name);
                localStorage.setItem('authUser', JSON.stringify(user));
                const auth = localStorage.getItem('authUser');
                this.setState({ authUser: auth !== undefined ? auth : null });
              })
              .catch((err) => console.log(err.message));
          }
        }
      },
      () => {
        localStorage.removeItem('authUser');
        this.setState({ authUser: null });
      }
    );
  }

  componentWillUnmount() {}

  render() {
    return (
      <AuthUserContext.Provider value={this.state.authUser}>
        {this.props.children}
      </AuthUserContext.Provider>
    );
  }
}

export default WithAuthentication;
