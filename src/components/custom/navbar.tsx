"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BookOpen, Heart, FileText, User, LogOut, Menu, X } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [menuAberto, setMenuAberto] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  // Não mostrar navbar na página de login
  if (pathname === '/login') {
    return null
  }

  const links = [
    { href: "/", label: "Início", icon: BookOpen },
    { href: "/biblia", label: "Bíblia", icon: BookOpen },
    { href: "/devocional", label: "Devocional", icon: Heart },
    { href: "/anotacoes", label: "Anotações", icon: FileText },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">
              Orações Diárias
            </span>
          </Link>

          {/* Links Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.href
              return (
                <Link key={link.href} href={link.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={isActive ? "bg-gradient-to-r from-blue-600 to-purple-600" : ""}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {link.label}
                  </Button>
                </Link>
              )
            })}
          </div>

          {/* Botão Logout Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {user && (
              <>
                <span className="text-sm text-gray-600 max-w-[150px] truncate">{user.email}</span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </>
            )}
          </div>

          {/* Menu Mobile */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMenuAberto(!menuAberto)}
          >
            {menuAberto ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Menu Mobile Expandido */}
        {menuAberto && (
          <div className="md:hidden py-4 space-y-2 border-t border-gray-200">
            {links.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.href
              return (
                <Link key={link.href} href={link.href} onClick={() => setMenuAberto(false)}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start ${isActive ? "bg-gradient-to-r from-blue-600 to-purple-600" : ""}`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {link.label}
                  </Button>
                </Link>
              )
            })}
            {user && (
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <p className="text-sm text-gray-600 px-3 truncate">{user.email}</p>
                <Button variant="outline" className="w-full" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
