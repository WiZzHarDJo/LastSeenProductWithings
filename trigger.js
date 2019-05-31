module.exports = function triggers (options, cb) {
  
  //Variables & Constants
  const cm = require('cookieman');
  let lastSeenProduct;
  const targetDevice = /computer/
  let computerCheck = false;
  const triggerCategoryPagesRegex = /https:\/\/www.withings.com\/..\/..\/(watches|scales|health-monitors)/
  const triggerMainageRegex = /^https:\/\/www.withings.com\/..\/..\/$/
  let getPageUrl; 
  
  const body = /^Body/
  const bpm = /^BPM$/
  const sleep = /^Sleep$/
  const thermo = /^Thermo$/
  const bodyplus = /^Body\+/
  const bodycardio = /^Body Cardio/
  const pulsehr = /^Pulse HR/
  const steel = /^Steel White$/
  const steelhr = /^Steel HR 36mm Black$/
  const steelshrsport = /^Steel HR Sport 40mm White$/
  const move =/^(withings-move|Withings Move Basic Essentials Black & Yellow Gold)$/
  const sapphire = /^Steel HR 36mm Sapphire Signature White & Rose Gold$/
  const limmited = /^Steel HR 36mm Blue & Rose Gold$/
  const targetLanguage = /^(en)$/i
  let weightUnit = "kg"
  let numberOfSession;
  
  //get the device the user is using to browse the webiste & get the current page url
  function getUserDeviceAndPageUrl(){

    //check the user device
    options.getBrowserState().then(state => {
      if (targetDevice.test(state.ua.deviceType)) {
        computerCheck = true
      }
      
      //get the current page
      getPageUrl = state.url;
    })
  }

  //get the current session's number
  function getUserSession(){
    options.getVisitorState().then(function (state) {
      console.log("SESSION NUMBER", state.sessionNumber)
      numberOfSession = state.sessionNumber;
    })
  }

  function dropCookie(name,value){
    cm.set(name, value, {
      domain: options.meta.cookieDomain,
      path: '/'
    })
    console.log("dropping cookie", name, value);
  }

  function clearCookie(name){
    cm.clear(name, {
      path: '/', // e.g. '/'
      domain: options.meta.cookieDomain // e.g. '.foo.com'
    }) // true

    console.log("clearing cookie", name);
  }
  
  //associate the cookie with a full product set and send it to the variation
  function checkCookie(cookie){
      console.log("the cookieProduct being checked is", cookie[0])
      
      switch(true){
        
          case bpm.test(cm.val(cookie[0].name)): 
            options.state.set('lastSeenProduct', "BPM");
            options.state.set('picture', "https://image-cache.withings.com/site/media/wi_products/blood-pressure-monitor.png?fit&src=png&h=300")
            options.state.set("descr", cm.val(`${options.meta.visitorId}description`) )
            options.state.set("link", "/blood-pressure-monitor")
          return true;
          
          case sleep.test(cm.val(cookie[0].name)): 
            options.state.set('lastSeenProduct', "Sleep")
            options.state.set('picture', "https://image-cache.withings.com/site/media/wi_products/sleep-single.png?fit&src=png&h=300")
            options.state.set("descr", cm.val(`${options.meta.visitorId}description`) )
            options.state.set("link", "/sleep")
          return true;
          
          case thermo.test(cm.val(cookie[0].name)): 
            options.state.set('lastSeenProduct', "Thermo")
            options.state.set('picture', "https://image-cache.withings.com/site/media/wi_products/thermo-c.png?fit&src=png&h=300")
            options.state.set("descr", cm.val(`${options.meta.visitorId}description`) )
            options.state.set("link", "/thermo")
          return true;
          
          case bodyplus.test(cm.val(cookie[0].name)): 
            options.state.set('lastSeenProduct', "Body+")
            options.state.set('picture', `https://image-cache.withings.com/site/media/wi_products/body-plus-black-${weightUnit}.png?fit&src=png&h=300`)
            options.state.set("descr", cm.val(`${options.meta.visitorId}description`) )
            options.state.set("link", "/body-plus")
          return true;
          
          case bodycardio.test(cm.val(cookie[0].name)): 
            options.state.set('lastSeenProduct', "Body Cardio")
            options.state.set('picture', `https://image-cache.withings.com/site/media/wi_products/body-cardio-black-nokia-${weightUnit}.png?fit&src=png&h=300`)
            options.state.set("descr", cm.val(`${options.meta.visitorId}description`) )
            options.state.set("link", "/body-cardio")
          return true;
          
          case body.test(cm.val(cookie[0].name)): 
            options.state.set('lastSeenProduct', "Body")
            options.state.set('picture', `https://image-cache.withings.com/site/media/wi_products/body-black-${weightUnit}.png?fit&src=png&h=300`)
            options.state.set("descr", cm.val(`${options.meta.visitorId}description`) )
            options.state.set("link", "/body")
          return true;
          
          case steel.test(cm.val(cookie[0].name)): 
            options.state.set('lastSeenProduct', "Steel")
            options.state.set('picture', "https://image-cache.withings.com/site/media/wi_products/steel-white.png?fit&src=png&h=300")
            options.state.set("descr", cm.val(`${options.meta.visitorId}description`) )
            options.state.set("link", "/steel")
          return true;
          
          case steelhr.test(cm.val(cookie[0].name)): 
            options.state.set('lastSeenProduct', "Steel HR")
            options.state.set('picture', "https://image-cache.withings.com/site/media/wi_products/steel-hr-36b.png?fit&src=png&h=300&dpr=2")
            options.state.set("descr", cm.val(`${options.meta.visitorId}description`) )
            options.state.set("link", "/steel-hr")
          return true;
          
          case steelshrsport.test(cm.val(cookie[0].name)): 
            options.state.set('lastSeenProduct', "Steel HR Sport")
            options.state.set('picture', "https://image-cache.withings.com/site/media/wi_products/steel-hr-sport-40b.png?fit&src=png&h=300&dpr=2")
            options.state.set("descr", cm.val(`${options.meta.visitorId}description`) )
            options.state.set("link", "/steel-hr-sport")
          return true;
          
          case pulsehr.test(cm.val(cookie[0].name)): 
            options.state.set('lastSeenProduct', "Pulse HR")
            options.state.set('picture', "https://image-cache.withings.com/site/media/wi_products/pulse-hr-black.png?fit&src=png&h=300")
            options.state.set("descr", cm.val(`${options.meta.visitorId}description`) )
            options.state.set("link", "/pulse-hr")
          return true;
          
          case move.test(cm.val(cookie[0].name)):
            options.state.set('lastSeenProduct', "Move")
            options.state.set('picture', "https://image-cache.withings.com/site/media/wi_products/withings-move-basic-white-sea-blue.png?fit&src=png&h=300")
            options.state.set("descr", cm.val(`${options.meta.visitorId}description`) )
            options.state.set("link", "/withings-move")
          return true;
          
          case sapphire.test(cm.val(cookie[0].name)):
            options.state.set('lastSeenProduct', "Steel HR Sapphire")
            options.state.set('picture', "https://image-cache.withings.com/site/media/wi_products/steel-hr-sapphire-36rgw.png?fit&src=png&h=300")
            options.state.set("descr", cm.val(`${options.meta.visitorId}description`) )
            options.state.set("link", "/steel-hr-sapphire-signature")
          return true;
          
          case limited.test(cm.val(cookie[0].name)):
            options.state.set('lastSeenProduct', "Steel HR Limited Edition")
            options.state.set('picture', "https://image-cache.withings.com/site/media/wi_products/steel-hr-36rgblue.png?fit&src=png&h=300")
            options.state.set("descr", cm.val(`${options.meta.visitorId}description`) )
            options.state.set("link", "/steel-hr-limited-edition")
          return true;
          
          default: return false;
      }
  }
  
  //get the user device
  getUserDeviceAndPageUrl();

  //get user session number
  getUserSession();

  //get the user language and display right weight units
  options.uv.on('ecView', (data) => {
    lang = data.language
    options.state.set("language", lang)
    if (targetLanguage.test(lang)) {
      weightUnit = "lb"
    }
    console.log("rentre dans le test fdp", /^https:\/\/www\.withings\.com\/..\/..\/(withings-move|withings-move\/store)$/.test(getPageUrl), getPageUrl)

    if(/^https:\/\/www\.withings\.com\/..\/..\/(withings-move|withings-move\/store)$/.test(getPageUrl)){
      let descriptionMove;

      lastSeenProduct = data.subtypes[0];

      getUserSession();

      console.log("Is this the fucking move for fuck sake's", lastSeenProduct);

      if(lang === 'fr'){
        descriptionMove = "Montre tracker d'activité";
      }
      else if(lang === 'de'){
        descriptionMove = "Fitnessuhr";
      }
      else {
        descriptionMove = "Activity Tracking Watch";
      }

      console.log("this is the move description", descriptionMove);
      
      //cookie containing the last seen product name
      const cookieLastSeenProduct = `${options.meta.visitorId}`;
      dropCookie(cookieLastSeenProduct,`${lastSeenProduct}`);
      dropCookie(`${options.meta.visitorId}description`,`${descriptionMove}`);
  
      dropCookie("hasBeenClicked", "true");
      dropCookie("sessionWhenClicked", `${numberOfSession}`);
      
      options.emitCustomGoal('t103:hasSeenAProduct');
    }
  }).replay()

  //Put the last product seen in a cookie & stop the display of the card by giving a cookie flag to the user
  options.uv.on('ecProduct', (data) => {

    getUserSession();
       
    lastSeenProduct = data.product.name;
    console.log("LAST SEEN PRODUCT", lastSeenProduct);

    //cookie containing the last seen product name
    const cookieLastSeenProduct = `${options.meta.visitorId}`;
    dropCookie(cookieLastSeenProduct,`${lastSeenProduct}`);
    console.log("PRODUCT DESCRIPTION", data.product.description)
    dropCookie(`${options.meta.visitorId}description`,`${data.product.description}`);

    dropCookie("hasBeenClicked", "true");
    dropCookie("sessionWhenClicked", `${numberOfSession}`);
    
    options.emitCustomGoal('t103:hasSeenAProduct');

  }).replay()


  //If this is a new session, clear cookies preventing the display
  //&
  //set the product to be displayed with the last seen product of the last session
  if(numberOfSession > cm.val("sessionWhenClicked")){
    console.log("THIS IS A NEW SESSION AND HASBEENCLICKED SHOULD BE CLEARED")
    clearCookie("hasBeenClicked")
    clearCookie("sessionWhenClicked");
    console.log("THIS IS A NEW SESSION AND HASBEENCLICKED HAS BEEN CLEARED")


    console.log("This is the value of the displayed product value:", `${cm.val(`${options.meta.visitorId}`)}`)
    dropCookie("displayedProductValue", `${cm.val(`${options.meta.visitorId}`)}`);
    console.log("This is the value of the displayed product value:", `${cm.val(`${options.meta.visitorId}description`)}`)
    dropCookie("displayProductDescription", `${cm.val(`${options.meta.visitorId}description`)}`);
  }
  
  //check if user has already one session
  if(numberOfSession >= 2){
    //trigger if user is using a computer
    if(computerCheck==true){
      console.log("first trigger ok")
      //trigger if user is on main page or category pages
      if(triggerCategoryPagesRegex.test(getPageUrl) || triggerMainageRegex.test(getPageUrl)){
        console.log("second trigger ok")
        //trigger if the user possesses a cookie about a product
        if(checkCookie(cm.get("displayedProductValue"))){
          console.log("third trigger ok")
          cb()
        }
      }
    }
  }
} 