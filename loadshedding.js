const baseUrl = 'https://webapp.williamdunn.za.net:5210/';

function getStatus(){  
    fetch(`${baseUrl}status`)
      .then(response => response.json())
      .then(data => {  
        document.getElementById('status').innerHTML = formatStatusResponse(data);
        document.getElementById('lsinfoboxNational').innerHTML = formatStatusResponseNational(data);
        document.getElementById('lsinfoboxRegional').innerHTML = formatStatusResponse(data);      
        formatStageCard();  
        formatStageCard2();
    })
    .catch(error => {    
    console.error('Error:', error);
    });
}

function formatStageCard(){
  var eskomStageCard = document.getElementById('EskomStageCard');
  var eskomStageCardColumn = document.getElementById('EskomStageCardColumn');

  if (eskomStageCard.textContent.trim() === 'Stage 0') {
    eskomStageCardColumn.style.backgroundColor = 'green';
  } else {
    eskomStageCardColumn.style.backgroundColor = 'orange';
  }
}

function formatStageCard2(){
  var CapeTownStageCard = document.getElementById('CapeTownStageCard');
  var CapeTownStageCardColumn = document.getElementById('CapeTownStageCardColumn');

  if (CapeTownStageCard.textContent.trim() === 'Stage 0') {
    CapeTownStageCardColumn.style.backgroundColor = 'green';
  } else {
    CapeTownStageCardColumn.style.backgroundColor = 'orange';
  }
}
 
function formatStatusResponse(data){   
  
  var ctStage = data.result.status.eskom.stage;
  var ctStageUpdated = data.result.status.capetown.stage_updated;
  var startDate = formatDate(ctStageUpdated);
  var name = data.result.status.capetown.name;

  var nextStage;
  var nextStageStart;
  var hasNextStage;
  
  const stage =  data?.result?.status?.capetown?.next_stages?.[0]?.stage;

  if (stage !== undefined) {
   hasNextStage = true;
   nextStage =  data.result.status.capetown.next_stages[0].stage;
   nextStageStart =  formatDate(data.result.status.capetown.next_stages[0].stage_start_timestamp);
  } else {
    hasNextStage = false;
    nextStage = '';
    nextStageStart = '';
  }

  const cacheUpdated = formatDate(data.result.logged);

/*
  var time = new Intl.RelativeTimeFormat('en', {numeric: "always"});
  const timeNow = new Date();
  const timeCache = new Date(cacheUpdated);
  const howLongAgo = Math.round((timeNow.getTime() - timeCache.getTime())/1000/60*-1);

  console.log(howLongAgo);
  const howLongAgoPrint = time.format(howLongAgo, 'minutes');
*/

  const howLongAgo = timeSince(cacheUpdated);
  
  var response = `Stage ${ctStage} for ${name} as of ${startDate}.`;
  if (hasNextStage){
    response += `Next: stage ${nextStage} at ${nextStageStart}`;
  } else {
    response += ` No change expected.`;
  }
  response +=  ` (${howLongAgo} ago)`;
  
  //document.getElementById('CapeTownStageCard').innerHTML = ctStage;

  return response;
}


function formatStatusResponseNational(data){   
  
  var ctStage = data.result.status.eskom.stage;
  var ctStageUpdated = data.result.status.eskom.stage_updated;
  var startDate = formatDate(ctStageUpdated);
  var name = data.result.status.eskom.name;

  var nextStage;
  var nextStageStart;
  var hasNextStage;
  
  const stage =  data?.result?.status?.eskom?.next_stages?.[0]?.stage;

  if (stage !== undefined) {
   hasNextStage = true;
   nextStage =  data.result.status.eskom.next_stages[0].stage;
   nextStageStart =  formatDate(data.result.status.eskom.next_stages[0].stage_start_timestamp);
  } else {
    hasNextStage = false;
    nextStage = '';
    nextStageStart = '';
  }

  const cacheUpdated = formatDate(data.result.logged);

/*
  var time = new Intl.RelativeTimeFormat('en', {numeric: "always"});
  const timeNow = new Date();
  const timeCache = new Date(cacheUpdated);
  const howLongAgo = Math.round((timeNow.getTime() - timeCache.getTime())/1000/60*-1);

  console.log(howLongAgo);
  const howLongAgoPrint = time.format(howLongAgo, 'minutes');
*/

  const howLongAgo = timeSince(cacheUpdated);
  
  var response = `Stage ${ctStage} for ${name} as of ${startDate}.`;
  if (hasNextStage){
    response += `Next: stage ${nextStage} at ${nextStageStart}`;
  } else {
    response += ` No change expected.`;
  }
  response +=  ` (${howLongAgo} ago)`;

  //document.getElementById('EskomStageCard').innerHTML = ctStage;
  
  return response;
}

