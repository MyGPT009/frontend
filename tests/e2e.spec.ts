import { test, expect, Page, Browser} from '@playwright/test';

let testEmail: string;
let testPassword: string;
let page: Page;

async function setupTestUser(browser: Browser): Promise<void> {
  page = await browser.newPage();
  testEmail = `testuser_${Date.now()}@example.com`;
  testPassword = 'TestPass123!';

  await page.goto('http://localhost:4200/auth/register');
  await page.fill('input[formControlName="name"]', 'Test User');
  await page.fill('input[formControlName="email"]', testEmail);
  await page.fill('input[formControlName="password"]', testPassword);
  await page.fill('input[formControlName="password_confirmation"]', testPassword);
  await page.click('button[type="submit"]');
  await page.waitForURL(/auth\/login/);
}

async function login(page: Page, email: string, password: string): Promise<void> {
  await page.goto('http://localhost:4200/auth/login');
  await page.fill('input[formControlName="email"]', email);
  await page.fill('input[formControlName="password"]', password);
  await page.click('button[type="submit"]');
  await page.waitForSelector('p:has-text("home works!")');
}

//All tests
test.describe('Authentification', () => {
  test.beforeAll(async ({ browser }) => {
    await setupTestUser(browser);
  });

  test('should login successfully', async () => {
    await login(page, testEmail, testPassword);
  });
});

test.describe('Conversation', () => {
  test.beforeAll(async ({ browser }) => {
    await setupTestUser(browser);
  });

  test('should create a new conversation', async () => {
    await login(page, testEmail, testPassword);

    await page.goto('http://localhost:4200/conversation');

    const newConvButton = page.locator('button.new-conv-button');
    await expect(newConvButton).toBeEnabled();

    const initialConversations = await page.locator('.conversation-list ul li').count();

    await newConvButton.click();

    await page.waitForURL(/\/conversation\/\d+$/);

    const textarea = page.locator('textarea[placeholder="Écrivez quelque chose..."]');
    await expect(textarea).toBeVisible();

    await page.goto('http://localhost:4200/conversation');
    const updatedConversations = await page.locator('.conversation-list ul li').count();

    expect(updatedConversations).toBeGreaterThan(initialConversations);
  });

  test('should send a message and display both user and AI responses', async () => {
    await login(page, testEmail, testPassword);

    await page.goto('http://localhost:4200/conversation/58');

    const textarea = page.locator('textarea[placeholder="Écrivez quelque chose..."]');
    await expect(textarea).toBeVisible();
    await textarea.fill('Bonjour IA !');

    const sendButton = page.locator('button', { hasText: 'Envoyer' });
    await expect(sendButton).toBeEnabled();
    await sendButton.click();

    await page.waitForSelector('.message.user .text');
    const userMessage = page.locator('.message.user .text').last();
    await expect(userMessage).toContainText('Bonjour IA !');

    const aiResponse = page.locator('.message.model .text').first();
    await expect(aiResponse).toHaveText(/.+/);
  });
});
