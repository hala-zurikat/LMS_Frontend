import React, { useEffect, useState } from "react";
import categoryService from "../../../services/categoryService";
import styles from "./ManageCategories.module.css";

function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    try {
      await categoryService.create(newCategory);
      setNewCategory("");
      fetchCategories();
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setUpdatedName(category.name);
  };

  const handleUpdate = async (id) => {
    try {
      await categoryService.update(id, updatedName);
      setEditingCategory(null);
      fetchCategories();
    } catch (err) {
      console.error("Error updating category:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;
    try {
      await categoryService.delete(id);
      fetchCategories();
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Manage Categories</h2>

      <form onSubmit={handleAdd} className={styles.form}>
        <input
          type="text"
          placeholder="New Category Name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul className={styles.list}>
        {categories.map((category) => (
          <li key={category.id}>
            {editingCategory?.id === category.id ? (
              <>
                <input
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                />
                <button onClick={() => handleUpdate(category.id)}>Save</button>
                <button onClick={() => setEditingCategory(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>{category.name}</span>
                <button onClick={() => handleEdit(category)}>Edit</button>
                <button onClick={() => handleDelete(category.id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageCategories;