function getAllowance(){
    fetch(`${baseUrl}allowance`)
    .then(response => response.json())
    .then(data => {  
        document.getElementById('allowance').innerHTML = formatAllowanceResponse(data);
    })
    .catch(error => {    
        console.error('Error:', error);
    });
}

function formatAllowanceResponse(data){
    var count = data.result.allowance.count;
    var limit = data.result.allowance.limit;
    var type = data.result.allowance.type;
    const cacheUpdated = formatDate(data.result.logged);
    const howLongAgo = timeSince(cacheUpdated);

    var response = `Quota: ${count}/${limit} ${type} (${howLongAgo} ago)`;
    
    return response;
}

  function formatDate(date){
   const dateobj = new Date(date);

    const formattedDate = new Intl.DateTimeFormat('en-ZA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }).format(dateobj);
      
      return formattedDate;
  }

  function getAreaInfo(){  
    fetch(`${baseUrl}areaInformation`)
    .then(response => response.json())
    .then(data => {  
    //console.log("Got a response!", data.result);
    document.getElementById('areaInfo').innerHTML = formatAreaInfoResponse(data);
    document.getElementById('lsinfobox').innerHTML = formatAreaInfoResponseForInfobox(data);    
    })
    .catch(error => {    
    console.error('Error:', error);
    });
}
 
function formatAreaInfoResponse(data) {
    //console.log(JSON.stringify(data.result.events[1].note));
    const eventCount = data.result.events.length;
    console.log(eventCount);
    const areaName = data.result.info.name;    
    
    const cacheUpdated = formatDate(data.result.logged);
    const howLongAgo = timeSince(cacheUpdated);

    var stageName = '';
    var stageStart = '';
    var stageEnd = '';
    var futureStageName = '';
    var futureStageStart = '';
    var futureStageEnd = '';
    var response = '';

    if (eventCount == 1) {
        stageName = data.result.events[0].note;
        stageStart = formatDate(data.result.events[0].start);
        stageEnd = formatDate(data.result.events[0].end);
        futureStageName = '';
        futureStageStart = '';
        futureStageEnd = '';
        response = `Next for ${areaName}: ${stageName} ${stageStart} - ${stageEnd} ${futureStageName ? `then ${futureStageName} ${futureStageStart} - ${futureStageEnd}` : ''} (${howLongAgo} ago)`;  
    } else if (eventCount > 1){
        stageName = data.result.events[0].note;
        stageStart = formatDate(data.result.events[0].start);
        stageEnd = formatDate(data.result.events[0].end);
        futureStageName = data.result.events[1].note;
        futureStageStart = formatDate(data.result.events[1].start);
        futureStageEnd = formatDate( data.result.events[1].end);
        response = `Next for ${areaName}: ${stageName} ${stageStart} - ${stageEnd} ${futureStageName ? `then ${futureStageName} ${futureStageStart} - ${futureStageEnd}` : ''} (${howLongAgo} ago)`;  
    }  else if (eventCount == 0){
      response = `No load shedding predicted!  (${howLongAgo} ago)`;
    }


    return response;
}


function formatAreaInfoResponseForInfobox(data) {
  //console.log(JSON.stringify(data.result.events[1].note));
  const eventCount = data.result.events.length;
  console.log(eventCount);
  const areaName = data.result.info.name;    
  
  const cacheUpdated = formatDate(data.result.logged);
  const howLongAgo = timeSince(cacheUpdated);

  var stageName = '';
  var stageStart = '';
  var stageEnd = '';
  var futureStageName = '';
  var futureStageStart = '';
  var futureStageEnd = '';

  if (eventCount == 1) {
      stageName = data.result.events[0].note;
      stageStart = formatDate(data.result.events[0].start);
      stageEnd = formatDate(data.result.events[0].end);
      futureStageName = '';
      futureStageStart = '';
      futureStageEnd = '';
  } else if (eventCount > 1){
      stageName = data.result.events[0].note;
      stageStart = formatDate(data.result.events[0].start);
      stageEnd = formatDate(data.result.events[0].end);
      futureStageName = data.result.events[1].note;
      futureStageStart = formatDate(data.result.events[1].start);
      futureStageEnd = formatDate( data.result.events[1].end);
  }
  
  nextLSStartsIn = timeUntil(stageStart);  
  
  var response;

  if (!isNaN(nextLSStartsIn)){
  response = `Next load shedding for ${areaName} starts in ${nextLSStartsIn}`;
 } else {
  response = `No load shedding predicted for ${areaName}. (${howLongAgo} ago)`;
 }

  return response;
}

var timeSince = function(date) {
  if (typeof date !== 'object') {
    date = new Date(date);
  }

  var seconds = Math.floor((new Date() - date) / 1000);
  var intervalType;

  var interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    intervalType = 'year';
  } else {
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      intervalType = 'month';
    } else {
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        intervalType = 'day';
      } else {
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
          intervalType = "hour";
        } else {
          interval = Math.floor(seconds / 60);
          if (interval >= 1) {
            intervalType = "minute";
          } else {
            interval = seconds;
            intervalType = "second";
          }
        }
      }
    }
  }

  if (interval > 1 || interval === 0) {
    intervalType += 's';
  }

  return interval + ' ' + intervalType;
};

