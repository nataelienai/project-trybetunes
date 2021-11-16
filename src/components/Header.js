import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      isLoading: true,
    };

    this.fetchUserName = this.fetchUserName.bind(this);
  }

  componentDidMount() {
    this.fetchUserName();
  }

  async fetchUserName() {
    const user = await getUser();

    this.setState({
      userName: user.name,
      isLoading: false,
    });
  }

  render() {
    const { userName, isLoading } = this.state;

    return (
      <header data-testid="header-component">
        { isLoading ? <Loading /> : (
          <>
            <h1 data-testid="header-user-name">
              { userName }
            </h1>
            <Link to="/search" data-testid="link-to-search">
              Pesquisa
            </Link>
            <Link to="/favorites" data-testid="link-to-favorites">
              Favoritos
            </Link>
            <Link to="/profile" data-testid="link-to-profile">
              Perfil
            </Link>
          </>
        )}
      </header>
    );
  }
}

export default Header;
