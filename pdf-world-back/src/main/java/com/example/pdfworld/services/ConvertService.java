package com.example.pdfworld.services;

import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Objects;

import org.apache.tomcat.util.file.ConfigurationSource.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.io.RandomAccessSourceFactory;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.pdf.RandomAccessFileOrArray;

import com.itextpdf.text.pdf.codec.TiffImage;


@Service
public class ConvertService {

	
	
	
	public ByteArrayResource convertTiffToPdf(MultipartFile file) throws DocumentException,IOException {
		ByteArrayOutputStream outBs = new ByteArrayOutputStream();
	    if(!Objects.isNull(file))
	    {
	    	
	    	String Uri ="pdf.pdf";
	    	@SuppressWarnings("deprecation")
			RandomAccessFileOrArray accessFileOrArray = new RandomAccessFileOrArray(file.getInputStream());
	    	int numberOfPages = TiffImage.getNumberOfPages(accessFileOrArray);
	    	
	    	Document TiffToPDF = new Document(PageSize.A4);
	    	
	    	
	    	
	    	PdfWriter.getInstance(TiffToPDF, outBs);
	    	
	    	TiffToPDF.open();
	    	System.out.println("here");
	    	
	    	for(int tiffImageCounter = 1;tiffImageCounter <= numberOfPages;tiffImageCounter++) {
	    		
	    		Image tiffImg = TiffImage.getTiffImage(accessFileOrArray, tiffImageCounter);
	    		tiffImg.scaleAbsolute(PageSize.A4);
	    		//tiffImg.setAbsolutePosition(0, 0);
	    		TiffToPDF.add(tiffImg);
	    	}
	    	TiffToPDF.close();
	    	
	    }
		return (new ByteArrayResource(outBs.toByteArray()));
	    
		
	}

	
	
	/*
	 * 
	 * 
	 * 
	 * @PostMapping(path = "documentfile/{id}")
	public ResponseEntity postDocumentAndFile(@RequestParam("file") MultipartFile file, @PathVariable UUID id) {
        System.err.println("Enter ttttttt");
		fileStorageServiceImpl.save(file, id);

		// return new Document();
		return new ResponseEntity<>(HttpStatus.OK);
		// return service.GetFolder();
	}*/

}
