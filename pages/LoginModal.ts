import {Page, Locator} from '@playwright/test';

export class LoginModal {
    readonly page: Page

    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly loginButton: Locator
    // readonly closeButton: Locator
    readonly modal: Locator   

    constructor(page: Page){
        this.page = page

        this.modal = page.locator(".ant-modal-content")

        this.emailInput = page.locator("input#email").or(page.getByRole('textbox', {name: "email"}))
        this.passwordInput = page.locator("input#password").or(page.getByRole('textbox', {name: "password"}))
        this.loginButton = page.getByRole("button", {name: "Đăng nhập"})
    
    }

    async waitForModal(timeout: number = 60000): Promise<void>{
        await this.modal.waitFor({state:'visible', timeout})
    }

    async fillEmail(email: string): Promise<void>{
        await this.emailInput.fill(email)
        await this.page.waitForTimeout(1000)
    }

    async fillPassword(password: string): Promise<void>{
        await this.passwordInput.fill(password)
        await this.page.waitForTimeout(1000)
    }

    async clickLoginButton(): Promise<void>{
        await this.loginButton.click()
        await this.page.waitForTimeout(3000)
    }

    async login(email: string, password: string): Promise<void>{
        await this.fillEmail(email)
        await this.fillPassword(password)
        await this.clickLoginButton()
    }

}