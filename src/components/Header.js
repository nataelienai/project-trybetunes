import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.isComponentMounted = false;

    this.state = {
      userName: '',
      isLoading: true,
    };

    this.fetchUserName = this.fetchUserName.bind(this);
  }

  componentDidMount() {
    this.isComponentMounted = true;
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
  }

  async fetchUserName() {
    const user = await getUser();

    if (this.isComponentMounted) {
      this.setState({
        userName: user.name,
        isLoading: false,
      });
    }
  }

  render() {
    const { userName, isLoading } = this.state;
    this.fetchUserName();

    return (
      <header data-testid="header-component">
        { isLoading ? <Loading /> : (
          <h1 data-testid="header-user-name">
            { userName }
          </h1>
        )}
      </header>
    );
  }
}

export default Header;
