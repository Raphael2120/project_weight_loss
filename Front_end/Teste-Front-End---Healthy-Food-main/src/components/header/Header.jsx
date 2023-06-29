import "./header.css";
import "./ResponsiveHeader.css";
import Modal from "react-modal";
import { useState } from "react";
import axios from 'axios';


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const Header = () => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  axios.post('http://localhost:5000/register-user', { email, password })
    .then(response => {
      alert(response.data.message); // Affiche une alerte lorsque l'API répond avec succès
      closeModal();
    })
    .catch(error => {
      console.error(error);
      // Gérez les erreurs de connexion à l'API
    });
    setIsOpen(false);
  }



  return (
    <header>
      <div className="wraper">
        <div className="logo">
          <h1>Healthy Food</h1>
        </div>
        <nav>
          <ul>
            <li>
              <a href="/">HEALTHY RECIPES</a>
            </li>
            <li>
              <a href="/">BLOG</a>
            </li>
            <li>
              <a href="/">JOIN</a>
            </li>
          </ul>
          <div className="btn">
            <button type="text" onClick={openModal}>REGISTER</button>
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <div className="modal">
                <h1>Inscription</h1>
                <label>E-mail</label>
                <input type="text" id="email"/>
                <label>Password</label>
                <input type="text" id="password" />
                <button type="text" className='modalBtn' onClick={() => { 
                  alert('recipe received');
                  closeModal();
                }}>REGISTER RECIPE</button>
              </div>
              </Modal>
          </div>
        </nav>
      </div>
    </header>
  );
};
