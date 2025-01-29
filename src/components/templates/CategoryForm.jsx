import { useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "./CategoryForm.module.css";
import { useState } from "react";
import { addCategory } from "src/services/Admin";

function CategoryForm() {
  const [form, setForm] = useState({ name: "", slug: "", icon: "" });
  const queryClient = useQueryClient();
  const { mutate, isLoading, error, data } = useMutation(addCategory, {onSuccess:()=>queryClient.invalidateQueries("get-categories")});
  console.log({ isLoading, error });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!form.name || !form.slug || !form.icon) return;
    mutate(form);
  };
  return (
    <form
      onChange={changeHandler}
      onSubmit={submitHandler}
      className={styles.form}
    >
      <h3>دسته بندی جدید</h3>
      {data?.status === 201 && <p>دسته بندی با موفقیت ایجاد شد</p>}
      {!!error && <p>مشکلی پیش آمده است</p>}
      <label htmlFor="name">نام دسته بندی</label>
      <input name="name" id="name" type="text" />
      <label htmlFor="slug"> اسلاگ</label>
      <input name="slug" id="slug" type="text" />
      <label htmlFor="icon">آیکن</label>
      <input name="icon" id="icon" type="text" />
      <button type="submit" disabled={isLoading}>
        ایجاد
      </button>
    </form>
  );
}

export default CategoryForm;
