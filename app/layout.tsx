import React from "react"
import "@package/styles/tailwind.css"
import StyleGlobal from "@package/config/global/style-global"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>
          <StyleGlobal>
            {children}
          </StyleGlobal>
        </main>
      </body>
    </html>
  )
}
