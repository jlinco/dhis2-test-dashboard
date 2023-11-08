import { PlaywrightTestConfig, devices } from '@playwright/test'
import path from 'path'

const baseURL = process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3000'

const config: PlaywrightTestConfig = {
  // Timeout per test
  timeout: 30 * 1000,
  testDir: path.join(__dirname, '__tests__'),
  webServer: {
    command: 'npm run dev',
    url: baseURL,
    reuseExistingServer: true,
    timeout: 120 * 1000
  },
  use: {
    baseURL
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox']
      }
    }
  ]
}
export default config
