import {Page, Locator} from '@playwright/test';

export class HomePage{
    readonly page: Page

    readonly userMenuButton: Locator
    readonly dangNhapButton: Locator
    readonly dangKyButton: Locator
    readonly HCMLocation: Locator
    readonly userProfile: Locator
    readonly userProfileBtn: Locator

    constructor(page: Page){
        this.page = page
        // <button 
        //     class=" text-sm bg-main rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 font-bold duration-300 hover:scale-105 hover:bg-white hover:text-white"
        // >
        //     <img
        //         class="h-10"
        //         src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
        //     >
        // </button>
        this.userMenuButton = page.locator("button:has(img[src*='6596121.png'])")
                                .or(page.locator("button.bg-main.rounded-full:has(img)"));

    // <li>
    //     <button class="block text-center px-5 w-full rounded py-2 text-sm text-gray-700 hover:bg-gray-300 ">
    //         Đăng ký
    //     </button>
    // </li>

        this.dangKyButton = page.getByRole("button", {name: "Đăng ký"})
                            .or(page.locator("li.py-2:has-text('Đăng ký')"));
        
        this.dangNhapButton = page.getByRole("button", {name: "Đăng nhập"})
                            .or(page.locator("li.py-2:has-text('Đăng nhập')"));    
                            
        this.HCMLocation = page.locator("(//a[@href='/rooms/ho-chi-minh'])[1]")

        this.userProfile = page.locator("//*[@id='user-menu-button']")
        this.userProfileBtn = page.locator("//a[@href='/info-user']", {hasText: "Dashboard"})

    }

    // B1: truy cap trang web
    async goto(timeout: number = 600000): Promise<void> {
        await this.page.goto('https://demo5.cybersoft.edu.vn', {timeout})
    }

    // B2: click vao user menu
    async clickUserMenu(): Promise<void> {
        await this.userMenuButton.waitFor({state: 'visible', timeout: 12000})
        await this.userMenuButton.click();
        await this.page.waitForTimeout(2000);
    }


    // B3.1: click vao nut dang ky
    async clickDangKyButton(): Promise<void>{
        await this.dangKyButton.waitFor({state: 'visible', timeout: 6000})
        await this.dangKyButton.click()
        await this.page.waitForTimeout(2000);
    }

    // B3.2: click vao nut dang nhap
    async clickDangNhapButton(): Promise<void>{
        await this.dangNhapButton.waitFor({state: 'visible', timeout: 6000})
        await this.dangNhapButton.click()
        await this.page.waitForTimeout(2000);
    }

    async clickHCMLocation(): Promise<void>{
        await this.HCMLocation.scrollIntoViewIfNeeded({timeout: 2000})
        await this.HCMLocation.waitFor({state: 'visible', timeout: 6000})
        await this.HCMLocation.click()
        await this.page.waitForTimeout(2000);
    }

    async clickUserProfileBtn(): Promise<void>{
        await this.userProfile.waitFor({state: 'visible', timeout: 6000})
        await this.userProfile.click()
        await this.userProfileBtn.waitFor({state: 'visible', timeout: 6000})
        await this.userProfileBtn.click()
        await this.page.waitForTimeout(2000);
    }

}