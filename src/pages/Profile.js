import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {},
      isLoading: true,
    };

    this.fetchUser = this.fetchUser.bind(this);
  }

  componentDidMount() {
    this.fetchUser();
  }

  async fetchUser() {
    this.setState({
      user: await getUser(),
      isLoading: false,
    });
  }

  render() {
    const { user, isLoading } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        { isLoading ? <Loading /> : (
          <div>
            <div>
              <img
                src={ user.image }
                alt={ `Perfil de ${user.name}` }
                data-testid="profile-image"
              />
            </div>
            <div>
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
            <div>
              <h2>Nome</h2>
              <p>{ user.name }</p>
            </div>
            <div>
              <h2>E-mail</h2>
              <p>{ user.email }</p>
            </div>
            <div>
              <h2>Descrição</h2>
              <p>{ user.description }</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
