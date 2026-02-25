import {Page, Locator} from '@playwright/test';

export class RoomPage {
    readonly page: Page
    
    readonly HCMRooms: Locator

    constructor(page: Page){
        this.page = page

        this.HCMRooms = page.locator("//a[@href='/room-detail/1']")
    }

    async clickHCMRooms(): Promise<void> {
        await this.HCMRooms.waitFor({state: 'visible', timeout: 12000})
        await this.HCMRooms.click()
        await this.page.waitForTimeout(2000)
    }

}