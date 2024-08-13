import React from 'react';
import AboutCSS from '../../assets/styles/About.module.css';
import Footer from '../Layout/Footer';

const About = () => {
    return (
      <div className={AboutCSS.aboutContainer}>
        <div className={AboutCSS.contentContainer}>
          <div className={AboutCSS.descriptionContainer}>
            <h1>About <span className={AboutCSS.special}>Sneku Snek</span></h1>
            <p>
              Sneku Snek is a social media platform dedicated to creating and viewing posts about snakes. Our mission is to share snake content and change the negative perceptions about them.
            </p>
            <p className={AboutCSS.goldText}>We are not hiring ;3 Thanks!</p>
          </div>
          <img className={AboutCSS.img} src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1b4aba1b-d2a3-4f69-8a99-891fea3c2e8c/de9ps8k-84ab63ee-45b8-42ac-9658-5f93b1f189e9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzFiNGFiYTFiLWQyYTMtNGY2OS04YTk5LTg5MWZlYTNjMmU4Y1wvZGU5cHM4ay04NGFiNjNlZS00NWI4LTQyYWMtOTY1OC01ZjkzYjFmMTg5ZTkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.gCckMk4UmstZV7q7AzS9DUeelV8LU4o-Q5eVyGOvkeE" alt="Sneku Snek" />
        </div>
        <Footer />
      </div>
    );
  };
  
  export default About;
