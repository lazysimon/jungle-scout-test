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