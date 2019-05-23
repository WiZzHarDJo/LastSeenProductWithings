module.exports = function variation (options) {

  const cm = require('cookieman');
  console.log("HERE IS YOUR LAST SEEN PRODUCT", options.state.get('lastSeenProduct'))
  let display = true;
  const sessionWhenClicked = "sessionWhenClicked"
  
  //get the user's session number
  options.getVisitorState().then(function (state) {
    console.log("sessionNumber",state.sessionNumber)
    sessionNumberCookie=state.sessionNumber;
  })
  
  //if sessionNumberCookie has been set, it means the cross has been clicked, force set display at false
  //it is a new session for the user, we clear the cookie about the cross clicked so the cookie doesn't exist anymore and at the followin gcookie check, display can become true again
  if(sessionNumberCookie == cm.val(sessionWhenClicked)){
    display = false;
  }
  else{
    cm.clear("hasBeenClicked", {
      path: '/', // e.g. '/'
      domain: options.meta.cookieDomain // e.g. '.foo.com'
    }) // true
  }
  
  //check if the cross has been clicked during this session
  checkCookie = (cookie)=>{
    console.log("the cookieClicked being checked is",cookie,cm.val(cookie))
    if(cm.val(cookie) === 'true')
      return false;
    else return true;
  }
  
  //if cross clicked, don't display card, if not, display
  display = checkCookie('hasBeenClicked')
  
  if(display == true){
    //select the elements
    lastSeenCard = $("#lastSeenProduct_withings")
    lastSeenProductName = $("#lastSeenProduct_withings .card .product_name")
    lastSeenProductDescr = $("#lastSeenProduct_withings .card .product_desc")
    lastSeenProductImage = $("#lastSeenProduct_withings .card img")
    link = $("#lastSeenProduct_withings a")
    cross = $("#lastSeenProduct_withings .icon-croix")
  
    //link actions to elements
    lastSeenCard.removeClass("hidden");
    lastSeenProductName.text(options.state.get('lastSeenProduct'))
    lastSeenProductDescr.text(options.state.get('descr'))
    lastSeenProductImage.attr("src",options.state.get('picture'));
    link.attr("href",options.state.get('link'))
  
    //if cross clicked, hide card, set the fact that the cross has been clicked in a cookie, record the session when the cross has been clicked
    cross.click(()=>{
      lastSeenCard.addClass("hidden"); 
      
      display = false
      
      cm.set("hasBeenClicked", `true`, {
        domain: options.meta.cookieDomain,
        path: '/'
      })
      
      cm.set(sessionWhenClicked, `${sessionNumberCookie}`, {
        domain: options.meta.cookieDomain,
        path: '/'
      })
      
      options.emitCustomGoal('t103:clickOnCross')
    })
    
    link.click(()=>{
      options.emitCustomGoal('t103:clickOnLink')
    })
  }
}