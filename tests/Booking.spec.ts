import {test, expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RoomPage } from '../pages/RoomPage';
import { RoomDetailPage } from '../pages/RoomDetailPage';
import { LoginModal } from '../pages/LoginModal';

test.describe('Đặt phòng', () => {
    test('Đặt phòng thành công', async({page}) =>{
        const homePage = new HomePage(page)
        const roomPage = new RoomPage(page)
        const roomDetailPage = new RoomDetailPage(page)
        const loginModal = new LoginModal(page)

        await homePage.goto()

        await homePage.clickUserMenu()
        await homePage.clickDangNhapButton()

        await loginModal.login("sadsa@gmail.com", "sadsad")

        await homePage.clickHCMLocation()
        await roomPage.clickHCMRooms()
        await roomDetailPage.clickDateTimePicker()
        await roomDetailPage.chooseDate(3)
        await roomDetailPage.clickBookingBtn()
        await roomDetailPage.clickConfirmBtn()

        expect(roomDetailPage.successNoti).toBeVisible()
    })

    test('Đặt phòng thất bại', async({page}) => {
        const homePage = new HomePage(page)
        const roomPage = new RoomPage(page)
        const roomDetailPage = new RoomDetailPage(page)

        await homePage.goto()

        await homePage.clickHCMLocation()
        await roomPage.clickHCMRooms()
        await roomDetailPage.clickDateTimePicker()
        await roomDetailPage.chooseDate(3)
        await roomDetailPage.clickBookingBtn()

        expect(roomDetailPage.bookingFailedNoti).toBeVisible()
    })
})