var timeUntil = function(date) {
  if (typeof date !== 'object') {
    date = new Date(date);
  }

  var seconds = Math.floor((date - new Date()) / 1000);
  var intervalType;

  if (seconds < 0) {
    return 'Time has already passed';
  }

  var interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    intervalType = 'year';
  } else {
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      intervalType = 'month';
    } else {
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        intervalType = 'day';
      } else {
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
          intervalType = 'hour';
        } else {
          interval = Math.floor(seconds / 60);
          if (interval >= 1) {
            intervalType = 'minute';
          } else {
            interval = seconds;
            intervalType = 'second';
          }
        }
      }
    }
  }

  if (interval > 1 || interval === 0) {
    intervalType += 's';
  }

  return interval + ' ' + intervalType;
};



//var aDay = 24 * 60 * 60 * 1000;
//console.log(timeSince(new Date(Date.now() - aDay)));
//console.log(timeSince(new Date(Date.now() - aDay * 2)));


 // Function to start recurring timer
 function startRecurringTimer() {
  // Call the functions immediately when the page loads
  getStatus();
  getAreaInfo();
  console.log('ESP: Refreshed Status and AreaInfo');

  // Set up a recurring timer to call the functions every 60 seconds
  setInterval(function () {
    getStatus();
    getAreaInfo();
    console.log('ESP: Refreshed Status and AreaInfo');
  }, 60000); // 60 seconds in milliseconds
}

// Start the recurring timer when the page is loaded
window.onload = startRecurringTimer;

  
  document.addEventListener("DOMContentLoaded", function () {
    const checkbox = document.getElementById("area-info-checkbox");
    const allowance = document.getElementById("areaInfo");
  
    checkbox.addEventListener("change", function () {
      if (checkbox.checked) {
        allowance.style.display = "block";
      } else {
        allowance.style.display = "none";
      }
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    const checkbox = document.getElementById("status-checkbox");
    const allowance = document.getElementById("status");
  
    checkbox.addEventListener("change", function () {
      if (checkbox.checked) {
        allowance.style.display = "block";
      } else {
        allowance.style.display = "none";
      }
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    const checkbox = document.getElementById("allowance-checkbox");
    const allowance = document.getElementById("allowance");
  
    checkbox.addEventListener("change", function () {
      if (checkbox.checked) {
        allowance.style.display = "block";
      } else {
        allowance.style.display = "none";
      }
    });
  });