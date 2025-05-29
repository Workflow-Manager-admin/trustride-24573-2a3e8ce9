import React from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Fix for missing default marker icons in leaflet
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/**
 * PUBLIC_INTERFACE
 * RideStatus: Displays ride status, estimated pickup, and a real map with live mock driver location and route.
 */
export default function RideStatus({ ride, onSOS }) {
  // Use mock data if no ride passed
  const mockRide = {
    driver: "Priya Shah",
    vehicle: "Hyundai Verna - Blue",
    depPoint: "Greenwood University Main Gate",
    estPickup: new Date(Date.now() + 13 * 60000),
    // mock: Mumbai [driver + pickup] (could be anywhere realistic)
    driverLatLng: [19.103, 72.87], // moving "toward" pickup
    pickupLatLng: [19.1167, 72.8333]
  };
  const r = ride || mockRide;

  // Mock route (normally you'd get real API route polyline)
  const route = [r.driverLatLng, r.pickupLatLng];

  // Format pickup time
  function fmtTime(dt) {
    const d = new Date(dt);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
  }

  function handleSOS() {
    if (onSOS) return onSOS();
    window.alert(
      "SOS Emergency activated (Demo). In production, guardians and support would be notified immediately."
    );
  }

  return (
    <div style={{ paddingTop: 48, paddingBottom: 30, maxWidth: 430, margin: "0 auto" }}>
      {/* Status Card */}
      <section
        className="card"
        style={{
          borderRadius: "var(--radius-main)",
          boxShadow: "0 2px 23px rgba(0,168,150,0.09)",
          border: "2.2px solid var(--color-accent)",
          padding: "34px 22px 25px 22px",
          marginBottom: 26,
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 7,
          textAlign: "center",
        }}
      >
        <div className="subtitle" style={{ color: "var(--color-accent)", fontWeight: 700, marginBottom: 1 }}>
          Ride Status
        </div>
        <span
          style={{
            fontWeight: 800,
            color: "var(--color-accent)",
            fontSize: 21,
            padding: "5px 17px",
            background: "#ecfcf7",
            border: "1.5px solid var(--color-accent)",
            borderRadius: 19,
            marginBottom: 5,
          }}
        >
          Scheduled
        </span>
        <div className="description" style={{ color: "var(--color-text-secondary)", fontSize: 15, marginBottom: 2 }}>
          Your verified driver is on the way!
        </div>
        <div style={{ marginTop: 14, marginBottom: 8, fontWeight: 700, color: "#0077B6", fontSize: 16 }}>
          Estimated Pickup:&nbsp;
          <span>{fmtTime(r.estPickup)}</span>
        </div>
        <div
          style={{
            marginTop: 8,
            marginBottom: 0,
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: 15,
              background: "#eaf9ff",
              color: "var(--color-primary)",
              borderRadius: 11,
              padding: "2px 11px",
              fontWeight: 700,
              border: "1.2px solid var(--color-border)",
            }}
            aria-label="Driver"
          >
            Driver: {r.driver}
          </span>
          <span
            style={{
              fontSize: 13.2,
              background: "#f4fbf9",
              color: "#00A896",
              borderRadius: 11,
              padding: "2px 10px",
              fontWeight: 600,
              border: "1.2px solid var(--color-border)",
            }}
            aria-label="Vehicle"
          >
            {r.vehicle}
          </span>
        </div>
        <div
          style={{
            fontSize: 13,
            color: "var(--color-muted)",
            marginTop: 5,
            marginBottom: 0,
            fontWeight: 500,
          }}
        >
          Pickup Point: <span style={{ color: "#0077B6" }}>{r.depPoint}</span>
        </div>
      </section>

      {/* Map/Mini-tracker Card */}
      <section
        className="card"
        style={{
          borderRadius: "var(--radius-main)",
          border: "1.2px solid var(--color-border)",
          background: "#f8fafb",
          boxShadow: "0 1.5px 10px rgba(0,119,182,0.045)",
          padding: "23px 17px 18px 19px",
          marginBottom: 27,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontWeight: 800,
            color: "var(--color-primary)",
            fontSize: 17,
            marginBottom: 11,
            textAlign: "center",
            letterSpacing: "-0.3px"
          }}
        >
          <span style={{marginRight: 6, fontSize: 23}}>🗺️</span>
          Live Map: Driver & Route
        </div>
        <div style={{
          width: "100%",
          maxWidth: 320,
          height: 210,
          margin: "0 auto",
          borderRadius: 17,
          overflow: "hidden",
          border: "1.5px solid var(--color-accent)",
          boxShadow: "0 2px 14px #b9efe945"
        }}>
          <MapContainer
            center={r.driverLatLng}
            zoom={14}
            scrollWheelZoom={false}
            style={{
              width: "100%",
              height: "210px",
              borderRadius: 17,
              border: "none"
            }}
            dragging={true}
            doubleClickZoom={false}
            attributionControl={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              maxZoom={18}
              attribution="&copy; OpenStreetMap contributors"
            />
            {/* Driver marker */}
            <Marker position={r.driverLatLng}>
              <Popup>
                Driver: {r.driver} <br />
                {r.vehicle}
              </Popup>
            </Marker>
            {/* Pickup marker */}
            <Marker position={r.pickupLatLng}>
              <Popup>
                Pickup: {r.depPoint}
              </Popup>
            </Marker>
            {/* Route polyline */}
            <Polyline positions={route} pathOptions={{ color: "#00A896", weight: 6, opacity: 0.67, dashArray: "3 7" }} />
          </MapContainer>
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 13.3,
            color: "#75b48a",
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          Driver is approaching your pickup point.<br />
          Track progress in real-time on the map.
        </div>
      </section>

      {/* SOS Button Section */}
      <section
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginBottom: 37,
        }}
      >
        <button
          className="btn btn-large"
          style={{
            background: "linear-gradient(90deg, #e22b38, #ff5e67)",
            color: "#fff",
            fontWeight: 740,
            fontSize: "1.16rem",
            padding: "16px 38px",
            borderRadius: 15,
            border: "none",
            boxShadow: "0 4px 18px rgba(226,43,56,0.10)",
            outline: "none",
            letterSpacing: "0.6px",
            display: "flex",
            alignItems: "center",
            gap: 13,
            transition: "background 0.16s cubic-bezier(0.4,0,0.2,1)"
          }}
          onClick={handleSOS}
          aria-label="Emergency SOS"
          tabIndex={0}
        >
          Emergency SOS
        </button>
      </section>
    </div>
  );
}
