import React from 'react';
import { normalizeNodeId } from 'platejs';
import type { Value } from 'platejs';
import { Plate, usePlateEditor } from 'platejs/react';

import { EditorKit } from '@/components/editor/editor-kit';
// import { SettingsDialog } from '@/components/editor/settings-dialog';
import { Editor, EditorContainer } from '@/components/ui/editor';
// import { FixedToolbar } from '@/components/ui/fixed-toolbar';
// import { FixedToolbarButtons } from '@/components/ui/fixed-toolbar-buttons';

interface PlateEditorProps {
  initialContent?: Value;
  onChange?: (value: Value) => void;
  readOnly?: boolean;
}

const defaultValue: Value = [
  {
    children: [{ text: 'Start typing...' }],
    type: 'p',
  },
];

export function PlateEditor({ initialContent, onChange, readOnly }: PlateEditorProps) {
  const editor = usePlateEditor({
    plugins: EditorKit,
    value: initialContent || defaultValue,
  });

  return (
    <Plate editor={editor} onChange={({ value }) => onChange?.(value)} readOnly={readOnly}>
      <EditorContainer>
        <Editor variant="default" className="min-h-[500px] px-8 py-4" />
      </EditorContainer>

      {/* <SettingsDialog /> */}
    </Plate>
  );
}
