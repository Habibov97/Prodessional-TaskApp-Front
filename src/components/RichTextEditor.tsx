'use client';
import { useState } from 'react';
import { EditorContent, useEditor, useEditorState, type Editor } from '@tiptap/react';
import { Extension } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import {
  BoldIcon,
  CodeIcon,
  Heading2Icon,
  Heading3Icon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  Redo2Icon,
  SquareCodeIcon,
  StrikethroughIcon,
  UnderlineIcon,
  Undo2Icon,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toEditorHtml } from '@/lib/rich-text';

// Tab writes a real tab character (kept when the description is shown) instead
// of leaving the editor; inside lists the list extension indents the item.
const TabKey = Extension.create({
  name: 'tabKey',
  addKeyboardShortcuts() {
    return {
      Tab: ({ editor }) => {
        if (editor.isActive('listItem')) return false;
        return editor.commands.insertContent('\t');
      },
    };
  },
});

type Tool = {
  label: string;
  shortcut?: string;
  icon: LucideIcon;
  isActive?: (editor: Editor) => boolean;
  run: (editor: Editor) => void;
  disabled?: (editor: Editor) => boolean;
};

const TOOL_GROUPS: Tool[][] = [
  [
    { label: 'Bold', shortcut: 'Ctrl+B', icon: BoldIcon, isActive: (e) => e.isActive('bold'), run: (e) => e.chain().focus().toggleBold().run() },
    { label: 'Italic', shortcut: 'Ctrl+I', icon: ItalicIcon, isActive: (e) => e.isActive('italic'), run: (e) => e.chain().focus().toggleItalic().run() },
    { label: 'Underline', shortcut: 'Ctrl+U', icon: UnderlineIcon, isActive: (e) => e.isActive('underline'), run: (e) => e.chain().focus().toggleUnderline().run() },
    { label: 'Strikethrough', shortcut: 'Ctrl+Shift+S', icon: StrikethroughIcon, isActive: (e) => e.isActive('strike'), run: (e) => e.chain().focus().toggleStrike().run() },
    { label: 'Inline code', shortcut: 'Ctrl+E', icon: CodeIcon, isActive: (e) => e.isActive('code'), run: (e) => e.chain().focus().toggleCode().run() },
  ],
  [
    { label: 'Heading', icon: Heading2Icon, isActive: (e) => e.isActive('heading', { level: 2 }), run: (e) => e.chain().focus().toggleHeading({ level: 2 }).run() },
    { label: 'Subheading', icon: Heading3Icon, isActive: (e) => e.isActive('heading', { level: 3 }), run: (e) => e.chain().focus().toggleHeading({ level: 3 }).run() },
  ],
  [
    { label: 'Bullet list', icon: ListIcon, isActive: (e) => e.isActive('bulletList'), run: (e) => e.chain().focus().toggleBulletList().run() },
    { label: 'Numbered list', icon: ListOrderedIcon, isActive: (e) => e.isActive('orderedList'), run: (e) => e.chain().focus().toggleOrderedList().run() },
    { label: 'Code block (keeps spacing)', shortcut: 'Ctrl+Alt+C', icon: SquareCodeIcon, isActive: (e) => e.isActive('codeBlock'), run: (e) => e.chain().focus().toggleCodeBlock().run() },
    { label: 'Quote', icon: QuoteIcon, isActive: (e) => e.isActive('blockquote'), run: (e) => e.chain().focus().toggleBlockquote().run() },
  ],
  [
    { label: 'Undo', shortcut: 'Ctrl+Z', icon: Undo2Icon, run: (e) => e.chain().focus().undo().run(), disabled: (e) => !e.can().undo() },
    { label: 'Redo', shortcut: 'Ctrl+Shift+Z', icon: Redo2Icon, run: (e) => e.chain().focus().redo().run(), disabled: (e) => !e.can().redo() },
  ],
];

const ALL_TOOLS = TOOL_GROUPS.flat();

type Props = {
  /** Name of the hidden input that carries the HTML in the form */
  name: string;
  defaultValue?: string;
  labelId: string;
  placeholder?: string;
  invalid?: boolean;
};

export default function RichTextEditor({ name, defaultValue = '', labelId, placeholder, invalid }: Props) {
  const [html, setHtml] = useState(() => (defaultValue ? toEditorHtml(defaultValue) : ''));

  const editor = useEditor({
    extensions: [
      TabKey,
      StarterKit.configure({ heading: { levels: [2, 3] }, link: false, horizontalRule: false }),
    ],
    content: html,
    // Rendering waits for the client, which avoids a hydration mismatch.
    immediatelyRender: false,
    editorProps: {
      attributes: {
        role: 'textbox',
        'aria-multiline': 'true',
        'aria-labelledby': labelId,
        ...(invalid ? { 'aria-invalid': 'true' } : {}),
        class: 'rich-text custom-scrollbar min-h-[160px] max-h-[320px] overflow-y-auto px-3 py-2 outline-none',
      },
    },
    onUpdate: ({ editor }) => setHtml(editor.isEmpty ? '' : editor.getHTML()),
  });

  // Toolbar state only re-renders when one of these flags changes.
  const active = useEditorState({
    editor,
    selector: ({ editor }) =>
      editor
        ? ALL_TOOLS.map((tool) => ({
            active: tool.isActive?.(editor) ?? false,
            disabled: tool.disabled?.(editor) ?? false,
          }))
        : null,
  });

  let index = 0;

  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg border bg-input/30 transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30',
        invalid ? 'border-destructive' : 'border-input',
      )}
    >
      <input type="hidden" name={name} value={html} />

      <div
        role="toolbar"
        aria-label="Formatting"
        className="flex flex-wrap items-center gap-0.5 border-b border-stone-200 bg-stone-50 px-1.5 py-1"
      >
        {TOOL_GROUPS.map((group, groupIndex) => (
          <div key={groupIndex} className="flex items-center gap-0.5">
            {groupIndex > 0 && <span className="mx-1 h-5 w-px bg-stone-200" aria-hidden />}
            {group.map((tool) => {
              const state = active?.[index++];
              const Icon = tool.icon;
              return (
                <button
                  key={tool.label}
                  type="button"
                  title={tool.shortcut ? `${tool.label} (${tool.shortcut})` : tool.label}
                  aria-label={tool.label}
                  aria-pressed={tool.isActive ? !!state?.active : undefined}
                  disabled={!editor || state?.disabled}
                  // Keep the text selection while clicking the toolbar.
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => editor && tool.run(editor)}
                  className={cn(
                    'flex size-8 cursor-pointer items-center justify-center rounded-md text-stone-600 transition-colors hover:bg-stone-200 hover:text-stone-900 disabled:cursor-not-allowed disabled:opacity-40',
                    state?.active && 'bg-red-100 text-red-600 hover:bg-red-100 hover:text-red-700',
                  )}
                >
                  <Icon className="size-4" />
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="relative">
        {!html && placeholder && (
          <p className="pointer-events-none absolute top-2 left-3 text-sm text-muted-foreground" aria-hidden>
            {placeholder}
          </p>
        )}
        <EditorContent editor={editor} />
        {!editor && <div className="min-h-[160px]" aria-hidden />}
      </div>
    </div>
  );
}
