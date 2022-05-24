import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    loading: false,
    userName: '',
    userEmail: '',
    userImage: '',
    userDescription: '',
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    this.setState({ loading: true });
    const userData = Object.values(await getUser());
    // console.log(Object.values(userData));
    this.setState({
      userName: userData[0].userName,
      userEmail: userData[1].userEmail,
      userDescription: userData[3].userDescription,
      userImage: userData[2].userImage,
      loading: false });
  }

  render() {
    const { userName,
      userEmail,
      userImage,
      userDescription,
      loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { loading && <Loading /> }
        <section>
          User Profile
          <h3>{ userName }</h3>
          <h5>{ userEmail }</h5>
          <p>{ userDescription }</p>
          <img
            data-testid="profile-image"
            src={ userImage }
            alt={ userName }
          />
          <Link to="/profile/edit"> Editar perfil </Link>
        </section>
      </div>);
  }
}

export default Profile;
