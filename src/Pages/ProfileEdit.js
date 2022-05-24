import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
 state = {
   loading: false,
   name: '',
   email: '',
   image: '',
   description: '',
   disable: true,
   redirect: false,
 }

 componentDidMount() {
   this.fetchgetUser();
 }

 fetchgetUser = async () => {
   this.setState({ loading: true });
   const userData = await getUser();
   this.setState({
     name: userData.name,
     email: userData.email,
     description: userData.description,
     image: userData.image,
     loading: false }, () => this.enableButton());
 }

 handleChange = (event) => {
   const { name, value } = event.target;
   this.setState({ [name]: value }, () => this.enableButton());
 }

 enableButton = () => {
   const {
     name,
     email,
     image,
     description } = this.state;

   if (name.length > 0
    && email.length > 0
    && image.length > 0
    && description.length > 0) {
     this.setState({ disable: false });
   }
 }

 saveInformations = async () => {
   const { name,
     email,
     image,
     description } = this.state;
   this.setState({ loading: true });
   await updateUser({ name, email, image, description });
   this.setState({ loading: false, redirect: true });
 }

 render() {
   const { name,
     email,
     image,
     description,
     disable,
     loading,
     redirect } = this.state;
   return (
     <div data-testid="page-profile-edit">
       <Header />
       {loading && <Loading />}
       <form>
         <label htmlFor="name">
           Nome:
           <input
             type="text"
             data-testid="edit-input-name"
             value={ name }
             name="name"
             onChange={ this.handleChange }
             required
           />
         </label>
         <label htmlFor="email">
           Email:
           <input
             type="email"
             data-testid="edit-input-email"
             value={ email }
             name="email"
             onChange={ this.handleChange }
             required
           />
         </label>
         <label htmlFor="description">
           Descrição:
           <input
             type="text"
             data-testid="edit-input-description"
             value={ description }
             name="description"
             onChange={ this.handleChange }
             required
           />
         </label>
         <label htmlFor="image">
           Imagem:
           <input
             type="text"
             data-testid="edit-input-image"
             value={ image }
             name="image"
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
