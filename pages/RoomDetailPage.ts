import {Page, Locator} from '@playwright/test';

export class RoomDetailPage {
    readonly page: Page

    readonly roomName: Locator
    readonly dateTimePicker: Locator
    readonly closeBtnInDate: Locator
    readonly bookingBtn: Locator
    readonly bookingFailedNoti: Locator
    readonly confirmBtn: Locator
    readonly successNoti: Locator
    readonly minusBtn: Locator 
    readonly plusBtn: Locator

    constructor(page: Page){
        this.page = page

        this.roomName = page.locator("//h2[@class=' font-bold text-3xl pt-4']")
        this.dateTimePicker = page.locator("//div[text() = 'Nhận phòng']/parent::div")
        this.closeBtnInDate = page.getByRole("button", {name: "Close"})
        this.bookingBtn = page.getByRole("button", {name: "Đặt phòng"})
        //ant-notification-notice ant-notification-notice-warning ant-notification-notice-closable
        this.bookingFailedNoti = page.locator("//div[contains(@class, 'ant-notification-notice-warning')]")
        this.confirmBtn = page.getByRole('button', {name: "Xác nhận"})
        this.successNoti = page.locator("//div[contains(@class, 'ant-notification-notice-success')]")
        this.minusBtn = page.getByRole("button", {name: "-"})
        this.plusBtn = page.getByRole("button", {name: "+"})
    }

    async clickDateTimePicker(): Promise<void>{
        await this.dateTimePicker.waitFor({state: 'visible', timeout: 6000})
        await this.dateTimePicker.click()
        await this.page.waitForTimeout(2000)
    }

    async chooseDateWithCurrentDay(numOfDate: number): Promise<void>{
        const currentDate: Date = new Date()
        const currentDay = currentDate.getDate()
        const choosenDay = currentDay + numOfDate
        
        let dayLocator: Locator
        let choosenDayLocator: Locator

        dayLocator = this.page.locator(`//span[text() = '${currentDay}']/parent::span`).first()
        choosenDayLocator = this.page.locator(`//span[text() = '${choosenDay}']/parent::span`).first()

        await dayLocator.waitFor({state: 'visible', timeout: 6000})
        await dayLocator.click()
        await this.page.waitForTimeout(2000)

        await choosenDayLocator.waitFor({state: 'visible', timeout: 6000})
        await choosenDayLocator.click()
        await this.page.waitForTimeout(2000)

        await this.closeBtnInDate.click()
        await this.page.waitForTimeout(2000)
    }

    async chooseDateWithSelectedDay(startDay: number, numOfDate: number): Promise<void>{
        const choosenDay = startDay + numOfDate
        
        let dayLocator: Locator
        let choosenDayLocator: Locator

        dayLocator = this.page.locator(`//span[text() = '${startDay}']/parent::span`)
        choosenDayLocator = this.page.locator(`//span[text() = '${choosenDay}']/parent::span`)

        await dayLocator.waitFor({state: 'visible', timeout: 6000})
        await dayLocator.click()
        await this.page.waitForTimeout(2000)

        await choosenDayLocator.waitFor({state: 'visible', timeout: 6000})
        await choosenDayLocator.click()
        await this.page.waitForTimeout(2000)

        await this.closeBtnInDate.click()
        await this.page.waitForTimeout(2000)
    }

    async clickBookingBtn(): Promise<void>{
        await this.bookingBtn.waitFor({state: 'visible', timeout: 6000})
        await this.bookingBtn.click()
        await this.page.waitForTimeout(2000)
    }

    async clickConfirmBtn(): Promise<void>{
        await this.confirmBtn.waitFor({state: 'visible', timeout: 6000})
        await this.confirmBtn.click()
        await this.page.waitForTimeout(2000)
    }

    async increaseCustomer(): Promise<void>{
        await this.plusBtn.waitFor({state: 'visible', timeout: 4000})
        await this.plusBtn.click()
        await this.page.waitForTimeout(2000)
    }

    async decreaseCustomer(): Promise<void>{
        await this.minusBtn.waitFor({state: 'visible', timeout: 4000})
        await this.minusBtn.click()
        await this.page.waitForTimeout(2000)
    }
}