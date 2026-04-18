
# testing09-finalProject-nhom09 Document

testing09-finalProject-nhom09 is a testing project for [Airbnb Demo](https://demo5.cybersoft.edu.vn/) of Cybersoft Academy. Using for education purpose only


## Introduction

This project is created to demonstrate software testing skills including:
- Manual Testing
- Test Case Design
- Bug Reporting
- Automation Testing

The system under test: [Airbnb Demo](https://demo5.cybersoft.edu.vn/)
Testing type: Functional / Regression / Smoke

## Objectives
- Verify that the system meets business requirements.
- Detect defects before release.
- Ensure stability and usability of the application.
- Improve overall product quality.

## Test Approach

#### Manual Testing
- Requirement analysis.
- Test scenario design.
- Test case writing.
- Execute test cases.
- Report bugs
**Tools used**:
- Test case management: Excel, Jira

#### Automation Testing
- Framework: Playwright.
- Tech stack: Typescript.

Run test command:
```
npm install
npx playwright test
```
Generate report:
```
npx playwright show-report
```
## Project Structure
```
Testing-Project/
│
├── .github/workflows (for ci/cd)
│   └── playwright.yml
|
├── pages/ (folder containing page's locator and its function)
│   ├── HomePage.ts
│   ├── LoginModal.ts
│   ├── RegisterModal.ts
│   ├── RoomDetailModal.ts
│   ├── RoomPage.ts
│   └── UserProfilePage.ts
│
├── tests/ (folder containing testing file)
│   ├── authentication.spec.ts
│   ├── Booking.spec.ts
│   ├── Searching.spec.ts
│   └── UserProfile.spec.ts
│
├── reports/ (contain test reports)
├── screenshots/ (contain screenshots for fail test case)
│
├── utils/ (folder containing utilities code for repeative code)
│   ├── ElementUser.ts
│   └── HighlightElement.ts
│
├── .gitignore
├── package-lock.json
├── package.json
├── playwright.config.ts
├── README.md
└── tsconfig.json
```
## Sample Bug Report

**Bug Title**: Unable to complete booking.

**Environment**: Chrome 145 / Windows 11.

**Steps to Reproduce**:
1. Login
2. Select location
3. Select room
4. Select date
5. Click on + button
6. Click "Đặt phòng" button
7. Click "Xác nhận" button

**Actual Result**: Page refreshes unexpectedly

**Expected Result**: Booking confirmation page displayed

**Severity**: High

**Priority**: High

## Test Coverage

| Module           | Total Test Cases | Passed | Failed | Blocked | Not excuted | Pass rate |  
| ---------------- | ---------------- | ------ | ------ | ------- |------------ |---------- |
| Authentication   | 16               | 12     | 4      | 0       | 0           | 75%       |
| Search & Booking | 21               | 14     | 6      | 1       | 0           | 66.7%     |
| Booking Flow     | 13               | 9      | 3      | 1       | 0           | 69.2%     |
| User Profile     | 26               | 20     | 5      | 1       | 0           | 76.9%     |
| Total            | 76               | 55     | 18     | 3       | 0           | 73.7%     |


## How to Run (Automation)

1. Clone repository
2. Install dependencies
3. Run tests
4. View HTML report

## Contributing

- **Bùi Đức Hoàng**	(test plan, test case, write test script) [TimB-spec](https://github.com/TimB-spec)
- **Dương Lê Minh Quang** (write test script, demo video presentation) [Duong Minh Quang](https://github.com/MinhQuang0605)
- **Phương Quốc Trung** (write test script, source code lead) [Slacknwork](https://github.com/Slacknwork)

## Authors
- **Phương Quốc Trung** - _Writer of this README_ - [Slacknwork](https://github.com/Slacknwork)


## Acknowledgments
- The source code of this website for testing belong to Cybersoft Academy
