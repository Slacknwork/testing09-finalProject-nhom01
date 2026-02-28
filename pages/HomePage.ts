import {Page, Locator} from '@playwright/test';

export class HomePage{
    readonly page: Page

    readonly userMenuButton: Locator // trước login
    readonly dangNhapButton: Locator
    readonly dangKyButton: Locator
    readonly HCMLocation: Locator
    readonly userProfile: Locator // sau login
    readonly userProfileBtn: Locator // Dashboard
    readonly signOutButton: Locator

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
        this.userMenuButton = page.locator('#user-menu-button')
                            .or(page.getByRole('button', { name: /open user menu/i }))
                            .or(page.locator("button:has(img[src*='6596121.png'])"))
                            .or(page.locator("button.bg-main.rounded-full:has(img)"));

    // <li>
    //     <button class="block text-center px-5 w-full rounded py-2 text-sm text-gray-700 hover:bg-gray-300 ">
    //         Đăng ký
    //     </button>
    // </li>

        this.dangKyButton = page.locator('#user-dropdown button', { hasText: 'Đăng ký' });
        
        
        this.dangNhapButton = page.locator('#user-dropdown button', { hasText: 'Đăng nhập' });   
                            
        this.HCMLocation = page.locator("(//a[@href='/rooms/ho-chi-minh'])[1]")

       this.userProfile = page.locator('#user-menu-button')
                         .or(page.getByRole('button', { name: /open user menu/i }));
        this.userProfileBtn = page.locator("//a[@href='/info-user']", { hasText: 'Dashboard' });
        
        this.signOutButton = page.locator('#user-dropdown button', { hasText: 'Sign out' })
                            .or(page.getByRole('button', { name: 'Sign out', exact: true })); 
    }

    // B1: truy cap trang web
    async goto(timeout: number = 600000): Promise<void> {
        await this.page.goto('https://demo5.cybersoft.edu.vn', {timeout})
    }

    // B2: click vao user menu
   async clickUserMenu(): Promise<void> {
  await this.page.waitForLoadState('domcontentloaded');

  //  chọn instance cuối 
  const dropdown = this.page.locator('#user-dropdown').last();

  // nếu dropdown đang mở thì không click nữa
  if (await dropdown.isVisible().catch(() => false)) return;

  // mở menu: sau login ưu tiên userProfile, chưa login dùng userMenuButton
  if (await this.userProfile.isVisible().catch(() => false)) {
    await this.userProfile.click();
  } else {
    await this.userMenuButton.waitFor({ state: 'visible', timeout: 15000 });
    await this.userMenuButton.click();
  }

  await dropdown.waitFor({ state: 'visible', timeout: 8000 });
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

    async clickUserProfileBtn(): Promise<void> {
    await this.clickUserMenu();
    await this.userProfileBtn.waitFor({ state: 'visible', timeout: 6000 });
    await this.userProfileBtn.click();
  }
     async clickSignOut(): Promise<void> {
    await this.clickUserMenu();
    await this.signOutButton.waitFor({ state: 'visible', timeout: 8000 });
    await this.signOutButton.click();
  }

}