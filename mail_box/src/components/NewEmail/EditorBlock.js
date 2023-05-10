import classes from "./EditorBlock.module.css";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function EditorBlock(props) {
  function editorChange(e) {
    props.setEditorValue(e);
  }

  return (
    <div className={classes.editorbox}>
      <Editor
        onChange={editorChange}
        wrapperClassName={classes.wrapper}
        editorClassName={classes.editor}
        toolbarClassName={classes.toolbar}
        toolbar={{
          options: ["inline", "fontSize", "fontFamily", "textAlign", "emoji"],
          inline: {
            inDropdown: false,
            options: ["bold", "italic", "underline"],
          },
        }}
      />
    </div>
  );
}
export default EditorBlock;
