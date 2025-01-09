import { Card, CardHeader, CardTitle } from "@/components/ui/card"

interface TopicCardProps {
  topic: string
  onSelect: () => void
}

export function TopicCard({ topic, onSelect }: TopicCardProps) {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={onSelect}>
      <CardHeader>
        <CardTitle>{topic}</CardTitle>
      </CardHeader>
    </Card>
  )
}

