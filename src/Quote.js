import React, { useState, useEffect } from 'react';
import './Quote.css'
import logo from'./images/logo.png'
import img_1 from './images/1.png'
import img_2 from './images/2.png'
import img_3 from './images/3.png'
import img_4 from './images/4.png'
import img_5 from './images/5.png'
import img_6 from './images/6.png'
import img_7 from './images/7.png'


const Quote = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('Kanye West');
  const [isKanyeQuote, setIsKanyeQuote] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [image, setImage] = useState('');

  useEffect(() => {
    fetchNewQuote();
  }, []);

  const fetchNewQuote = () => {
    // Array of quotes that were not said by Kanye
    const otherQuotes = [
      "You can't start the next chapter of your life if you keep re-reading the last one.",
      "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
      "Believe you can and you're halfway there.",
      "The only way to do great work is to love what you do.",
      "Happiness is not something ready-made. It comes from your own actions.",
      "My ego is not a burden. It's the vehicle for my greatness.",
      "I am a god, but not the one you're thinking of.",
      "I don't have haters, just people who are afraid to love me.",
      "I don't follow trends, I create them.",
      "I don't care what people say about me, as long as they're talking about me.",
      "I'm not arrogant, I'm confident in my abilities.",
      "My only competition is myself.",
      "I'm not here to fit in, I'm here to stand out.",
      "I'm a visionary, not a dreamer.",
      "My mind is like a diamond, it shines in every direction.",
      "I'm not a rapper, I'm a philosopher with a flow.",
      "I'm not afraid to be different, I'm afraid of being the same as everyone else.",
      "I'm not a legend yet, but I will be.",
      "I'm not here to be liked, I'm here to be heard.",
      "I don't make music, I make history."
    ];

    // Get random number to determine if quote is from API or otherQuotes
    const randomNum = Math.floor(Math.random() * 6);

    // Fetch quote from API if random number is less than 3, else select quote from otherQuotes
    if (randomNum < 3) {
      fetch('https://api.kanye.rest/')
        .then(response => response.json())
        .then(data => {
          setQuote(data.quote);
          setIsKanyeQuote(true);
        });
    } else {
      const randomQuote = Math.floor(Math.random() * otherQuotes.length)
      setQuote(otherQuotes[randomQuote]);
      setIsKanyeQuote(false);
    }

    setIsAnswered(false);
  };

  const handleSaidClick = () => {
    setIsAnswered(true);
    setIsCorrect(isKanyeQuote);
  };

  const handleNotSaidClick = () => {
    setIsAnswered(true);
    setIsCorrect(!isKanyeQuote);
  };

  const handleNewQuoteClick = () => {
    fetchNewQuote();
  };


  const images = [
    img_1,
    img_2,
    img_3,
    img_4,
    img_5,
    img_6,
    img_7
  ];


  const changeImage = () => {
    const randomImage = images[Math.floor(Math.random() * images.length)];
    setImage(randomImage);
  };



  return (
    <div> 
      <div className='top-head'>
        <center><img src={logo} alt='logo' width="50%" onContextMenu="return false;"></img></center>
        <h1>STOIC KANYE</h1>
      </div>

      <div className='icons'>
        
      </div>
      <div className='parent'>
        <div className='quote'>
          <center><h2>"{quote}"</h2></center>
          <center><h3>- {author}</h3></center>
          {isAnswered && isCorrect && <p className='correct'>Correct!</p>}
          {isAnswered && !isCorrect && <p className='wrong'>Wrong.</p>}
          {!isAnswered && (
            <div>
              <center><button onClick={handleSaidClick}>KANYE SAID IT</button>
              <button onClick={handleNotSaidClick}>SOMEONE SAID IT</button></center>
            </div>
          )}
          {isAnswered && (
            <center><button onClick={() => { handleNewQuoteClick(); changeImage();}}>NEW QUOTE</button></center>
          )}
          
        </div>
        <div className='stoic'><center><img src={image} width="50%" onContextMenu="return false;"></img></center></div>
      </div>
    </div>
  );
};

export default Quote;
