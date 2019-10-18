//Setting the bot up and the required things
var express = require('express'),
    app = express(),   
    Twit = require('twit'),
    config = {    
      twitter: {
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token: process.env.ACCESS_TOKEN,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
      }
    },
    T = new Twit(config.twitter);

app.use(express.static('public'));

//This bot uses cron-job.org. Other free sites are also available. Cron-job is easiest to set up imo

app.all(`/${process.env.BOT_ENDPOINT}`, function(req, res){

  T.post('statuses/update', { status: countdownMessage() }, function(err, data, response) {
    if (err){
      console.log('error!', err);
      res.sendStatus(500);
    }
    else{
      res.sendStatus(200);
    }
  });
});

var listener = app.listen(process.env.PORT, function(){
  console.log('Countdown bot is running on port ' + listener.address().port);
});

//The date here is the 
var countdownMonth=10;
var countdownDay=15;

const moment = require ("moment");

//Get current date and time
const current = new Date();

//Get current timestamp in UTC
const now = current.getTime();

var currentYear = current.getUTCFullYear();
var currentMonth = current.getUTCMonth();
var currentDate = current.getUTCDate();

//Convert countdown date to UTC
const end =  new Date(Date.UTC(currentYear, countdownMonth, countdownDay, 0, 0, 0, 1)).getTime();

const diffTime = end - now;

var diffDuration = moment.duration(diffTime, 'milliseconds');

// Returns the message as the status.
function countdownMessage() {
  
  var status = '';
  
   if(diffTime > 0)  //Start of the  caltulation for the date. Syntax for the message can be changed here. 
{

     status += 'There are only';
    /*                                                  The start of the calculations start here. Because the bot posts an update once every day the minutes and hours is not needed.
     if(diffDuration.months() > 1 )                     The bot started when there was less than a month remaining, so the months calculation has been commented out. 
     {
			status += ` ${diffDuration.months()} months,`;
     } 
     else if (diffDuration.months() == 1 )
     {
			status += ` ${diffDuration.months()} month`;
   	 }
   	*/
	if(diffDuration.days() > 1 )
     {
			status += ` ${diffDuration.days()} days,`;
     }
     else if (diffDuration.days() == 1 )
     {
			status += ` ${diffDuration.days()} day`;
   	 }
    /*
    if(diffDuration.hours() > 1 )
     {
			status += ` ${diffDuration.hours()} hours,`;
     }
     else if (diffDuration.hours() == 1 )
     {
			status += ` ${diffDuration.hours()} hour`;
   	 }
	
	if(diffDuration.minutes() > 1 )
     {
			status += ` and ${diffDuration.minutes()} minutes,`;
     }
     else if (diffDuration.minutes() == 1 )
     {
			status += ` ${diffDuration.minutes()} minute`;
      }
      */
	
//Status text until final
	status += ' left until the release of #StarWarsJediFallenOrder #JediFallenOrder';
}
else
{
 //Final status
    status += 'The day is finally here! #JediFallenOrder #StarWarsJediFallenOrder has arrived!!';
}
  
  return status;
  
};
