import { FirebaseContext } from "@/firebase";
import { useContext, useRef } from "react";

const Platillo = ({ platillo }) => {
  const { id, nombre, imagen, existencia, categoria, precio, descripcion } =
    platillo;

  const existenciaRef = useRef(existencia);

  const { firebase } = useContext(FirebaseContext);

  const actualizarDisponibilidad = () => {
    const existencia = existenciaRef.current.value === "true";
    try {
      firebase.db.collection("productos").doc(id).update({ existencia });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full px-3 mb-4">
      <div className="p-5 shadow-md bg-white">
        <div className="lg:flex">
          <div className="lg:w-5/12 xl:w-3/12">
            <img src={imagen} alt="Imagen platillo" />
            <div className="sm:flex sm:-mx-2 pl-2">
              <label className="block mt-5 sm:w-2/4">
                <span className="block text-gray-800 mb-2">Existencia</span>
                <select
                  value={existencia}
                  ref={existenciaRef}
                  onChange={() => actualizarDisponibilidad()}
                  className="bg-white shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="true">Disponible</option>
                  <option value="false">No disponible</option>
                </select>
              </label>
            </div>
          </div>
          <div className="lg:w-7/12 xl:w-9/12 pl-5">
            <p className="font-bold text-2xl text-yellow-600 mb-4">{nombre}</p>
            <p className="text-gray-600 mb-4">
              Categoría:{" "}
              <span className="text-gray-700 font-bold uppercase">
                {categoria}
              </span>
            </p>
            <p className="text-gray-600 mb-4">{descripcion}</p>
            <p className="text-gray-600 mb-4">
              Precio:{" "}
              <span className="text-gray-700 font-bold uppercase">
                ${precio}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Platillo;
