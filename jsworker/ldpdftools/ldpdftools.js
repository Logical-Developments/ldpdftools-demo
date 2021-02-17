/* -----------------------------------
Copyright:      Logical Developments 2020.
Filename:       ldpdftools.js
Author:         Paul W Mulroney
version:        0.01
Description: 	Provides tools to add markup to PDF, etc
History:
0.01    17-02-21 PWM   Updated for demo
0.00    16-07-20 PWM   Created.
----------------------------------- */

//This is required so that Omnis can communicate with our JS file
const omnis_calls = require('omnis_calls');  // If we need to send response back to Omnis in callback
let autoSendResponse = true; // Set to false in methods which should not send a response to Omnis when they exit. (e.g. async methods)

// These are required for our implementation
const { degrees, PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');

/**
 * Implement all of your publicly accessible methods in methodMap.
 */
const methodMap = {

  add_watermark: async function(params,response) {
    // See https://pdf-lib.js.org/#modify-document

    autoSendResponse = true;  
    
    // Load the PDF to process
    const existingPdfBytes = fs.readFileSync(params.filePath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
  
    // Add a font to the doc
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    
    // Get the first page
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]

    // Add watermark text
    const { width, height } = firstPage.getSize()
    firstPage.drawText(params.message, {
      x: 5,
      y: height / 2 + 300,
      size: 50,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      rotate: degrees(-45),
    })

    // Save docmument
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(params.filePath,pdfBytes); // Overwrite the file when we're done.

    return true;
  }

  // Other PDF methods go here 

};

/**
* The following is simply exporting the map of the methods, we need this so Omnis knows what methods we can call. 
**/

module.exports = {
	call: function (method, param, response) { // The only requirement of an Omnis module is that it implement this function.

		autoSendResponse = true;

		if (methodMap[method]) {
			const result = methodMap[method](param, response);
			if (autoSendResponse)
				omnis_calls.sendResponse(result, response);
			return true;
		}
		else {
			throw Error("Method '" + method + "' does not exist");
		}

	}
};

// --- End ldpdftools.js