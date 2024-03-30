let apiQuotes = [];
const newBtn = document.querySelector('#new-quote');
const tweerBtn = document.getElementById('twitter');
const quoteText = document.querySelector('.quote');
const authorText = document.getElementById('author');
const textContainer = document.querySelector('.quote-text');
const loader = document.getElementById('loader');
const quoteContainer = document.getElementById('quote-generator');
// Loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// Complete
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}
function newQuote(){
    loading();
    const randomNum = Math.round(Math.random()*(apiQuotes.length - 1));
    const iterable = Object.entries(apiQuotes);
    const [,{text:t, author:a}] = iterable[randomNum];
    authorText.textContent = a.split(',')[0]??'Unknown';
    if(t.length>120){
        textContainer.classList.add('long-quote')
        quoteText.textContent = t??'Sorry Noting to see, Try Again 🙏🙏🙏';
        complete();//Removing the Loader signal
    }else{
        textContainer.classList.remove('long-quote');
        quoteText.textContent = t??'Sorry Noting to see, Try Again 🙏🙏🙏';
        complete();//Removing the Loader signal
    } 
}
// Get Quotes form API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        // response.json() returns a Promise, so you need to handle it as a Promise
        const jsonData = await response.json();
        // Now, you can access the jsonData as it is resolved here
        apiQuotes = jsonData;
        newQuote();
    } catch (error) {
        console.error('Error:', error);
    }
}

// Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}  -- ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

//Event Listners
newBtn.addEventListener('click', newQuote);
tweerBtn.addEventListener('click', tweetQuote);

getQuotes();

