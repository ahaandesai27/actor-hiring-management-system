import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker?worker';

pdfjsLib.GlobalWorkerOptions.workerPort = new pdfjsWorker();

export function usePdfExtraction(setResume) {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(false);

  const handlePdfSelect = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfLoading(true);
      setPdfFile(file);
      try {
        const reader = new FileReader();
        reader.onload = async function () {
          const typedarray = new Uint8Array(this.result);
          const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
          let text = "";
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += content.items.map((item) => item.str).join(" ") + "\n";
          }
          setResume(text);
        };
        reader.readAsArrayBuffer(file);
      } catch (err) {
        alert("Failed to read PDF.");
      }
      setPdfLoading(false);
    } else {
      alert("Please select a PDF file.");
    }
  };

  return { handlePdfSelect, pdfLoading, pdfFile };
}
