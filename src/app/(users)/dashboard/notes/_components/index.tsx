"use client"

import { useState, useRef, useEffect } from "react"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Code,
  RotateCcw,
  Trash2,
  Plus,
  Mic,
  Video,
  Maximize2,
  MoreHorizontal,
  ChevronDown,
  Smile,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Highlighter,
  Palette,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

// Simple emoji list for the picker
const emojis = [
  "😀",
  "😃",
  "😄",
  "😁",
  "😆",
  "😅",
  "😂",
  "🤣",
  "😊",
  "😇",
  "🙂",
  "🙃",
  "😉",
  "😌",
  "😍",
  "🥰",
  "😘",
  "😗",
  "😙",
  "😚",
  "😋",
  "😛",
  "😝",
  "😜",
  "🤪",
  "🤨",
  "🧐",
  "🤓",
  "😎",
  "🤩",
  "👍",
  "👎",
  "👏",
  "🙌",
  "👐",
  "🤲",
  "🤝",
  "👊",
  "✊",
  "🤛",
]

// Color options
const colors = [
  "#000000",
  "#5c5c5c",
  "#8a8a8a",
  "#b5b5b5",
  "#e0e0e0",
  "#ff0000",
  "#ff8000",
  "#ffff00",
  "#80ff00",
  "#00ff00",
  "#00ff80",
  "#00ffff",
  "#0080ff",
  "#0000ff",
  "#8000ff",
  "#ff00ff",
  "#ff0080",
  "#4a86e8",
  "#ff9900",
  "#6aa84f",
]

// Highlight colors
const highlightColors = [
  "#FFFF00",
  "#00FFFF",
  "#FF00FF",
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFA500",
  "#A020F0",
  "#FFC0CB",
  "#FFD700",
  "#E6E6FA",
  "#ADFF2F",
  "#FF6347",
  "#00FFFF",
  "#7FFFD4",
]

