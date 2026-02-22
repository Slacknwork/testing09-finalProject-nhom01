import {Page, Locator} from '@playwright/test';
// KO NEN SU DUNG
export class ElementUser{
    readonly page: Page

    constructor (page: Page){
        this.page = page
        
    }

    async compareTextInElement(locator: Locator, text: string){
        return await locator.inputValue() === text
    }

    async compareTextInSelector(locator: Locator, text: string): Promise<boolean>{
        return await locator.textContent() === text
    }
    
}