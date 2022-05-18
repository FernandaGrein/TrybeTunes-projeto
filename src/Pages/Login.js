import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  state = {
    inputName: '',
    disabled: true,
    loading: false,
    loaded: false,
  }

  getName = (event) => {
    const { value } = event.target;
    const minValue = 3;
    this.setState({ inputName: value }, () => (
      value.length >= minValue ? this.setState({ disabled: false }) : (
        this.setState({ disabled: true })
      )));
  }

  handleClick = async () => {
    const { inputName } = this.state;
    this.setState({ loading: true });
    await createUser({ name: inputName });
    this.setState({ loading: false, loaded: true });
  }

  render() {
    const { inputName, disabled, loading, loaded } = this.state;
    return (
      loading ? <Loading /> : (
        <div data-testid="page-login">
          <p>login Component</p>
          <label htmlFor="name">
            Nome:
            <input
              id="name"
              type="text"
              value={ inputName }
              data-testid="login-name-input"
              onChange={ this.getName }
            />
          </label>
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ disabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
          {loaded && <Redirect to="/search" /> }
        </div>));
  }
}

export default Login;
