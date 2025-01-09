import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ExternalLink, BookmarkPlus, BookmarkMinus } from 'lucide-react'
import Link from "next/link"
import { Problem } from "@/lib/problems"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

interface ProblemCardProps {
  problem: Problem
  onToggle: (id: string) => void
  note: string
  onUpdateNote: (note: string) => void
  isSaved: boolean
  onToggleSave: () => void
}

export function ProblemCard({ problem, onToggle, note, onUpdateNote, isSaved, onToggleSave }: ProblemCardProps) {
  const [isEditingNote, setIsEditingNote] = useState(false)
  const [localNote, setLocalNote] = useState(note)

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalNote(e.target.value)
  }

  const handleSaveNote = () => {
    onUpdateNote(localNote)
    setIsEditingNote(false)
  }

  return (
    <Card className="flex flex-col h-full transition-all hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg flex justify-between items-start">
          <span>{problem["Problem: "]}</span>
          <Button variant="ghost" size="sm" onClick={onToggleSave}>
            {isSaved ? <BookmarkMinus className="h-5 w-5" /> : <BookmarkPlus className="h-5 w-5" />}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-2">ID: {problem.id}</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {problem.companies.map((company) => (
            <Badge key={company} variant="secondary">
              <Link href={`/companies/${company.toLowerCase()}`}>
                {company}
              </Link>
            </Badge>
          ))}
        </div>
        {isEditingNote ? (
          <Textarea
            value={localNote}
            onChange={handleNoteChange}
            placeholder="Add your notes here..."
            className="w-full"
          />
        ) : (
          <p className="text-sm">{localNote || 'No notes yet. Click to add.'}</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id={`problem-${problem.id}`} 
            checked={problem.Done === "yes"}
            onCheckedChange={() => onToggle(problem.id)}
          />
          <label htmlFor={`problem-${problem.id}`}>Mark as done</label>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              if (isEditingNote) {
                handleSaveNote()
              } else {
                setIsEditingNote(true)
              }
            }}
          >
            {isEditingNote ? 'Save Note' : 'Edit Note'}
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link
              href={problem.URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              Solve
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

