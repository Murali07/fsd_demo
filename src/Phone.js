export function Phone({ mobile }) {
  return (
    <div className="phone-container">
      <img className="phone-picture" src={mobile.img} alt={mobile.model}></img>
      <h2 className="phone-name">{mobile.model}</h2>
      <p className="phone-company">{mobile.company}</p>
    </div>
  );
}
