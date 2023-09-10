import React from 'react';
import './Home.css';

const  Home = () => {
  return (
    <div>
      <header className="header-top center flex-row padding-2">
        <div className="logo-container"> <a className="logo" href="#"> Volunteers benificial for your business </a> </div>
      </header>
      <div className="wrapper center-x flex-row">
        <div className="search-bar padding-1 max-1200 flex-row center-x margin-center">
          <form className="flex-row center"> 
            <input className="input-lg mr-1" type="text" placeholder="Job Title, Keywords or Company" />
            <select className="input-sm mr-1" name="information-type" id="">
              <option className="input" value="jobs"> web design</option>
              <option className="input" value="companies"> marketing and sales</option>
              <option className="input" value="salaries"> legal advices</option>
              <option className="input" value="interviews"> Technical help</option>
            </select>
            <input className="input-md mr-1" type="text" name="location" placeholder="Location" />
            <input className="input-md" type="submit" value="Search" />
          </form>
        </div>
      </div>
      <div className="wrapper bg center-x flex-row">
        <main className="flex-row mt-1 mb-4 max-1200 ">
          <div className="left-side flex-col job-main padding-1-0">
            <div className="job-listing-container flex-col center-x">
              <div className="job-item flex-row padding-1">
                <div className="img-container center flex-col padding-half-1">
                  <div className="img"></div>
                  <div className="rating padding-half-0"> <span className="font-light-sm"> 5 star </span>
                  </div>
                </div>
                <div className="information-container padding-half-0 flex-col">
                  <div className="company-name-container padding-half-0">
                    <h4> Volunteer Name </h4>
                  </div>
                  <div className="job-title-container padding-half-0">
                    <strong> <p className="job-title"> Ritu Kumari </p> </strong>
                  </div>
                  <div className="location-container padding-half-0"> <span className="font-light-sm">  Location, Location </span> </div>
                </div>
              </div>
            </div>
            <div className="job-listing-container flex-col center-x">
              <div className="job-item flex-row padding-1">
                <div className="img-container center flex-col padding-half-1">
                  <div className="img"></div>
                  <div className="rating padding-half-0"> <span className="font-light-sm"> 4 star</span>
                  </div>
                </div>
                <div className="information-container padding-half-0 flex-col">
                  <div className="company-name-container padding-half-0">
                    <h4> Volunteer Name </h4>
                  </div>
                  <div className="job-title-container padding-half-0">
                    <strong> <p className="job-title"> lucky singh </p> </strong>
                  </div>
                  <div className="location-container padding-half-0"> <span className="font-light-sm">  Location, Location </span> </div>
                </div>
              </div>
            </div>
            <div className="job-listing-container flex-col center-x">
              <div className="job-item flex-row padding-1">
                <div className="img-container center flex-col padding-half-1">
                  <div className="img"></div>
                  <div className="rating padding-half-0"> <span className="font-light-sm"> 5 star</span>
                  </div>
                </div>
                <div className="information-container padding-half-0 flex-col">
                  <div className="company-name-container padding-half-0">
                    <h4> Volunteer Name </h4>
                  </div>
                  <div className="job-title-container padding-half-0">
                    <strong> <p className="job-title"> Akash Kumar </p> </strong>
                  </div>
                  <div className="location-container padding-half-0"> <span className="font-light-sm">  Location, Location </span> </div>
                </div>
              </div>
            </div>
            {/* Repeat the job listing containers as needed */}
          </div>
          <div className="right-side job-main ">
            <header className="header-listing flex-row sticky center padding-1">
              <div className="job-listing-information-container flex-col mr-auto">
                <div className="company-name-container padding-half-0">
                  <h4> ritu kumari </h4>
                </div>
                <div className="job-title-container padding-half-0">
                  <strong> <p className="job-title"> Python</p> </strong>
                </div>
                <div className="location-container padding-half-0"> <span className="font-light-sm"> ranchi , Jharkhand </span> </div>
              </div>
              <div className="apply-container padding-half-0"> <button className="btn" type="submit"> Apply Now</button> </div>
            </header>
            <div className="job-description-container padding-1">
              <div className="title padding-1-0">
                <h3> Description </h3>
              </div>
              <div className="job-description padding-half-0">
                <p className="job-desc-text"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque officiis nesciunt accusantium, consequuntur tenetur, perferendis eaque alias sed non dignissimos accusamus dolorem fugit harum deleniti aspernatur facilis minus, repudiandae
                  quo. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum explicabo totam in, culpa rem fugiat atque, sed et accusantium nesciunt suscipit voluptatem! Corporis et id, aliquid architecto placeat ipsam ipsum.</p>
               
              </div>
            </div>
          </div>
        </main>
      </div>
      <footer>
        <p>Copyright &copy; 2023 jobsite. All rights reserved. | <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
      </footer>
    </div>
  );
}

export {Home};