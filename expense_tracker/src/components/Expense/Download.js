import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
function Download() {
  const list = useSelector((state) => state.expense.list);
  const total = useSelector((state) => state.expense.total);
  let list1 = ["Price, Discription, Categary \n"];
  list.forEach((i) => {
    list1.push(`${i.price}, ${i.discription}, ${i.categary}\n`);
  });
  const blob = new Blob(list1);
  const url = URL.createObjectURL(blob);

  return (
    <a href={url} download={"text.csv"}>
      <Button
        variant="success"
        style={{
          width: "108%",
          height: "4rem",
          marginTop: "1rem",
          marginLeft: "-0.7rem",
        }}
      >
        {`Download Expenses $${total}`}
      </Button>
    </a>
  );
}

export default Download;
