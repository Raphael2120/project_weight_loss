import "./header.css";
import "./ResponsiveHeader.css";
import Modal from "react-modal";
import { useState } from "react";

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
    setIsOpen(false);
  }

  return (
    <header>
      <div className="wraper">
        <div className="logo">
          <h1>Weight Loss App</h1>
        </div>
        <nav>
          <ul>
            <li>
              <a href="/">BMI Calculator</a>
            </li>
            <li>
              <a href="/">TIPS</a>
            </li>
            <li>
              <a href="/">JOIN</a>
            </li>
          </ul>
          <div className="btn">
            <button type="text" onClick={openModal}>LOGIN</button>
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <div className="modal">
                <h1>Sign in</h1>
                <label>Username</label>
                <input type="text" />
                <label>Password</label>
                <input type="password" />
                <button type="text" className='modalBtn' onClick={() => { 
                  alert('recipe recevied');
                  closeModal();
                }}>Log In</button>
              </div>
              </Modal>
          </div>
        </nav>
      </div>
    </header>
  );
};
