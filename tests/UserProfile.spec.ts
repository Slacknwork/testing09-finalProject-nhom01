import {test, expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginModal } from '../pages/LoginModal';
import { UserProfilePage } from '../pages/UserProfilePage';
import { HighlightElement } from '../utils/HighlightElement';
import { ElementUser } from '../utils/ElementUser';

test.describe("Thông tin người dùng", () => {
    test("Kiểm tra thông tin người dùng", async({page}) =>{
        const homePage = new HomePage(page)
        const loginModal = new LoginModal(page)
        const userProfile = new UserProfilePage(page)
        const highlight =  new HighlightElement(page)
        
        await homePage.goto()
        
        await homePage.clickUserMenu()
        await homePage.clickDangNhapButton()
        
        await loginModal.login("sadsa@gmail.com", "sadsad")
        await homePage.clickUserProfileBtn()

        await userProfile.showProfile()

        await highlight.highlightElements(userProfile.email)
        await highlight.highlightElements(userProfile.fullname)
        await highlight.highlightElements(userProfile.phone)
        await highlight.highlightElements(userProfile.dateOfBirth)
        await highlight.highlightElements(userProfile.gender)

        expect(userProfile.email).toBeVisible()
        expect(userProfile.fullname).toBeVisible()
        expect(userProfile.phone).toBeVisible()
        expect(userProfile.dateOfBirth).toBeVisible()
        expect(userProfile.gender).toBeVisible()
        
    })

    test("Cập nhật thông tin người dùng thành công", async ({page}) => {
        const homePage = new HomePage(page)
        const loginModal = new LoginModal(page)
        const userProfile = new UserProfilePage(page)
        
        await homePage.goto()
        
        await homePage.clickUserMenu()
        await homePage.clickDangNhapButton()
        
        await loginModal.login("sadsa@gmail.com", "sadsad")
        await homePage.clickUserProfileBtn()

        await userProfile.showProfile() 
        await userProfile.fillInfo({
            email:"sadsa@gmail.com",
            fullname: "ok",
            phone: "0555555555",
            dateOfBirth: "18/11/2022",
            gender: 'male'
        })
        await userProfile.clickUpdateBtn()
        //await highlight.highlightElements(userProfile.successNoti)

        expect(userProfile.successNoti).toBeVisible()

        await userProfile.showProfile()

        expect(userProfile.email).toHaveValue('sadsa@gmail.com', {timeout: 1000})
        expect(userProfile.fullname).toHaveValue('ok', {timeout: 1000})
        expect(userProfile.phone).toHaveValue('0555555555', {timeout: 1000})
        expect(userProfile.dateOfBirth).toHaveValue('18/11/2022', {timeout: 1000})
        expect(userProfile.gender).toHaveText('Nam', {timeout: 1000})

    })

    test("Cập nhật thông tin người dùng với field trống", async ({page}) => {
        const homePage = new HomePage(page)
        const loginModal = new LoginModal(page)
        const userProfile = new UserProfilePage(page)
        const highlight =  new HighlightElement(page)
        
        await homePage.goto()
        
        await homePage.clickUserMenu()
        await homePage.clickDangNhapButton()
        
        await loginModal.login("sadsa@gmail.com", "sadsad")
        await homePage.clickUserProfileBtn()

        await userProfile.showProfile() 
        await userProfile.fillInfo({
            email:"",
            fullname: "",
            phone: ""
        })
        await userProfile.clickCloseElementsBtn()
        await userProfile.clickUpdateBtn()

        await highlight.highlightElements(userProfile.emailEmpty)
        await highlight.highlightElements(userProfile.fullnameEmpty)
        await highlight.highlightElements(userProfile.phoneEmpty)
        await highlight.highlightElements(userProfile.dateOfBirthEmpty)
        await highlight.highlightElements(userProfile.genderEmpty)

        expect(userProfile.emailEmpty).toBeVisible()
        expect(userProfile.fullnameEmpty).toBeVisible()
        expect(userProfile.phoneEmpty).toBeVisible()
        expect(userProfile.dateOfBirthEmpty).toBeVisible()
        expect(userProfile.genderEmpty).toBeVisible()

    })

    test("Cập nhật thông tin người dùng với không hợp lệ", async ({page}) => {
        const homePage = new HomePage(page)
        const loginModal = new LoginModal(page)
        const userProfile = new UserProfilePage(page)
        const highlight =  new HighlightElement(page)
        
        await homePage.goto()
        
        await homePage.clickUserMenu()
        await homePage.clickDangNhapButton()
        
        await loginModal.login("sadsa@gmail.com", "sadsad")
        await homePage.clickUserProfileBtn()

        await userProfile.showProfile() 
        await userProfile.fillInfo({
            email:"sadsa@gmail",
            fullname: "okok5554",
            phone: "05555555",
            dateOfBirth: "180/11120222"
        })
        await userProfile.clickUpdateBtn()

        await highlight.highlightElements(userProfile.emailError)
        await highlight.highlightElements(userProfile.fullnameError)
        await highlight.highlightElements(userProfile.phoneError)
        await highlight.highlightElements(userProfile.dateOfBirth)
        await highlight.highlightElements(userProfile.gender)

        expect(userProfile.emailError).toBeVisible()
        expect(userProfile.fullnameError).toBeVisible()
        expect(userProfile.phoneError).toBeVisible()
        expect(userProfile.dateOfBirth).toBeVisible()
        expect(userProfile.gender).toBeVisible()

    })
})