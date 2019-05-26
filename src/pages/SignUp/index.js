import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import app from '../../services/firebase';

// import { Container } from './styles';

class SignUp extends Component {
  handleSignUp = async (event) => {
    event.preventDefault();

    const { email, password } = event.target.elements;

    try {
      const user = await app.auth().createUserWithEmailAndPassword(email.value, password.value);

      this.props.history.push('/');
    } catch (error) {
      alert(error);
    }
  };

  render() {
    return (
      <div>
        <h1>Sign up</h1>
        <form onSubmit={this.handleSignUp}>
          <label>
            Email
            <input name="email" type="email" placeholder="Email" />
          </label>
          <label>
            Password
            <input name="password" type="password" placeholder="Password" />
          </label>
          <button type="submit">Sign Up</button>
        </form>

        <Link to="/login">
          <p>Voltar</p>
        </Link>
      </div>
    );
  }
}

export default withRouter(SignUp);
