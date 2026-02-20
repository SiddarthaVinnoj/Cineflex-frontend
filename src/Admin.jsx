import React, { useEffect, useState, useCallback } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API = "https://cineflex-backend.onrender.com";
const ITEMS_PER_PAGE = 10;

const emptyForm = {
  name: "",
  year: new Date().getFullYear(),
  genre: "",
  language: "English",
  imdbRating: "",
  img: "",
  description: "",
};

export default function Admin() {
  const [tab, setTab] = useState("movies");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState(new Set());

  const token = localStorage.getItem("token");

  const endpointForTab = (t) =>
    t === "movies" ? "/moviewatch" : t === "kids" ? "/kidwatch" : "/webwatch";

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(API + endpointForTab(tab));
      console.log('API Response:', res.data); // Log the raw API response
      
      // Log IMDB ratings for debugging
      if (res.data && Array.isArray(res.data)) {
        console.log('IMDB Ratings in response:');
        res.data.forEach((item, index) => {
          console.log(`${index + 1}. ${item.name}:`, {
            imdbrating: item.imdbrating,
            type: typeof item.imdbrating,
            isNumber: typeof item.imdbrating === 'number',
            isString: typeof item.imdbrating === 'string',
            parsed: parseFloat(item.imdbrating)
          });
        });
      }
      
      setItems(res.data || []);
      setCurrentPage(1);
      setSelectedItems(new Set());
      setEditingId(null);
      setForm(emptyForm);
    } catch (err) {
      console.error('Error fetching items:', err);
      toast.error("Failed to load items");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

 const handleChange = (e) => {
  const { name, value } = e.target;
  console.log(`Field changed - ${name}:`, value);

  setForm(prev => {
    if (name === 'imdbRating') {
      if (value === '' || /^(\d+\.?\d{0,1}|\.\d{0,1})$/.test(value)) {
        return {
          ...prev,
          [name]: value
        };
      }
      return prev;
    }
    return {
      ...prev,
      [name]: value
    };
  });
};

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await axios.post(`${API}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setForm((prev) => ({ ...prev, img: res.data.url }));
      toast.success("Image uploaded successfully");
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const cfg = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const url = API + endpointForTab(tab) + (editingId ? `/${editingId}` : "");
    const method = editingId ? "put" : "post";

    // Prepare the data to send
    const formData = {
      ...form,
      imdbRating: form.imdbRating === '' ? null : parseFloat(form.imdbRating),
      year: parseInt(form.year, 10)
    };

    console.log('Submitting data:', formData); // Debug log
    const response = await axios[method](url, formData, cfg);
    console.log('Server response:', response.data); // Debug log

    toast.success(`Item ${editingId ? 'updated' : 'created'} successfully`);
    fetchAll();
  } catch (err) {
    console.error("Submit error:", err);
    console.error("Error details:", err.response?.data); // More detailed error logging
    toast.error(err.response?.data?.message || "Operation failed");
  } finally {
    setLoading(false);
  }
};

 const handleEdit = (it) => {
  console.log('Editing item:', it); // Debug log
  setEditingId(it._id);
  
  // Get the rating from either field, default to empty string if not found
  // Use imdbRating directly
  const rating = it.imdbRating !== undefined && it.imdbRating !== null ? it.imdbRating : '';
  setForm({
    name: it.name || "",
    year: it.year || new Date().getFullYear(),
    genre: it.genre || "",
    language: it.language || "English",
    imdbRating: rating.toString(),
    img: it.img || "",
    description: it.description || "",
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
};
  const handleCancel = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const cfg = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(API + endpointForTab(tab) + `/${id}`, cfg);
      toast.success("Item deleted successfully");
      fetchAll();
    } catch (err) {
      console.error("Delete error:", err);
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedItems.size === 0) return;
    if (!window.confirm(`Delete ${selectedItems.size} selected items?`)) return;

    try {
      const cfg = { headers: { Authorization: `Bearer ${token}` } };

      await Promise.all(
        Array.from(selectedItems).map((id) =>
          axios.delete(API + endpointForTab(tab) + `/${id}`, cfg)
        )
      );

      toast.success(`${selectedItems.size} items deleted successfully`);
      fetchAll();
    } catch (err) {
      console.error("Bulk delete error:", err);
      toast.error("Failed to delete some items");
    }
  };

  const toggleSelectItem = (id) => {
    setSelectedItems((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // Filter + Pagination
  const filteredItems = items.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE) || 1;

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const toggleSelectAll = () => {
    if (selectedItems.size === paginatedItems.length && paginatedItems.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(paginatedItems.map((it) => it._id)));
    }
  };

  const getTabLabel = () => {
    switch (tab) {
      case "movies":
        return "Movies";
      case "kids":
        return "Kids Content";
      case "webseries":
        return "Web Series";
      default:
        return "Content";
    }
  };

  const singleLabel =
    tab === "movies" ? "Movie" : tab === "kids" ? "Kids Item" : "Web Series";

  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={2500} />

      <div className="adminWrap">
        <div className="adminContainer">
          {/* Header */}
          <div className="adminTop">
            <div>
              <h2 className="adminTitle">Admin Panel</h2>
              <p className="adminSub">
                Manage {getTabLabel()} • {filteredItems.length} item(s)
              </p>
            </div>

            <div className="adminActions">
              <div className="searchBox">
                <span className="searchIcon">🔎</span>
                <input
                  className="searchInput"
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>

              {selectedItems.size > 0 && (
                <button
                  className="btnDanger"
                  onClick={handleBulkDelete}
                  disabled={loading}
                >
                  Delete ({selectedItems.size})
                </button>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="tabsRow">
            <button
              className={`tabBtn ${tab === "movies" ? "active" : ""}`}
              onClick={() => setTab("movies")}
            >
              Movies
            </button>
            <button
              className={`tabBtn ${tab === "kids" ? "active" : ""}`}
              onClick={() => setTab("kids")}
            >
              Kids
            </button>
            <button
              className={`tabBtn ${tab === "webseries" ? "active" : ""}`}
              onClick={() => setTab("webseries")}
            >
              Web Series
            </button>
            <button className="tabRefresh" onClick={fetchAll} disabled={loading}>
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {/* Form */}
          <div className="cardBox">
            <div className="cardHead">
              <h5>{editingId ? `Edit ${singleLabel}` : `Add New ${singleLabel}`}</h5>
              {editingId && (
                <span className="pill">Editing Mode</span>
              )}
            </div>

            <div className="cardBody">
              <form onSubmit={handleSubmit} className="adminForm">
                <div className="grid">
                  <div className="field">
                    <label>Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter name"
                    />
                  </div>

                  <div className="field">
                    <label>Year</label>
                    <input
                      type="number"
                      name="year"
                      value={form.year}
                      onChange={handleChange}
                      min="1900"
                      max={new Date().getFullYear() + 5}
                    />
                  </div>

                  <div className="field">
                    <label>Genre</label>
                    <input
                      type="text"
                      name="genre"
                      value={form.genre}
                      onChange={handleChange}
                      placeholder="Action, Comedy..."
                    />
                  </div>

                  <div className="field">
                    <label>Language</label>
                    <select
                      name="language"
                      value={form.language}
                      onChange={handleChange}
                    >
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Tamil">Tamil</option>
                      <option value="Telugu">Telugu</option>
                      <option value="Malayalam">Malayalam</option>
                      <option value="Kannada">Kannada</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                 <div className="field">
  <label>IMDb Rating</label>
  <div style={{ position: 'relative' }}>
    <input
      type="number"
      name="imdbRating"
      value={form.imdbRating || ''}
      onChange={(e) => {
        const value = e.target.value;
        // Allow empty string or numbers between 0 and 10 with one decimal place
        if (value === '' || (value >= 0 && value <= 10 && /^\d*\.?\d{0,1}$/.test(value))) {
          handleChange({
            target: {
              name: 'imdbRating',
              value: value
            }
          });
        }
      }}
      onBlur={(e) => {
        // Format the value when input loses focus
        if (e.target.value !== '') {
          const num = parseFloat(e.target.value);
          if (!isNaN(num)) {
            const formattedValue = Math.min(Math.max(num, 0), 10).toFixed(1);
            setForm(prev => ({ ...prev, imdbRating: formattedValue }));
          }
        }
      }}
      min="0"
      max="10"
      step="0.1"
      placeholder="0.0 - 10.0"
      style={{ paddingRight: '30px' }}
    />
    <span style={{
      position: 'absolute',
      right: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#999',
      pointerEvents: 'none'
    }}>
      ⭐
    </span>
  </div>
</div>

                  <div className="field wide">
                    <label>Poster Image</label>
                    <div className="uploadRow">
                      <input
                        type="text"
                        name="img"
                        value={form.img}
                        onChange={handleChange}
                        placeholder="Paste image URL OR upload"
                      />
                      <label className={`uploadBtn ${uploading ? "disabled" : ""}`}>
                        {uploading ? "Uploading..." : "Upload"}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploading}
                        />
                      </label>
                    </div>

                    {form.img && (
                      <div className="previewRow">
                        <img
                          src={form.img}
                          alt="Preview"
                          onError={(e) => (e.target.style.display = "none")}
                        />
                      </div>
                    )}
                  </div>

                  <div className="field wide">
                    <label>Description</label>
                    <textarea
                      name="description"
                      rows="3"
                      value={form.description}
                      onChange={handleChange}
                      placeholder="Write short description..."
                    />
                  </div>
                </div>

                <div className="formBtns">
                  <button className="btnPrimary" type="submit" disabled={loading}>
                    {loading
                      ? editingId
                        ? "Updating..."
                        : "Creating..."
                      : editingId
                      ? "Update"
                      : "Create"}
                  </button>

                  {editingId && (
                    <button
                      type="button"
                      className="btnGhost"
                      onClick={handleCancel}
                      disabled={loading}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Table */}
          <div className="cardBox">
            <div className="cardHead">
              <h5>Manage {getTabLabel()}</h5>
              <div className="muted">
                Page {currentPage} / {totalPages}
              </div>
            </div>

            <div className="cardBody p0">
              {loading && items.length === 0 ? (
                <div className="emptyState">Loading...</div>
              ) : filteredItems.length === 0 ? (
                <div className="emptyState">
                  No {getTabLabel().toLowerCase()} found.
                </div>
              ) : (
                <>
                  <div className="tableWrap">
                    <table className="adminTable">
                      <thead>
                        <tr>
                          <th>
                            <input
                              type="checkbox"
                              checked={
                                paginatedItems.length > 0 &&
                                selectedItems.size === paginatedItems.length
                              }
                              onChange={toggleSelectAll}
                            />
                          </th>
                          <th>Poster</th>
                          <th>Name</th>
                          <th>Year</th>
                          <th>Genre</th>
                          <th>Lang</th>
                          <th>IMDB Rating</th>
                          <th style={{ textAlign: "right" }}>Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {paginatedItems.map((item) => (
                          <tr
                            key={item._id}
                            className={selectedItems.has(item._id) ? "rowActive" : ""}
                          >
                            <td>
                              <input
                                type="checkbox"
                                checked={selectedItems.has(item._id)}
                                onChange={() => toggleSelectItem(item._id)}
                              />
                            </td>

                            <td>
                              <img
                                className="poster"
                                src={
                                  item.img ||
                                  "https://via.placeholder.com/50x75?text=No+Image"
                                }
                                alt={item.name}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src =
                                    "https://via.placeholder.com/50x75?text=No+Image";
                                }}
                              />
                            </td>

                            <td>
                              <div className="nameCell">{item.name}</div>
                              <div className="descCell">
                                {item.description?.substring(0, 55)}
                                {item.description?.length > 55 ? "..." : ""}
                              </div>
                            </td>

                            <td>{item.year || "-"}</td>
                            <td>
                              <span className="chip">{item.genre || "N/A"}</span>
                            </td>
                            <td>{item.language || "English"}</td>

                          <td>
  {(() => {
    // First try to get the rating from either field
    const rating = item.imdbRating;
    
    // Convert to number and check if it's valid
    const numRating = parseFloat(rating);
    const isValidRating = !isNaN(numRating) && numRating >= 0 && numRating <= 10;

    return isValidRating ? (
      <span className="ratingChip" title="IMDB Rating">
        ⭐ {numRating.toFixed(1)}
      </span>
    ) : (
      <span className="muted">-</span>
    );
  })()}
</td>

                            <td style={{ textAlign: "right" }}>
                              <div className="rowBtns">
                                <button
                                  className="btnMini"
                                  onClick={() => handleEdit(item)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="btnMini danger"
                                  onClick={() => handleDelete(item._id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="pager">
                      <button
                        className="btnGhost"
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                      >
                        Prev
                      </button>

                      <div className="pagerInfo">
                        Showing{" "}
                        <b>{(currentPage - 1) * ITEMS_PER_PAGE + 1}</b> -{" "}
                        <b>
                          {Math.min(
                            currentPage * ITEMS_PER_PAGE,
                            filteredItems.length
                          )}
                        </b>{" "}
                        of <b>{filteredItems.length}</b>
                      </div>

                      <button
                        className="btnGhost"
                        onClick={() =>
                          setCurrentPage((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* IMPORTANT: In VITE use <style>{` not <style jsx global> */}
      <style>{`
        :root {
          --bg: #0b1220;
          --card: rgba(255, 255, 255, 0.06);
          --card2: rgba(255, 255, 255, 0.08);
          --border: rgba(255, 255, 255, 0.12);
          --text: #eaf0ff;
          --muted: rgba(234, 240, 255, 0.7);
          --brand: #5b7cfa;
          --brand2: #3659f7;
          --danger: #ff4d4d;
          --shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
          --radius: 16px;
          --radius2: 12px;
          --trans: 0.25s ease;
        }

        .adminWrap {
          min-height: 100vh;
          padding-top: 80px;
          background: radial-gradient(
              1200px 600px at 20% 10%,
              rgba(91, 124, 250, 0.25),
              transparent 60%
            ),
            radial-gradient(
              900px 500px at 80% 20%,
              rgba(255, 77, 77, 0.15),
              transparent 60%
            ),
            linear-gradient(180deg, #070b14, #0b1220);
          color: var(--text);
        }

        .adminContainer {
          max-width: 1300px;
          margin: 0 auto;
          padding: 18px;
        }

        .adminTop {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 18px;
        }

        .adminTitle {
          margin: 0;
          font-size: 1.6rem;
          font-weight: 800;
          letter-spacing: 0.2px;
        }

        .adminSub {
          margin: 6px 0 0;
          color: var(--muted);
        }

        .adminActions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .searchBox {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          border: 1px solid var(--border);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(10px);
        }

        .searchIcon {
          opacity: 0.85;
        }

        .searchInput {
          border: none;
          outline: none;
          background: transparent;
          color: var(--text);
          width: 240px;
        }

        .tabsRow {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 18px;
        }

        .tabBtn {
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.05);
          color: var(--text);
          padding: 10px 14px;
          border-radius: 999px;
          font-weight: 700;
          transition: var(--trans);
        }

        .tabBtn:hover {
          transform: translateY(-1px);
          border-color: rgba(91, 124, 250, 0.55);
        }

        .tabBtn.active {
          background: linear-gradient(90deg, var(--brand), var(--brand2));
          border-color: transparent;
        }

        .tabRefresh {
          margin-left: auto;
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.05);
          color: var(--text);
          padding: 10px 14px;
          border-radius: 999px;
          font-weight: 700;
        }

        .cardBox {
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.05);
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          overflow: hidden;
          margin-bottom: 18px;
        }

        .cardHead {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          padding: 14px 16px;
          border-bottom: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.04);
        }

        .cardHead h5 {
          margin: 0;
          font-weight: 800;
        }

        .pill {
          padding: 6px 10px;
          border-radius: 999px;
          font-size: 0.85rem;
          border: 1px solid rgba(91, 124, 250, 0.35);
          background: rgba(91, 124, 250, 0.15);
          color: var(--text);
        }

        .muted {
          color: var(--muted);
        }

        .cardBody {
          padding: 16px;
        }

        .cardBody.p0 {
          padding: 0;
        }

        /* Form */
        .adminForm .grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 12px;
        }

        .field {
          grid-column: span 4;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .field.wide {
          grid-column: span 12;
        }

        .field label {
          font-weight: 700;
          color: rgba(234, 240, 255, 0.9);
        }

        .field input,
        .field select,
        .field textarea {
          padding: 11px 12px;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: rgba(0, 0, 0, 0.25);
          color: var(--text);
          outline: none;
          transition: var(--trans);
        }

        .field input:focus,
        .field select:focus,
        .field textarea:focus {
          border-color: rgba(91, 124, 250, 0.7);
          box-shadow: 0 0 0 4px rgba(91, 124, 250, 0.15);
        }

        .uploadRow {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .uploadRow input[type="text"] {
          flex: 1;
          min-width: 240px;
        }

        .uploadBtn {
          cursor: pointer;
          user-select: none;
          padding: 11px 14px;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.06);
          font-weight: 800;
          transition: var(--trans);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .uploadBtn:hover {
          transform: translateY(-1px);
          border-color: rgba(91, 124, 250, 0.55);
        }

        .uploadBtn input {
          display: none;
        }

        .uploadBtn.disabled {
          opacity: 0.6;
          pointer-events: none;
        }

        .previewRow {
          margin-top: 10px;
        }

        .previewRow img {
          height: 120px;
          border-radius: 14px;
          border: 1px solid var(--border);
          object-fit: cover;
        }

        .formBtns {
          display: flex;
          gap: 10px;
          margin-top: 14px;
          flex-wrap: wrap;
        }

        /* Buttons */
        .btnPrimary {
          border: none;
          background: linear-gradient(90deg, var(--brand), var(--brand2));
          color: white;
          padding: 11px 16px;
          border-radius: 12px;
          font-weight: 900;
          transition: var(--trans);
        }

        .btnPrimary:hover {
          transform: translateY(-1px);
        }

        .btnGhost {
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.06);
          color: var(--text);
          padding: 11px 16px;
          border-radius: 12px;
          font-weight: 900;
          transition: var(--trans);
        }

        .btnGhost:hover {
          transform: translateY(-1px);
          border-color: rgba(91, 124, 250, 0.55);
        }

        .btnDanger {
          border: 1px solid rgba(255, 77, 77, 0.45);
          background: rgba(255, 77, 77, 0.12);
          color: white;
          padding: 11px 14px;
          border-radius: 12px;
          font-weight: 900;
          transition: var(--trans);
        }

        .btnDanger:hover {
          transform: translateY(-1px);
        }

        /* Table */
        .tableWrap {
          overflow: auto;
        }

        .adminTable {
          width: 100%;
          border-collapse: collapse;
          min-width: 900px;
        }

        .adminTable thead th {
          text-align: left;
          padding: 14px 14px;
          font-size: 0.78rem;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          color: rgba(234, 240, 255, 0.7);
          background: rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid var(--border);
          white-space: nowrap;
        }

        .adminTable tbody td {
          padding: 14px 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          vertical-align: middle;
        }

        .adminTable tbody tr:hover {
          background: rgba(91, 124, 250, 0.06);
        }

        .rowActive {
          background: rgba(91, 124, 250, 0.1);
        }

        .poster {
          width: 52px;
          height: 78px;
          border-radius: 12px;
          object-fit: cover;
          border: 1px solid var(--border);
        }

        .nameCell {
          font-weight: 900;
        }

        .descCell {
          color: var(--muted);
          font-size: 0.9rem;
          margin-top: 2px;
        }

        .chip {
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.05);
          display: inline-block;
          white-space: nowrap;
        }

        .ratingChip {
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(255, 211, 106, 0.35);
          background: rgba(255, 211, 106, 0.12);
          white-space: nowrap;
          font-weight: 900;
        }

        .rowBtns {
          display: inline-flex;
          gap: 8px;
        }

        .btnMini {
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.06);
          color: var(--text);
          padding: 8px 10px;
          border-radius: 10px;
          font-weight: 900;
          transition: var(--trans);
        }

        .btnMini:hover {
          transform: translateY(-1px);
        }

        .btnMini.danger {
          border-color: rgba(255, 77, 77, 0.45);
          background: rgba(255, 77, 77, 0.12);
        }

        .emptyState {
          padding: 28px;
          text-align: center;
          color: var(--muted);
        }

        /* Pager */
        .pager {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          padding: 14px 16px;
          border-top: 1px solid var(--border);
          flex-wrap: wrap;
        }

        .pagerInfo {
          color: var(--muted);
          text-align: center;
          flex: 1;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .searchInput {
            width: 180px;
          }
          .field {
            grid-column: span 6;
          }
        }

        @media (max-width: 600px) {
          .searchInput {
            width: 140px;
          }
          .field {
            grid-column: span 12;
          }
          .tabRefresh {
            margin-left: 0;
          }
        }
      `}</style>
    </>
  );
}
