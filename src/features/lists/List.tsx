import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { useLists } from "@/hooks/useLists"

type Props = {
  listsData: ReturnType<typeof useLists>
  onSelect: (rolls: string[], listName: string) => void
}

export default function List({ listsData, onSelect }: Props) {
  const { lists, loading } = listsData

  if (loading)
    return <p className="text-sm text-muted-foreground">Loading lists...</p>

  return (
    <Combobox
      items={lists.map((l) => l.name)}
      onValueChange={(value) => {
        const list = lists.find((l) => l.name === value)
        if (list) onSelect(list.rolls, list.name)
      }}
    >
      <ComboboxInput placeholder="Select a list" className="w-full" />
      <ComboboxContent>
        <ComboboxEmpty>No lists found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
