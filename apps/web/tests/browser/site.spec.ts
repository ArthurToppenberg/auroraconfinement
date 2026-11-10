import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';

const routes = [
  '/',
  '/about/',
  '/register/',
  '/contact/',
  '/model/',
  '/research-platform/',
  '/roadmap/',
  '/nff/',
  '/privacy/',
  '/register/confirmation/',
  '/register/sharing/',
] as const;

// The register endpoint writes to the real database, so browser tests always stub it.
async function stubRegisterEndpoint(
  page: Page,
  response: { status: number; body?: object },
) {
  const requests: Record<string, unknown>[] = [];
  await page.route('**/api/register/', async (route) => {
    requests.push(JSON.parse(route.request().postData() ?? '{}'));
    await route.fulfill({
      status: response.status,
      contentType: 'application/json',
      body: JSON.stringify(response.body ?? {}),
    });
  });
  return requests;
}

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
          for (const label of ['Register interest']) {
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
      .getByRole('link', { name: 'Exhibition Model' }),
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

async function fillDetails(page: Page) {
  await page.getByLabel('Full name (required)').fill('Ada Researcher');
  await page.getByLabel('Work email (required)').fill('ada@example.org');
  await page.getByLabel('Phone number').fill('+45 12 34 56 78');
  await page
    .getByLabel('Job title or role (required)')
    .fill('Laboratory Director');
  await page
    .getByLabel('Organisation or institution (required)')
    .fill('Example University');
  await page.getByLabel('Country (required)').fill('Denmark');
  await page.getByLabel(/personal professional interest/).check();
  await page.getByRole('checkbox', { name: 'Demonstration' }).check();
  await page
    .getByLabel('Primary use (required)')
    .selectOption('university-teaching');
  await page
    .getByLabel('Intended application (required)')
    .fill('Teaching plasma physics to first-year students.');
  await page
    .getByLabel('Indicative timing (required)')
    .selectOption('within-12-months');
}

test('register shows validation errors and moves focus to the first one', async ({
  page,
}) => {
  await page.goto('/register/');
  await page
    .getByRole('button', { name: 'Confirm and save my letter' })
    .click();
  const name = page.getByLabel('Full name (required)');
  await expect(name).toHaveAttribute('aria-invalid', 'true');
  await expect(name).toBeFocused();
  await expect(page.locator('#reg-fullName-error')).toHaveText(
    'Enter your full name.',
  );
});

test('register shows the letter live beside the form and saves once confirmed', async ({
  page,
}) => {
  const requests = await stubRegisterEndpoint(page, {
    status: 200,
    body: {
      ok: true,
      message: 'Your letter has been saved.',
      reference: 'LOI-2026-ABC234',
    },
  });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/register/?product=exhibition-model');
  const letter = page.getByRole('article');

  // Before anything is typed the letter is already there, with prompts.
  await expect(letter).toBeVisible();
  await expect(letter).toContainText(
    'Non-binding Letter of Interest: Exhibition model',
  );
  await expect(letter).toContainText('[full name]');
  await expect(letter).toContainText('Draft');
  await expect(letter).toContainText('Added on confirmation');
  await expect(letter).toContainText(
    'On confirmation and submission: Aurora Confinement may share this letter',
  );

  // The preview stays in view while the page scrolls.
  await page.getByLabel('Full name (required)').fill('Ada Researcher');
  await expect(letter).toContainText('Ada Researcher');
  await expect(letter).not.toContainText('[full name]');
  await page.mouse.wheel(0, 1200);
  await expect(letter).toBeInViewport();

  await fillDetails(page);
  await expect(letter).toContainText(
    'Teaching plasma physics to first-year students.',
  );
  await expect(letter).toContainText(
    'This letter records non-binding interest only.',
  );
  await expect(letter).toContainText('Confirmed by: Ada Researcher');

  // One unchecked confirmation explicitly includes confidential sharing.
  const confirm = page.getByLabel(/I confirm this non-binding letter/);
  await expect(confirm).not.toBeChecked();
  await page
    .getByRole('button', { name: 'Confirm and save my letter' })
    .click();
  await expect(confirm).toBeFocused();
  expect(requests).toHaveLength(0);

  await confirm.check();
  await expect(letter).toContainText(
    'My email address will be omitted from shared copies.',
  );
  await page
    .getByRole('button', { name: 'Confirm and save my letter' })
    .click();
  await expect(
    page.getByRole('heading', { name: 'Your letter is saved' }),
  ).toBeVisible();
  await expect(page.getByText('LOI-2026-ABC234').first()).toBeVisible();
  await expect(letter).not.toContainText('Draft');
  expect(requests).toHaveLength(1);
  expect(requests[0]).toMatchObject({
    fullName: 'Ada Researcher',
    email: 'ada@example.org',
    phone: '+45 12 34 56 78',
    product: 'exhibition-model',
    sharing: true,
    confirmed: true,
    source: 'register',
  });
});

test('register letter peeks beside the form and opens on hover or keyboard focus', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/register/?product=exhibition-model');
  const letter = page.getByRole('article');
  const aside = page.getByRole('complementary', { name: 'Letter preview' });
  const right = async () => {
    const box = await letter.boundingBox();
    return box ? box.x + box.width : 0;
  };

  // Partly hidden: the page runs off the right edge of the window, and the form
  // keeps a comfortable width.
  expect(await right()).toBeGreaterThan(1440);
  const form = await page.getByLabel('Full name (required)').boundingBox();
  expect(form!.width).toBeGreaterThan(300);

  // Hover slides it fully into view, with an A4 page shape.
  await aside.hover();
  await expect.poll(right).toBeLessThanOrEqual(1440);
  const box = await letter.boundingBox();
  expect(box!.height / box!.width).toBeGreaterThanOrEqual(1.4);

  // Moving away tucks it back.
  await page.mouse.move(300, 300);
  await expect.poll(right).toBeGreaterThan(1440);

  // The scrollable letter region remains keyboard-accessible without an expand button.
  await page
    .getByRole('region', { name: 'Letter preview (scrollable)' })
    .focus();
  await expect.poll(right).toBeLessThanOrEqual(1440);
  await expect(page.getByRole('button', { name: 'Expand letter' })).toHaveCount(
    0,
  );
});

