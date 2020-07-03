package com.example.pdfworld.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.pdfworld.services.SignedPdfService;
import com.itextpdf.text.pdf.codec.Base64;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("signed")
public class SignedDocument {

       private @Autowired SignedPdfService signedPdfService;
	
	   @PostMapping
	   private Map<String,String> signedDocument(@RequestParam("file") MultipartFile file,@RequestParam("sign") MultipartFile sign,@RequestParam("x") float x,@RequestParam("y") float y) {
		// TODO Auto-generated method stub
		   String base64 = "";
		   Map<String,String> obj = new HashMap<String, String>();
			try {
				ByteArrayResource arrayResource=signedPdfService.manipulatePdf(file, sign, x, y);		
				obj.put("base64", Base64.encodeBytes(arrayResource.getByteArray()));
				return obj;
			} catch (Exception e) {

				
			}
		   
		   return null;

	}
}
