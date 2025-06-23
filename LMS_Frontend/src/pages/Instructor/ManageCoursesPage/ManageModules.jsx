import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getModulesByCourse,
  createModule,
  deleteModule,
} from "../../../services/moduleService";
import styles from "./ManageModules.module.css";

export default function ManageModules() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [order, setOrder] = useState(1);

  useEffect(() => {
    fetchModules();
    // eslint-disable-next-line
  }, []);

  async function fetchModules() {
    try {
      const data = await getModulesByCourse(courseId);
      setModules(data);
    } catch (err) {
      alert("Failed to load modules");
    }
  }

  async function handleCreateModule(e) {
    e.preventDefault();
    try {
      const newModule = await createModule({
        course_id: courseId,
        title,
        description,
        order: parseInt(order),
      });
      setModules((prev) => [...prev, newModule]);
      setTitle("");
      setDescription("");
      setOrder(order + 1);
    } catch (err) {
      alert("Failed to add module");
    }
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this module?"
    );
    if (!confirmDelete) return;
    try {
      await deleteModule(id);
      setModules((prev) => prev.filter((mod) => mod.id !== id));
    } catch (err) {
      alert("Failed to delete module");
    }
  }

  return (
    <div className={styles.container}>
      <h2>Modules for the Course</h2>

      <form onSubmit={handleCreateModule} className={styles.form}>
        <input
          type="text"
          placeholder="Module Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type="number"
          placeholder="Order"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          required
          min={1}
        />
        <button type="submit">Add Module</button>
      </form>

      <ul className={styles.moduleList}>
        {modules.map((mod) => (
          <li key={mod.id} className={styles.moduleCard}>
            <strong>
              {mod.order}. {mod.title}
            </strong>
            <p>{mod.description}</p>
            <div>
              <button onClick={() => handleDelete(mod.id)}>Delete</button>
              <button
                onClick={() =>
                  navigate(`/instructor/modules/${mod.id}/lessons/add`)
                }
              >
                + Add Lesson
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
