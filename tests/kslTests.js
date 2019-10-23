var page
var loginInfo = { user: 't3stpass@gmail.com', pass: 'T3stingpas$', name: 'Josh' }
module.exports = {
    beforeEach: browser => {
        page = browser.page.kslPage()
        page.api.fullscreenWindow()
        page.navigate()
    },
    after: browser => {
        browser.end()
    },
    'Login': browser => {
        page
            .login(loginInfo)
            .click('@accountIcon')
            .waitForElementPresent('@welcome')
            .verify.containsText('@welcome', loginInfo.name)
            .click('@accountIcon')
            .logout()
            .click('@accountIcon')
            .verify.elementNotPresent('@welcome')
            .verify.elementPresent('@loginButton')
            .click('@accountIcon')

    },
    'Item Search by Keyword': browser => {
        var search = 'puppies'
        page
            .keywordSearch(search)
            .waitForElementPresent('@keywordInput')
            .verify.value('@keywordInput', search)

    },
    'Item Search by Filter': browser => {
        page
            .setFilters('Couches')
            .click('@homeSearch')
            .verify.elementPresent('@listingCard')
            .expect.element('@resultHeader').text.to.contain('Couches')
        },
        'Save/Delete Items from Favorites': browser => {
            page
                .login(loginInfo)
                .keywordSearch('puppies')
                .saveListing('1')
                .navToFavorites()
                .verify.elementPresent('@savedListing')
                .deleteListing('1')
                .verify.elementNotPresent('@savedListing')
    }
}