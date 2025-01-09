'use client'

import { useState, useEffect } from 'react'
import { ProblemCard } from '@/components/problem-card'
import { TopicCard } from '@/components/topic-card'
import { loadProblems, groupProblemsByTopic, Problem } from '@/lib/problems'
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

export default function ProblemsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [completedProblems, setCompletedProblems] = useState<string[]>([])
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [savedProblems, setSavedProblems] = useState<string[]>([])
  const [problems, setProblems] = useState<Problem[]>([])

  useEffect(() => {
    const storedCompletedProblems = localStorage.getItem('completedProblems')
    const storedNotes = localStorage.getItem('notes')
    const storedSavedProblems = localStorage.getItem('savedProblems')
    if (storedCompletedProblems) setCompletedProblems(JSON.parse(storedCompletedProblems))
    if (storedNotes) setNotes(JSON.parse(storedNotes))
    if (storedSavedProblems) setSavedProblems(JSON.parse(storedSavedProblems))
  }, [])

  useEffect(() => {
    async function fetchProblems() {
      const loadedProblems = await loadProblems()
      setProblems(loadedProblems)
    }
    fetchProblems()
  }, [])

  const topics = Object.keys(groupProblemsByTopic(problems))

  const filteredProblems = selectedTopic
    ? problems.filter(problem => 
        problem["Topic:"] === selectedTopic &&
        problem["Problem: "].toLowerCase().includes(searchTerm.toLowerCase())
      )
    : problems.filter(problem => problem["Problem: "].toLowerCase().includes(searchTerm.toLowerCase()))

  const toggleProblemCompletion = (id: string) => {
    setCompletedProblems(prev => {
      const newCompletedProblems = prev.includes(id)
        ? prev.filter(problemId => problemId !== id)
        : [...prev, id]
      localStorage.setItem('completedProblems', JSON.stringify(newCompletedProblems))
      return newCompletedProblems
    })
  }

  const updateNote = (id: string, note: string) => {
    setNotes(prev => {
      const newNotes = { ...prev, [id]: note }
      localStorage.setItem('notes', JSON.stringify(newNotes))
      return newNotes
    })
  }

  const toggleSavedProblem = (id: string) => {
    setSavedProblems(prev => {
      const newSavedProblems = prev.includes(id)
        ? prev.filter(problemId => problemId !== id)
        : [...prev, id]
      localStorage.setItem('savedProblems', JSON.stringify(newSavedProblems))
      return newSavedProblems
    })
  }

  const totalProblems = filteredProblems.length
  const completedCount = filteredProblems.filter(problem => completedProblems.includes(problem.id)).length
  const progressPercentage = totalProblems > 0 ? (completedCount / totalProblems) * 100 : 0

  return (
    <div className="space-y-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 min-h-screen p-8 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-8 text-center text-gradient-primary">DSA Problems</h1>
      {!selectedTopic ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <TopicCard 
              key={topic} 
              topic={topic} 
              onSelect={() => setSelectedTopic(topic)}
            />
          ))}
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <Input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <button 
              onClick={() => setSelectedTopic(null)}
              className="px-4 py-2 bg-gradient-primary text-white rounded-md hover:opacity-90 transition-opacity"
            >
              Back to Topics
            </button>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <Progress value={progressPercentage} className="flex-grow" />
            <span className="text-gradient-primary font-semibold">{completedCount}/{totalProblems} Done ✅</span>
          </div>
          <div className="space-y-4">
            {filteredProblems.map((problem) => (
              <ProblemCard 
                key={problem.id} 
                problem={{...problem, Done: completedProblems.includes(problem.id) ? "yes" : "<->"}}
                onToggle={toggleProblemCompletion}
                note={notes[problem.id] || ''}
                onUpdateNote={(note) => updateNote(problem.id, note)}
                isSaved={savedProblems.includes(problem.id)}
                onToggleSave={() => toggleSavedProblem(problem.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

