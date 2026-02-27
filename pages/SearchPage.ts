import { Page, Locator,expect } from '@playwright/test';
import { HighlightElement } from '../utils/HighLightElement';
export class SearchPage {
    readonly page: Page
    readonly roomResult: Locator;
    readonly dateFilter: Locator;
    readonly months: Locator;
    readonly priceButton: Locator;
    constructor(page: Page) {
        this.page = page
        this.roomResult = page.locator( "a[href*='/room-detail/']:not(.ant-card-cover a)");
        this.dateFilter = page.locator('div.cursor-pointer', {
            has: page.locator('p', {
                hasText: /\d{2}\/\d{2}\/\d{4}\s–\s\d{2}\/\d{2}\/\d{4}/
            })
        });
        this.months = page.locator('.rdrMonth')
        this.priceButton = page.getByRole('button', { name: 'Giá' })
    }


    async clickDateFilter() {
        console.log(await this.dateFilter.count());
        await this.dateFilter.scrollIntoViewIfNeeded({ timeout: 2000 })
        await this.dateFilter.waitFor({ state: 'visible', timeout: 12000 })
        await this.dateFilter.click();
        await this.page.waitForTimeout(2000);
    }

    async countRooms(): Promise<number> {
        const count = await this.roomResult.count();
        return count;
    }

  async  selectDate(page: Page, monthText: string, day: number) {
    const month = page.locator('.rdrMonth', {
        has: page.locator('.rdrMonthName', { hasText: monthText })
    })

    const dayButton = month
        .locator('button.rdrDay:not([disabled])')
        .filter({ hasText: new RegExp(`^${day}$`) })

    await dayButton.click()
    }
    // ===== Private helpers =====

  private formatMonthYear(date: Date): string {
    return date.toLocaleString('en-US', {
      month: 'short',
      year: 'numeric'
    })
  }

  private getDay(date: Date): number {
    return date.getDate()
  }

  private async getMonthContainer(date: Date): Promise<Locator> {
    const targetMonthText = this.formatMonthYear(date)

    const firstMonthText = await this.months
      .nth(0)
      .locator('.rdrMonthName')
      .innerText()

    const secondMonthText = await this.months
      .nth(1)
      .locator('.rdrMonthName')
      .innerText()

    if (targetMonthText === firstMonthText) {
      return this.months.nth(0)
    }

    if (targetMonthText === secondMonthText) {
      return this.months.nth(1)
    }

    throw new Error(`Month ${targetMonthText} is not visible`)
  }

  private async clickDay(date: Date) {
    const monthContainer = await this.getMonthContainer(date)

    const dayButton = monthContainer
  .locator('button.rdrDay:not(.rdrDayPassive):not([disabled])')
  .filter({ hasText: new RegExp(`^${this.getDay(date)}$`) })

    await expect(dayButton).toBeVisible()
    await dayButton.click()
  }

  // ===== Public methods =====

  async selectDateRange(start: Date, end: Date) {
    await this.clickDay(start)
    await this.clickDay(end)
  }

  async selectSingleDate(date: Date) {
    await this.clickDay(date)
  }
}