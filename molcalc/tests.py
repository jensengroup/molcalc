
from pyramid import testing

import compchem


# frontend
import mechanicalsoup


def test_connection():

    from molcalc import hello_world

    request = testing.DummyRequest()
    response = hello_world(request)
    assert response.status_code == 200


def test_gamess_setup():

    import gamess

    assert gamess.calculate == 500

    return


# def test_browser_url():
#
#     # TODO
#     # setup headless firefox and chrome
#
#     # br = mechanize.Browser()
#     # br.open('http://thayton.github.io')
#     # response = br.response()
#
#     browser = mechanicalsoup.StatefulBrowser()
#     response = browser.open("http://localhost:6543/")
#
#     assert response
#
#     page = browser.get_current_page()
#
#     elements = page.find("section", class_="mc-editor-searchbar")
#
#     return True
#
#
# def test_browser_editor_smiles():
#
#     smiles = "CCC(C)O"
#
#     # br = mechanize.Browser()
#     # br.open('http://thayton.github.io')
#     # response = br.response()
#
#     return

def test_convert():

    smiles = "CCC(C)O"

    mol2, status = compchem.smiles_to_sdfstr(smiles)

    print(mol2, status)

    return True


def main():

    tests = ['test_convert()']

    for test in tests:
        print(test, eval(test))

    return


if __name__ == '__main__':
    main()

