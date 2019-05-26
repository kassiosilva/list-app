import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import app from '../../services/firebase';

// import { Container } from './styles';

class Login extends Component {
  handleLogin = async (event) => {
    event.preventDefault();

    const { email, password } = event.target.elements;

    try {
      const user = await app.auth().signInWithEmailAndPassword(email.value, password.value);

      this.props.history.push('/');
    } catch (error) {
      alert(error);
    }
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleLogin}>
          <label>
            Email
            <input name="email" type="email" placeholder="Email" />
          </label>
          <label>
            Password
            <input name="password" type="password" placeholder="Password" />
          </label>
          <button type="submit">Entrar</button>
        </form>

        <Link to="/signup">
          <p>Novo no Budget? Crie uma conta</p>
        </Link>
      </div>
    );
  }
}

export default withRouter(Login);
