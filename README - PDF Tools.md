# ldpdftools-demo
Demonstrating the JavaScript Worker object in Omnis Studio 10.1

This demo shows using the pdf-lib library in node.js to manipulate PDF documents.  The 
simple demo is to apply a watermark text to the first page of the document.  See 
[pdf-lib.js](https://pdf-lib.js.org/#modify-document) for other examples.  Also 
Omnis Technote [tnex0006](https://www.omnis.net/developers/resources/technotes/tnex0006.jsp) for a more detailed
explanation of how the JavaScript worker is designed.

## In this repository
* **jsworker** - the node package that does the magic
* **Library** - Omnis Studio 10.1 library, and the JSON equivalent
* **Test Files** - a sample pdf to use in the example
* **Readme.md** - This document

## Installation Instructions 
* Copy the _ldpdftools_ folder to the jsworker folder of Omnis Studio 10.1 (in the Application Support or Local App Data folders, then Omnis Studio)

* Edit _jsworker/omnis_modules.js_, and add this line in the list of requirements:
	
		ldpdftools: require('ldpdftools'),
	
	So that moduleMap looks a bit like this:

		const moduleMap = {
			test: require('omnis_test'),
			xml2js: require('omnis_xml2js'),
			ldpdftools: require('ldpdftools')
		}

* Open Terminal

* Change directory to the _jsworker/ldpdftools_ folder 

* Run _npm update_

* Open the Watermark.lbs library in Omnis

## Usage
* Open the wWatermark window
* Locate a PDF to process
* Enter a watermark to add
* Click "Add Watermark"
* Voila! Red text is displayed diagonally across the first page.

The Omnis code to add the watermark is super simple:

		Do ioPDF.$AddWatermark(isPathToPDF,isWatermark) 

Obviously this demo doesn't have any error handling.  There are breakpoints in the oPDF object where you can add code to handle error conditions.

Good luck!  Questions?  Email me pmulroney@logicaldevelopments.com.au

**If you use this in your code, please mention us!**
