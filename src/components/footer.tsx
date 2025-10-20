import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <div className="container py-8">
        <div className="text-center space-y-4">
          <blockquote className="text-sm text-muted-foreground italic max-w-2xl mx-auto">
            "Building digital experiences that make a difference, one line of code at a time."
          </blockquote>
          <p className="text-xs text-muted-foreground">
            © {currentYear} Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}