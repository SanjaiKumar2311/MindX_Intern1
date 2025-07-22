import { Toggle } from "@/components/ui/toggle";
import { Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
} from "lucide-react";

type MenuBarProps = {
  editor: Editor | null;
};

const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) {
    return null;
  }
  const Options = [
    {
      icon: <Heading1 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      preesed: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <Heading2 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      preesed: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <Heading3 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      preesed: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      preesed: editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      preesed: editor.isActive("italic"),
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      preesed: editor.isActive("strike"),
    },
    {
      icon: <AlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      preesed: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <AlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      preesed: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <AlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      preesed: editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      preesed: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      preesed: editor.isActive("orderedList"),
    },
    {
      icon: <Highlighter className="size-4" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      preesed: editor.isActive("highlight"),
    },
  ];
  return (
    <div className="border rounded-md p-1 mb-1 bg-slate-50 space-x-2 z-50">
      {Options.map((option, index) => (
        <Toggle
          key={index}
          pressed={option.preesed}
          onPressedChange={option.onClick}
        >
          {option.icon}
        </Toggle>
      ))}
    </div>
  );
};

export default MenuBar;

// <div className="flex gap-2 border px-2 py-1 rounded-t bg-gray-100">
{
  /* <Button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'font-bold text-blue-600' : ''}>
        B
      </Button>
      <Button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'italic text-blue-600' : ''}>
        I
      </Button>
      <Button onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
        {'</>'}
      </Button>
      <Button onClick={() => editor.chain().focus().toggleBulletList().run()}>
        • List
      </Button>
      <Button onClick={() => editor.chain().focus().setParagraph().run()}>
        ¶
      </Button>
      <Button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
        H1
      </Button>
      <Button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        H2
      </Button> */
}

// </div>

// ----
//   <div className="flex gap-2 border p-1 rounded-md bg-gray-50">
//   <Button
//     variant="ghost"
//     size="icon"
//     onClick={() => editor.chain().focus().toggleBold().run()}
//     className={editor.isActive('bold') ? 'bg-blue-100 text-blue-600' : ''}
//   >
//     <Bold className="h-4 w-4" />
//   </Button>

//   <Button
//     variant="ghost"
//     size="icon"
//     onClick={() => editor.chain().focus().toggleItalic().run()}
//     className={editor.isActive('italic') ? 'bg-blue-100 text-blue-600' : ''}
//   >
//     <Italic className="h-4 w-4" />
//   </Button>

//   <Button
//     variant="ghost"
//     size="icon"
//     onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
//     className={editor.isActive('heading', { level: 1 }) ? 'bg-blue-100 text-blue-600' : ''}
//   >
//     <Heading1 className="h-4 w-4" />
//   </Button>

//   <Button
//     variant="ghost"
//     size="icon"
//     onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
//     className={editor.isActive('heading', { level: 2 }) ? 'bg-blue-100 text-blue-600' : ''}
//   >
//     <Heading2 className="h-4 w-4" />
//   </Button>

// </div>
//   --

//    <div className="flex gap-2 border  rounded-md ">
//       <ToggleGroup type="multiple">
//   <ToggleGroupItem
//   value="bold"
//   aria-label="Toggle bold"
//   onClick={() => editor.chain().focus().toggleBold().run()} >
//     <Bold className="h-4 w-4" />
//   </ToggleGroupItem>
//   <ToggleGroupItem value="italic" aria-label="Toggle italic">
//     <Italic className="h-4 w-4" />
//   </ToggleGroupItem>
//   <ToggleGroupItem
//     value="underline"
//     aria-label="Toggle underline"
//     onClick={() => editor.chain().focus().toggleBold().run()}
//   >
//     <Underline className="h-4 w-4" />
//   </ToggleGroupItem>
// </ToggleGroup>
// </div>
