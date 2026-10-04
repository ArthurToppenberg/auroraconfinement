import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routes = [
  '/',
  '/products/',
  '/about/',
  '/contact/',
  '/nff/',
  '/privacy/',
] as const;

const viewports = [
  { width: 320, height: 568 },
  { width: 375, height: 812 },
  { width: 360, height: 800 },
  { width: 390, height: 844 },
  { width: 430, height: 932 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
] as const;

test.describe('responsive release baseline', () => {
  for (const viewport of viewports) {
    test(`all routes fit ${viewport.width}x${viewport.height}`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      for (const route of routes) {
        await page.goto(route);
        const dimensions = await page.evaluate(() => ({
          clientWidth: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
        }));
        expect(
          dimensions.scrollWidth,
          `${route} overflowed at ${viewport.width}px`,
        ).toBeLessThanOrEqual(dimensions.clientWidth);

        if (route === '/' && viewport.width <= 430) {
          const hero = page.locator('.home-hero');
          for (const label of [
            'Register institutional interest',
            'Explore our products',
          ]) {
            const link = hero.getByRole('link', { name: label });
            await expect(link).toBeVisible();
            const box = await link.boundingBox();
            expect(box, `${label} should be visible`).not.toBeNull();
            expect(box!.height).toBeGreaterThanOrEqual(44);
          }
        }
      }
    });
  }
});

test('key routes reflow at 200% text size', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  for (const route of routes) {
    await page.goto(route);
    await page.locator('html').evaluate((element) => {
      element.style.fontSize = '200%';
    });
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(overflow, `${route} overflowed with 200% text`).toBeLessThanOrEqual(
      0,
    );
  }
});

test('mobile navigation supports keyboard state and focus', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const menuButton = page.locator('[data-menu-button]');
  await menuButton.focus();
  await page.keyboard.press('Enter');
  await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  await expect(
    page
      .getByRole('navigation', { name: 'Primary' })
      .getByRole('link', { name: 'Products' }),
  ).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  await expect(menuButton).toBeFocused();
});

test('Miguel audio plays only while M, I, and G are held', async ({ page }) => {
  await page.addInitScript(() => {
    const state = { playCount: 0, pauseCount: 0 };
    Object.defineProperty(window, '__audioTestState', { value: state });
    HTMLMediaElement.prototype.play = function () {
      state.playCount += 1;
      return Promise.resolve();
    };
    HTMLMediaElement.prototype.pause = function () {
      state.pauseCount += 1;
    };
  });
  const audioState = () =>
    page.evaluate(
      () =>
        (
          window as unknown as {
            __audioTestState: { playCount: number; pauseCount: number };
          }
        ).__audioTestState,
    );

  await page.goto('/');
  await page.keyboard.down('m');
  await page.keyboard.down('i');
  expect((await audioState()).playCount).toBe(0);

  await page.keyboard.down('g');
  expect((await audioState()).playCount).toBe(1);

  await page.keyboard.up('i');
  expect((await audioState()).pauseCount).toBe(1);

  await page.keyboard.down('i');
  expect((await audioState()).playCount).toBe(2);
  await page.keyboard.up('m');
  await page.keyboard.up('i');
  await page.keyboard.up('g');
});

test('contact form provides accessible validation and an honest demo result', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/contact/');
  await page.getByRole('button', { name: 'Check this enquiry' }).click();
  await expect(page.getByLabel('Name')).toHaveAttribute('aria-invalid', 'true');
  await expect(
    page.getByText('Please correct the highlighted fields.'),
  ).toBeVisible();

  await page.getByLabel('Name').fill('Test Researcher');
  await page.getByLabel('Work email').fill('researcher@example.org');
  await page
    .getByLabel('Area of interest')
    .selectOption('research-collaboration');
  await page
    .getByLabel('What would you like to discuss?')
    .fill('A discussion about an experimental research platform.');
  await page.getByRole('button', { name: 'Check this enquiry' }).click();
  await expect(
    page.getByText(
      'This form is not connected to a submission service. Your information was not retained or sent.',
    ),
  ).toBeVisible();
});

