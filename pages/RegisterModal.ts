import {Page, Locator} from '@playwright/test';

export class RegisterModal {
    readonly page: Page

    readonly nameInput: Locator
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly phoneInput: Locator
    readonly birthdayInput: Locator
    readonly genderInput: Locator
    // readonly submitButton: Locator
    // readonly closeButton: Locator
    readonly modal: Locator   

    constructor(page: Page){
        this.page = page

        this.modal = page.locator(".ant-modal-content")

        this.nameInput = page.locator("input#name").or(page.getByRole('textbox', {name: "name"}))
        this.emailInput = page.locator("input#email").or(page.getByRole('textbox', {name: "email"}))
        this.passwordInput = page.locator("input#password").or(page.getByRole('textbox', {name: "password"}))
        this.phoneInput = page.locator("input#phone").or(page.getByRole('textbox', {name: "phone"}))
        this.birthdayInput = page.locator("input#birthday").or(page.getByRole('textbox', {name: "birthday"}))
        this.genderInput = page.locator(".div.ant-select[name='gender']").or(page.locator("input#gender"))
    
    }

    // B4: Doi modal xuat hien
    async waitForModal(timeout: number = 60000): Promise<void>{
        await this.modal.waitFor({state:'visible', timeout})
    }

    // B5: Dien ten
    async fillName(name: string): Promise<void>{
        await this.nameInput.fill(name)
        await this.page.waitForTimeout(1000)
    }

    // B6: Dien email
    async fillEmail(email: string): Promise<void>{
        await this.emailInput.fill(email)
        await this.page.waitForTimeout(1000)
    }

    // B7: Dien mat khau
    async fillPassword(password: string): Promise<void>{
        await this.passwordInput.fill(password)
        await this.page.waitForTimeout(1000)
    }

    // B8: Dien so dien thoai
    async fillPhone(phone: string): Promise<void>{
        await this.phoneInput.fill(phone)
        await this.page.waitForTimeout(1000)
    }

    // B9: Chon ngay sinh
    async fillBirthday(days: number = 15): Promise<void>{
        await this.birthdayInput.click()
        await this.birthdayInput.fill("15/01/2026")
        await this.page.waitForTimeout(1000)
        
        // tim ngay cu the
        // const dayCells = this.page.locator(".ant-picker-cell:not(.ant-picker-cell-disabled)")
        // const targetDay = dayCells.filter({hasText: dayCells.toString()})
        // await targetDay.first().click()
    }

    // B10: Chon gioi tinh
    async selectGender(): Promise<void>{
        await this.genderInput.click()
        await this.page.waitForTimeout(500)

        const genderOptions = this.page.locator(".ant-select-item")
        await genderOptions.nth(0).click() // chon nam
        await this.page.waitForTimeout(1000)
    } 

}