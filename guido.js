const request = require('request');
const faker = require('faker');
faker.locale = 'es';


//Settings
const maxWaitTime = 200000; //milliseconds
const minWaitTime = 30000;  //milliseconds
//End settings

//Code
(function loop() {

  var randomEmail = function(){
  const domains = ['gmail', 'yahoo', 'hotmail', 'fibertel', 'arnet'];
  const unions = ['_', '.', ''];
  var domain = domains[Math.floor(Math.random() * domains.length)];
  var union = unions[Math.floor(Math.random() * unions.length)];
  var firstName = faker.name.firstName();
  var lastName = faker.name.lastName();
  if (Math.floor(Math.random()*10)%2===0){
    fullName = lastName + union + firstName;
  } else {
    fullName = firstName + union + lastName;
  }
  fullName = fullName.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/ /g, "");
  return fullName.concat('@').concat(domain).concat('.com').toLowerCase();
}

var voteForGuido = function(){
  var nextEmail = randomEmail();
  console.log("Voting using email: " + nextEmail);

  var options = {
    url: 'https://www.tengotodoexceptoati.com.ar//front/votar',
    method: 'POST',
    headers: {
     'origin': 'https://www.tengotodoexceptoati.com.ar',
     'referer': 'https://www.tengotodoexceptoati.com.ar//front/ver_video/221',
     'authority': 'www.tengotodoexceptoati.com.ar',
     'accept-encoding': 'gzip, deflate, br',
     'accept-language':'en-US,en;q=0.9,es-US;q=0.8,es;q=0.7',
     'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
     'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
     'accept': '*/*',
     'x-requested-with': 'XMLHttpRequest'
    },
    form: {
     video_id: 221,
     email: nextEmail
    }
   };
   request(options, function (error, response, body) {
     console.log('res > statusCode:', response && response.statusCode);
   });
}

  var rand = Math.round(Math.random() * (maxWaitTime - minWaitTime)) + minWaitTime;
  setTimeout(function() {
          voteForGuido();
          loop();  
  }, rand);
  console.log("Next attempt in "  + (rand/1000) + " seconds");
}());
