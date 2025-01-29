import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getCategory } from "src/services/Admin";
import { getCookie } from "src/utils/cookie";
import styles from "./AddPost.module.css";
import axios from "axios";
import toast from "react-hot-toast";

function AddPost() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    city: "",
    category: "",
    amount: null,
    images: null,
  });
  const { data } = useQuery(["get-categories"], getCategory);

  const changeHandler = (event) => {
    const name = event.target.name;

    if (name !== "images") {
      setForm({ ...form, [name]: event.target.value });
    } else {
      setForm({ ...form, [name]: event.target.files[0] });
    }
  };

  const addHandler = (event) => {
    event.preventDefault();

    const formData = new FormData();
    for (let i in form) {
      formData.append(i, form[i]);
    }
    const token = getCookie("accessToken");

    axios
      .post(`${import.meta.env.VITE_BASE_URL}post/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => toast.success(res.data.message))
      .catch((error) => toast.error("مشکلی پیش آمده است"));
  };
  return (
    <form onChange={changeHandler} className={styles.form}>
      <h3>افزودن آگهی</h3>
      <label htmlFor="title">عنوان</label>
      <input type="text" id="title" name="title" />
      <label htmlFor="content">توضیحات</label>
      <textarea name="content" id="content" />
      <label htmlFor="amount">مبلغ</label>
      <input type="number" id="amount" name="amount" />
      <label htmlFor="city">شهر</label>
      <input type="text" id="city" name="city" />
      <label htmlFor="category">دسته بندی</label>
      <select name="category" id="category">
        {data?.data.map((i) => (
          <option key={i._id} value={i._id}>
            {i.name}
          </option>
        ))}
      </select>
      <label htmlFor="images">تصویر آگهی</label>
      <input type="file" id="images" name="images" />
      <button onClick={addHandler}>ایجاد</button>
    </form>
  );
}

export default AddPost;
