import {test, expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RoomPage } from '../pages/RoomPage';
import { RoomDetailPage } from '../pages/RoomDetailPage';
import { LoginModal } from '../pages/LoginModal';
import { HighlightElement } from '../utils/HighlightElement';
import { UserProfilePage } from '../pages/UserProfilePage';

test.describe('Đặt phòng', () => {
    //test.describe.configure({mode: 'serial'})

    test('Đặt phòng thành công', async({page}) =>{
        const homePage = new HomePage(page)
        const roomPage = new RoomPage(page)
        const roomDetailPage = new RoomDetailPage(page)
        const userProfile = new UserProfilePage(page)
        const loginModal = new LoginModal(page)

        await homePage.goto()

        await homePage.clickUserMenu()
        await homePage.clickDangNhapButton()

        await loginModal.login("sadsa@gmail.com", "sadsad")

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

    test('Đặt phòng thất bại', async({page}) => {
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
    test('Kiểm tra thông tin phòng đã đặt', async({page})=> {
        const homePage = new HomePage(page)
        const loginModal = new LoginModal(page)
        const userProfile = new UserProfilePage(page)
        const highlight =  new HighlightElement(page)
        const allRooms = userProfile.countAllRooms()

        await homePage.goto()

        await homePage.clickUserMenu()
        await homePage.clickDangNhapButton()

        await loginModal.login("sadsa@gmail.com", "sadsad")
        await homePage.clickUserProfileBtn()

        await highlight.highlightElements(userProfile.avatarImg)
        for (let room = 1; room <= await allRooms; room++){
            await userProfile.allRooms.nth(room).scrollIntoViewIfNeeded({timeout: 1000})
            await highlight.highlightElements(userProfile.allRooms.nth(room))

        }
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