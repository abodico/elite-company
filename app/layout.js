"use client"
import "./globals.css"
import Header from "./_components/Header"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"
import bg from "../public/BG.svg"

const metadata = {
    title: "Elite Company",
    description: "",
}

export default function RootLayout({ children }) {
    const [queryClient] = useState(() => new QueryClient())
    return (
        <html lang="en">
            <body
                style={{ backgroundImage: `url(${bg.src})` }}
                className="h-screen max-h-[100vh] bg-primary bg-cover bg-no-repeat "
            >
                <QueryClientProvider client={queryClient}>
                    <Header />
                    {children}
                </QueryClientProvider>
            </body>
        </html>
    )
}
