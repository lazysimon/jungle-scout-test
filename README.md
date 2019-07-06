# Jungle Scout Amazon ASIN Data Scraper Application

## Description ##
 This application scrapes the data from Amazon given an ASIN. It will return the product's category, rank & product dimensions. The data is then stored in the database and is display the data on the front-end. The application was made with the "MERN" stack:  MongoDB, Express.js, ReactJS, and Node.js. To scrape the Amazon data, I used Cheerio and Selenium. 

## Setup ##
__Step 1:__ Clone the repo.  
__Step 2:__  Get server running. In terminal, type the follow commands:  
in terminal...
```
cd jungle-scout/api
nodemon server
```
__Step 3:__ Get client running. In terminal, type the following commands:  
in terminal... 
```
cd jungle-scout/app
npm start
```

__To run tests:__
```
cd jungle-scout/api
npm run test
```

__Note:__ You may need to download ChromeDriver that matches your Chrome version that you are currently using: http://chromedriver.storage.googleapis.com/index.html

## Test Considerations:

- There are many variations of the Product Information/Details on a product page. My code has only accounted for these 4 variations:

![](https://paper-attachments.dropbox.com/s_FE3CE9E74DAEF32A9C0A9D2F16E4532C410853ABF3AD1FDA853C8456D433F590_1562360422735_product-type-1.png)

![](https://paper-attachments.dropbox.com/s_FE3CE9E74DAEF32A9C0A9D2F16E4532C410853ABF3AD1FDA853C8456D433F590_1562360439764_Screen+Shot+2019-06-30+at+10.33.04+PM.png)

![](https://paper-attachments.dropbox.com/s_FE3CE9E74DAEF32A9C0A9D2F16E4532C410853ABF3AD1FDA853C8456D433F590_1562360447529_Screen+Shot+2019-06-30+at+10.33.19+PM.png)

![](https://paper-attachments.dropbox.com/s_FE3CE9E74DAEF32A9C0A9D2F16E4532C410853ABF3AD1FDA853C8456D433F590_1562360454506_Screen+Shot+2019-07-03+at+4.52.19+PM.png)

- I wasn't sure what type of category you wanted so I just scraped the highest level category
- The scraper is only tested for amazon.com, not .ca or any other regions. 
- I have considered if the user has entered a ASIN that does not exist

__P.S__ I know the API call is slow.... I'm so sorry....

## What were the biggest challenges you faced in writing the challenge?

There were many challenges! The biggest challenges I faced when writing this application was scraping the data from Amazon's site. I’ve never done any data scraping but I’ve always wanted to! I realized I can’t just use Cheerio to scrape amazon data because amazon is too smart! It blocks me and tells me to use their API instead. 

Honestly, another "challenge" was the project structure/architecture. I think most developers come into a job with code that already exists which means they have proper structure already. So I had to really think how I wanted my app to be structured and the naming conventions of such. 

## Can you explain your thought process on how you solved the problem, and what iterations you went through to get to this solution?

To solve the problem, it took a lot of googling! But I figured out I needed to create a mock browser with the proper user agents then get data through that browser session. To do that, I used `selenium-webdriver`. 

## If you had to scale this application to handle millions of people adding in ASIN's in a given day, what considerations would you make?

To scale this application, I know I cannot use `selenium-webdriver` because it really slow and inefficient to load the whole browser each time you are fetching data, but i couldn’t think of another way to properly bypass amazons captcha blocks. If I continue to fetch data by scraping, there are a lot of variations of the Product Details/Information html structure. I tried to account for the 4 I have found, but I know there must be more. So in the future, I would just use the Amazon API. It seems to be the safest. 

Also, we would need enough containers in AWS to support the amount of requests made. We would need a lot of tests in place to make sure nothing fails, and if it does, we would rollback to the previous version where it worked. 

## Why did you choose the technologies you used?
I chose the MERN stack because it's the stack i am the most familiar with. In the future, if scraping would have to be always done, i think Python would be the better choice. I chose to use `selenium-webdriver` versus `puppeteer` because selenium is widely used in other languages, not just in node. They both do the same thing. I tried using puppeteer but it wasn't giving me a faster result. I chose Cheerio because it was a well known library for scraping in Node. For tests I used mocha, chai, and supertest. 

## Comments
I would love some feedback! I know what I did is not the "best" or the "correct" way to do things. I know this is not perfect. There can be many things that can be improved. I would love to know what is the best practices for some of these things. I love constructive criticism! 

