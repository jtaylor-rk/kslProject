module.exports = {
    url: 'https://classifieds.ksl.com',
    elements: {
        //Home Page Title Bar
        classifiedsHome: { selector: '(//span[contains(text(), "Classifieds")])[1]', locateStrategy: 'xpath' },
        favorites: '[class="link jumpLinks-favorites"]',
        dropdownFavs: { selector: '(//div/a[contains(text(), "Favorites")])[1]', locateStrategy: 'xpath' },
        //Category and filter search
        furnitureCat: { selector: '//p[contains(text(), "Furniture")]', locateStrategy: 'xpath' },
        categoryInput: { selector: '(//input[@name="catQuickSearch"])[2]', locateStrategy: 'xpath' },
        categoryOption: { selector: '(//div[@class="categorySearch-validOptionContainer"])[1]', locateStrategy: 'xpath' },
        filterPrivate: { selector: '//button[contains(text(), "Private")]', locateStrategy: 'xpath' },
        filterHasPhotos: { selector: '//button[contains(text(), "Has Photos")]', locateStrategy: 'xpath' },
        filterSevenDays: { selector: '//button[contains(text(), "7 Days")]', locateStrategy: 'xpath' },
        filterForSale: { selector: '//button[contains(text(), "For Sale")]', locateStrategy: 'xpath' },
        priceFrom: { selector: '//input[@placeholder="From"]', locateStrategy: 'xpath' },
        priceTo: { selector: '//input[@placeholder="To"]', locateStrategy: 'xpath' },
        filterZip: { selector: '//input[@name="zip"]', locateStrategy: 'xpath' },
        filterDistance: '.searchForm-selectDropdown option[value="50"]',
        //Login and Logout selectors
        accountIcon: { selector: '//button[@class="ksl-header-account-toggle__icon"]', locateStrategy: 'xpath' },
        loginButton: '[class*="login"]',
        emailInput: '#memberemail',
        passInput: '#memberpassword',
        submitLogin: '.continue',
        welcome: '[class*="welcome"]',
        logoutButton: '[class*="logout"]',
        //Keyword Search
        keywordInput: '[name="keyword"]',
        homeSearch: '[class*="submitSearchButton"]',
        //Results Page
        resultHeader: {selector: '//span[@class="category"]', locateStrategy: 'xpath'},
        listingCard: { selector: '(//section)[2]', locateStrategy: 'xpath' },
        //Favorites
        savedListing: { selector: '(//div[@class="FavoriteClassifiedItem-container"])[1]', locateStrategy: 'xpath' }
    },
    commands: [
        {
            login: function (loginInfo) {
                this
                    .waitForElementPresent('@accountIcon')
                    .click('@accountIcon')
                    .click('@loginButton')
                    .waitForElementPresent('@emailInput')
                    .clearValue('@emailInput')
                    .setValue('@emailInput', loginInfo.user)
                    .clearValue('@passInput')
                    .setValue('@passInput', loginInfo.pass)
                    .click('@submitLogin')
                return this
            }
        },
        {
            logout: function () {
                this
                    .waitForElementPresent('@accountIcon')
                    .click('@accountIcon')
                    .waitForElementPresent('@logoutButton')
                    .click('@logoutButton')
                return this
            }
        },
        {
            keywordSearch: function (search) {
                this
                    .waitForElementPresent('@keywordInput')
                    .clearValue('@keywordInput')
                    .setValue('@keywordInput', search)
                    .pause(1000)
                    .click('@homeSearch')
                return this
            }
        },
        {
            saveListing: function (number) {
                this
                    .useXpath()
                    .waitForElementPresent(`(//span[@title="Toggle Favorite"])[${number}]`)
                    .click(`(//span[@title="Toggle Favorite"])[${number}]`)
                    .useCss()
                return this
            }
        },
        {
            navToFavorites: function () {
                var self = this
                this
                    .waitForElementPresent('@classifiedsHome')
                    .click('@classifiedsHome')
                    .pause(500)
                    .click('@classifiedsHome')
                    .waitForElementPresent('@favorites')
                    .click('@favorites')
                    .api.windowHandles(function (result) {
                        var originalWindow = result.value[0]
                        var favoriteWindow = result.value[1]
                        self
                            .switchWindow(favoriteWindow)
                    })
                return this
            }
        },
        {
            deleteListing: function (number) {
                this
                    .useXpath()
                    .waitForElementPresent(`(//button[@class="FavoriteClassifiedItem-deleteButton"])[${number}]`)
                    .click(`(//button[@class="FavoriteClassifiedItem-deleteButton"])[${number}]`)
                    .waitForElementPresent('//button[contains(text(), "Remove")]')
                    .click('//button[contains(text(), "Remove")]')
                    .useCss()
                return this
            }
        },
        {
            categorySearch: function (input) {
                this
                    .waitForElementPresent('@categoryInput')
                    .clearValue('@categoryInput')
                    .setValue('@categoryInput', input)
                return this
            }
        },
        {
            setFilters: function (search) {
                this
                    .waitForElementPresent('@priceFrom')
                    .clearValue('@priceFrom')
                    .setValue('@priceFrom', '0')
                    .clearValue('@priceTo')
                    .setValue('@priceTo', '300')
                    .clearValue('@filterZip')
                    .setValue('@filterZip', '84604')
                    .pause(1000)
                    .click('@filterDistance')
                    .click('@filterForSale')
                    .clearValue('@categoryInput')
                    .setValue('@categoryInput', search)
                    .click('@categoryOption')
                    .click('@filterPrivate')
                    .click('@filterHasPhotos')
                    .click('@filterSevenDays')
                return this
            }
        }
    ]
}