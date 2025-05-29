import React from "react";

/**
 * PUBLIC_INTERFACE
 * RideStatus: Displays the current status of the booked ride ("Scheduled"),
 * estimated pickup time, a static/mock map for driver tracking, and an always-visible SOS Button.
 * Minimalist TrustRide-branded UI.
 *
 * @param {Object} props
 * @param {Object} props.ride - (optional) ride/driver info to display, else displays mock.
 */
export default function RideStatus({ ride, onSOS }) {
  // Use mock data if no ride passed
  const mockRide = {
    driver: "Priya Shah",
    vehicle: "Hyundai Verna - Blue",
    depPoint: "Greenwood University Main Gate",
    estPickup: new Date(Date.now() + 13 * 60000),
  };
  const r = ride || mockRide;

  // Format pickup time as 12-hour AM/PM
  function fmtTime(dt) {
    const d = new Date(dt);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
  }

  // Handler for SOS click - delegate or use default alert
  function handleSOS() {
    if (onSOS) return onSOS();
    window.alert(
      "🚨 Emergency SOS activated (Demo)

In the real app, guardians and TrustRide would be notified immediately."
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

        {/* Estimated Pickup */}
        <div style={{ marginTop: 14, marginBottom: 8, fontWeight: 700, color: "#0077B6", fontSize: 16 }}>
          <span role="img" aria-label="clock" style={{ marginRight: 7, fontSize: 18 }}>
            ⏰
          </span>
          Estimated Pickup:&nbsp;
          <span>{fmtTime(r.estPickup)}</span>
        </div>

        {/* Driver Info */}
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
          }}
        >
          <span role="img" aria-label="map" style={{ fontSize: 20, marginRight: 6 }}>
            🗺️
          </span>
          Driver Map / Arrival Tracking (Demo)
        </div>
        {/* Static minimalist "map": dots as route, car as driver location */}
        <div
          aria-label="Live Driver Map (mock)"
          style={{
            width: "100%",
            minHeight: 67,
            maxWidth: 290,
            background: "linear-gradient(90deg, #e3f3ff 50%, #ecfcf7 100%)",
            borderRadius: 17,
            border: "1px solid #eaf0f6",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
            padding: "0 18px",
            marginTop: 5,
            marginBottom: 0,
          }}
        >
          {/* Start pin */}
          <span
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "#0077B6",
              display: "inline-block",
              marginRight: 2,
              border: "2.5px solid #fff",
              boxShadow: "0 2px 5px rgba(0,119,182,0.13)",
            }}
          ></span>
          {/* Route line (dots) */}
          <span
            style={{
              flex: 1,
              borderBottom: "3px dashed #00A896",
              height: 0,
              margin: "0 4px",
              alignSelf: "center",
              minWidth: 26,
            }}
          ></span>
          {/* Car (driver marker) */}
          <span
            aria-label="car"
            role="img"
            style={{
              fontSize: 28,
              color: "#00A896",
              marginRight: 4,
              transform: "rotate(-11deg)",
              background: "#f4fbf9",
              borderRadius: "50%",
              width: 34,
              height: 34,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2.5px solid #00A89650",
            }}
          >
            🚗
          </span>
          {/* End pin */}
          <span
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "#00A896",
              display: "inline-block",
              marginLeft: 2,
              border: "2.5px solid #fff",
              boxShadow: "0 2px 5px rgba(0,168,150,0.13)",
            }}
          ></span>
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
          Track progress here.
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
          <span role="img" aria-label="siren" style={{ fontSize: 27, marginRight: 2 }}>
            🚨
          </span>
          Emergency SOS
        </button>
      </section>
    </div>
  );
}
