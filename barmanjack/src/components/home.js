import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

import '../fonts/alcubierre.css';
import header from '../images/header.png';

class Home extends Component {
  
  render() {
    return (
      <div>
        <div className={css(style.header)}>
          <button>ВОЙТИ &#128898;</button>
          <div>  
            <img src={require('../images/robot.png')}/><h3 className="title">Barman<span className="jack">Jack</span></h3>
            <h1>Lorem ipsum</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco</p>
          </div>        
        </div>

        <div className={css(style.features)}>
          <h3>More than messaging</h3>
          <p>With a variety of calling and messaging features, you have endless options when it comes to expressing yourself.</p>
          <div>
            <div className={css(style.item)}>
              <div></div>
              <h5>Audio and video calls</h5>
              <p>High-quality calls for a quick “hello” or a much-needed face-to-face</p>
            </div>

            <div className={css(style.item)}>
              <div></div>
              <h5>Audio and video calls</h5>
              <p>High-quality calls for a quick “hello” or a much-needed face-to-face</p>
            </div>

            <div className={css(style.item)}>
              <div></div>
              <h5>Audio and video calls</h5>
              <p>High-quality calls for a quick “hello” or a much-needed face-to-face</p>
            </div>
          </div>
          <button>DISCOVER MORE FEATURES</button>
        </div>

        <div className={css(style.middle)}>
          <h3>More than messaging</h3>
          <div>
            <div className={css(style.phone)}>
              <img src={require('../images/ios-phone.png')}/>
              <a href='#'><img src={require('../images/app-store.png')}/></a>
            </div>

            <div className={css(style.qrcode)}>
              <img src={require('../images/qr-code.png')}/>
            </div>
            
            <div className={css(style.phone)}>
              <img src={require('../images/android-phone.png')}/>
              <a href='#'><img src={require('../images/google-play.png')}/></a>                            
            </div>  
          </div>
        </div>
          
        <div className={css(style.restaurant)}>
          <img src={require('../images/rest-3.png')}/> 
          <img src={require('../images/rest-3.png')}/> 
          <img src={require('../images/rest-3.png')}/> 
          <img src={require('../images/rest-3.png')}/> 
          <img src={require('../images/rest-3.png')}/> 
          <img src={require('../images/rest-3.png')}/> 
        </div>

        <div className={css(style.footer)}>
          <div className={css(style.footerCont)}>  
            <div>
              <img src={require('../images/barman-jack.png')}/>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p>
            </div>

            <ul>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
            </ul>

            <ul>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
            </ul>

            <ul>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
            </ul>

            <span>
              <p><i class="fas fa-map-marker-alt"></i> 21, Revolution street Paris, France</p>
              <p><i class="fas fa-phone"></i> +380542795254</p>
              <p><i class="far fa-envelope"></i> email@gmail.com</p>
            </span>
          </div>
          <span>
            <p>All right reserved</p>
            <div>
              <a href="#"><i class="fab fa-facebook-f"></i></a>
              <a href="#"><i class="fab fa-google-plus-g"></i></a>
              <a href="#"><i class="fab fa-linkedin-in"></i></a>
            </div>
          </span>
        </div>      
      </div>
    );
  }
}

