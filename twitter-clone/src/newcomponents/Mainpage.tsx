import "./Mainpage.css";

const Mainpage = () => {
  return (
    <div className="container">
      <div className="date_container">
        <label htmlFor="date_input" className="datetext">
          Date
        </label>
        <input type="date" id="date_input" className="date_input" />
      </div>
      <div className="other-container">
        <span className="companytext">Company Name</span>
      </div>
    </div>
  );
};

export default Mainpage;
