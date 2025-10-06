import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ADMIN_URL } from "../../constants/constant";

function MapSection() {
  const [locations, setLocations] = useState([]);
  const [selectedMap, setSelectedMap] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const res = await axios.get(`${ADMIN_URL}/api/admin/office-locations`);
      const visibleLocations = res.data.filter((loc) => loc.visible);
      setLocations(visibleLocations);
      if (visibleLocations.length > 0) {
        setSelectedMap(visibleLocations[0]); // Select first by default
      }
    } catch (err) {
      console.error("Error fetching locations", err);
    }
  };

  const handleSelect = (loc) => {
    mapRef.current.style.visibility = "hidden";
    setTimeout(() => {
      setSelectedMap(loc);
      mapRef.current.style.visibility = "visible";
    }, 200);
  };

  return (
    <div className="container-fluid">
      <div className="map-heading mt-5 mb-3 ">
        <h3 className="text-center" style={{ fontWeight: "bold" , color: "#d54400" }}>
          Contact Fund For Bharat to start your crowdfunding campaign!
        </h3>
        <div className="heading-border mx-auto mb-5"></div>
      </div>

      <div className="d-flex justify-content-center" style={{ backgroundColor: "#FAFAFA" }}>
        {locations.map((loc) => (
          <button
            key={loc.city}
            className={`contactus-mapsection-buttons ${
              selectedMap?.city === loc.city ? "selectedbutton" : ""
            }`}
            disabled={selectedMap?.city === loc.city}
            onClick={() => handleSelect(loc)}
          >
            {loc.city}
          </button>
        ))}
      </div>

      {selectedMap && (
        <div className="row mx-auto" style={{ width: "100%" }} ref={mapRef}>
          <div className="col-12 col-md-8 px-0 map-image">
            <iframe
              src={selectedMap.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={selectedMap.officeName}
            ></iframe>
          </div>

          <div
            className="col-12 col-md-4 d-flex flex-column text-light px-4"
            style={{ background: "#d54400" }}
          >
            <h3 className="text-center pt-5 pb-3">{selectedMap.officeName}</h3>
            <span>{selectedMap.addressLine1}</span>
            <span>{selectedMap.addressLine2}</span>
            <span>{selectedMap.addressLine3}</span>
            <p>Phone: {selectedMap.phone}</p>
            <p className="py-1">{selectedMap.infoText}</p>
            {selectedMap.email && (
              <p className="mb-5">Email: {selectedMap.email}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MapSection;




// import React, { useRef, useState } from "react";

// function MapSection() {
//   const [selectedMap, updateSelectedMap] = useState("Mumbai");
//   const mapref = useRef(null);

//   function hidemap() {
//     mapref.current.style.visibility = "hidden";
//     setTimeout(() => {
//       mapref.current.style.visibility = "visible";
//     }, 200);
//   }

//   return (
//     <div className="container-fluid">
//       <div className="map-heading mt-5 mb-3 ">
//         <h3 className=" text-center" style={{ fontWeight: "bold", color:"black" }}>
//           Contact Fund For Bharat to start your crowdfunding campaign!
//         </h3>
//         <div className="heading-border mx-auto mb-5"></div>
//       </div>

//       <div
//         className="d-flex justify-content-center "
//         style={{ backgroundColor: "#FAFAFA" }}
//       >
//         <button
//           className={`contactus-mapsection-buttons ${
//             selectedMap == "Mumbai" ? "selectedbutton" : ""
//           }`}
//           disabled={selectedMap == "Mumbai"}
//           onClick={() => {
//             hidemap();
//             updateSelectedMap("Mumbai");
//           }}
//         >
//           Mumbai
//         </button>
//         <button
//           className={`contactus-mapsection-buttons ${
//             selectedMap == "San Fransicso" ? "selectedbutton" : ""
//           }`}
//           disabled={selectedMap == "San Fransicso"}
//           onClick={() => {
//             hidemap();
//             updateSelectedMap("San Fransicso");
//           }}
//         >
//           San Fransicso
//         </button>
//       </div>

//       <div className="row mx-auto" style={{ width: "100%" }} ref={mapref}>
//         <div className="col-12 col-md-8 px-0 map-image">
//           <iframe
//             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.1457131372!2d72.71637429885615!3d19.082177513535544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1720866101708!5m2!1sen!2sin"
//             width="100%"
//             height="100%"
//             style={{ border: "0" }}
//             allowfullscreen=""
//             loading="lazy"
//             referrerpolicy="no-referrer-when-downgrade"
//           ></iframe>
//         </div>

//         {selectedMap == "Mumbai" ? (
//           <div
//             className="col-12 col-md-4 d-flex flex-column text-light  px-4"
//             style={{ background: "#d54400" }}
//           >
//             <h3 className="text-center pt-5 pb-3">India Office</h3>
//             <span>Vaman Techno Center,</span>
//             <span>3rd Floor Makwana Road,</span>
//             <span>Marol Village, Andheri East, Mumbai - 400059</span>
//             <p>Phone: 180 089 12903</p>
//             <p className="py-1 ">Toll-free number for Indian residents</p>
//             <p className=" mb-3">
//               For International Donors, please reach out to info@impactguru.com
//               for queries.
//             </p>
//             <p className="mb-5">
//               * Our office working hours are from 09:00 am IST to 06:00 pm IST/
//               Monday to Friday. Allow 24 working hours for our team to get back
//               to you.
//             </p>
//           </div>
//         ) : (
//           <div
//             className="col-12 col-md-4 d-flex flex-column text-light  px-4"
//             style={{ background: "#d54400" }}
//           >
//             <h3 className="text-center py-5">USA Office</h3>
//             <span>718 Long Bridge Street</span>
//             <span>Apt.323,</span>
//             <span>SF-94158,CA</span>
//             <p className="py-4 mb-5">
//               Please note that this office is not operated or managed by Fund
//               For Bharat Pvt Ltd but by a partner entity.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default MapSection;
