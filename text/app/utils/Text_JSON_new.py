import json
import re

from app.utils.pdf_reader import extract_text

text = ''
data_extracted = {}


def data_add(name, m):
    try:
        data_extracted[name] = m.group(1).strip().replace('\n', '')
    except AttributeError:
        data_extracted[name] = ''


def re_search(pattern, *args):
    return re.search(pattern, text, *args)


def scan_invoice(input_file, debug=False):
    global data_extracted
    global text
    data_extracted = {}
    text = extract_text(input_file, debug)
    ##########################
    data_add('agreementBetween', re_search('M/s(.+?)with', re.DOTALL))
    ##########################
    data_add('nameOfBeneficiaryRemittance', re_search('Name of the Beneficiary of the remittance(.+?)Flat', re.DOTALL))
    ##########################
    data_add('country', re_search('Country(.+?)ZipCode', re.DOTALL))
    ##########################
    data_add('currency', re_search('Currency(.+?)2', re.DOTALL))
    ##########################
    data_add('amtPayForeign', re_search('In foreign currency(.+?)In Indian Rs', re.DOTALL))
    ##########################
    data_add('amtPayIndian', re_search('In Indian Rs(.+?)Name of bank', re.DOTALL))
    ##########################
    data_add('propDateRemittance',
             re_search('Proposed date of remittance(.+?)Nature of remittance as per agreement/ document', re.DOTALL))
    ##############################
    data_add('natureOfRemittance', re_search('Nature of remittance as per agreement/ document(.+?)6', re.DOTALL))
    ##############################
    try:
        tax_liabilty = re.search('\(c\) the tax liability(.+?)\(d\)', text, re.DOTALL).group(1).strip()[:-1].replace(
            "\n",
            "")
        data_extracted['taxLiability'] = tax_liabilty
    except AttributeError:
        data_extracted['taxLiability'] = ''
    ##############################
    try:
        narrowed_search = re.search('Amount of TDS(.+?)of TDS', text, re.DOTALL).group(1).strip()
        data_extracted['amtTdsIndian'] = re.search('In Indian Rs(.+?)Rate', narrowed_search, re.DOTALL).group(
            1).strip().replace('\n', '')
    except (AttributeError, IndexError):
        data_extracted['amtTdsIndian'] = ''
    ##############################
    try:
        narrowed_search = re.search('Actual amount of remittance after TDS(.+?)of deduction of tax', text,
                                    re.DOTALL).group(1).strip()
        data_extracted['amtRemittanceAfterTds'] = re.search('currency\)(.+?)Date', narrowed_search, re.DOTALL).group(
            1).strip()[:-2].replace('\n', '').strip()
    except (AttributeError, IndexError):
        data_extracted['amtRemittanceAfterTds'] = ''

    # data_add('amtRemittanceAfterTds',
    #          re_search('Actual amount of remittance after TDS \(In foreign (.+?)\n'))
    ##########################
    if debug:
        with open('../../output.json', 'w') as file:
            json.dump([data_extracted], file)
        for key in data_extracted:
            print(key, data_extracted[key], sep='\t\t\t\t\t\t\t')
        print(len(data_extracted))
    return [data_extracted]


if __name__ == '__main__':
    mode = '1'
    # mode = 'multi'
    if mode == '1':
        print(scan_invoice('../../Sample_PDF/Sample.pdf', True))
    else:
        import os

        test_files = []
        for root, dirs, files in os.walk('../../Sample_PDF'):
            for name in files:
                test_files.append(os.path.join(root, name))

        for file in test_files:
            print(file)
            print(scan_invoice(file, True))
            print(end='\n\n')
