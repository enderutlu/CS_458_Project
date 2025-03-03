const { Builder, By, Key, until, Actions } = require("selenium-webdriver");

async function testInvalidLogin() {
    let driver = await new Builder().forBrowser("firefox").build();
    
    try {
        await driver.get("http://localhost:3000");

        let emailField = await driver.wait(until.elementLocated(By.css('input[type="text"]')), 10000);
        let passwordField = await driver.wait(until.elementLocated(By.css('input[type="password"]')), 10000);
        let loginButton = await driver.findElement(By.css('button[type="submit"]'));

        await emailField.sendKeys("wrong@example.com");
        await passwordField.sendKeys("wrongpassword");
        await loginButton.click();

        await driver.wait(until.elementLocated(By.id('error-message')), 10000);
        
        let errorMessage = await driver.findElement(By.id('error-message')).getText();
        console.log("error message", errorMessage);
        if (errorMessage.includes("Login failed. Wrong email or password.")) {
            console.log("Test Passed: Invalid Login Handled Correctly");
        } else {
            console.log("Test Failed: Unexpected error message - " + errorMessage);
        }
    } catch (error) {
        console.error("Test Failed:", error.message);
    } 
    finally {
        await driver.quit();
    }
}

async function testWrongEmailFormat() {
    let driver = await new Builder().forBrowser("firefox").build();
    
    try {
        await driver.get("http://localhost:3000");

        let emailField = await driver.wait(until.elementLocated(By.css('input[type="text"]')), 10000);
        let passwordField = await driver.wait(until.elementLocated(By.css('input[type="password"]')), 10000);
        let loginButton = await driver.findElement(By.css('button[type="submit"]'));

        await emailField.sendKeys("wrongexample.com");
        await passwordField.sendKeys("1");
        await loginButton.click();

        await driver.wait(until.elementLocated(By.id('error-message')), 10000);
        
        let errorMessage = await driver.findElement(By.id('error-message')).getText();
        console.log("error message", errorMessage);
        if (errorMessage.includes("Email format is incorrect. Email must contain one '@', characters before '@' and after '@'.")) {
            console.log("Test Passed: Invalid Email Handled Correctly");
        } else {
            console.log("Test Failed: Unexpected error message - " + errorMessage);
        }
    } catch (error) {
        console.error("Test Failed:", error.message);
    }
}

async function testMultipleFailedAttempts() {
    let driver = await new Builder().forBrowser("firefox").build();
    
    try {
        await driver.get("http://localhost:3000");

        let emailField = await driver.wait(until.elementLocated(By.css('input[type="text"]')), 10000);
        let passwordField = await driver.wait(until.elementLocated(By.css('input[type="password"]')), 10000);
        let loginButton = await driver.findElement(By.css('button[type="submit"]'));

        await emailField.sendKeys("endeerutlu@gmail.com");
        await passwordField.sendKeys("wrongpassword");
        for(let i = 0; i<5; i++){
            await loginButton.click();
        }

        let text = await loginButton.getText();

        if (text.includes("Try again in")){
            console.log("Test Passed: Handled Multiple Failed Attempts Correctly");
        } else {
            console.log("Test Failed: Unexpected behaviour");
        }
    } catch (error) {
        console.error("Test Failed:", error.message);
    }
}

async function testGoogleLogin() {
    let driver = await new Builder().forBrowser("firefox").build();

    try {
        await driver.get("http://localhost:3000");
        let mainWindowHandle = await driver.getWindowHandle();
        // Click the Google Login button
        let googleLoginButton = await driver.wait(until.elementLocated(By.css("div[role='button']")), 3000);
        await googleLoginButton.click();
        driver.sleep(2000);
        await driver.wait(async () => (await driver.getAllWindowHandles()).length === 2, 10000);

        // Get all window handles
        let windowHandles = await driver.getAllWindowHandles();

        // Switch to the new window
        let newWindowHandle = windowHandles.find(handle => handle !== mainWindowHandle);
        await driver.switchTo().window(newWindowHandle);
        driver.sleep(2000);

        let emailField = await driver.wait(until.elementLocated(By.xpath('//input[@type="email"]')), 3000).sendKeys("aayytest123@gmail.com");
        let nextButton = await driver.wait(until.elementLocated(By.xpath('//span[text()="Next"]')), 10000).click();
        
        await driver.wait(until.elementLocated(By.xpath('//span[text()="Welcome"]')), 10000);
        let welcomeText = await driver.findElement(By.xpath('//span[text()="Welcome"]')).getText();
        if (welcomeText.includes("Welcome")) {
            console.log("✅Test Passed: Google OAuth Login Page Opened and Email Entered");
        }
    } catch (error) {
        console.error("Test Failed:", error.message);
    }  
    finally {
        await driver.quit();
    }
}

async function testLoginWithSameEmail() {
    let driver = await new Builder().forBrowser("firefox").build();

    try {
        await driver.get("http://localhost:3000");
        let mainWindowHandle = await driver.getWindowHandle();

        // Click the Google Login button
        let googleLoginButton = await driver.wait(until.elementLocated(By.css("div[role='button']")), 3000);
        await googleLoginButton.click();
        driver.sleep(2000);
        await driver.wait(async () => (await driver.getAllWindowHandles()).length === 2, 10000);
    
        // Get all window handles
        let windowHandles = await driver.getAllWindowHandles();

        // Switch to the new window
        let newWindowHandle = windowHandles.find(handle => handle !== mainWindowHandle);
        await driver.switchTo().window(newWindowHandle);
        driver.sleep(2000);

        let emailField = await driver.wait(until.elementLocated(By.xpath('//input[@type="email"]')), 3000).sendKeys("aayytest123@gmail.com");
        let nextButton = await driver.wait(until.elementLocated(By.xpath('//span[text()="Next"]'), 3000)).click();
        driver.sleep(2000);
        // await driver.wait(until.elementLocated(By.xpath('//input[@type="checkbox"]'), 3000));
        // let element =  driver.findElement(By.xpath('//input[@type="checkbox"]'));
        // driver.executeScript("arguments[0].click();", element);
        // await driver.wait(until.elementLocated(By.xpath('//input[@type="text"]')), 3000);
        // let passwordField = driver.findElement(By.xpath('//input[@type="text"]'));
        let element = await driver.findElement(By.css('input[name="hiddenPassword"]'));
        let overlappingElement = await driver.findElement(By.css('.overlapping-element')); // Adjust the selector
        await driver.executeScript("arguments[0].style.display = 'none';", overlappingElement);
        await element.sendKeys("test1234?");
        //await passwordField.sendKeys("test1234?");
        let secondNextButton = await driver.wait(until.elementLocated(By.xpath('//span[text()="Next"]'), 3000)).click();
    
        // let alert = await driver.switchTo().alert();
        // let alertText = await alert.getText(); 

        // if (alertText.includes("User with email aayytest123@gmail.com already exists.")) {
        //     console.log("✅Test Passed: Google OAuth Test Passed: User already exists");
        // }
        // else {
        //     console.log("Test Failed: Unexpected alert text - " + alertText);
        // }   
    } catch (error) {   
        console.error("Test Failed:", error.message);
    }
    finally {
        await driver.quit();
    }
}

testInvalidLogin();
testWrongEmailFormat();
testMultipleFailedAttempts();
testGoogleLogin();
testLoginWithSameEmail();
