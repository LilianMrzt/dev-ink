import * as fs from 'fs'
import * as path from 'path'
import { app } from 'electron'

interface SettingsData {
    lastOpenedFolder?: string;
}

const settingsPath = path.join(app.getPath('userData'), 'settings.json')

let settings: SettingsData = {}
export function loadSettings(){
    if (fs.existsSync(settingsPath)) {
        const raw = fs.readFileSync(settingsPath, 'utf-8')
        try {
            settings = JSON.parse(raw)
        } catch (err) {
            console.error('Erreur de parsing des settings:', err)
            settings = {}
        }
    }
}

function saveSettings(){
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2))
}

export function setSetting<T extends keyof SettingsData>(key: T, value: SettingsData[T]){
    settings[key] = value
    saveSettings()
}

export function getSetting<T extends keyof SettingsData>(key: T): SettingsData[T] | undefined{
    return settings[key]
}
