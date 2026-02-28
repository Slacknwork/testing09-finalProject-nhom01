import {Page, Locator , expect } from '@playwright/test';

export class LoginModal {
    readonly page: Page

    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly loginButton: Locator
    // readonly closeButton: Locator
    readonly modal: Locator   
    message: any;

    constructor(page: Page){
        this.page = page

        this.modal = page.locator(".ant-modal-content")

        this.emailInput = this.modal.locator('input#email')
      .or(this.modal.getByRole('textbox', { name: /email/i }));
    this.passwordInput = this.modal.locator('input#password')
      .or(this.modal.getByRole('textbox', { name: /mật khẩu|password/i }));
        this.loginButton = this.modal.locator('button[type="submit"]:has-text("Đăng nhập")');
       this.message = page.locator(
      '.ant-message-notice-content, .ant-notification-notice-message, .ant-form-item-explain, .ant-form-item-explain-error'
    );
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
        await this.waitForModal();
        await this.fillEmail(email)
        await this.fillPassword(password)
        await this.clickLoginButton()
    }
   async expectMessageContains(text: string | RegExp) {
  // inline error trong modal
  const inlineMsg = this.modal.getByText(text);
  // fallback toast
  const toastMsg = this.page.locator('.ant-message-notice-content, .ant-notification-notice-message')
    .filter({ hasText: text });

  await expect(inlineMsg.or(toastMsg).first()).toBeVisible({ timeout: 8000 });
}

}