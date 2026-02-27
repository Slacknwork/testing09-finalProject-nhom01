import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchPage } from '../pages/SearchPage';
import { RoomDetailPage } from '../pages/RoomDetailPage';
import { RoomPage } from '../pages/RoomPage';

test.describe("Tìm kiếm phòng", () => {
        test("[TC08] Kiểm tra tìm kiếm theo địa điểm “Hồ Chí Minh tại module Search & Booking",
                async ({ page }) => {
                        const homePage = new HomePage(page)
                        const searchPage = new SearchPage(page)
                        await homePage.goto()
                        await homePage.clickHCMLocation()
                        const totalRooms = await searchPage.countRooms();
                        console.log("Tổng số phòng là: ", totalRooms)
                        expect(totalRooms).toBeGreaterThan(0);
                })

        test("[TC10] Kiểm tra khi lọc kết quả theo ngày check-in/check-out hợp lệ tại module Search & Booking",
                async ({ page }) => {
                        const homePage = new HomePage(page)
                        const searchPage = new SearchPage(page)
                        await homePage.goto()
                        await searchPage.clickDateFilter()
                        //await searchPage.selectDate(page, 'Feb 2026', 28)
                        await searchPage.selectDateRange(new Date(2026, 1, 28), new Date(2026, 2, 5))
                        await page.locator('div:has-text("Thêm khách")').nth(3).click();
                        for (let i = 0; i < 3; i++) {
                                await page.getByText('+').click();
                        }
                        await page.getByLabel('search').click();
                        await page.waitForTimeout(3000);
                        const totalRooms = await searchPage.countRooms();
                        console.log("Tổng số phòng là: ", totalRooms)
                        await page.waitForTimeout(1000);
                        expect(totalRooms).toBeGreaterThan(0);
                })
        test("[TC11] Kiểm tra khi lọc kết quả theo khoảng giá tại module Search & Booking",
                async ({ page }) => {
                        const homePage = new HomePage(page)
                        const searchPage = new SearchPage(page)
                        await homePage.goto()
                        await expect(page.getByRole('button', { name: 'Giá' })).toBeDisabled();
                })
        test("[TC12] Kiểm tra khi mở trang chi tiết phòng từ danh sách kết quả tại module Search & Booking",
                async ({ page }) => {
                        const homePage = new HomePage(page)
                        const searchPage = new SearchPage(page)
                        const roomPage = new RoomPage(page)
                        await homePage.goto()
                        await searchPage.clickDateFilter()
                        await searchPage.selectDateRange(new Date(2026, 2, 1), new Date(2026, 2, 4))
                        await page.getByLabel('search').click();
                        await roomPage.clickHCMRooms()             
                        expect(page.url()).toContain('/room-detail/1')
                        await page.waitForTimeout(3000);
        })
         test("[TC15] Kiểm tra sắp xếp kết quả theo giá/đánh giá hoạt động đúng tại module Search & Booking",
                async ({ page }) => {
                        const homePage = new HomePage(page)
                        const searchPage = new SearchPage(page)
                        await homePage.goto()
                        await expect(page.getByRole('button', { name: 'Bộ lọc khác' })).toBeDisabled();
                })

})
