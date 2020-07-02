package com.example.pdfworld.controllers;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.pdfworld.services.ConvertService;
import com.itextpdf.text.pdf.codec.Base64;



@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/convert")
public class ConvertController {

	@Autowired private ConvertService convertService;
	
	@PostMapping()
	public Map<String,String> TiffToPdf(@RequestParam("file") MultipartFile file) {
		
		String base64 = "";
		Map<String,String> obj = new HashMap<String, String>();
		try {
			ByteArrayResource arrayResource=convertService.convertTiffToPdf(file);		
			obj.put("base64", Base64.encodeBytes(arrayResource.getByteArray()));
			
			System.out.println("ex");
			return obj;
		} catch (Exception e) {

			
		}
		return null;
	
		
		
	}
}
