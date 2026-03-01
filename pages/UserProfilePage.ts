import {Page, Locator} from '@playwright/test';
import { HighlightElement } from '../utils/HighlightElement';

export class UserProfilePage {
    readonly page: Page

    readonly allRooms: Locator
    readonly rooms: Locator
    readonly name: Locator
    readonly date: Locator
    readonly price: Locator
    readonly status: Locator

    readonly avatarImg: Locator

    readonly email: Locator
    readonly fullname: Locator
    readonly phone: Locator
    readonly dateOfBirth: Locator
    readonly gender: Locator
    readonly male: Locator
    readonly female: Locator

    readonly profile: Locator
    readonly updateBtn: Locator
    readonly successNoti: Locator

    readonly dobCloseBtn: Locator
    readonly genderCloseBtn: Locator

    readonly emailEmpty: Locator
    readonly fullnameEmpty: Locator
    readonly phoneEmpty: Locator
    readonly dateOfBirthEmpty: Locator
    readonly genderEmpty: Locator

    readonly emailError: Locator
    readonly fullnameError: Locator
    readonly phoneError: Locator

    constructor (page: Page){
        this.page = page

        this.allRooms = page.locator("//div[@class='ant-card-body']/ancestor::div[@data-aos='zoom-in']") 
        this.rooms = page.locator("//div[@class='ant-card-body']/ancestor::div[@data-aos='zoom-in']").first()       
        //this.rooms = page.locator("//div[@class='ant-card-body']").nth(2)
        this.name = page.locator("//p[@class='truncate text-xl']").first()
        this.date = page.locator("//span[@class='']").first()
        this.price = page.locator("//span[@class='font-bold']").first()
        this.status = page.locator("//span[@class='']").first()

        this.avatarImg = page.locator("//img[@class='mx-auto w-36 h-36 object-cover rounded-full']")
        this.profile = page.getByRole('button', {name: 'Chỉnh sửa hồ sơ'})

        this.email = page.locator("//input[@id='email' and @class='ant-input css-zl9ks2']")
        this.fullname = page.getByRole("textbox", {name: "Họ tên"})
        this.phone = page.getByRole("textbox", {name: "Số điện thoại"})
        this.dateOfBirth = page.getByRole("textbox", {name: "Ngày sinh"})
        this.gender = page.locator("//span[@class='ant-select-selection-item']")

        this.male = page.locator("//div[contains(text(),'Nam')]")
        this.female = page.locator("//div[contains(text(),'Nữ')]")

        this.updateBtn = page.getByRole('button', {name: 'Cập nhật', exact: true})
        this.successNoti = page.locator("//span[contains(text(),'Cập nhật thông tin thành công')]")

        this.dobCloseBtn = page.locator("(//span[@aria-label='close-circle'])[4]")
        this.genderCloseBtn = page.locator("(//span[@aria-label='close-circle'])[4]")

        this.emailEmpty = page.locator("//div[text()='Vui lòng nhập email!']")
        this.fullnameEmpty = page.locator("//div[text()='Vui lòng nhập họ tên!']")
        this.phoneEmpty = page.locator("//div[text()='Vui lòng nhập số điện thoại!']")
        this.dateOfBirthEmpty = page.locator("//div[text()='Vui lòng chọn ngày sinh!']")
        this.genderEmpty = page.locator("//div[text()='Vui lòng chọn giới tính']")

        this.emailError = page.locator("//div[text()='Email không hợp lệ!']")
        this.fullnameError = page.locator("//div[text()='Họ tên không hợp lệ!']")
        this.phoneError = page.locator("//div[text()='Sai định dạng số điện thoại!']")
        
    }

    async showProfile(): Promise<void> {
        await this.profile.waitFor({state: 'visible', timeout: 6000})
        await this.profile.click()
        await this.page.waitForTimeout(3000)
    }

    async fillInfo(data: {
        email?: string, 
        fullname?: string, 
        phone?: string, 
        dateOfBirth?: string, 
        gender?: 'male' | 'female'
    }): Promise<void>{
        if (data.email !== null && data.email !== undefined) {
            await this.email.fill(data.email)
            await this.page.waitForTimeout(1000)
        }
        if (data.fullname !== null && data.fullname !== undefined) {
            await this.fullname.fill(data.fullname)
            await this.page.waitForTimeout(1000)
        }
        if (data.phone !== null && data.phone !== undefined) {
            await this.phone.fill(data.phone)
            await this.page.waitForTimeout(1000)
        }
        if (data.dateOfBirth !== null && data.dateOfBirth !== undefined) {
            await this.dateOfBirth.click()
            await this.dateOfBirth.fill(data.dateOfBirth)
            await this.page.keyboard.press('Enter');
            await this.page.waitForTimeout(1000)
        }
        if (data.gender !== null && data.gender !== undefined) {
            await this.gender.click()
            if (data.gender === 'male'){
                await this.male.waitFor({state: 'visible', timeout: 2000})
                await this.male.click()
            } else{
                await this.male.waitFor({state: 'visible', timeout: 2000})
                await this.female.click()
            }
            await this.page.waitForTimeout(1000)
        }
    }

    async clickUpdateBtn(): Promise<void> {
        await this.updateBtn.waitFor({state: 'visible', timeout: 2000})
        await this.updateBtn.click()
        await this.page.waitForTimeout(3000)
    }

    async clickCloseElementsBtn(): Promise<void> {
        await this.dobCloseBtn.waitFor({timeout: 2000})
        await this.dobCloseBtn.click()
        await this.page.waitForTimeout(2000)

        await this.genderCloseBtn.waitFor({timeout: 2000})
        await this.genderCloseBtn.click()
        await this.page.waitForTimeout(2000)
    } 

    async countAllRooms(): Promise<void>{
        //let allOfRooms: Locator
        const highlight =  new HighlightElement(this.page)
        const numOfRooms =  await this.allRooms.count()
        for (let room = 1; room <= numOfRooms; room++){
            //llOfRooms = this.page.locator(`//div[@class='ant-card-body']/ancestor::div[@data-aos='zoom-in'][${room}]`)
            await this.allRooms.nth(room).scrollIntoViewIfNeeded({timeout: 1000})
            await highlight.highlightElements(this.allRooms.nth(room))
        }
    }
}