test('NFF form validates institutional interest without false storage success', async ({
  page,
}) => {
  await page.goto('/nff/');
  const form = page.locator('[data-interest-form]');
  await expect(form.locator('input[name="source"]')).toHaveValue(
    'nordic-fusion-forum-2026',
  );
  await form
    .getByRole('button', { name: 'Register institutional interest' })
    .click();
  await expect(form.getByLabel('Organisation (required)')).toHaveAttribute(
    'aria-invalid',
    'true',
  );

  await form.getByLabel('Name (required)').fill('Test Researcher');
  await form.getByLabel('Organisation (required)').fill('Example University');
  await form.getByLabel('Role (required)').fill('Laboratory Director');
  await form.getByLabel('Work email (required)').fill('researcher@example.org');
  await form
    .getByLabel('Area of interest (required)')
    .selectOption('research-platform');
  await form
    .getByLabel('Intended application (required)')
    .fill('Hands-on experiments and researcher training.');
  await form
    .getByLabel('Approximate timeframe (required)')
    .selectOption('within-1-to-3-years');
  await form
    .getByRole('button', { name: 'Register institutional interest' })
    .click();

  await expect(
    form.getByText(
      'This form is not connected to a submission service. Your information was not retained or sent.',
    ),
  ).toBeVisible();
  await expect(
    form.getByText('Thank you. We have recorded your interest'),
  ).toHaveCount(0);
});

test('product CTAs preserve and apply their interest context', async ({
  page,
}) => {
  await page.goto('/contact/?interest=exhibition-model');
  await expect(page.getByLabel('Area of interest')).toHaveValue(
    'exhibition-model',
  );

  await page.goto('/contact/?interest=research-collaboration');
  await expect(page.getByLabel('Area of interest')).toHaveValue(
    'research-collaboration',
  );
});

test('concept images always carry the exact visible caption', async ({
  page,
}) => {
  const caption =
    'Concept illustration. Not the actual product or final design. The depicted magnetic-field configuration does not represent Aurora Confinement’s technology.';
  for (const route of ['/', '/products/']) {
    await page.goto(route);
    const figures = page.locator('.product-figure');
    await expect(figures).toHaveCount(2);
    for (let index = 0; index < 2; index += 1) {
      await expect(figures.nth(index).locator('figcaption')).toHaveText(
        caption,
      );
    }
  }
});

test('all routes pass axe and avoid third-party requests', async ({ page }) => {
  const externalRequests = new Set<string>();
  page.on('request', (request) => {
    const url = new URL(request.url());
    if (!['127.0.0.1', 'localhost'].includes(url.hostname))
      externalRequests.add(url.href);
  });

  for (const route of routes) {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).analyze();
    expect(
      results.violations,
      `${route}: ${JSON.stringify(results.violations)}`,
    ).toEqual([]);
  }
  expect([...externalRequests]).toEqual([]);
});

test('internal links and images return successful responses', async ({
  page,
  request,
}) => {
  const references = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    const values = await page
      .locator('a[href], img[src]')
      .evaluateAll((elements) =>
        elements.map(
          (element) =>
            element.getAttribute('href') || element.getAttribute('src') || '',
        ),
      );
    values
      .filter((value) => value.startsWith('/') && !value.startsWith('//'))
      .forEach((value) => references.add(value.split('#')[0]!.split('?')[0]!));
  }

  for (const reference of references) {
    const response = await request.get(reference);
    expect(response.ok(), reference).toBe(true);
  }
});

test('reduced motion removes meaningful transitions', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const duration = await page
    .locator('.card')
    .first()
    .evaluate((element) => getComputedStyle(element).transitionDuration);
  const milliseconds = duration.endsWith('ms')
    ? Number.parseFloat(duration)
    : Number.parseFloat(duration) * 1000;
  expect(milliseconds).toBeLessThanOrEqual(0.01);
});
