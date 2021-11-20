import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.isComponentMounted = false;

    this.state = {
      user: {},
      isLoading: true,
      isFormValid: false,
      finishedEditing: false,
    };

    this.fetchUser = this.fetchUser.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  componentDidMount() {
    this.fetchUser();
    this.isComponentMounted = true;
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
  }

  handleInputChange({ target: { name, value } }) {
    const { user } = this.state;

    this.setState({
      user: { ...user, [name]: value },
    }, this.validateForm);
  }

  async updateUserInfo() {
    const { user } = this.state;

    this.setState({ isLoading: true });
    await updateUser(user);
    if (this.isComponentMounted) {
      this.setState({ finishedEditing: true });
    }
  }

  validateForm() {
    const { user: { name, email, description, image } } = this.state;
    const emailValidation = this.validateEmail(email);

    this.setState({
      isFormValid: Boolean(name && emailValidation && description && image),
    });
  }

  validateEmail(email) {
    const emailFragments = email.split('@');

    if (emailFragments.length === 2) {
      const [userName, domain] = emailFragments;

      return userName !== '' && domain !== ''
        && domain.includes('.') && !domain.endsWith('.');
    }
    return false;
  }

  async fetchUser() {
    this.setState({
      user: await getUser(),
      isLoading: false,
    }, this.validateForm);
  }

  render() {
    const { user, isLoading, isFormValid, finishedEditing } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {isLoading ? <Loading /> : (
          <form>
            <div>
              <label htmlFor="name">
                Nome
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={ user.name }
                  onChange={ this.handleInputChange }
                  data-testid="edit-input-name"
                />
              </label>
            </div>
            <div>
              <label htmlFor="email">
                E-mail
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={ user.email }
                  onChange={ this.handleInputChange }
                  data-testid="edit-input-email"
                />
              </label>
            </div>
            <div>
              <label htmlFor="description">
                Descrição
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={ user.description }
                  onChange={ this.handleInputChange }
                  data-testid="edit-input-description"
                />
              </label>
            </div>
            <div>
              <label htmlFor="image">
                Imagem
                <input
                  type="text"
                  name="image"
                  id="image"
                  value={ user.image }
                  onChange={ this.handleInputChange }
                  data-testid="edit-input-image"
                />
              </label>
            </div>
            <button
              type="button"
              onClick={ this.updateUserInfo }
              disabled={ !isFormValid }
              data-testid="edit-button-save"
            >
              Salvar
            </button>
          </form>
        )}
        { finishedEditing && <Redirect to="/profile" />}
      </div>
    );
  }
}

export default ProfileEdit;
