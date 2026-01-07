import { Link, useNavigate } from "react-router";


export default function Navbar() {

  const navigate = useNavigate();

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>Router Sample App</div>
      <div style={styles.links}>
        <Link to="/home" style={styles.btn}>Home</Link>
        <button onClick={() => navigate("/about")} style={styles.btn}>About</button>
        <button onClick={() => navigate("/faq")} style={styles.btn}>FAQ</button>

        <Link to="/somewhere" style={styles.btn}>Broken Link</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem 2rem',
    backgroundColor: '#333',
    color: 'white',
    alignItems: 'center'
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold'
  },
  links: {
    display: 'flex',
    gap: '10px'
  },
  btn: {
    padding: '8px 16px',
    cursor: 'pointer',
    backgroundColor: '#555',
    color: 'white',
    border: 'none',
    borderRadius: '4px'
  }
};