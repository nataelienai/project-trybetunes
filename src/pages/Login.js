import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

const MIN_LENGTH_OF_NAME = 3;

class Login extends React.Component {
  constructor() {
    super();

    /**
     * Atributo necessário para tratar o erro: "Can't perform a React state update on an unmounted component".
     * Referência: https://github.com/material-components/material-components-web-react/issues/434
    */
    this.isComponentMounted = false;

    this.state = {
      name: '',
      isLoading: false,
      isUserSaved: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  componentDidMount() {
    this.isComponentMounted = true;
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
  }

  handleInputChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  async handleButtonClick() {
    const { name } = this.state;

    this.setState({ isLoading: true }, async () => {
      await createUser({ name });
      if (this.isComponentMounted) {
        this.setState({ isUserSaved: true });
      }
    });
  }

  render() {
    const { name, isLoading, isUserSaved } = this.state;

    return (
      <div data-testid="page-login">
        { isLoading ? <Loading /> : (
          <form>
            <label htmlFor="name">
              Nome
              <input
                type="text"
                name="name"
                id="name"
                value={ name }
                onChange={ this.handleInputChange }
                data-testid="login-name-input"
              />
            </label>
            <button
              type="button"
              disabled={ name.length < MIN_LENGTH_OF_NAME }
              onClick={ this.handleButtonClick }
              data-testid="login-submit-button"
            >
              Entrar
            </button>
          </form>
        )}
        { isUserSaved && <Redirect to="/search" /> }
      </div>
    );
  }
}

export default Login;