export default function MessageEditor() {
  const [message, setMessage] = useState("These are the files you asked for @oliviarox 😀")
  const [textFormat, setTextFormat] = useState("body1")
  const [activeFormats, setActiveFormats] = useState<string[]>([])
  const [isTextSelected, setIsTextSelected] = useState(false)
  const [selectionPosition, setSelectionPosition] = useState({ top: 0, left: 0 })
  const [selectedColor, setSelectedColor] = useState("#000000")
  const [selectedHighlight, setSelectedHighlight] = useState("#FFFF00")
  const editorRef = useRef<HTMLDivElement>(null)
  const editorContainerRef = useRef<HTMLDivElement>(null)

  // Handle text selection
  useEffect(() => {
    const checkSelection = () => {
      const selection = window.getSelection()
      if (selection && selection.toString().length > 0 && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        const rect = range.getBoundingClientRect()

        // Get editor container position
        if (editorContainerRef.current) {
          const editorRect = editorContainerRef.current.getBoundingClientRect()

          // Calculate position relative to the editor container
          setSelectionPosition({
            top: rect.top - editorRect.top - 40, // Position above the selection
            left: rect.left - editorRect.left + rect.width / 2 - 100, // Center horizontally
          })
          setIsTextSelected(true)
        }
      } else {
        setIsTextSelected(false)
      }
    }

    document.addEventListener("mouseup", checkSelection)
    document.addEventListener("keyup", checkSelection)

    return () => {
      document.removeEventListener("mouseup", checkSelection)
      document.removeEventListener("keyup", checkSelection)
    }
  }, [])

  const toggleFormat = (format: string) => {
    if (activeFormats.includes(format)) {
      setActiveFormats(activeFormats.filter((f) => f !== format))
    } else {
      setActiveFormats([...activeFormats, format])
    }

    // Apply format to selected text
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)

      if (format === "bold") {
        document.execCommand("bold", false)
      } else if (format === "italic") {
        document.execCommand("italic", false)
      } else if (format === "underline") {
        document.execCommand("underline", false)
      } else if (format === "bulletList") {
        document.execCommand("insertUnorderedList", false)
      } else if (format === "numberedList") {
        document.execCommand("insertOrderedList", false)
      } else if (format === "quote") {
        const selectedContent = range.extractContents()
        const blockquote = document.createElement("blockquote")
        blockquote.style.borderLeft = "4px solid #e5e7eb"
        blockquote.style.paddingLeft = "10px"
        blockquote.style.fontStyle = "italic"
        blockquote.appendChild(selectedContent)
        range.insertNode(blockquote)
      } else if (format === "code") {
        const selectedContent = range.extractContents()
        const code = document.createElement("code")
        code.style.fontFamily = "monospace"
        code.style.backgroundColor = "#f3f4f6"
        code.style.padding = "2px 4px"
        code.style.borderRadius = "4px"
        code.appendChild(selectedContent)
        range.insertNode(code)
      }

      // Update message state
      if (editorRef.current) {
        setMessage(editorRef.current.innerHTML)
      }
    }
  }

  const isFormatActive = (format: string) => activeFormats.includes(format)

  const handleMessageChange = () => {
    // Update message state from editor content
    if (editorRef.current) {
      setMessage(editorRef.current.innerHTML)
    }
  }

  const insertEmoji = (emoji: string) => {
    if (editorRef.current) {
      // Get current selection
      const selection = window.getSelection()
      if (selection && selection.rangeCount > 0) {
        // Insert emoji at cursor position
        document.execCommand("insertText", false, emoji)
      } else {
        // If no selection, append to end
        editorRef.current.innerHTML += emoji
      }
      // Update message state
      setMessage(editorRef.current.innerHTML)
    }
  }

  const applyAlignment = (alignment: string) => {
    document.execCommand("justify" + alignment.charAt(0).toUpperCase() + alignment.slice(1), false)
    setIsTextSelected(false)

    // Update message state
    if (editorRef.current) {
      setMessage(editorRef.current.innerHTML)
    }
  }

  const applyTextColor = (color: string) => {
    setSelectedColor(color)
    document.execCommand("foreColor", false, color)
    setIsTextSelected(false)

    // Update message state
    if (editorRef.current) {
      setMessage(editorRef.current.innerHTML)
    }
  }

  const applyHighlight = (color: string) => {
    setSelectedHighlight(color)
    document.execCommand("hiliteColor", false, color)
    setIsTextSelected(false)

    // Update message state
    if (editorRef.current) {
      setMessage(editorRef.current.innerHTML)
    }
  }

  // Handle clearing the editor safely
  const clearEditor = () => {
    if (editorRef.current) {
      editorRef.current.innerHTML = '<span class="text-gray-400">Type your message here...</span>'
      setMessage("")
    }
  }

  // Initialize editor content
  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML) {
      editorRef.current.innerHTML = message
        ? `These are the files you asked for <span class="text-blue-500 bg-blue-50/50 px-1 rounded">@oliviarox</span> <span class="text-xl leading-none">😀</span>`
        : '<span class="text-gray-400">Type your message here...</span>'
    }
  }, [message])

  return (
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-[0_0_40px_-10px_rgba(0,0,0,0.08)] border border-gray-100">
        {/* Formatting Toolbar */}
        <div className="flex items-center p-2 border-b border-gray-100">
          <div className="flex items-center border border-gray-200 rounded-2xl p-[5px] bg-gray-100/80">
            <div className="flex items-center mr-2">
              <Select value={textFormat} onValueChange={setTextFormat}>
                <SelectTrigger className="relative overflow-hidden h-10 px-4 text-gray-700 font-medium rounded-xl flex items-center gap-1 bg-gray-50/80 hover:bg-gray-50 shadow-[0_1px_2px_rgba(0,0,0,0.08)] border border-gray-100 w-[100px]">
                <div className="absolute top-0 left-1/2 w-full h-[2px] rounded-full bg-white transform -translate-x-1/2" />
                  <SelectValue placeholder="Body 1" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="body1">Body 1</SelectItem>
                  <SelectItem value="body2">Body 2</SelectItem>
                  <SelectItem value="heading1">Heading 1</SelectItem>
                  <SelectItem value="heading2">Heading 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center border-l border-gray-200 pl-2 gap-0.5">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "relative h-10 w-10 rounded-xl text-gray-600 hover:bg-white",
                  isFormatActive("bold") && "bg-gray-50 shadow-[0_1px_2px_rgba(0,0,0,0.08)] border border-gray-100",
                )}
                onClick={() => toggleFormat("bold")}
              >
                {isFormatActive("bold") && <div className="absolute top-0 left-1/2 w-full h-[2px] rounded-full bg-white transform -translate-x-1/2" />}
                <Bold className="h-[18px] w-[18px]" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-10 w-10 rounded-xl text-gray-600 hover:bg-white",
                  isFormatActive("italic") &&
                    "bg-gray-50/80 shadow-[0_1px_2px_rgba(0,0,0,0.08)] border border-gray-100",
                )}
                onClick={() => toggleFormat("italic")}
              >
                <Italic className="h-[18px] w-[18px]" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-10 w-10 rounded-xl text-gray-600 hover:bg-white",
                  isFormatActive("underline") &&
                    "bg-gray-50/80 shadow-[0_1px_2px_rgba(0,0,0,0.08)] border border-gray-100",
                )}
                onClick={() => toggleFormat("underline")}
              >
                <Underline className="h-[18px] w-[18px]" />
              </Button>
            </div>

            <div className="flex items-center border-l border-gray-200 pl-2 gap-0.5 ml-2">
              
              {/* Emoji button */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-gray-600 hover:bg-white">
                    <Smile className="h-[18px] w-[18px]" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-2">
                  <div className="grid grid-cols-10 gap-1">
                    {emojis.map((emoji, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-gray-100"
                        onClick={() => insertEmoji(emoji)}
                      >
                        {emoji}
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              {/* Text color button */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-xl text-gray-600 hover:bg-white relative"
                  >
                    <Palette className="h-[18px] w-[18px]" />
                    <div
                      className="absolute bottom-1 right-1 w-2 h-2 rounded-full"
                      style={{ backgroundColor: selectedColor }}
                    />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-2">
                  <div className="grid grid-cols-5 gap-1">
                    {colors.map((color, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-gray-100 rounded-md"
                        onClick={() => applyTextColor(color)}
                      >
                        <div className="w-6 h-6 rounded-sm" style={{ backgroundColor: color }} />
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              {/* Highlighter button */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-xl text-gray-600 hover:bg-white relative"
                  >
                    <Highlighter className="h-[18px] w-[18px]" />
                    <div
                      className="absolute bottom-1 right-1 w-2 h-2 rounded-full"
                      style={{ backgroundColor: selectedHighlight }}
                    />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-2">
                  <div className="grid grid-cols-5 gap-1">
                    {highlightColors.map((color, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-gray-100 rounded-md"
                        onClick={() => applyHighlight(color)}
                      >
                        <div className="w-6 h-6 rounded-sm" style={{ backgroundColor: color }} />
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-center border-l border-gray-200 pl-2 gap-0.5 ml-2">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-10 w-10 rounded-xl text-gray-600 hover:bg-white",
                  isFormatActive("quote") && "bg-gray-50/80 shadow-[0_1px_2px_rgba(0,0,0,0.08)] border border-gray-100",
                )}
                onClick={() => toggleFormat("quote")}
              >
                <Quote className="h-[18px] w-[18px]" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-10 w-10 rounded-xl text-gray-600 hover:bg-white",
                  isFormatActive("code") && "bg-gray-50/80 shadow-[0_1px_2px_rgba(0,0,0,0.08)] border border-gray-100",
                )}
                onClick={() => toggleFormat("code")}
              >
                <Code className="h-[18px] w-[18px]" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-xl text-gray-600 hover:bg-white"
                onClick={() => {
                  if (editorRef.current) {
                    document.execCommand("removeFormat", false)
                    setActiveFormats([])
                  }
                }}
              >
                <RotateCcw className="h-[18px] w-[18px]" />
              </Button>

            </div>
          </div>
          <div className="ml-auto">
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-xl bg-red-50/80 text-red-500 hover:bg-red-100/80 hover:text-red-600"
              onClick={clearEditor}
            >
              <Trash2 className="h-[24px] w-[24px]" />
            </Button>
          </div>
        </div>

        {/* Message Content */}
        <div className="p-4 relative" ref={editorContainerRef}>
          {/* Floating alignment toolbar */}
          {isTextSelected && (
            <div
              className="absolute bg-white shadow-md rounded-lg p-1 flex gap-1 z-10"
              style={{ top: `${selectionPosition.top}px`, left: `${selectionPosition.left}px` }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-lg text-gray-600 hover:bg-gray-100"
                onClick={() => applyAlignment("left")}
              >
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-lg text-gray-600 hover:bg-gray-100"
                onClick={() => applyAlignment("center")}
              >
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-lg text-gray-600 hover:bg-gray-100"
                onClick={() => applyAlignment("right")}
              >
                <AlignRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="w-full">
            <div
              ref={editorRef}
              contentEditable
              className={cn(
                "text-gray-800 text-[15px] outline-none focus:outline-none min-h-[140px] rounded-lg border-transparent focus:border-gray-200",
                textFormat === "heading1" && "text-2xl font-bold",
                textFormat === "heading2" && "text-xl font-bold",
                textFormat === "body2" && "text-sm",
              )}
              onInput={handleMessageChange}
              suppressContentEditableWarning
            />
          </div>
        </div>

        {/* Bottom Toolbar */}
        <div className="flex items-center p-2 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-xl text-gray-400 hover:bg-gray-100 bg-gray-50/50"
            >
              <Plus className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-xl text-gray-400 hover:bg-gray-100 bg-gray-50/50"
            >
              <Mic className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-xl text-gray-400 hover:bg-gray-100 bg-gray-50/50"
            >
              <Video className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-xl text-gray-400 hover:bg-gray-100 bg-gray-50/50"
            >
              <Maximize2 className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-xl text-gray-400 hover:bg-gray-100 bg-gray-50/50"
            >
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>

          <div className="ml-auto flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-xl text-gray-400 hover:bg-gray-100 bg-gray-50/50"
            >
              <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-gray-400 border-b-[6px] border-b-transparent ml-0.5"></div>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-xl text-gray-400 hover:bg-gray-100 bg-gray-50/50"
            >
              <ChevronDown className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
  )
}

