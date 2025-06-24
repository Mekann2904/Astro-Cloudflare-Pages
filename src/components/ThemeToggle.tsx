import React, { useEffect, useState } from 'react'
import { Switch, SwitchField, SwitchLabel } from './ui/Switch'

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // 初期テーマ設定の読み込み
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = savedTheme ? savedTheme === 'dark' : prefersDark
    
    setDarkMode(isDark)
    updateTheme(isDark)
  }, [])

  const updateTheme = (isDark: boolean) => {
    const html = document.documentElement
    
    // 確実にクラスを削除/追加
    html.classList.remove('dark', 'light')
    
    if (isDark) {
      html.classList.add('dark')
      html.setAttribute('data-theme', 'dark')
      document.body.style.colorScheme = 'dark'
    } else {
      html.classList.add('light')
      html.setAttribute('data-theme', 'light')
      document.body.style.colorScheme = 'light'
    }
    
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    
    // 強制的にスタイルを再計算
    html.style.display = 'none'
    html.offsetHeight // トリガー
    html.style.display = ''
  }

  const handleToggle = (checked: boolean) => {
    console.log('Theme toggle:', checked ? 'dark' : 'light') // デバッグ
    setDarkMode(checked)
    updateTheme(checked)
    
    // 即座にDOMを確認
    setTimeout(() => {
      console.log('HTML classes:', document.documentElement.className)
      console.log('Data theme:', document.documentElement.getAttribute('data-theme'))
    }, 100)
  }

  // サーバーサイドレンダリング時は何も表示しない
  if (!mounted) {
    return (
      <div className="h-6 w-11 rounded-full bg-gray-200 animate-pulse" />
    )
  }

  return (
    <div className="flex items-center justify-center w-full">
      <SwitchField className="flex items-center gap-3 w-full justify-center">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <span className="opacity-75">☀️</span>
          <span className="font-medium text-xs">
            ライト
          </span>
        </div>
        
        <Switch
          checked={darkMode}
          onChange={handleToggle}
          color="purple"
          aria-label="テーマ切り替え"
          className="focus:ring-offset-gray-50 dark:focus:ring-offset-gray-800 mx-2"
        />
        
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <span className="font-medium text-xs">
            ダーク
          </span>
          <span className="opacity-75">🌙</span>
        </div>
      </SwitchField>
    </div>
  )
} 