const style = StyleSheet.create({
  header: {
    background: `url(${header}) no-repeat 100%`,
    backgroundSize: '100% 100%',
    ':nth-child(1n) > button': {
      background: 'none',
      margin: '10px 10px 0 0',
      float: 'right',
      border: '1px solid #a000ad',
      color: '#a000ad',
      borderRadius: 10,
      padding: '5px 10px',
      cursor: 'pointer',
      fontFamily: "'Lato', sans-serif",
      fontSize: 12,
      ':hover': {
        backgroundColor: '#a000ad',
        color: '#FFF',
        transition: 0.5
      }
    },
    ':nth-child(1n) > div': {
      padding: '100px 0 120px 60px',
      ':nth-child(1n) > img': {
        float: 'left',
        marginRight: 12,
        width: 40,
        height: 36
      },
      ':nth-child(1n) > h1': {
        fontFamily: "'Lato', sans-serif",
        fontSize: 60,
        fontWeight: 700,
        letterSpacing: 2.1,
        marginTop: 15,
        color: '#6A6A6A'
      },
      ':nth-child(1n) > p': {
        marginTop: 10,
        fontFamily: "'Lato', sans-serif",
        fontSize: 22,
        width: 520,
        color: '#6A6A6A'
      }
    }
  },

  features: {
    textAlign: 'center',
    marginTop: 30,
    ':nth-child(1n) > h3': {
      fontFamily: "'Lato', sans-serif",
      fontSize: 42,
      color: '#6A6A6A'
    },
    ':nth-child(1n) > p': {
      fontFamily: "'Lato', sans-serif",
      letterSpacing: 0.75,
      fontSize: 15,
      color: '#6A6A6A',
      width: 420,
      margin: '10px auto 30px auto'
    },
    ':nth-child(1n) > div': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    ':nth-child(1n) > button': {
      background: 'none',
      margin: '40px auto',
      border: '1px solid #a000ad',
      color: '#a000ad',
      borderRadius: 15,
      padding: '5px 10px',
      cursor: 'pointer',
      fontFamily: "'Lato', sans-serif",
      fontSize: 18,
      ':hover': {
        backgroundColor: '#a000ad',
        color: '#FFF',
        transition: 0.5
      }
    }
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ':nth-child(1n) > div': {
      width: 300,
      height: 224,
      backgroundColor: '#EAEAEA',
      borderRadius: 10
    },
    ':nth-child(1n) > h5': {
      fontFamily: "'Lato', sans-serif",
      fontSize: 20,
      fontWeight: 700,
      color: '#6A6A6A',
      margin: '10px auto'
    },
    ':nth-child(1n) > p': {
      fontFamily: "'Lato', sans-serif",
      fontSize: 12,
      width: 230,
      color: '#6A6A6A'
    }
  },

  middle: {
    textAlign: 'center',
    backgroundColor: '#ecdfed',
    padding: '30px 0',
    ':nth-child(1n) > h3': {
      fontFamily: "'Lato', sans-serif",
      fontSize: 42,
      color: '#6A6A6A'
    },
    ':nth-child(1n) > div': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around'
    }
  },
  qrcode: {
    marginTop: 100,
    padding: 80,
    position: 'absolute',
    border: '1px solid #000',
    transform: 'rotate(-45deg)',
    ':nth-child(1n) > img': {
      transform: 'rotate(45deg)'
    }
  },
  phone: {
    zIndex: 1000,
    marginTop: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ':nth-child(1n) > a': {
      marginTop: 10
    }
  },

  restaurant: {
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#F2F2F2' 
  },

  footer: {
    backgroundColor: '#323245',
    padding: '30px 120px',
    ':nth-child(1n) > span': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 10px',
      ':nth-child(1n) > p': {
        fontFamily: "'Lato', sans-serif",
        fontSize: 10,
        color: '#7A7A7A'
      },
      ':nth-child(1n) > div': {
        display: 'flex',
        flexDirection: 'row',
        margin: '0 auto',
        ':nth-child(1n) > a': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 10px',
          width: 36,
          height: 36,
          borderRadius: '50%',
          backgroundColor: '#656D85',
          color: '#FFF',
          textDecoration: 'none'
        }  
      }
    }
  },
  footerCont: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 15,
    borderBottom: '1px solid #8C8C8C',
    ':nth-child(1n) > div': {
      maxWidth: 300,
      ':nth-child(1n) > img': {
        marginTop: '-10px'
      },
      ':nth-child(1n) > p': {
        marginTop: 15,
        fontFamily: "'Lato', sans-serif",
        fontSize: 10,
        color: '#F2F2F2'
      }  
    },
    ':nth-child(1n) > ul': {
      padding: '0 20px',
      ':nth-child(1n) > li': {
        fontFamily: "'Lato', sans-serif",
        fontSize: 12,
        color: '#F2F2F2'
      }  
    },
    ':nth-child(1n) > span': {
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Lato', sans-serif",
      fontSize: 12,
      color: '#F2F2F2',
      ':nth-child(1n) > p': {
        marginBottom: 8
      }      
    }
  }
})

export default Home;

