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
      <button className="border-primary bg-primary">
        {`Download .csv ( Rs ${total} )`}
      </button>
    </a>
  );
}

export default Download;
