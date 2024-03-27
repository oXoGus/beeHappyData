import React from 'react';

const styles = {
  body: {
    minHeight: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    background: 'linear-gradient(160deg, rgba(255,255,255,1) 0%, rgba(14,159,110,1) 100%)',
    backgroundRepeat: 'no-repeat',
  },
  loginPage: {
    background: 'rgba(252, 252, 252, 0)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(5.1px)',
    WebkitBackdropFilter: 'blur(5.1px)',
    border: '1px solid rgba(252, 252, 252, 0.38)',
    height: '400px',
    marginTop: '15%',
    marginLeft: '20%',
    marginRight: '20%',
    borderRadius: '16px',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'end',
  },
  loginTitle: {
    height: '50%',
    marginTop: '50px',
  },
  formField: {
    display: 'block',
    width: '100%',
    padding: '8px 16px',
    lineHeight: '25px',
    fontSize: '14px',
    fontWeight: '500',
    borderRadius: '6px',
    color: 'black',
    border: '1px solid var(--input-border)',
    background: 'var(--input-background)',
    transition: 'border .3s ease',
  },
  formFieldPlaceholder: {
    color: 'var(--input-placeholder)',
  },
  formFieldFocus: {
    outline: 'none',
    borderColor: 'var(--input-border-focus)',
  },
  formGroup: {
    position: 'relative',
    display: 'flex',
    marginTop: '25px',
    marginBottom: '25px',
    width: '75%',
  },
  formGroupSpan: {
    whiteSpace: 'nowrap',
    display: 'block',
  },
  formGroupSpanFirst: {
    borderRadius: '6px 0 0 6px',
  },
  formGroupSpanLast: {
    borderRadius: '0 6px 6px 0',
  },
  formGroupSpanNotFirst: {
    marginLeft: '-1px',
  },
  formGroupSpanText: {
    textAlign: 'center',
    padding: '8px 12px',
    fontSize: '14px',
    lineHeight: '25px',
    transition: 'background .3s ease, border .3s ease, color .3s ease',
  },
  formGroupSpanTextFocus: {
    color: 'var(--group-color-focus)',
    background: 'var(--group-background-focus)',
    borderColor: 'var(--group-border-focus)',
  },
  button: {
    marginBottom: '50px',
    marginTop: '25px',
    backgroundColor: '#04AA6D',
    border: 'none',
    color: 'white',
    padding: '13px 32px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '10px',
  },
  buttonHover: {
    backgroundColor: '#04aa6db6',
  },
};

function App() {
  return (
    <div style={styles.body}>
      <section style={styles.loginPage}>
        <h1 style={styles.loginTitle}>Connexion</h1>
        <div style={styles.formGroup}>
          <input style={styles.formField} type="email" placeholder="Email" />
          <span>@lyceemlk.org</span>
        </div>
        <div style={styles.formGroup}>
          <span>MDP</span>
          <input style={styles.formField} type="password" placeholder="Mot de Passe" />
        </div>
        <button style={styles.button}>Connexion</button>
      </section>
    </div>
  );
}

export default App;

