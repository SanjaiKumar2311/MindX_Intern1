import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from "@tiptap/extension-text-align"
import Highlight from "@tiptap/extension-highlight"
import Heading from '@tiptap/extension-heading'
import MenuBar from './menu-bar'
import styles from '../scss/component.module.scss'
import { useEffect } from 'react'

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
    readOnly: boolean;
  }

const RichTextEditor = ({content,onChange,readOnly}: RichTextEditorProps) => {
    const editor = useEditor({
        extensions: [
          StarterKit.configure({
            bulletList: {
              HTMLAttributes: {
                class: "list-disc ml-3",
              },
            },
            orderedList: {
              HTMLAttributes: {
                class: "list-decimal ml-3",
              },
            },
          }),
          TextAlign.configure({
            types: ["heading", "paragraph"],
          }),
          Highlight,
          Heading.configure({
            levels: [1,2,3,4],
          })
        ],
        content: content,
        editable: !readOnly,
        editorProps: {
          attributes: {
            class: `min-h-[156px] border rounded-md  py-2 px-3 ${styles.headingStyles}`,
          },
        },
        onUpdate: ({ editor }) => {
          onChange(editor.getHTML());
        },
      });
      useEffect(() => {
        if (editor && content !== editor.getHTML()) {
          editor.commands.setContent(content);
        }
      }, [content, editor]);
        useEffect(() => {
    if (editor) {
      editor.setEditable(!readOnly);
    }
  }, [readOnly, editor]);
  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor}/>
    </div>
  )
}

export default RichTextEditor