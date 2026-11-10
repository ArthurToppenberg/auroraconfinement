import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

for (const width of [390, 1440]) {
  test(`privacy notice is readable and exposes rights at ${width}px`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/privacy/', { waitUntil: 'domcontentloaded' });
    const main = page.getByRole('main');
    await expect(main.getByRole('heading', { level: 1 })).toHaveText(
      'Privacy notice',
    );
    await expect(main).toContainText(
      'The form sends its answers to our registration endpoint when you submit',
    );
    await expect(main).toContainText('Your email is not verified');
    await expect(main).toContainText('Data controller: Etienne Gras');
    await expect(main).toContainText(
      '24 months after the last meaningful contact',
    );
    await expect(main).toContainText('withdraw sharing permission');
    await expect(main).toContainText('Cloudflare');
    await expect(main).toContainText('Umami');
    await expect(main).toContainText('LinkedIn');
    await expect(main).not.toContainText(
      'Submissions are not orders, purchases, reservations, commitments, or Letters of Intent.',
    );
    await expect(
      main.getByRole('link', { name: 'Datatilsynet', exact: true }),
    ).toHaveAttribute(
      'href',
      'https://www.datatilsynet.dk/borger/klage/saadan-klager-du',
    );
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await page.screenshot({ path: `/tmp/aurora-privacy-top-${width}.png` });
    await page
      .getByRole('heading', { name: 'Your rights and how to use them' })
      .scrollIntoViewIfNeeded();
    await page.screenshot({ path: `/tmp/aurora-privacy-rights-${width}.png` });
    await page.locator('html').evaluate((element) => {
      element.style.fontSize = '200%';
    });
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      ),
    ).toBeLessThanOrEqual(0);
  });
}

test('LinkedIn consent gates embeds, persists a choice and supports withdrawal without changing analytics', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const linkedinRequests: string[] = [];
  await page.route('https://www.linkedin.com/**', async (route) => {
    linkedinRequests.push(route.request().url());
    await route.fulfill({
      contentType: 'text/html',
      body: '<p>Mock LinkedIn post</p>',
    });
  });
  await page.goto('/about/', { waitUntil: 'domcontentloaded' });
  const banner = page.getByRole('region', { name: 'Allow LinkedIn posts?' });
  await expect(banner).toBeVisible();
  await expect(page.locator('iframe[src*="linkedin.com"]')).toHaveCount(0);
  expect(linkedinRequests).toEqual([]);
  await expect(
    page.locator('script[src="https://stats.arthurtoppenberg.dk/script.js"]'),
  ).toHaveCount(1);
  await page
    .getByRole('button', { name: 'Accept LinkedIn', exact: true })
    .click();
  await expect(banner).toBeHidden();
  await expect(page.locator('iframe[src*="linkedin.com"]')).toHaveCount(3);
  await page.locator('.team-community').scrollIntoViewIfNeeded();
  await expect.poll(() => linkedinRequests.length).toBeGreaterThan(0);
  await page.reload({ waitUntil: 'domcontentloaded' });
  await expect(page.locator('iframe[src*="linkedin.com"]')).toHaveCount(3);
  await expect(banner).toBeHidden();
  await page
    .getByRole('button', { name: 'Cookie settings', exact: true })
    .click();
  await expect(banner).toBeFocused();
  await page
    .getByRole('button', { name: 'Decline LinkedIn', exact: true })
    .click();
  await expect(page.locator('iframe[src*="linkedin.com"]')).toHaveCount(0);
  await page.reload({ waitUntil: 'domcontentloaded' });
  await expect(banner).toBeHidden();
  await expect(page.locator('iframe[src*="linkedin.com"]')).toHaveCount(0);
  await expect(page.locator('.community-post-original')).toHaveCount(3);
  await page.goto('/register/', { waitUntil: 'domcontentloaded' });
  await expect(page.getByLabel('Full name (required)')).toBeVisible();
  await expect(
    page.locator('script[src="https://stats.arthurtoppenberg.dk/script.js"]'),
  ).toHaveCount(1);
});

for (const width of [390, 1440]) {
  test(`LinkedIn inline panel is accessible and balanced at ${width}px`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/about/', { waitUntil: 'domcontentloaded' });
    const banner = page.getByRole('region', { name: 'Allow LinkedIn posts?' });
    await expect(banner).toBeVisible();
    await expect(page.locator('.team-community .linkedin-consent')).toHaveCount(
      1,
    );
    expect(
      await banner.evaluate((element) => getComputedStyle(element).position),
    ).toBe('static');
    await expect(page.locator('.community-post-placeholder')).toHaveCount(3);
    const stageBox = (await page
      .locator('.community-post-stage')
      .boundingBox())!;
    const panelBox = (await banner.boundingBox())!;
    expect(panelBox.x).toBeGreaterThanOrEqual(stageBox.x);
    expect(panelBox.x + panelBox.width).toBeLessThanOrEqual(
      stageBox.x + stageBox.width + 1,
    );
    expect(panelBox.y).toBeGreaterThanOrEqual(stageBox.y);
    expect(panelBox.y + panelBox.height).toBeLessThanOrEqual(
      stageBox.y + stageBox.height + 1,
    );
    expect(
      (await page.locator('.community-post-placeholder').first().boundingBox())!
        .height,
    ).toBeGreaterThanOrEqual(560);

    await banner.scrollIntoViewIfNeeded();
    expect(
      (await new AxeBuilder({ page }).include('.linkedin-consent').analyze())
        .violations,
    ).toEqual([]);
    const accept = banner.getByRole('button', {
      name: 'Accept LinkedIn',
      exact: true,
    });
    const decline = banner.getByRole('button', {
      name: 'Decline LinkedIn',
      exact: true,
    });
    expect(
      Math.round((await accept.boundingBox())!.height),
    ).toBeGreaterThanOrEqual(44);
    expect(
      Math.round((await decline.boundingBox())!.height),
    ).toBeGreaterThanOrEqual(44);
    await page.screenshot({ path: `/tmp/aurora-linkedin-banner-${width}.png` });
    await decline.focus();
    await decline.press('Enter');
    await expect(banner).toBeHidden();
    await page.evaluate(() =>
      localStorage.setItem(
        'aurora.linkedin-consent.v1',
        JSON.stringify({ version: 1, allowed: true, expiresAt: 0 }),
      ),
    );
    await page.reload({ waitUntil: 'domcontentloaded' });
    await expect(banner).toBeVisible();
    await expect(page.locator('iframe[src*="linkedin.com"]')).toHaveCount(0);
  });
}

test('Cookie settings from an LOI opens the inline Team settings without losing answers', async ({
  page,
}) => {
  await page.goto('/register/', { waitUntil: 'domcontentloaded' });
  await page.getByLabel('Full name (required)').fill('Ada Researcher');
  const popupPromise = page.waitForEvent('popup');
  await page
    .getByRole('button', { name: 'Cookie settings (opens in a new tab)' })
    .click();
  const popup = await popupPromise;
  const panel = popup.getByRole('region', { name: 'Allow LinkedIn posts?' });
  await expect(panel).toBeFocused();
  await popup
    .getByRole('button', { name: 'Decline LinkedIn', exact: true })
    .click();
  await popup.close();
  await expect(page.getByLabel('Full name (required)')).toHaveValue(
    'Ada Researcher',
  );
  await expect(page.locator('.linkedin-consent')).toHaveCount(0);
});
