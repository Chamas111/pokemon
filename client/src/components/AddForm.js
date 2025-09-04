import React, { useState } from "react";
import API_BASE_URL from "./config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddForm() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [abilities, setAbilities] = useState("");
  const [weakness, setWeakness] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [image, setImage] = useState("");
  const [gender, setGender] = useState("");
  const [type, setType] = useState("");

  const [errors, setErrors] = useState({}); // start empty object

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_BASE_URL}/api/pokemons`, {
        name,
        description,
        image,
        height,
        weight,
        gender,
        // turn comma separated string into arrays:
        abilities: abilities.split(",").map((a) => a.trim()),
        weakness: weakness.split(",").map((w) => w.trim()),
        type: type.split(",").map((t) => t.trim()),
      });

      navigate("/");
    } catch (err) {
      console.error(
        "❌ Error creating Pokemon:",
        err.response?.data || err.message
      );
      setErrors(err.response?.data?.errors || {});
    }
  };

  return (
    <div className="container mb-5 mt-5">
      <div className="row">
        <div className="col-sm-12 blue-color">ADD NEW POKEMON</div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12 col-md-6 col-lg-6 gray-color">
            <div className="mb-3 p-5">
              <label className="form-label">Name OF YOUR POKEMON</label>
              {errors.name && (
                <p className="text-danger h6">{errors.name.message}</p>
              )}
              <input
                type="text"
                value={name}
                className="form-control rounded-pill p-2 border border-primary"
                placeholder="Pokemon Name..."
                onChange={(e) => setName(e.target.value)}
              />

              <label className="form-label mt-3">IMAGE</label>
              {errors.image && (
                <p className="text-danger h6">{errors.image.message}</p>
              )}
              <input
                type="text"
                value={image}
                className="form-control rounded-pill p-2 border border-primary"
                placeholder="Image Link..."
                onChange={(e) => setImage(e.target.value)}
              />

              <label className="form-label mt-3">DESCRIPTION</label>
              {errors.description && (
                <p className="text-danger h6">{errors.description.message}</p>
              )}
              <textarea
                value={description}
                className="form-control form-textarea"
                placeholder="Leave a comment here..."
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-6 yellow-color">
            {/* HEIGHT & WEIGHT */}
            <div className="row mt-5">
              <div className="col">
                <div className="p-1 ms-5 me-5">
                  <label className="form-label">HEIGHT</label>
                  {errors.height && (
                    <p className="text-danger h6">{errors.height.message}</p>
                  )}
                  <input
                    type="text"
                    value={height}
                    className="form-control rounded-pill p-2 border border-primary"
                    placeholder="ex: 2' 00"
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>
              </div>
              <div className="col">
                <div className="p-1 ms-5 me-5">
                  <label className="form-label">WEIGHT</label>
                  {errors.weight && (
                    <p className="text-danger h6">{errors.weight.message}</p>
                  )}
                  <input
                    type="text"
                    value={weight}
                    className="form-control rounded-pill p-2 border border-primary"
                    placeholder="ex: 18,7"
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* ABILITIES & WEAKNESS */}
            <div className="row">
              <div className="col">
                <div className="p-5">
                  <label className="form-label">
                    ABILITIES (comma separated)
                  </label>
                  {errors.abilities && (
                    <p className="text-danger h6">{errors.abilities.message}</p>
                  )}
                  <input
                    type="text"
                    value={abilities}
                    className="form-control rounded-pill p-2 border border-primary"
                    placeholder="type one or more"
                    onChange={(e) => setAbilities(e.target.value)}
                  />
                </div>
              </div>
              <div className="col">
                <div className="p-5">
                  <label className="form-label">
                    WEAKNESS (comma separated)
                  </label>
                  {errors.weakness && (
                    <p className="text-danger h6">{errors.weakness.message}</p>
                  )}
                  <input
                    type="text"
                    value={weakness}
                    className="form-control rounded-pill p-2 border border-primary"
                    placeholder="type one or more"
                    onChange={(e) => setWeakness(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* GENDER & TYPE */}
            <div className="row">
              <div className="col">
                <div className="p-1 ms-5 me-5">
                  <label className="form-label">GENDER</label>
                  {errors.gender && (
                    <p className="text-danger h6">{errors.gender.message}</p>
                  )}
                  <input
                    type="text"
                    value={gender}
                    className="form-control rounded-pill p-2 border border-primary"
                    placeholder="male / female"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
              </div>
              <div className="col">
                <div className="p-1 ms-5 me-5">
                  <label className="form-label">TYPE (comma separated)</label>
                  {errors.type && (
                    <p className="text-danger">{errors.type.message}</p>
                  )}
                  <input
                    type="text"
                    value={type}
                    className="form-control rounded-pill p-2 border border-primary"
                    placeholder="fire, water..."
                    onChange={(e) => setType(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="row mt-5 mb-4">
              <div className="col-5"></div>
              <div className="col-2">
                <button
                  className="btn btn-primary"
                  id="addform-btn"
                  type="submit"
                >
                  SUBMIT
                </button>
              </div>
              <div className="col-2"></div>
            </div>
          </div>
        </div>
      </form>
      <div className="row">
        <div className="col-sm-12 blue1-color mb-3"></div>
      </div>
    </div>
  );
}

export default AddForm;
