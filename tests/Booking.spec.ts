import {test, expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RoomPage } from '../pages/RoomPage';
import { RoomDetailPage } from '../pages/RoomDetailPage';
import { LoginModal } from '../pages/LoginModal';
import { HighlightElement } from '../utils/HighLightElement';
import { UserProfilePage } from '../pages/UserProfilePage';

test.describe('Đặt phòng', () => {
    //test.describe.configure({mode: 'serial'})

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

    //Only check avaiable rooms
    test('Kiểm tra thông tin phòng đã đặt', async({page})=> {
        const homePage = new HomePage(page)
        const loginModal = new LoginModal(page)
        const userProfile = new UserProfilePage(page)
        const highlight =  new HighlightElement(page)

        await homePage.goto()

        await homePage.clickUserMenu()
        await homePage.clickDangNhapButton()

        await loginModal.login("sadsa@gmail.com", "sadsad")
        await homePage.clickUserProfileBtn()

        await highlight.highlightElements(userProfile.rooms)
        await highlight.highlightElements(userProfile.name)
        await highlight.highlightElements(userProfile.date)
        await highlight.highlightElements(userProfile.price)
        await highlight.highlightElements(userProfile.status)

        expect(userProfile.rooms).toBeVisible()
        expect(userProfile.name).toBeVisible()
        expect(userProfile.date).toBeVisible()
        expect(userProfile.price).toBeVisible()
        expect(userProfile.status).toBeVisible()
    })
})