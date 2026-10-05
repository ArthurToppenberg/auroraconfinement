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

test('contact form provides accessible validation and an honest failure result', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/contact/');
  await page.getByRole('button', { name: 'Register your interest' }).click();
  await expect(page.getByLabel('Name')).toHaveAttribute('aria-invalid', 'true');
  await expect(
    page.getByText('Please correct the highlighted fields.'),
  ).toBeVisible();

  await page.getByLabel('Discuss a collaboration').check();
  await page.getByLabel('Name (required)').fill('Test Researcher');
  await page.getByLabel('Work email (required)').fill('researcher@example.org');
  await page
    .getByLabel('Collaboration area (required)')
    .selectOption('research-collaboration');
  await page
    .getByLabel('What would you like to discuss?')
    .fill('A discussion about an experimental research platform.');
  await page.getByRole('button', { name: 'Send enquiry' }).click();
  await expect(
    page.getByText(
      'We could not send your enquiry. Please try again later or email auroraconfinement@gmail.com.',
    ),
  ).toBeVisible();
});

test('contact enquiry types remain distinct', async ({ page }) => {
  await page.goto('/contact/');
  const form = page.locator('[data-interest-form]');

  await expect(form.getByLabel('Register product interest')).toBeChecked();
  await expect(form.getByLabel('Product of interest (required)')).toBeVisible();
  await expect(
    form.getByText(
      'Submitting this form is a non-binding expression of interest and does not create an obligation to purchase.',
    ),
  ).toBeVisible();

  await form.getByLabel('Send a general enquiry').check();
  await expect(form.getByLabel('Product of interest (required)')).toHaveCount(
    0,
  );
  await expect(form.locator('input[name="interest"]')).toHaveValue(
    'general-enquiry',
  );
  await expect(
    form.getByRole('button', { name: 'Send enquiry' }),
  ).toBeVisible();
  await expect(
    form.getByText('non-binding expression of interest'),
  ).toHaveCount(0);
});

test('NFF form validates institutional interest without false storage success', async ({
  page,
}) => {
  await page.goto('/nff/');
  const form = page.locator('[data-interest-form]');
  await expect(form.locator('input[name="source"]')).toHaveValue(
    'nordic-fusion-forum-2026',
  );
  await form.getByRole('button', { name: 'Register your interest' }).click();
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
  await form.getByRole('button', { name: 'Register your interest' }).click();

  await expect(
    form.getByText(
      'We could not send your enquiry. Please try again later or email auroraconfinement@gmail.com.',
    ),
  ).toBeVisible();
  await expect(
    form.getByText('Thank you. We have recorded your interest'),
  ).toHaveCount(0);
});

test('contact CTAs preserve and apply their intent context', async ({
  page,
}) => {
  await page.goto('/products/');
  await expect(
    page.getByRole('link', { name: 'Discuss an exhibition model' }),
  ).toHaveAttribute('href', '/contact?intent=collaboration');
  await expect(
    page.getByRole('link', { name: 'Discuss a research partnership' }),
  ).toHaveAttribute('href', '/contact?intent=collaboration');

  await page.goto('/contact/?intent=product-interest');
  await expect(page.getByLabel('Register product interest')).toBeChecked();

  await page.goto('/contact/?intent=collaboration');
  await expect(page.getByLabel('Discuss a collaboration')).toBeChecked();

  await page.goto('/contact/?intent=general-enquiry');
  await expect(page.getByLabel('Send a general enquiry')).toBeChecked();
});

test('contact and NFF desktop headings align', async ({ page }) => {
  for (const width of [1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });

    await page.goto('/contact/');
    const contactHeadings = await Promise.all([
      page
        .getByRole('heading', { name: 'Tell us what you are exploring.' })
        .boundingBox(),
      page
        .getByRole('heading', { name: 'Register your interest.' })
        .boundingBox(),
    ]);
    expect(contactHeadings[0]).not.toBeNull();
    expect(contactHeadings[1]).not.toBeNull();
    expect(
      Math.abs(contactHeadings[0]!.y - contactHeadings[1]!.y),
    ).toBeLessThanOrEqual(1);

    await page.goto('/nff/');
    const nffHeadings = await Promise.all([
      page
        .getByRole('heading', { name: 'Thank you for the conversation.' })
        .boundingBox(),
      page
        .getByRole('heading', { name: 'Continue the conversation' })
        .boundingBox(),
    ]);
    expect(nffHeadings[0]).not.toBeNull();
    expect(nffHeadings[1]).not.toBeNull();
    expect(Math.abs(nffHeadings[0]!.y - nffHeadings[1]!.y)).toBeLessThanOrEqual(
      1,
    );
  }
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
