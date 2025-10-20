"use client"

import { Mail, Download, MapPin, Calendar, Globe, Building2, Award, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function AboutPage() {
  const skills = [
    "Next.js", "Node.js", "Express.js", "TypeScript", "Python",
    "SharePoint", "Power Automate", "Power Apps", "Power BI", "MySQL",
    "PostgreSQL", "MS SQL Server", "Docker", "GitHub", "Selenium"
  ]

  const experiences = [
    {
      title: "Senior System Developer",
      company: "Toyota Tsusho Techno Park Indonesia",
      period: "Dec 2023 – Present",
      location: "Karawang, Indonesia",
      description: "Lead Developer for multiple automation projects including Catering System, VAT Automation, and IT Support Ticketing System. Reduced manual work by 22+ hours monthly and improved compliance scores from 56% to 96%.",
      highlights: ["Process Automation", "System Optimization", "IT Security Compliance"]
    },
    {
      title: "IT Development Officer and Project Management Officer",
      company: "Sally Maritime Group",
      period: "May 2022 – Dec 2023",
      location: "South Jakarta, Indonesia",
      description: "Led development of Post-Fixture System, Chartering Desk System, and WhatsApp Bulk System. Automated operations and improved customer engagement while saving $1000 monthly.",
      highlights: ["Business Development", "Project Management", "System Integration"]
    }
  ]

  const education = [
    {
      degree: "Bachelor of Engineering in Naval Architecture",
      school: "Institut Teknologi Kalimantan",
      period: "Aug 2016 – Mar 2021",
      location: "Balikpapan City, Indonesia",
      description: "Thesis: 'Design of electrical propulsion system for self-propelled container barge'. Proficient in shipbuilding, stability, equipment, and propulsion systems."
    },
    {
      degree: "Accounting",
      school: "SMK Negeri 1 Bojong",
      period: "May 2012 – Jun 2015",
      location: "Purwakarta Regency, Indonesia",
      description: "Proficient in mathematics and excellent at solving problems logically. Ranked 5th in the national exam at the school. This foundation provides unique insight into business financial operations."
    }
  ]

  const strengths = [
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Triple-Threat Problem Solver",
      description: "Rare combination of accounting + engineering + IT expertise to solve complex industry challenges from multiple angles that others can't see"
    },
    {
      icon: <Award className="h-5 w-5" />,
      title: "Industry-Deep Translator",
      description: "Bridge between business operations and technical solutions - speak the language of finance, engineering, and technology fluently"
    },
    {
      icon: <Building2 className="h-5 w-5" />,
      title: "Adaptive Project Chameleon",
      description: "Successfully adapt to any project because I understand the 'why' behind business processes, not just the 'how' of code"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-6xl mx-auto text-center">
            <div className="relative inline-block mb-8">
              <div className="h-24 w-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AK
                </span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Abdul Kodir</span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-12">
              Senior System Developer with a rare background combination: Accounting foundation + Engineering degree + IT expertise.
              I understand real industry problems from multiple angles and adapt successfully to any project.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="text-center p-6">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">3+</div>
                  <p className="text-sm text-muted-foreground">Years Experience</p>
                </CardContent>
              </Card>

              <Card className="text-center p-6">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">10+</div>
                  <p className="text-sm text-muted-foreground">Projects Delivered</p>
                </CardContent>
              </Card>

              <Card className="text-center p-6">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">96%</div>
                  <p className="text-sm text-muted-foreground">Compliance Score</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">My Unique Journey</h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed mb-8">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                    <h3 className="text-lg font-semibold mb-3 text-blue-900 dark:text-blue-100">
                      🎯 Rare Background Combination
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      What makes me different is my <strong>unique trifecta</strong>: <span className="font-bold text-blue-700 dark:text-blue-300">Accounting foundation</span> + <span className="font-bold text-green-700 dark:text-green-300">Engineering degree</span> + <span className="font-bold text-purple-700 dark:text-purple-300">IT expertise</span>. This rare combination gives me deep understanding of real industry problems that others miss - from financial processes and operational workflows to technical implementation challenges.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
                    <h3 className="text-lg font-semibold mb-3 text-green-900 dark:text-green-100">
                      🚀 From Foundation to Senior Leadership
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      My journey started with <strong>Accounting fundamentals in high school</strong>, evolved through an <strong>Engineering degree</strong>, and naturally progressed into <strong>IT systems development</strong>. Today, as <strong>Senior System Developer at Toyota Tsusho</strong>, I leverage this diverse background to bridge gaps between business needs and technical solutions that most developers can't even see.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
                    <h3 className="text-lg font-semibold mb-3 text-purple-900 dark:text-purple-100">
                      💡 Why I Adapt Successfully to Any Project
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      This diverse background is my <strong>secret weapon</strong> for adapting to various projects successfully. I understand the <span className="font-bold text-purple-700 dark:text-purple-300">"why"</span> behind business processes, not just the <span className="font-bold text-purple-700 dark:text-purple-300">"how"</span> of technical implementation. I speak the language of finance, operations, and technology - making me the perfect bridge between stakeholders and the rare professional who truly understands industry pain points from multiple angles.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 p-6 rounded-xl border border-orange-200 dark:border-orange-800">
                    <h3 className="text-lg font-semibold mb-3 text-orange-900 dark:text-orange-100">
                      🏆 Real-World Impact That Others Can't Deliver
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Whether it's reducing VAT reporting time from <strong>128 hours to under 10 minutes</strong>, automating catering services for <strong>900 employees</strong>, or improving IT security compliance from <strong>56% to 96%</strong> - I deliver solutions that work because I understand the complete business ecosystem, not just the code. This is why I succeed where others struggle.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button asChild className="gap-2">
                    <Link href="mailto:abdulkodirwijayakusumah@gmail.com">
                      <Mail className="h-4 w-4" />
                      Contact Me
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="gap-2">
                    <Link href="https://wijaya.vercel.app" target="_blank">
                      <Globe className="h-4 w-4" />
                      Portfolio
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Location
                    </h3>
                    <p className="text-muted-foreground">Purwakarta, West Java, Indonesia</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </h3>
                    <p className="text-muted-foreground">abdulkodirwijayakusumah@gmail.com</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Core Strengths</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Process Automation</Badge>
                      <Badge variant="secondary">System Optimization</Badge>
                      <Badge variant="secondary">IT Security</Badge>
                      <Badge variant="secondary">Project Management</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strengths Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Key Strengths</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {strengths.map((strength, index) => (
                <Card key={index} className="text-center p-6">
                  <CardContent className="p-0">
                    <div className="text-blue-600 dark:text-blue-400 mb-4 flex justify-center">
                      {strength.icon}
                    </div>
                    <h3 className="font-semibold mb-2">{strength.title}</h3>
                    <p className="text-sm text-muted-foreground">{strength.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Skills & Technologies</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="px-4 py-2 text-sm hover:bg-blue-50 dark:hover:bg-blue-950 hover:border-blue-200 dark:hover:border-blue-800 transition-colors"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Professional Experience</h2>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <Card key={index} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{exp.title}</h3>
                      <p className="text-blue-600 dark:text-blue-400">{exp.company}</p>
                      <p className="text-sm text-muted-foreground">{exp.location}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2 md:mt-0">
                      <Calendar className="h-4 w-4" />
                      {exp.period}
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((highlight, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Education</h2>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <Card key={index} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{edu.degree}</h3>
                      <p className="text-blue-600 dark:text-blue-400">{edu.school}</p>
                      <p className="text-sm text-muted-foreground">{edu.location}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2 md:mt-0">
                      <Calendar className="h-4 w-4" />
                      {edu.period}
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{edu.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}