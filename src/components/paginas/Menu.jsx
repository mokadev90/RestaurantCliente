import { FirebaseContext } from "../../firebase";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Platillo from "../ui/Platillo";

const Menu = () => {
  const firebase = useContext(FirebaseContext);
  const [platillos, setPlatillos] = useState([]);

  /* 
  useEffect(() => {
    const obtenerPlatillos = () => {
      firebase.database.ref("productos").on("value", (snapshot) => {
        console.log(snapshot.val());
        setPlatillos(snapshot.val());
      });
    };

    obtenerPlatillos();
  }, []);
 */

  useEffect(() => {
    const obtenerPlatillos = () => {
      firebase.firebase.db.collection("productos").onSnapshot(handleSnapshot);
    };

    obtenerPlatillos();
  }, []);

  const handleSnapshot = (snapshot) => {
    const platillos = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    setPlatillos(platillos);
    console.log(platillos);
  };

  return (
    <>
      <h1 className="text-3xl font-light mb-4">Menu</h1>
      <Link
        to="/nuevo-platillo"
        className="bg-blue-800 hover:bg-blue-700 inline-block mb-5 p-2 text-white uppercase font-bold"
      >
        Agregar platillo
      </Link>
      {platillos.map((platillo) => (
        <Platillo key={platillo.id} platillo={platillo} />
      ))}
    </>
  );
};
export default Menu;
