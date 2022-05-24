import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    loading: false,
    name: '',
    email: '',
    image: '',
    description: '',
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    this.setState({ loading: true });
    const userData = await getUser();
    // console.log(userData);
    this.setState({
      name: userData.name,
      email: userData.email,
      description: userData.description,
      image: userData.image,
      loading: false });
  }

  render() {
    const { name,
      email,
      image,
      description,
      loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { loading && <Loading /> }
        <section>
          User Profile
          <h3>{ name }</h3>
          <h5>{ email }</h5>
          <p>{ description }</p>
          <img
            data-testid="profile-image"
            src={ image }
            alt={ name }
          />
          <Link to="/profile/edit"> Editar perfil </Link>
        </section>
      </div>);
  }
}

export default Profile;
