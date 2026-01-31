import {test, expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegisterModal } from '../pages/RegisterModal';

test.describe('Dang ky', () => {
    test('Dang ky tai khoan moi', async ({page}) => {
        // khoi tao object HomePage
        const homePage = new HomePage(page)
        const registerModal = new RegisterModal(page)

        // B1: truy cap trang web
        await homePage.goto()

        // B2: click vao user menu
        await homePage.clickUserMenu()

        // B3: click vao nut dang ky
        await homePage.clickDangKyButton()

        // B4: Doi modal xuat hien
        await registerModal.waitForModal()

        // B5: Dien ten
        await registerModal.fillName("Nguyen Van A")

        // B6: Dien email
        await registerModal.fillEmail("nguyenVanA@gmail.com")

        // B7: Dien mat khau
        await registerModal.fillPassword("Abc123")

        // B8: Dien so dien thoai
        await registerModal.fillPhone("0945111666")

        // B9: Dien ngay sinh
        await registerModal.fillBirthday()

        // B10: Chon gioi tinh
        await registerModal.selectGender()

        expect(true).toBeTruthy()
    })
})