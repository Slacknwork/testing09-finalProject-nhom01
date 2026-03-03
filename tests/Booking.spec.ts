import {test, expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RoomPage } from '../pages/RoomPage';
import { RoomDetailPage } from '../pages/RoomDetailPage';
import { LoginModal } from '../pages/LoginModal';
import { HighlightElement } from '../utils/HighlightElement';
import { UserProfilePage } from '../pages/UserProfilePage';

test.describe('Booking Flow', () => {
    //test.describe.configure({mode: 'serial'})

    test('AU11 - Kiểm tra đặt phòng thành công theo luồng end-to-end với người dùng đã đăng nhập tại module Booking Flow', async({page}) =>{
        const homePage = new HomePage(page)
        const roomPage = new RoomPage(page)
        const roomDetailPage = new RoomDetailPage(page)
        const userProfile = new UserProfilePage(page)
        const loginModal = new LoginModal(page)

        await homePage.goto()

        await homePage.clickUserMenu()
        await homePage.clickDangNhapButton()

        await loginModal.login("sadsad@gmail.com", "sadsad")

        await homePage.clickHCMLocation()
        await roomPage.clickHCMRooms()

        const roomName = await roomDetailPage.roomName.textContent()
        
        await roomDetailPage.clickDateTimePicker()
        await roomDetailPage.chooseDateWithSelectedDay(26, 2)
        await roomDetailPage.increaseCustomer()
        await roomDetailPage.clickBookingBtn()
        await roomDetailPage.clickConfirmBtn()

        expect(roomDetailPage.successNoti).toBeVisible()

        await homePage.clickUserProfileBtn()        

        expect(await userProfile.name.textContent()).toContain(roomName!.trim())

    })

    test('AU12 - Kiểm tra không thể đặt phòng khi người dùng chưa đăng nhập tại module Booking Flow', async({page}) => {
        const homePage = new HomePage(page)
        const roomPage = new RoomPage(page)
        const roomDetailPage = new RoomDetailPage(page)

        await homePage.goto()

        await homePage.clickHCMLocation()
        await roomPage.clickHCMRooms()
        await roomDetailPage.clickDateTimePicker()
        await roomDetailPage.chooseDateWithCurrentDay(2)
        await roomDetailPage.clickBookingBtn()

        expect(roomDetailPage.bookingFailedNoti).toBeVisible()
    })

    //Only check avaiable rooms
    test('AU13 - Kiểm tra hiển thị lịch sử đặt phòng đúng với người dùng đã đăng nhập tại module Booking Flow', async({page})=> {
        const homePage = new HomePage(page)
        const loginModal = new LoginModal(page)
        const userProfile = new UserProfilePage(page)
        const highlight =  new HighlightElement(page)
        const allRooms = userProfile.countAllRooms()

        await homePage.goto()

        await homePage.clickUserMenu()
        await homePage.clickDangNhapButton()

        await loginModal.login("sadsad@gmail.com", "sadsad")
        await homePage.clickUserProfileBtn()

        await highlight.highlightElements(userProfile.avatarImg)
        await userProfile.countAllRooms()
        
        await highlight.highlightElements(userProfile.name)
        //wait highlight.highlightElements(userProfile.date)
        await highlight.highlightElements(userProfile.price)
        //await highlight.highlightElements(userProfile.status)
        
        await page.waitForTimeout(15000)

        expect(userProfile.avatarImg).toBeVisible({timeout: 6000})
        expect(userProfile.rooms).toBeVisible({timeout: 6000})
        expect(userProfile.name).toBeVisible()
        //expect(userProfile.date).toBeVisible()
        expect(userProfile.price).toBeVisible()
        //expect(userProfile.status).toBeVisible()
    })
})