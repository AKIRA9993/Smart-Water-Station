"use client";

import { useState, useEffect, useRef } from "react";
import { Root, SensorData } from "@/Interfaces/FullStatesPrototypeInterface";

type ConnectionMode = "API" | "Serial" | "Simulation";

// ============================================
// MAIN COMPONENT
// ============================================
export default function Prototype() {
  const [mode, setMode] = useState<ConnectionMode>("API");
  const [isConnected, setIsConnected] = useState(false);
  const [sensorData, setSensorData] = useState<SensorData>({
    tds: 0,
    pressure: 0,
    flowRate: 0,
    flowProgress: 0,
  });
  const [apiData, setApiData] = useState<Root | null>(null);
  const [error, setError] = useState<string | null>(null);
  const portRef = useRef<any>(null);

  // ============================================
  // API DATA FETCHING
  // ============================================
  useEffect(() => {
    if (mode !== "API") return;

    const fetchApiData = async () => {
      try {
        const response = await fetch("https://samart-water.free.laravel.cloud/api/status");
        if (!response.ok) throw new Error("API unavailable");
        const data: Root = await response.json();
        setApiData(data);
        setIsConnected(data.connected ?? false);
        setError(null);

        setSensorData({
          tds: data.telemetry.tds.value ?? 0,
          pressure: data.telemetry.pressure.value ?? 0,
          flowRate: data.telemetry.flow.value ?? 0,
          flowProgress: data.telemetry.level.value ?? 0,
        });
      } catch (err) {
        setIsConnected(false);
        if (!error) setError("API connection failed - using simulation");
        setMode("Simulation");
      }
    };

    fetchApiData();
    const interval = setInterval(fetchApiData, 5000);
    return () => clearInterval(interval);
  }, [mode, error]);

  // ============================================
  // SERIAL CONNECTION
  // ============================================
  const connectSerial = async () => {
    try {
      if (!("serial" in navigator)) {
        setError("Web Serial API not supported");
        return;
      }
      const port = await (navigator as any).serial.requestPort();
      await port.open({ baudRate: 9600 });
      portRef.current = port;
      setIsConnected(true);
      setError(null);
    } catch (err) {
      setError("Serial connection failed");
      setMode("Simulation");
    }
  };

  const disconnectSerial = async () => {
    if (portRef.current) {
      await portRef.current.close();
      portRef.current = null;
    }
    setIsConnected(false);
  };

  const handleConnectToggle = () => {
    if (mode === "Serial") {
      isConnected ? disconnectSerial() : connectSerial();
    } else if (mode === "API") {
      if (!isConnected) {
        setMode("API");
      }
    }
  };

  // ============================================
  // SIMULATION DATA
  // ============================================
  useEffect(() => {
    if (mode !== "Simulation") return;

    setIsConnected(true);
    setError(null);
    const interval = setInterval(() => {
      setSensorData({
        tds: Math.random() * 100,
        pressure: 2 + Math.random() * 3,
        flowRate: 5 + Math.random() * 8,
        flowProgress: Math.random() * 100,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [mode]);

  // ============================================
  // FLOW STATUS
  // ============================================
  function getFlowStatus() {
    if (sensorData.flowRate > 8)
      return { text: "✅ Flow is stable", color: "#22c55e" };
    if (sensorData.flowRate > 4)
      return { text: "⚠️ Flow is moderate", color: "#f59e0b" };
    return { text: "❌ Low flow detected", color: "#ef4444" };
  }

  const flowStatus = getFlowStatus();
  const progress = Math.min(Math.max(sensorData.flowProgress, 0), 100);

  // ============================================
  // RENDER
  // ============================================
  return (
    <section
      className="min-h-screen px-5 py-10"
      style={{ background: "linear-gradient(135deg, #cfd9f7 0%, #d8dff9 100%)" }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-5xl font-bold mb-1" style={{ color: "#4169b3" }}>
              Prototype Demo
            </h2>
            <p className="text-gray-800 text-lg">
              "Simulation of the UF Water Treatment Unit"
            </p>
          </div>
          <button
            onClick={() => window.history.back()}
            className="text-3xl p-2 transition-transform hover:-translate-x-1"
            style={{ color: "#4169b3", background: "none", border: "none" }}
          >
            ←
          </button>
        </div>

        {/* Connection Controls */}
        <div className="rounded-2xl p-5 mb-5" style={{ backgroundColor: "#c7d8f5" }}>
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <p className="text-sm font-bold text-gray-800 mb-3">Connection Mode:</p>
              <div className="flex gap-2">
                {(["API", "Serial", "Simulation"] as ConnectionMode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setMode(m);
                      setIsConnected(false);
                      setError(null);
                    }}
                    className="px-4 py-2 rounded-lg font-medium transition-all"
                    style={{
                      backgroundColor: mode === m ? "#4169b3" : "#d8c3f7",
                      color: mode === m ? "white" : "#2d3a7a",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Connection Status & Button */}
            <div className="flex items-center gap-3">
              <div>
                <span
                  className="w-3 h-3 rounded-full inline-block mr-2"
                  style={{ backgroundColor: isConnected ? "#22c55e" : "#ef4444" }}
                />
                <span className="text-sm font-semibold">
                  {isConnected ? "🟢 Connected" : "🔴 Disconnected"}
                </span>
              </div>
              {mode !== "Simulation" && (
                <button
                  onClick={handleConnectToggle}
                  className="px-4 py-2 rounded-lg font-medium transition-all"
                  style={{
                    backgroundColor: isConnected ? "#ef4444" : "#22c55e",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {isConnected ? "Disconnect" : "Connect"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="rounded-2xl p-5 mb-5" style={{ backgroundColor: "#fef2f2" }}>
            <p className="text-sm" style={{ color: "#dc2626" }}>
              ⚠️ {error}
            </p>
          </div>
        )}

        {/* API Status (when in API mode) */}
        {mode === "API" && apiData && (
          <div
            className="rounded-2xl p-5 mb-5"
            style={{ backgroundColor: apiData.connected ? "#d1fae5" : "#fee2e2" }}
          >
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <span className="text-sm block font-semibold">
                  ESP32: {apiData.esp32_connected ? "✅ Connected" : "❌ Disconnected"}
                </span>
                <span className="text-sm text-gray-800">
                  State: <span style={{ fontWeight: "bold" }}>{apiData.state.state}</span>
                </span>
              </div>
              {apiData.threat_active && (
                <span className="px-3 py-1 rounded-full text-sm font-semibold" style={{ backgroundColor: "#fecaca", color: "#991b1b" }}>
                  ⚠️ Threat Active
                </span>
              )}
            </div>
          </div>
        )}

        {/* Sensors */}
        <div className="rounded-2xl p-8 mb-5" style={{ backgroundColor: "#c7d8f5" }}>
          <h3 className="text-2xl font-semibold mb-5 flex items-center gap-3" style={{ color: "#4169b3" }}>
            📡 Sensors Reading ({mode})
          </h3>
          <div className="space-y-3">
            {[
              { label: "TDS Sensor:", value: `${Math.round(sensorData.tds)} ppm` },
              { label: "Pressure Sensor:", value: `${sensorData.pressure.toFixed(1)} bar` },
              { label: "Flow Rate:", value: `${sensorData.flowRate.toFixed(1)} L/min` },
            ].map(({ label, value }) => (
              <p key={label} className="text-lg">
                <span className="font-medium" style={{ color: "#4169b3" }}>{label}</span>
                <span className="ml-2 font-semibold text-gray-800">{value}</span>
              </p>
            ))}
          </div>
        </div>

        {/* Flow Simulation */}
        <div className="rounded-2xl p-8" style={{ backgroundColor: "#c7d8f5" }}>
          <h3 className="text-2xl font-semibold mb-5" style={{ color: "#4169b3" }}>
            Water Flow Simulation
          </h3>
          <div className="w-full h-8 bg-gray-400 rounded-full overflow-hidden mb-4">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, backgroundColor: "#4169b3" }}
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-base" style={{ color: flowStatus.color }}>
              {flowStatus.text}
            </span>
            <span className="text-5xl font-bold" style={{ color: "#4169b3" }}>
              {Math.round(progress)}%
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
