import { useQuery } from "@tanstack/react-query";
import { deleteCategory, getCategory } from "src/services/Admin";
import Loader from "../modules/Loader";
import styles from "./CategoryList.module.css";

function CategoryList() {
  const { isLoading, data } = useQuery(["get-categories"], getCategory);

  return (
    <div className={styles.list}>
      {isLoading ? (
        <Loader />
      ) : (
        data?.data.map((i) => (
          <div key={i._id}>
            <img src={`${i.icon}.svg`} />
            <h5>{i.name}</h5>
            <p>slug: {i.slug}</p>
            <button onClick={() => deleteCategory(i._id)}>حذف</button>
          </div>
        ))
      )}
    </div>
  );
}

export default CategoryList;
