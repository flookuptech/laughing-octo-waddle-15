import PyPDF2


def extract_text(infile, debug=False):
    full_text = ''

    if debug:
        with open(infile, 'rb') as pdfFileObj:
            pdf_reader = PyPDF2.PdfFileReader(pdfFileObj)

            for pageNumber in range(pdf_reader.numPages):
                page_obj = pdf_reader.getPage(pageNumber)
                full_text += page_obj.extractText()
    else:
        pdf_reader = PyPDF2.PdfFileReader(infile)

        for pageNumber in range(pdf_reader.numPages):
            page_obj = pdf_reader.getPage(pageNumber)
            full_text += page_obj.extractText()

    if debug:
        print(full_text)
        with open('../../Output Text/'+infile.split('/')[-1].split('.')[-2]+'_text.txt', 'w') as f:
            f.write(full_text)
    return full_text


if __name__ == '__main__':
    extract_text(infile='../../Sample_PDF/Sample.pdf', debug=True)
