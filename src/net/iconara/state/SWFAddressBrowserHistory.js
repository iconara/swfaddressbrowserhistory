/**
 * Returns an object that can be used with Flex' BrowserManager.
 *
 * Usage:
 *
 *     var BrowserHistory = createBrowserHistory("flexAppId", SWFAddress);
 *
 * The variable name ("BrowserHistory") is important, as it is the name
 * that Flex' BrowserManager expects. The second parameter is the history
 * manager -- usually SWFAddress but could be anything that responds to
 * getTitle, setTitle, getValue, setValue and dispatches "change" events
 * in the same way as SWFAddress.
 *
 * Copyright 2007 Theo Hultberg / Iconara, http://developer.iconara.net
 *
 */
function createBrowserHistory( applicationId, historyManager ) {
	var obj = { }
	
	var applicationNode = document.getElementById(applicationId);
	var historyManager  = historyManager;
	var defaultUrl      = "";
	
	var init = function( ) {		
		if ( applicationNode == null ) {
			throw new Error("Could not find application node");
		}
		
		if ( historyManager == null ) {
			throw new Error("No history manager specified");
		}
		
		if ( ! checkHistoryManager() ) {
			throw new Error("The specified history manager doesn't have the right capabilities");
		}
	
		historyManager.addEventListener("change", onChange);
		
		return obj;
	}
	
	var checkHistoryManager = function( ) {
		return typeof historyManager.getTitle == "function"
		    && typeof historyManager.setTitle == "function"
		    && typeof historyManager.getValue == "function"
		    && typeof historyManager.setValue == "function"
		    && typeof historyManager.addEventListener == "function"
		;
	}
	
	var onChange = function( event ) {
		update();
	}
	
	var update = function( ) {
		if ( typeof applicationNode.browserURLChange == "function" ) {
			applicationNode.browserURLChange(historyManager.getValue());
		}
	}
	
	obj.getURL = function( ) {
		return window.location.href;
	}
	
	obj.setDefaultURL = function( url ) {
		// the default url is not actually used
		
		defaultUrl = url;
	}
	
	obj.getTitle = function( ) {
		return historyManager.getTitle();
	}
	
	obj.setTitle = function( title ) {
		historyManager.setTitle(title);
	}
	
	obj.setBrowserURL = function( url, objectId ) {
		// the objectId parameter is not used
		
		historyManager.setValue(url);
	}

	return init();
}