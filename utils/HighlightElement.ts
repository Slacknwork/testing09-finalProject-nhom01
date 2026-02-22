import {Page, Locator} from '@playwright/test';

export class HighlightElement{
    readonly page: Page

    constructor (page: Page){
        this.page = page
        
    }

    async highlightElements(locator: Locator): Promise<void>{
        if(await locator.isVisible()) {
            await locator.waitFor({state: 'visible', timeout: 2000})
            await locator.highlight() 
        }
        await this.page.waitForTimeout(2000)
    }
}