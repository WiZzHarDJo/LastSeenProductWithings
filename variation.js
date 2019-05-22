module.exports = function variation (options) {

    const cm = require('cookieman');
    console.log("HERE IS YOUR LAST SEEN PRODUCT", options.state.get('lastSeenProduct'))
    let display = true;
    const sessionWhenClicked = "sessionWhenClicked"
    let sessionNumberCookieValue;
  
    
    options.getVisitorState().then(function (state) {
      console.log("sessionNumber",state.sessionNumber)
      sessionNumberCookie=state.sessionNumber;
    })
    
    if(sessionNumberCookie == cm.val(sessionWhenClicked)){
      display = false;
    }
    else{
      cm.clear("hasBeenClicked", {
        path: '/', // e.g. '/'
        domain: options.meta.cookieDomain // e.g. '.foo.com'
      }) // true
    }
    
    checkCookie = (cookie)=>{
      console.log("the cookieClicked being checked is",cookie,cm.val(cookie))
      if(cm.val(cookie) === 'true')
        return false;
      else return true;
    }
    
    display = checkCookie('hasBeenClicked')
    
    if(display == true){
      lastSeenCard = $("#lastSeenProduct_withings")
      lastSeenProductName = $("#lastSeenProduct_withings .card .product_name")
      lastSeenProductDescr = $("#lastSeenProduct_withings .card .product_desc")
      lastSeenProductImage = $("#lastSeenProduct_withings .card img")
      link = $("#lastSeenProduct_withings a")
      cross = $("#lastSeenProduct_withings .icon-croix")
    
    
      lastSeenCard.removeClass("hidden");
      lastSeenProductName.text(options.state.get('lastSeenProduct'))
      lastSeenProductDescr.text(options.state.get('descr'))
      lastSeenProductImage.attr("src",options.state.get('picture'));
      link.attr("href",options.state.get('link'))
    
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
      })
    }
    
  }