import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegisterModal } from '../pages/RegisterModal';
import { LoginModal } from '../pages/LoginModal';
import { HighlightElement } from '../utils/HighlightElement';


function uniqueEmail(prefix = 'team09') {
  return `${prefix}_${Date.now()}@mailinator.com`;
}
async function expectToastContains(page: any, text: string | RegExp) {
  const toast = page.locator('.ant-message-notice-content, .ant-notification-notice-message');
  await expect(toast.first()).toBeVisible({ timeout: 8000 });
  await expect(toast.first()).toContainText(text);
}
test.describe('Authentication - TC02 -> TC06', () => {

  test('TC02 - Register fail when email already exists', async ({ page }) => {
    const home = new HomePage(page);
    const register = new RegisterModal(page);
    const hi = new HighlightElement(page);

    await home.goto();
    // highlight nút mở menu (trước login dùng icon ảnh)
  await hi.highlightElements(home.userMenuButton);
  await home.clickUserMenu();
 
    // highlight nút Đăng ký trong dropdown
  await hi.highlightElements(home.dangKyButton);
  await home.clickDangKyButton();

  // chờ modal
  await register.waitForModal();

  // highlight các field register + nút submit
  await hi.highlightElements(register.nameInput);
  await hi.highlightElements(register.emailInput);
  await hi.highlightElements(register.passwordInput);
  await hi.highlightElements(register.phoneInput);
  await hi.highlightElements(register.birthdayInput);
  await hi.highlightElements(register.genderInput);
  await hi.highlightElements(register.submitButton);

    // NOTE: email phải hợp lệ và đã tồn tại
    await register.register({
      name: 'tester',
      email: 'tester09@gmail.com',
      password: '123123Tester@',
      phone: '0901234567',
      selectGender: true,
    });

    await register.expectMessageContains(/tồn tại|already exists/i);
    await expect(register.modal).toBeVisible();
  });

  test('TC03 - Register fail when password is weak', async ({ page }) => {
  const home = new HomePage(page);
  const register = new RegisterModal(page);
  const hi = new HighlightElement(page);

  await home.goto();

  await hi.highlightElements(home.userMenuButton);
  await home.clickUserMenu();

  await hi.highlightElements(home.dangKyButton);
  await home.clickDangKyButton();

  await register.waitForModal();

  await hi.highlightElements(register.nameInput);
  await hi.highlightElements(register.emailInput);
  await hi.highlightElements(register.passwordInput);
  await hi.highlightElements(register.submitButton);

  await register.register({
    name: 'tester0901',
    email: uniqueEmail('weak'),
    password: '123456', // password yếu
    phone: '0901234567',
    selectGender: true,
  });

  await register.expectMessageContains(/password|mật khẩu|định dạng/i);
  await expect(register.modal).toBeVisible();
});

  test('TC04 - Login success with valid credentials', async ({ page }) => {
  const home = new HomePage(page);
  const login = new LoginModal(page);
  const hi = new HighlightElement(page);

  await home.goto();

  // highlight nút mở menu (trước login)
  await hi.highlightElements(home.userMenuButton);
  await home.clickUserMenu();

  // highlight nút Đăng nhập trong dropdown
  await hi.highlightElements(home.dangNhapButton);
  await home.clickDangNhapButton();

  // highlight field + nút login trong modal
  await login.waitForModal();
  await hi.highlightElements(login.emailInput);
  await hi.highlightElements(login.passwordInput);
  await hi.highlightElements(login.loginButton);

  await login.login('tester09@gmail.com', '123123Tester@');
 
  await expectToastContains(page, /Đăng nhập thành công/i);
});

 test('TC05 - Login fail with wrong email (valid format)', async ({ page }) => {
  const home = new HomePage(page);
  const login = new LoginModal(page);
  const hi = new HighlightElement(page);

  await home.goto();

  await hi.highlightElements(home.userMenuButton);
  await home.clickUserMenu();

  await hi.highlightElements(home.dangNhapButton);
  await home.clickDangNhapButton();

  await login.waitForModal();
  await hi.highlightElements(login.emailInput);
  await hi.highlightElements(login.passwordInput);
  await hi.highlightElements(login.loginButton);

  await login.login('testsaiemail@gmail.com', '123123Tester@');

  await login.expectMessageContains(/Email hoặc mật khẩu không đúng/i);
  await expect(login.modal).toBeVisible();
});

  test('TC06 - Logout success after login', async ({ page }) => {
  const home = new HomePage(page);
  const login = new LoginModal(page);
  const hi = new HighlightElement(page);

  await home.goto();

  // mở login modal
  await hi.highlightElements(home.userMenuButton);
  await home.clickUserMenu();

  await hi.highlightElements(home.dangNhapButton);
  await home.clickDangNhapButton();

  await login.waitForModal();
  await hi.highlightElements(login.emailInput);
  await hi.highlightElements(login.passwordInput);
  await hi.highlightElements(login.loginButton);

  // login
  await login.login('tester09@gmail.com', '123123Tester@');
  await expectToastContains(page, /Đăng nhập thành công/i);

  // sau login: mở dropdown bằng nút profile (id user-menu-button)
  await hi.highlightElements(home.userProfile);
  await home.clickUserMenu();

  // highlight nút sign out
  await hi.highlightElements(home.signOutButton);
  await home.clickSignOut();
  
  await expectToastContains(page, /Đăng xuất thành công/i);
});
});