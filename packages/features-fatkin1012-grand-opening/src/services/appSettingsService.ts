import { formatISO } from 'date-fns'

import { safeLocalStorage } from '../lib/storage'
import type { AppSettings } from '../types'

const SETTINGS_STORAGE_KEY = 'task-planner.settings.v1'

const defaultSettings: AppSettings = {
  googleCalendar: {
    useMock: (typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_VITE_GOOGLE_USE_MOCK : '') !== 'false',
    clientId: (typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_VITE_GOOGLE_CLIENT_ID : '') ?? '',
    apiKey: (typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_VITE_GOOGLE_API_KEY : '') ?? '',
    discoveryDoc:
      (typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_VITE_GOOGLE_DISCOVERY_DOC : null) ??
      'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
    scopes:
      (typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_VITE_GOOGLE_SCOPES : null) ??
      'https://www.googleapis.com/auth/calendar',
  },
  extraApis: {},
  updatedAt: null,
}

const mergeWithDefaults = (incoming: Partial<AppSettings> | null): AppSettings => {
  if (!incoming) {
    return defaultSettings
  }

  return {
    googleCalendar: {
      ...defaultSettings.googleCalendar,
      ...(incoming.googleCalendar ?? {}),
    },
    extraApis: incoming.extraApis ?? {},
    updatedAt: incoming.updatedAt ?? null,
  }
}

export const appSettingsService = {
  getSettings(): AppSettings {
    const raw = safeLocalStorage.getItem(SETTINGS_STORAGE_KEY)
    if (!raw) {
      return defaultSettings
    }

    try {
      const parsed = JSON.parse(raw) as Partial<AppSettings>
      return mergeWithDefaults(parsed)
    } catch {
      return defaultSettings
    }
  },

  saveSettings(next: AppSettings): void {
    const payload: AppSettings = {
      ...next,
      updatedAt: formatISO(new Date()),
    }
    safeLocalStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(payload))
  },
}
