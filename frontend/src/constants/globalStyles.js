/**
 * Global Styles
 * Injected CSS for global styling, animations, and utilities
 */

export const globalStylesCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');
  
  *, *::before, *::after { 
    box-sizing: border-box; 
    margin: 0; 
    padding: 0; 
  }
  
  html { 
    scroll-behavior: smooth; 
  }
  
  body { 
    font-family: 'DM Sans', sans-serif; 
    background: #111B21; 
    color: #fff; 
    overflow-x: hidden; 
  }
  
  ::-webkit-scrollbar { 
    width: 5px; 
  }
  
  ::-webkit-scrollbar-track { 
    background: #1C2B33; 
  }
  
  ::-webkit-scrollbar-thumb { 
    background: #128C7E; 
    border-radius: 3px; 
  }
  
  * { 
    -webkit-font-smoothing: antialiased; 
  }

  @keyframes floatY { 
    0%,100%{transform:translateY(0)} 
    50%{transform:translateY(-14px)} 
  }
  
  @keyframes pulse { 
    0%,100%{opacity:1;transform:scale(1)} 
    50%{opacity:.5;transform:scale(1.4)} 
  }
  
  @keyframes fadeUp { 
    from{opacity:0;transform:translateY(32px)} 
    to{opacity:1;transform:translateY(0)} 
  }
  
  @keyframes slideIn { 
    from{opacity:0;transform:translateX(-20px)} 
    to{opacity:1;transform:translateX(0)} 
  }
  
  @keyframes barGrow { 
    from{height:0} 
    to{height:var(--h)} 
  }
  
  @keyframes spin { 
    to{transform:rotate(360deg)} 
  }
  
  @keyframes shimmer { 
    0%{background-position:-200% 0} 
    100%{background-position:200% 0} 
  }

  .fade-up { 
    animation: fadeUp .7s ease both; 
  }
  
  .s1{animation-delay:.05s} 
  .s2{animation-delay:.12s} 
  .s3{animation-delay:.2s}
  .s4{animation-delay:.28s} 
  .s5{animation-delay:.38s} 
  .s6{animation-delay:.48s}

  .reveal { 
    opacity:0; 
    transform:translateY(24px); 
    transition: opacity .6s ease, transform .6s ease; 
  }
  
  .reveal.visible { 
    opacity:1; 
    transform:translateY(0); 
  }

  input, select {
    background: #2A3942;
    border: 1px solid #3B4D56;
    border-radius: 10px;
    padding: 12px 14px;
    font-size: 14px;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    width: 100%;
    outline: none;
    transition: border-color .2s;
  }
  
  input:focus, select:focus { 
    border-color: #25D366; 
  }
  
  input::placeholder { 
    color: #8696A0; 
  }
  
  select option { 
    background: #1C2B33; 
  }
`;
