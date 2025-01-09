import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, FileText, ImageIcon } from 'lucide-react'
import Link from 'next/link'

interface Resource {
  title: string
  type: 'drive' | 'pdf' | 'image'
  url: string
  description: string
}

const resources: Resource[] = [
  {
    title: "DSA Cheat Sheet",
    type: "drive",
    url: "https://docs.google.com/spreadsheets/d/1SB9SudeHrS729P38isNxwBIuB09p7wxa",
    description: "A comprehensive cheat sheet for Data Structures and Algorithms"
  },
  {
    title: "System Design Primer",
    type: "pdf",
    url: "/resources/system-design-primer.pdf",
    description: "An introduction to system design concepts and best practices"
  },
  {
    title: "Time Complexity Cheat Sheet",
    type: "drive",
    url: "https://www.bigocheatsheet.com/",
    description: "A comprehensive cheat sheet for Data Structures and Algorithms" 
  },{
    title: "Company Wise Projects",
    type: "drive",
    url: "https://github.com/Rohith2201/company-wise-projects",
    description: "Top ideas for a particular company to build some crazy projects." 
  },
  {
    title: "Big O Notation Explained",
    type: "image",
    url: "/resources/big-o-notation.png",
    description: "Visual explanation of Big O notation and time complexities"
  },
]

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
        Resources
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {resource.type === 'drive' && <ExternalLink className="h-5 w-5" />}
                {resource.type === 'pdf' && <FileText className="h-5 w-5" />}
                {resource.type === 'image' && <ImageIcon className="h-5 w-5" />}
                <span>{resource.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
              <Link
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
              >
                View Resource →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

