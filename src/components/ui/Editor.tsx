import React, { useState } from 'react';
import { Editor, EditorState } from 'draft-js';

type EditorType = {
  value: string
  onChange(value: string): void
}

const MyInput: React.FC<EditorType> = ({ value, onChange }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
  return <Editor
    editorState={editorState}
    onChange={setEditorState}
    placeholder="Введите сообщение"
  />;
};

export default MyInput
