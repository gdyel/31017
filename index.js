function getID(e){return document.getElementById(e)}function cropFeed(e,t){for(var n=e.split("<"),o=0;o<n.length;o++)-1!=n[o].indexOf(">")&&(n[o]=n[o].substring(n[o].indexOf(">")+1,n[o].length));return n=n.join(" "),n=n.substring(0,t-1)}function showLabels(e){var t=e.feed.category,n="";n="<select id='labelSorter' onchange='changeSort(this.value);'>",n+="<option value='' selected>Ø£Ù‚Ø³Ø§Ù…...</option>";for(var o=0;o<t.length;o++)n+="<option value='"+decodeURIComponent(t[o].term)+"'>"+t[o].term.toUpperCase()+"</option>";n+="</select>",labelSorter.innerHTML=n}function showFeedList(e){var t,n,o,a,r,i,s,l,c,d,u=e.feed.entry,h="";if(void 0!==e.feed.entry){for(var p=0;p<tocConfig.feedNum&&(t=u?u[p]:"",nextPage="",p!=e.feed.entry.length);p++){n=t.title.$t;for(var g=0;g<t.link.length;g++)if("alternate"==t.link[g].rel){o=t.link[g].href;break}for(var f=0;f<e.feed.link.length;f++)"next"==e.feed.link[f].rel&&(nextPage=e.feed.link[f].href);for(var m=0;m<t.link.length;m++)if("replies"==t.link[m].rel&&"text/html"==t.link[m].type){d=t.link[m].title;break}r="content"in t?t.content.$t:"summary"in t?t.summary.$t:"",a="media$thumbnail"in t?t.media$thumbnail.url.replace(/\/s[0-9]+\-c/,"/s"+tocConfig.thumbWidth+"-c"):tocConfig.noImage.replace(/\/s[0-9]+\-c/,"/s"+tocConfig.thumbWidth+"-c"),postdate=t.published.$t.substring(0,10),i=postdate.substring(0,4),s=postdate.substring(5,7),l=postdate.substring(8,10),c=tocConfig.MonthNames[parseInt(s,10)-1],h+="<li><div class='inner'>",h+="<a href='"+o+"' target='_blank'><img style='width:"+tocConfig.thumbWidth+"px;height:"+tocConfig.thumbWidth+"px;' src='"+a+"' alt='"+n+"' /></a>",h+="<a class='toc-title' href='"+o+"' target='_blank'>"+n+"</a><strong> - ("+d+")</strong><br>",h+="<div class='news-text'>"+cropFeed(r,tocConfig.numChars)+"&hellip;<br style='clear:both;'/></div>",h+='<div class="date"><span class="dd">'+l+'</span><span class="dm">'+c+'</span><span class="dy">'+i+"</span></div></div></li>"}""!==input.value&&"#search"==window.location.hash?resultDesc.innerHTML="<span>Search result for keyword <strong>&quot;"+input.value+"&quot;</strong></span>":resultDesc.innerHTML="",feedContainer.innerHTML+=h,h=nextPage?window.location.hash&&"#0"!==window.location.hash?"<a href='javascript:initResult(2);' class='next'>"+tocConfig.navText+"</a>":"<a href='javascript:initResult(1);' class='next'>"+tocConfig.navText+"</a>":"<a href='#table-outer' onclick='jQuery(&apos;html, body&apos;).animate({scrollTop: jQuery(&apos;#table-outer&apos;).offset().top}, 1500); return false' class='front'>"+tocConfig.frontText+"</a>",feedNav.innerHTML=h,input.value="",labelSorter.getElementsByTagName("select")[0].removeAttribute("disabled"),orderByer.removeAttribute("disabled")}else feedContainer.innerHTML="",alert(tocConfig.noResult),feedNav.innerHTML="<a href='?reload=true'>"+tocConfig.frontText+"</a>",searchDesc.innerHTML=""}function initResult(e){var t,n;1==e?(t=nextPage.indexOf("?"),n=nextPage.substring(t)):2==e?(t=nextPage.indexOf("?"),n=nextPage.substring(t).replace(/\?/,"/-/"+window.location.hash.substr(1)+"?")):n="?start-index=1&max-results="+tocConfig.feedNum+"&orderby="+orderByer.value+"&alt=json-in-script",updateScript(n+="&callback=showFeedList")}function removeScript(){var e=getID("temporer-script");e.parentNode.removeChild(e)}function buildLabels(){var e=document.createElement("script");e.type="text/javascript",e.src=(""===tocConfig.url?window.location.protocol+"//"+window.location.host:tocConfig.url)+"/feeds/posts/summary?max-results=0&alt=json-in-script&callback=showLabels",head.appendChild(e)}function updateScript(e){1==startPage&&removeScript(),feedNav.innerHTML=tocConfig.loading,feedArchive=!1!==tocConfig.labelName?(""===tocConfig.url?window.location.protocol+"//"+window.location.host:tocConfig.url)+"/feeds/posts/summary/-/"+tocConfig.labelName+e:(""===tocConfig.url?window.location.protocol+"//"+window.location.host:tocConfig.url)+"/feeds/posts/summary"+e;var t=document.createElement("script");t.type="text/javascript",t.src=feedArchive,t.id="temporer-script",head.appendChild(t),startPage=1}function changeSort(e){removeScript(),tocContainer.innerHTML="",feedNav.innerHTML=tocConfig.loading;var t=document.createElement("script"),n=labelSorter.getElementsByTagName("select")[0],o=0!==e?"/-/"+e:"";t.type="text/javascript",t.id="temporer-script",t.src=(""===tocConfig.url?window.location.protocol+"//"+window.location.host:tocConfig.url)+"/feeds/posts/summary"+o+"?alt=json-in-script&max-results="+tocConfig.feedNum+"&orderby="+orderByer.value+"&callback=showFeedList",head.appendChild(t),n.disabled=!0,orderByer.disabled=!0,window.location.hash=e}function searchPost(){removeScript(),tocContainer.innerHTML="",resultDesc.innerHTML="",feedNav.innerHTML=tocConfig.searching;var e=document.createElement("script");return e.type="text/javascript",e.id="temporer-script",e.src=(""===tocConfig.url?window.location.protocol+"//"+window.location.host:tocConfig.url)+"/feeds/posts/summary?alt=json-in-script&orderby=published&q="+input.value+"&max-results=9999&callback=showFeedList",head.appendChild(e),window.location.hash="#search",!1}var tocConfig={url:"",feedNum:6,labelName:!(!window.location.hash||"#0"==window.location.hash||"#search"==window.location.hash)&&encodeURIComponent(window.location.hash.substr(1)),numChars:140,thumbWidth:70,navText:"Ø¹Ø±Ø¶ Ø§Ù„Ù…Ø²ÙŠØ¯ &#9660;",frontText:"Ø£Ø¹Ù„Ù‰ &uArr;",noImage:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAA3NCSVQICAjb4U/gAAAADElEQVQImWOor68HAAL+AX7vOF2TAAAAAElFTkSuQmCC",loading:"<span>Ø¬Ø§Ø±ÙŠ Ø§Ù„ØªØ­Ù…ÙŠÙ„...</span>",searching:"<span>Ø¬Ø§Ø±ÙŠ Ø§Ù„Ø¨Ø­Ø«...</span>",MonthNames:["Ø¬Ø§Ù†ÙÙŠ","ÙÙŠÙØ±ÙŠ","Ù…Ø§Ø±Ø³","Ø£ÙØ±ÙŠÙ„","Ù…Ø§ÙŠ","Ø¬ÙˆØ§Ù†","Ø¬ÙˆÙŠÙ„ÙŠØ©","Ø£ÙˆØª","Ø³Ø¨ØªÙ…Ø¨Ø±","Ø£ÙƒØªÙˆØ¨Ø±","Ù†ÙˆÙÙ…Ø¨Ø±","Ø¯ÙŠØ³Ù…Ø¨Ø±"],noResult:"No Result"},head=document.getElementsByTagName("head")[0],tocContainer=getID("feedContainer"),feedNav=getID("feedNav"),orderByer=getID("orderFeedBy"),labelSorter=getID("labelSorter"),input=getID("postSearcher").getElementsByTagName("input")[0],resultDesc=getID("resultDesc"),nextPage,feedArchive,startPage=0;getID("postSearcher").onsubmit=function(){return searchPost()},orderByer.onchange=function(){changeSort(0)},labelSorter.getElementsByTagName("select")[0].onchange=function(){changeSort(this.value)},window.onload=function(){initResult(0),buildLabels(),window.location.hash="#0"};