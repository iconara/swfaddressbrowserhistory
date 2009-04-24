/*
 *
 * Copyright 2008 Theo Hultberg, theo@iconara.net
 * 
 */

package net.iconara.state {
	
	import flash.external.ExternalInterface;
	
	 
	public class SWFAddressBrowserHistory {
		
		[Embed(source="SWFAddressBrowserHistory.js", mimeType="application/octet-stream")] 
		private static const INSTALL_CODE : Class;
	

		/**
		 * Call this method before using the BrowserManager.
		 * SWFAddress needs to be loaded by the HTML.
		 * 
		 * There's a bug in Flash Player on Linux that means that you have to 
		 * pass in the embed/object ID manually for things to work
		 * (http://bugs.adobe.com/jira/browse/FP-383). If you don't pass the ID
		 * the install code will fall back to ExternalInterface.objectID and 
		 * the code will fail in Linux.
		 * 
		 * Example:
		 * 
		 *   private function setupBrowserManager( ) : void {
		 *     SWFAddressBrowserHistory.install();
		 * 
		 *     browserManager = BrowserManager.getInstance();
		 *     browserManager.addEventListener(BrowserChangeEvent.BROWSER_URL_CHANGE, onBrowserUrlChanged);
		 *     browserManager.init();
		 *   }
		 * 
		 */
		public static function install( objectID : String = null ) : void {
			if ( ExternalInterface.available ) {
				var installCode  : String = new INSTALL_CODE();
				var creationCode : String = "window.BrowserHistory = createBrowserHistory('" + (objectID || ExternalInterface.objectID) + "', SWFAddress);";
				
				ExternalInterface.marshallExceptions = true;
				
				try {
					ExternalInterface.call("function( ) { " + installCode + "; " + creationCode + "; }");
				} catch ( e : Error ) {
					throw new Error("Could not install browser history script: " + e.message);
				}
				
				ExternalInterface.marshallExceptions = false;
			}
		}
		
	}
	
}