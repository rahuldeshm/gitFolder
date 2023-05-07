import { useState } from "react";

function Greeting() {
  const [changedText, setChangedText] = useState(false);

  function changetextHandler() {
    setChangedText(true);
  }
  return (
    <div>
      <h2>hello World some</h2>
      {!changedText && <p>adn World i am rahul deshmukh nice to meet you!</p>}
      {changedText && <p>Changed!</p>}
      <button onClick={changetextHandler}>Change text</button>
    </div>
  );
}

export default Greeting;
