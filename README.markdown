README
======
The Flex 3 framework provides a way to support deep linking and search engine optimization (SEO) in the BrowserManager class. However, you have to use Adobe's HTML templates, and they are not always what you want.

This package makes it possible to use the BrowserManager with SWFAddress, for applications embedded with SWFObject (or other mechanisms).

As of v2.1, SWFAddress will automatically integrate with Google Analytics, if it's available. This means you can get deep linking and Analytics tracking into your Flex application with minimal effort. v2.0 of SWFAddress can also be made to integrate with Analytics, but in v2.1 it just works.

Usage
-----
There are two ways to use this package, either you include the `SWFAddressBrowserHistory.js` script on the HTML page that embeds the Flex application, or you use the `SWFAddressBrowserHistory` ActionScript class to install the JavaScript from inside Flex. The benefit of the first is that you don't need to change your Flex code, and the benefit of the second that you don't need to include yet another external JavaScript in the HTML. Whichever you use _you need to make sure that the embedding HTML page loads SWFAddress_ (which perhaps doesn't make the second point above that compelling).

The first method is pretty straigt forward, just add a script tag and you're done. The other is described below.

Download the SWC ([available from the GitHub project page](http://github.com/iconara/swfaddressbrowserhistory/downloads)) and make sure it is in your project's search path, alternatively just put the code in your source path.

In your Flex application the only thing you need to do is this:

	SWFAddressBrowserHistory.install();

After that you can use the BrowserManager in the same way you would with Adobe's HTML templates (you can find instructions in _Flex 3 Developer's Guide, Chapter 34_). Here is a very simple example:

	private function onCreationComplete( event : Event ) : void {
	  SWFAddressBrowserHistory.install();

	  // 'browserManager' is an instance variable
	  browserManager = BrowserManager.getInstance();

	  browserManager.addEventListener(
	    BrowserChangeEvent.BROWSER_URL_CHANGE,
	    onBrowserUrlChanged
	  ); 

	  browserManager.init("", "My deep linkable application");
	}

	private function onBrowserUrlChanged( event : Event ) : void {
	  trace("The user navigated to: " + browserManager.fragment);
	}
	
Explanation
-----------
The call to install creates the JavaScript needed to communicate with the BrowserHistory class. The actual JavaScript code is embedded in the SWFAddressBrowserHistory class, a somewhat unorthodox method perhaps, but one I think is worth a try as it means that there is one less dependency and simpler deployment -- the JavaScript doesn't have to be uploaded to the server, or included on the embedding page. I've discussed this method here: Abusing the ExternalInterface, if you're interested.

The JavaScript that communicates with BrowserManager is quite simple and could easily be made to work with any other deep linking solution. You can look through the code for BrowserManager in the Flex 3 framework if you're interested, or you can mail me and ask.

A side benefit from using this package is that you can use SWFAddress' excellent browser support in Flex without having to use it's ugly ActionScript 3 interface, and you get Google Analytics integration more or less for free.

Licence
-------
It's Freeware, not sure about the specific licence. If you need to include this in a project with a very restrictive open source licence let me know. Same if you will make bucketloads of money from using it, in which case I'd like my share. Otherwise feel free to fork.

Notes
-----
[There's a bug in the Linux version of Flash Player](http://bugs.adobe.com/jira/browse/FP-383) which makes it not set the `ExternalInterface.objectID` property and this makes things bad. You can pass in the name manually in the `install` method if this is a problem. You can also include the JavaScript on the HTML page and not use the ActionScript code at all (see above).