test('register on a phone switches between the answers and the letter', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/register/?product=exhibition-model');
  await page.getByLabel('Full name (required)').fill('Ada Researcher');
  await expect(page.getByRole('article')).toBeHidden();
  await page.getByRole('button', { name: 'Letter preview' }).click();
  await expect(page.getByRole('article')).toContainText('Ada Researcher');
  await expect(page.getByLabel('Full name (required)')).toBeHidden();
  await page.getByRole('button', { name: 'Your answers' }).click();
  await expect(page.getByLabel('Full name (required)')).toHaveValue(
    'Ada Researcher',
  );
});

test('register gives separate sections for each product when both are chosen', async ({
  page,
}) => {
  await page.goto('/register/?product=both');
  await expect(
    page.getByRole('group', { name: 'Exhibition model' }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole('group', { name: 'Research platform' }).first(),
  ).toBeVisible();
  await expect(page.getByLabel('Primary use (required)')).toHaveCount(2);
});

test('register reports an honest failure and keeps the answers', async ({
  page,
}) => {
  await stubRegisterEndpoint(page, {
    status: 500,
    body: {
      ok: false,
      message:
        'We could not save your letter. Please try again later or email contact@auroraconfinement.com.',
    },
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/register/?product=exhibition-model&source=nff2026');
  await fillDetails(page);
  await page.getByLabel(/I confirm this non-binding letter/).check();
  await page
    .getByRole('button', { name: 'Confirm and save my letter' })
    .click();
  await expect(
    page
      .getByRole('status')
      .filter({ hasText: 'We could not save your letter' }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Confirm and save my letter' }),
  ).toBeVisible();
  await expect(page.getByLabel('Full name (required)')).toHaveValue(
    'Ada Researcher',
  );
});

test('register can be reached from the contact page and contact has no form', async ({
  page,
}) => {
  await page.goto('/contact/');
  await expect(page.locator('form')).toHaveCount(0);
  await page
    .getByRole('link', { name: 'register interest', exact: true })
    .click();
  await expect(page).toHaveURL(/\/register\/$/);
  await expect(
    page.getByRole('heading', { level: 1, name: 'Register interest' }),
  ).toBeVisible();
});

test('concept images always carry the exact visible caption', async ({
  page,
}) => {
  const caption =
    'Concept illustration — not the actual product or final design. The magnetic-field configuration shown is illustrative and does not represent Aurora Confinement’s technology.';
  for (const route of ['/technology/']) {
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

for (const width of [390, 1440]) {
  test(`register consent links preserve answers and checkbox state at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/register/?product=exhibition-model', {
      waitUntil: 'domcontentloaded',
    });
    await page.screenshot({ path: `/tmp/aurora-loi-top-${width}.png` });
    await page.getByLabel('Full name (required)').fill('Ada Researcher');
    const confirm = page.locator('#reg-confirmed');
    await expect(confirm).not.toBeChecked();
    const controls = page.locator('#section-confirm input[type="checkbox"]');
    await expect(controls.nth(0)).toHaveAttribute('id', 'reg-confirmed');
    await expect(controls).toHaveCount(1);
    await page.getByText('Read more', { exact: true }).click();

    for (const [name, heading] of [
      ['About this confirmation', 'About this confirmation'],
      ['Sharing details', 'Sharing details'],
    ] as const) {
      const link = page.getByRole('link', {
        name: `${name} (opens in a new tab)`,
      });
      await link.focus();
      const popupPromise = page.waitForEvent('popup');
      await link.press('Enter');
      const popup = await popupPromise;
      await expect(
        popup.getByRole('heading', { name: heading, exact: true }),
      ).toBeVisible();
      await popup.close();
      await expect(confirm).not.toBeChecked();
      await expect(page.getByLabel('Full name (required)')).toHaveValue(
        'Ada Researcher',
      );
    }
    await confirm.focus();
    await confirm.press('Space');
    await expect(confirm).toBeChecked();
    await expect(
      page.getByRole('article', { includeHidden: true }),
    ).toContainText('My email address will be omitted from shared copies.');
    await confirm.press('Space');
    await expect(confirm).not.toBeChecked();
    await expect(
      page.getByRole('article', { includeHidden: true }),
    ).toContainText(
      'On confirmation and submission: Aurora Confinement may share this letter',
    );
    await confirm.press('Space');
    await page.getByText('Read more', { exact: true }).click();
    const label = page.locator('label[for="reg-confirmed"]');
    expect((await label.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    await page.screenshot({ path: `/tmp/aurora-loi-confirm-${width}.png` });
  });
}

test('register saves explicit sharing permission and preserves the letter for printing', async ({
  page,
}) => {
  const requests = await stubRegisterEndpoint(page, {
    status: 200,
    body: { ok: true, reference: 'LOI-2026-PRIVATE' },
  });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/register/?product=exhibition-model');
  await fillDetails(page);
  const letter = page.getByRole('article');
  await page.locator('#reg-confirmed').check();
  const before = await letter.innerText();
  await page
    .getByRole('button', { name: 'Confirm and save my letter' })
    .click();
  await expect(
    page.getByRole('heading', { name: 'Your letter is saved' }),
  ).toBeVisible();
  expect(requests).toHaveLength(1);
  expect(requests[0]).toMatchObject({ sharing: true, confirmed: true });
  await expect(letter).toContainText(
    'My email address will be omitted from shared copies.',
  );
  // Draft labels and completion metadata may differ; substantive content must not.
  const normalise = (value: string) =>
    value
      .replace(/Draft\s+not confirmed\s*/, '')
      .replace(/Added on confirmation/g, 'META')
      .replace(/\d{4}-\d{2}-\d{2} \d{2}:\d{2} UTC/g, 'META')
      .replace(/LOI-2026-PRIVATE/g, 'META')
      .replace(/\s+/g, ' ')
      .trim();
  expect(normalise(await letter.innerText())).toBe(normalise(before));
  await page.emulateMedia({ media: 'print' });
  await expect(letter).toBeVisible();
  await expect(page.locator('.register-form-pane')).toBeHidden();
});

test('LOI form and detail pages pass accessibility checks and enlarged-text reflow', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 320, height: 800 });
  for (const path of [
    '/register/?product=exhibition-model',
    '/register/confirmation/',
    '/register/sharing/',
  ]) {
    await page.goto(path, { waitUntil: 'domcontentloaded' });
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations, path).toEqual([]);
    await page.locator('html').evaluate((element) => {
      element.style.fontSize = '200%';
    });
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      ),
      path,
    ).toBeLessThanOrEqual(0);
  }
});

test('register numbered progress follows navigation and required-field completion', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/register/?product=both');
  const tracker = page.getByRole('list', { name: 'Form sections' });
  const links = tracker.getByRole('link');
  await expect(links).toHaveCount(4);
  await expect(links.nth(0)).toContainText('1');
  await expect(links.nth(3)).toContainText('4');
  await expect(links.nth(0)).toHaveAttribute('aria-current', 'step');
  await expect(tracker.locator('[data-done="true"]')).toHaveCount(0);
  await links.nth(1).click();
  await expect(page.locator('#section-interest')).toBeFocused();
  await expect(links.nth(1)).toHaveAttribute('aria-current', 'step');
  await page
    .getByRole('checkbox', { name: 'Demonstration', exact: true })
    .check();
  await expect(links.nth(1)).toContainText('complete');
  // Both products must have their required answers; optional questions remain blank.
  for (const key of ['exhibition-model', 'research-platform']) {
    const card = page.locator(`#section-product-${key}`);
    await card
      .getByLabel('Primary use (required)')
      .selectOption(
        key === 'exhibition-model' ? 'university-teaching' : 'research',
      );
    await card
      .getByLabel('Intended application (required)')
      .fill('Teaching and evaluating plasma.');
    await card
      .getByLabel('Indicative timing (required)')
      .selectOption('within-12-months');
    if (key === 'exhibition-model')
      await expect(links.nth(2)).not.toContainText('complete');
  }
  await expect(links.nth(2)).toContainText('complete');
  await page.locator('#reg-research-platform-application').clear();
  await expect(links.nth(2)).not.toContainText('complete');
  await links.nth(3).focus();
  await links.nth(3).press('Enter');
  await expect(page.locator('#section-confirm')).toBeFocused();
  await expect(links.nth(3)).toHaveAttribute('aria-current', 'step');
  await page.locator('#reg-confirmed').check();
  await expect(links.nth(3)).toContainText('complete');
  await page.getByLabel('Full name (required)').focus();
  await expect(links.nth(0)).toHaveAttribute('aria-current', 'step');
  await page.locator('#section-interest').scrollIntoViewIfNeeded();
  await expect(links.nth(1)).toHaveAttribute('aria-current', 'step');
  await page.screenshot({ path: '/tmp/aurora-loi-progress-desktop.png' });
});
