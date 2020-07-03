package com.example.pdfworld.services;

import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Font.FontFamily;
import com.itextpdf.text.Image;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.ColumnText;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfGState;
import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.PdfStamper;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class SignedPdfService {

	public ByteArrayResource manipulatePdf(MultipartFile file, MultipartFile sign, float axeX, float axeY)
			throws IOException, DocumentException {
		
		System.out.println("x  "+ axeX +"y" + axeY);
		PdfReader reader = new PdfReader(file.getBytes());
		int n = reader.getNumberOfPages();
		ByteArrayOutputStream outBs = new ByteArrayOutputStream();
		PdfStamper stamper = new PdfStamper(reader, outBs);
		stamper.setRotateContents(false);
		Image img = Image.getInstance(sign.getBytes());
		float w = img.getScaledWidth();
		float h = img.getScaledHeight();
		// transparency
		PdfGState gs1 = new PdfGState();
		gs1.setFillOpacity(1f);
		// properties
		PdfContentByte over;
		Rectangle pagesize;
		float x, y;
		// loop over every page
		for (int i = 1; i <= n; i++) {
			pagesize = reader.getPageSize(i);
			x = (pagesize.getLeft() + pagesize.getRight()) / 2;
			y = (pagesize.getTop() + pagesize.getBottom()) / 2;
			over = stamper.getOverContent(i);
			over.saveState();
			over.setGState(gs1);
			over.addImage(img, w, 0, 0, h, axeX , (pagesize.getTop() + pagesize.getBottom()) - axeY);
			over.restoreState();
		}
		stamper.close();
		reader.close();
		return (new ByteArrayResource(outBs.toByteArray()));
	}
}
