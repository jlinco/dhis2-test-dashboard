import { test, expect } from '@playwright/test'

test('Homepage should render properly', async ({ page }) => {
  await page.goto('/')

  // expect Dashboards title to exist
  await expect(page.getByRole('heading', { name: 'Dashboards' })).toBeVisible()

  // expect filter item to exist
  await expect(
    page.getByRole('button', { name: 'Filter Items...' })
  ).toBeVisible()
})
