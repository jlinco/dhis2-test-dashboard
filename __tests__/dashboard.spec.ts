import { test, expect } from '@playwright/test'

test('Should get dashboard items from API', async ({ request, page }) => {
  await page.goto('/')
  const allDashboards = await request.fetch(
    'https://gist.githubusercontent.com/kabaros/da79636249e10a7c991a4638205b1726/raw/fa044f54e7a5493b06bb51da40ecc3a9cb4cd3a5/dashboards.json'
  )
  expect(allDashboards.ok()).toBeTruthy()
  const { dashboards } = await allDashboards.json()
  expect(dashboards).toContainEqual({
    displayName: 'Antenatal Care',
    id: 'nghVC4wtyzi',
    starred: true
  })

  await expect(
    page.getByRole('button', { name: 'Antenatal Care' })
  ).toBeVisible()
})
