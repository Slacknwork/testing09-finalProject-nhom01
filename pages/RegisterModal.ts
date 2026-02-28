import {Page, Locator , expect } from '@playwright/test';

export class RegisterModal {
    
    readonly page: Page

    readonly nameInput: Locator
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly phoneInput: Locator
    readonly birthdayInput: Locator
    readonly genderInput: Locator
     readonly submitButton: Locator
    // readonly closeButton: Locator
    readonly modal: Locator   
    // Message có thể là toast hoặc inline 
  readonly message: Locator
    

    constructor(page: Page){
        this.page = page    

        this.modal = page.locator(".ant-modal-content")

        this.nameInput = page.locator("input#name").or(page.getByRole('textbox', {name: "name"}))
        this.emailInput = page.locator("input#email").or(page.getByRole('textbox', {name: "email"}))
        this.passwordInput = page.locator("input#password").or(page.getByRole('textbox', {name: "password"}))
        this.phoneInput = page.locator("input#phone").or(page.getByRole('textbox', {name: "phone"}))
        this.birthdayInput = page.locator("input#birthday").or(page.getByRole('textbox', {name: "birthday"}))
        this.genderInput = page.locator(".div.ant-select[name='gender']").or(page.locator("input#gender"))
        //  submit Đăng ký
         this.submitButton = this.modal.locator('button[type="submit"]:has-text("Đăng ký")');
          //  toast/message
    this.message = page.locator(
      '.ant-message-notice-content, .ant-notification-notice-message, .ant-form-item-explain, .ant-form-item-explain-error'
    );
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
        await this.birthdayInput.fill("04/03/2000")
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
        await genderOptions.nth(1).click() // chon nam
        await this.page.waitForTimeout(1000)
                 
    } 
    // B11: Nhat nut dang ky
    async clickSubmit() {
    await this.submitButton.waitFor({ state: 'visible', timeout: 6000 });
    await this.submitButton.click();
    }
    // B12: Doi xem thong bao
     async expectMessageContains(text: string | RegExp) {
    await expect(this.message.first()).toBeVisible({ timeout: 8000 });
    await expect(this.message.first()).toContainText(text);
  }
   // helper cho TC Authen
  async register(data: {
    name: string; email: string; password: string; phone: string;
    birthday?: string; selectGender?: boolean;
  }) {
    await this.waitForModal();
    await this.fillName(data.name);
    await this.fillEmail(data.email);
    await this.fillPassword(data.password);
    await this.fillPhone(data.phone);
    await this.birthdayInput.click()
    await this.birthdayInput.fill("04/03/2000")
    await this.page.waitForTimeout(1000)
    if (data.selectGender) await this.selectGender(0);
    await this.page.waitForTimeout(1000)
    await this.clickSubmit();
  }

}