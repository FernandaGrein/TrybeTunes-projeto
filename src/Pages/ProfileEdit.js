import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
 state = {
   loading: false,
   userName: '',
   userEmail: '',
   userImage: '',
   userDescription: '',
   disable: true,
   redirect: false,
 }

 componentDidMount() {
   this.fetchgetUser();
 }

 fetchgetUser = async () => {
   this.setState({ loading: true });
   await getUser();
   this.setState({ loading: false });
 }

 handleChange = (event) => {
   const { name, value } = event.target;
   this.setState({ [name]: value }, () => this.enableButton());
 }

 enableButton = () => {
   const {
     userName,
     userEmail,
     userImage,
     userDescription } = this.state;

   if (userName.length > 0
    && userEmail.length > 0
    && userImage.length > 0
    && userDescription.length > 0) {
     this.setState({ disable: false });
   }
 }

 saveInformations = async () => {
   const { userName,
     userEmail,
     userImage,
     userDescription } = this.state;
   this.setState({ loading: true });
   await updateUser(
     { userName },
     { userEmail },
     { userImage },
     { userDescription },
   );
   this.setState({ loading: false, redirect: true });
 }

 render() {
   const { userName,
     userEmail,
     userImage,
     userDescription,
     disable,
     loading,
     redirect } = this.state;
   return (
     <div data-testid="page-profile-edit">
       <Header />
       {loading && <Loading />}
       <form>
         <label htmlFor="userName">
           Nome:
           <input
             type="text"
             data-testid="edit-input-name"
             value={ userName }
             name="userName"
             onChange={ this.handleChange }
             required
           />
         </label>
         <label htmlFor="userEmail">
           Email:
           <input
             type="email"
             data-testid="edit-input-email"
             value={ userEmail }
             name="userEmail"
             onChange={ this.handleChange }
             required
           />
         </label>
         <label htmlFor="userDescription">
           Descrição:
           <input
             type="text"
             data-testid="edit-input-description"
             value={ userDescription }
             name="userDescription"
             onChange={ this.handleChange }
             required
           />
         </label>
         <label htmlFor="userImage">
           Imagem:
           <input
             type="text"
             data-testid="edit-input-image"
             value={ userImage }
             name="userImage"
             onChange={ this.handleChange }
             required
           />
         </label>
         <button
           name="edit-button-save"
           type="button"
           data-testid="edit-button-save"
           disabled={ disable }
           onClick={ this.saveInformations }
         >
           Salvar informações
         </button>
       </form>
       { redirect && <Redirect to="/profile" /> }
     </div>);
 }
}

export default ProfileEdit;
